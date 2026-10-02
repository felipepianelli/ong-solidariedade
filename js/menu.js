// ==========================================================
// MENU - abre e fecha o menu no celular (botão ☰)
// ==========================================================

export function iniciarMenu() {
    const botao = document.querySelector(".menu-toggle");
    const menu = document.getElementById("menu-links");
    if (!botao || !menu) return;

    function definir(aberto) {
        menu.classList.toggle("aberto", aberto);
        botao.setAttribute("aria-expanded", String(aberto));
        botao.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
        botao.textContent = aberto ? "✕" : "☰";
    }

    botao.addEventListener("click", () => {
        definir(!menu.classList.contains("aberto"));
    });

    // Clicar em um link fecha o menu
    menu.addEventListener("click", evento => {
        if (evento.target.closest("a")) definir(false);
    });

    // Tecla Esc fecha o menu
    document.addEventListener("keydown", evento => {
        if (evento.key === "Escape") definir(false);
    });
}
