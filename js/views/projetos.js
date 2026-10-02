// TELA PROJETOS - gera os cards e filtra por categoria

import { projetos } from "../dados.js";
import { cardProjeto } from "../templates.js";

export default function iniciarProjetos(app) {
    const lista = app.querySelector("#lista-projetos");
    const resumo = app.querySelector("#resumo-filtro");
    const botoes = app.querySelectorAll(".filtro");

    function mostrar(categoria) {
        const filtrados = categoria === "todos"
            ? projetos
            : projetos.filter(p => p.categoria === categoria);

        lista.innerHTML = filtrados.map(cardProjeto).join("");
        resumo.textContent = `${filtrados.length} ${filtrados.length === 1 ? "projeto encontrado" : "projetos encontrados"}.`;
    }

    botoes.forEach(botao => {
        botao.addEventListener("click", () => {
            botoes.forEach(b => {
                const ativo = b === botao;
                b.classList.toggle("ativo", ativo);
                b.setAttribute("aria-pressed", String(ativo));
            });
            mostrar(botao.dataset.categoria);
        });
    });

    mostrar("todos");
}
