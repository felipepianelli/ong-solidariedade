// ==========================================================
// MAIN - ponto de entrada. Só liga as partes.
// ==========================================================

import { iniciarMenu } from "./menu.js";
import { iniciarRouter } from "./router.js";

// type="module" já espera o HTML carregar, então o DOM está pronto aqui
iniciarMenu();
iniciarRouter();
