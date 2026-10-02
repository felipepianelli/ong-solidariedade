// TELA CADASTRO - máscaras, validação com feedback, rascunho e salvamento

import { regras, mascaras } from "../validacao.js";
import {
    salvarVoluntario, cpfJaCadastrado,
    lerRascunho, salvarRascunho, apagarRascunho
} from "../armazenamento.js";
import { resumoErros, mensagemSucesso } from "../templates.js";
import { mostrarToast } from "../toast.js";

export default function iniciarCadastro(app) {
    const form = app.querySelector("#form-cadastro");
    const feedback = app.querySelector("#feedback-formulario");
    const campos = Object.keys(regras).map(nome => form.elements[nome]);

    // ---------- feedback visual de um campo ----------

    function mostrarErro(campo, mensagem) {
        const span = app.querySelector(`#erro-${campo.name}`);
        span.textContent = mensagem;
        campo.classList.toggle("invalido", Boolean(mensagem));
        campo.classList.toggle("valido", !mensagem && campo.value !== "");
        campo.setAttribute("aria-invalid", String(Boolean(mensagem)));
    }

    function validarCampo(campo) {
        let mensagem = regras[campo.name](campo.value);
        if (!mensagem && campo.name === "cpf" && cpfJaCadastrado(campo.value)) {
            mensagem = "Este CPF já está cadastrado.";
        }
        mostrarErro(campo, mensagem);
        return mensagem;
    }

    // ---------- rascunho (localStorage) ----------

    function coletarDados() {
        const dados = {};
        campos.forEach(c => { dados[c.name] = c.value.trim(); });
        return dados;
    }

    const rascunho = lerRascunho();
    let recuperou = false;
    campos.forEach(c => {
        if (rascunho[c.name]) {
            c.value = rascunho[c.name];
            recuperou = true;
        }
    });
    if (recuperou) mostrarToast("Rascunho recuperado do seu último acesso.", "info");

    // ---------- eventos de cada campo ----------

    campos.forEach(campo => {
        // input: a cada tecla (aplica máscara e salva rascunho)
        campo.addEventListener("input", () => {
            if (mascaras[campo.name]) campo.value = mascaras[campo.name](campo.value);
            if (campo.classList.contains("invalido")) validarCampo(campo); // corrige em tempo real
            salvarRascunho(coletarDados());
        });

        // blur: quando o usuário sai do campo
        campo.addEventListener("blur", () => {
            if (campo.value !== "") validarCampo(campo);
        });
    });

    // ---------- envio ----------

    form.addEventListener("submit", evento => {
        evento.preventDefault(); // não deixa o navegador recarregar a página

        const erros = [];
        campos.forEach(campo => {
            const mensagem = validarCampo(campo);
            if (mensagem) erros.push({ campo: campo.id, mensagem });
        });

        if (erros.length > 0) {
            feedback.innerHTML = resumoErros(erros);
            feedback.focus();
            // clicar no erro leva até o campo
            feedback.querySelectorAll("[data-ir-campo]").forEach(link => {
                link.addEventListener("click", e => {
                    e.preventDefault();
                    app.querySelector(`#${link.dataset.irCampo}`).focus();
                });
            });
            mostrarToast("Há campos com erro no formulário.", "erro");
            return;
        }

        const dados = coletarDados();
        if (!salvarVoluntario(dados)) {
            mostrarToast("Não foi possível salvar neste navegador.", "erro");
            return;
        }

        apagarRascunho();
        form.reset();
        campos.forEach(c => mostrarErro(c, ""));
        campos.forEach(c => c.classList.remove("valido"));
        feedback.innerHTML = mensagemSucesso(dados.nome);
        feedback.focus();
        mostrarToast("Cadastro realizado com sucesso!", "sucesso");
    });

    // Botão Limpar também apaga rascunho e mensagens
    form.addEventListener("reset", () => {
        apagarRascunho();
        feedback.innerHTML = "";
        campos.forEach(c => {
            mostrarErro(c, "");
            c.classList.remove("valido");
        });
    });
}
