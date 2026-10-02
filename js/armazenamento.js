// ==========================================================
// ARMAZENAMENTO - tudo que usa localStorage fica aqui.
// localStorage só guarda texto, por isso usamos JSON.
// ==========================================================

const CHAVE_VOLUNTARIOS = "ong_voluntarios";
const CHAVE_RASCUNHO = "ong_rascunho_cadastro";

function ler(chave, padrao) {
    try {
        const texto = localStorage.getItem(chave);
        return texto ? JSON.parse(texto) : padrao;
    } catch (erro) {
        // JSON quebrado ou localStorage bloqueado: volta ao valor padrão
        console.warn("Falha ao ler", chave, erro);
        return padrao;
    }
}

function gravar(chave, valor) {
    try {
        localStorage.setItem(chave, JSON.stringify(valor));
        return true;
    } catch (erro) {
        console.warn("Falha ao gravar", chave, erro);
        return false;
    }
}

function apagar(chave) {
    try {
        localStorage.removeItem(chave);
    } catch (erro) {
        console.warn("Falha ao apagar", chave, erro);
    }
}

// ---------- Voluntários ----------

export function listarVoluntarios() {
    return ler(CHAVE_VOLUNTARIOS, []);
}

export function cpfJaCadastrado(cpf) {
    return listarVoluntarios().some(v => v.cpf === cpf);
}

export function salvarVoluntario(dados) {
    const lista = listarVoluntarios();
    lista.push({ ...dados, id: Date.now(), criadoEm: new Date().toISOString() });
    return gravar(CHAVE_VOLUNTARIOS, lista);
}

export function removerVoluntario(id) {
    const lista = listarVoluntarios().filter(v => v.id !== id);
    gravar(CHAVE_VOLUNTARIOS, lista);
}

export function removerTodosVoluntarios() {
    apagar(CHAVE_VOLUNTARIOS);
}

// ---------- Rascunho do formulário ----------

export function lerRascunho() {
    return ler(CHAVE_RASCUNHO, {});
}

export function salvarRascunho(dados) {
    gravar(CHAVE_RASCUNHO, dados);
}

export function apagarRascunho() {
    apagar(CHAVE_RASCUNHO);
}
