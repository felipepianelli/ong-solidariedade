// TELA VOLUNTÁRIOS - lista o que está salvo no localStorage

import { listarVoluntarios, removerVoluntario, removerTodosVoluntarios } from "../armazenamento.js";
import { itemVoluntario, mensagemVazia } from "../templates.js";
import { mostrarToast } from "../toast.js";

export default function iniciarVoluntarios(app) {
    const lista = app.querySelector("#lista-voluntarios");
    const total = app.querySelector("#total-voluntarios");
    const botaoLimpar = app.querySelector("#botao-limpar-todos");

    function desenhar() {
        const voluntarios = listarVoluntarios();
        total.textContent = voluntarios.length;
        botaoLimpar.disabled = voluntarios.length === 0;

        lista.innerHTML = voluntarios.length
            ? voluntarios.map(itemVoluntario).join("")
            : mensagemVazia("Nenhum voluntário cadastrado ainda.");
    }

    // Um único listener na lista serve para todos os botões "Remover"
    // (delegação de eventos: funciona mesmo para itens criados depois)
    lista.addEventListener("click", evento => {
        const botao = evento.target.closest("[data-remover]");
        if (!botao) return;
        removerVoluntario(Number(botao.dataset.remover));
        mostrarToast("Cadastro removido.", "info");
        desenhar();
    });

    botaoLimpar.addEventListener("click", () => {
        if (confirm("Apagar TODOS os cadastros salvos neste navegador?")) {
            removerTodosVoluntarios();
            mostrarToast("Todos os cadastros foram apagados.", "info");
            desenhar();
        }
    });

    desenhar();
}
