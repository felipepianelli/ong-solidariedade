// ==========================================================
// TEMPLATES - funções que recebem dados e devolvem HTML.
// Assim o mesmo componente visual é reaproveitado várias vezes.
// ==========================================================

import { nomesCategorias } from "./dados.js";

// Impede que texto digitado pelo usuário vire HTML (evita injeção de código)
export function escapar(texto) {
    return String(texto)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

export function cardProjeto(projeto) {
    return `
        <article class="card">
            <img src="${projeto.imagem}" alt="${escapar(projeto.alt)}" loading="lazy" decoding="async">
            <div class="card-corpo">
                <span class="badge">${nomesCategorias[projeto.categoria]}</span>
                <h2>${escapar(projeto.titulo)}</h2>
                <p>${escapar(projeto.descricao)}</p>
                <a class="botao" href="#/cadastro">Quero participar</a>
            </div>
        </article>
    `;
}

const nomesInteresse = {
    doacao: "Doação",
    voluntariado: "Voluntariado",
    ambos: "Doação e voluntariado"
};

export function itemVoluntario(v) {
    const interesse = nomesInteresse[v.interesse] || v.interesse;

    return `
        <li class="item-voluntario">
            <div>
                <strong>${escapar(v.nome)}</strong>
                <p class="texto-secundario">
                    ${escapar(v.email)} · ${escapar(v.cidade)}/${escapar(v.estado)}
                </p>
                <span class="badge">${escapar(interesse)}</span>
            </div>
            <button type="button" class="botao-perigo" data-remover="${v.id}"
                aria-label="Remover ${escapar(v.nome)}">
                Remover
            </button>
        </li>
    `;
}

export function mensagemVazia(texto) {
    return `<li class="vazio">${escapar(texto)}</li>`;
}

export function resumoErros(erros) {
    const itens = erros
        .map(e => `<li><a href="#${e.campo}" data-ir-campo="${e.campo}">${escapar(e.mensagem)}</a></li>`)
        .join("");
    return `
        <div class="feedback-alerta" role="alert">
            Corrija ${erros.length} ${erros.length === 1 ? "campo" : "campos"} antes de enviar:
            <ul>${itens}</ul>
        </div>
    `;
}

export function mensagemSucesso(nome) {
    return `
        <div class="feedback-sucesso" role="status">
            Cadastro realizado com sucesso! Obrigado, ${escapar(nome)}.
            <a href="#/voluntarios">Ver lista de voluntários</a>
        </div>
    `;
}
