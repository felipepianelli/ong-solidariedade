// ==========================================================
// TOAST - aviso rápido no canto da tela (some sozinho)
// ==========================================================

export function mostrarToast(mensagem, tipo = "info") {
    const area = document.getElementById("area-toast");
    if (!area) return;

    const toast = document.createElement("div");
    toast.className = `toast toast-${tipo}`;
    toast.textContent = mensagem; // textContent: seguro contra HTML injetado
    area.appendChild(toast);

    setTimeout(() => toast.remove(), 4000);
}
