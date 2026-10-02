// ==========================================================
// ROUTER - faz a navegação de página única (SPA).
// 1. Lê o hash da URL (ex.: #/projetos)
// 2. Busca o arquivo html/projetos.html
// 3. Coloca o conteúdo dentro do <main id="app">
// 4. Chama a função da tela (js/views/...) para ligar os eventos
// A página nunca recarrega.
// ==========================================================

import iniciarInicio from "./views/inicio.js";
import iniciarProjetos from "./views/projetos.js";
import iniciarCadastro from "./views/cadastro.js";
import iniciarVoluntarios from "./views/voluntarios.js";

const rotas = {
    inicio:      { arquivo: "html/inicio.html",      titulo: "Início",                iniciar: iniciarInicio },
    projetos:    { arquivo: "html/projetos.html",    titulo: "Projetos",              iniciar: iniciarProjetos },
    cadastro:    { arquivo: "html/cadastro.html",    titulo: "Seja Voluntário",       iniciar: iniciarCadastro },
    voluntarios: { arquivo: "html/voluntarios.html", titulo: "Voluntários",           iniciar: iniciarVoluntarios }
};

const ROTA_PADRAO = "inicio";
const cache = {}; // guarda o HTML já baixado para não buscar de novo

function nomeDaRota() {
    // "#/projetos" -> "projetos"
    const nome = location.hash.replace(/^#\/?/, "");
    return rotas[nome] ? nome : ROTA_PADRAO;
}

async function carregarHtml(arquivo) {
    if (cache[arquivo]) return cache[arquivo];
    const resposta = await fetch(arquivo);
    if (!resposta.ok) throw new Error(`Erro ${resposta.status} ao carregar ${arquivo}`);
    cache[arquivo] = await resposta.text();
    return cache[arquivo];
}

function marcarLinkAtivo(nome) {
    document.querySelectorAll(".menu-links a").forEach(link => {
        const ativo = link.dataset.rota === nome;
        link.classList.toggle("ativo", ativo);
        if (ativo) link.setAttribute("aria-current", "page");
        else link.removeAttribute("aria-current");
    });
}

async function renderizar() {
    const app = document.getElementById("app");
    const nome = nomeDaRota();
    const rota = rotas[nome];

    try {
        app.innerHTML = await carregarHtml(rota.arquivo);
        rota.iniciar(app);
    } catch (erro) {
        console.error(erro);
        app.innerHTML = `
            <section>
                <div class="feedback-alerta" role="alert">
                    Não foi possível carregar esta página.
                    Se você abriu o arquivo com duplo clique, rode o projeto com um servidor local
                    (veja o arquivo LEIA-ME.txt).
                </div>
            </section>`;
        return;
    }

    marcarLinkAtivo(nome);
    document.title = `${rota.titulo} - ONG Solidariedade`;
    window.scrollTo(0, 0);
    app.focus(); // leitor de tela e teclado começam no conteúdo novo
}

export function iniciarRouter() {
    // hashchange dispara toda vez que o usuário clica num link #/...
    window.addEventListener("hashchange", renderizar);
    renderizar();
}
