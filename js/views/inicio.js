// TELA INÍCIO - preenche os contadores

import { projetos } from "../dados.js";
import { listarVoluntarios } from "../armazenamento.js";

export default function iniciarInicio(app) {
    app.querySelector("#contador-projetos").textContent = projetos.length;
    app.querySelector("#contador-voluntarios").textContent = listarVoluntarios().length;
}
