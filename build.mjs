// ==========================================================
// BUILD DE PRODUÇÃO
// Uso:  npm run build
//
// O que faz:
//  1. Junta todos os módulos de js/ em UM arquivo e minifica (esbuild)
//  2. Minifica o CSS (esbuild)
//  3. Minifica o HTML do index e das telas em html/ (html-minifier-terser)
//  4. Copia as imagens (já otimizadas)
//  5. Escreve tudo na pasta docs/, que é a pasta publicada no GitHub Pages
//  6. Mostra a economia de tamanho de cada tipo de arquivo
// ==========================================================

import { build } from "esbuild";
import { minify } from "html-minifier-terser";
import { cpSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const SAIDA = "docs";

const opcoesHtml = {
    collapseWhitespace: true,
    conservativeCollapse: true, // mantém 1 espaço entre elementos de linha, para não grudar palavras
    removeComments: true,
    removeRedundantAttributes: true,
    minifyCSS: false,
    minifyJS: false
};

const tamanho = caminho => statSync(caminho).size;
const totais = { js: [0, 0], css: [0, 0], html: [0, 0] };

function somar(tipo, antes, depois) {
    totais[tipo][0] += antes;
    totais[tipo][1] += depois;
}

function listar(pasta, extensao) {
    return readdirSync(pasta, { recursive: true })
        .filter(f => f.endsWith(extensao))
        .map(f => join(pasta, f));
}

// ---------- 0. Limpa a saída ----------
rmSync(SAIDA, { recursive: true, force: true });
mkdirSync(join(SAIDA, "html"), { recursive: true });

// ---------- 1. JavaScript: junta os módulos e minifica ----------
await build({
    entryPoints: ["js/main.js"],
    bundle: true,
    minify: true,
    format: "esm",
    target: "es2020",
    outfile: join(SAIDA, "js", "app.js")
});
const jsAntes = listar("js", ".js").reduce((soma, f) => soma + tamanho(f), 0);
somar("js", jsAntes, tamanho(join(SAIDA, "js", "app.js")));

// ---------- 2. CSS ----------
await build({
    entryPoints: ["css/style.css"],
    minify: true,
    outfile: join(SAIDA, "css", "style.css")
});
somar("css", tamanho("css/style.css"), tamanho(join(SAIDA, "css", "style.css")));

// ---------- 3. HTML ----------
// O index passa a carregar o arquivo único (app.js) em vez de js/main.js
const indexOriginal = readFileSync("index.html", "utf8");
const indexAjustado = indexOriginal.replace('src="js/main.js"', 'src="js/app.js"');
const indexMin = await minify(indexAjustado, opcoesHtml);
writeFileSync(join(SAIDA, "index.html"), indexMin);
somar("html", Buffer.byteLength(indexOriginal), Buffer.byteLength(indexMin));

for (const arquivo of listar("html", ".html")) {
    const original = readFileSync(arquivo, "utf8");
    const min = await minify(original, opcoesHtml);
    writeFileSync(join(SAIDA, arquivo), min);
    somar("html", Buffer.byteLength(original), Buffer.byteLength(min));
}

// ---------- 4. Imagens e arquivos de apoio ----------
cpSync("imagens", join(SAIDA, "imagens"), { recursive: true });
writeFileSync(join(SAIDA, ".nojekyll"), ""); // o Pages não precisa processar com Jekyll

// ---------- 5. Relatório ----------
const kb = n => (n / 1024).toFixed(1).padStart(6) + " KB";
let somaAntes = 0;
let somaDepois = 0;
console.log("\nRESULTADO DA MINIFICAÇÃO");
console.log("tipo    antes        depois       redução");
for (const [tipo, [antes, depois]] of Object.entries(totais)) {
    somaAntes += antes;
    somaDepois += depois;
    const reducao = Math.round(100 - (depois * 100) / antes);
    console.log(`${tipo.padEnd(6)} ${kb(antes)}   ${kb(depois)}   -${reducao}%`);
}
const reducaoTotal = Math.round(100 - (somaDepois * 100) / somaAntes);
console.log(`TOTAL  ${kb(somaAntes)}   ${kb(somaDepois)}   -${reducaoTotal}%`);
console.log(`\nPublicação gerada em ./${SAIDA}\n`);
