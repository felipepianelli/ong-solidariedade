// ==========================================================
// VALIDAÇÃO - regras de cada campo e máscaras de digitação.
// Cada regra recebe o valor e devolve "" (ok) ou a mensagem de erro.
// ==========================================================

const apenasDigitos = texto => texto.replace(/\D/g, "");

// ---------- Máscaras (formatam enquanto o usuário digita) ----------

export const mascaras = {
    cpf(valor) {
        const d = apenasDigitos(valor).slice(0, 11);
        return d
            .replace(/^(\d{3})(\d)/, "$1.$2")
            .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
            .replace(/\.(\d{3})(\d)/, ".$1-$2");
    },
    telefone(valor) {
        const d = apenasDigitos(valor).slice(0, 11);
        if (d.length === 0) return "";
        if (d.length <= 2) return `(${d}`;
        if (d.length <= 6) return d.replace(/^(\d{2})(\d*)/, "($1) $2");
        if (d.length <= 10) return d.replace(/^(\d{2})(\d{4})(\d*)/, "($1) $2-$3");
        return d.replace(/^(\d{2})(\d{5})(\d*)/, "($1) $2-$3");
    },
    cep(valor) {
        const d = apenasDigitos(valor).slice(0, 8);
        return d.replace(/^(\d{5})(\d)/, "$1-$2");
    },
    estado(valor) {
        return valor.replace(/[^a-zA-Z]/g, "").toUpperCase().slice(0, 2);
    }
};

// ---------- CPF: confere os 2 dígitos verificadores ----------

export function cpfValido(cpf) {
    const d = apenasDigitos(cpf);
    if (d.length !== 11 || /^(\d)\1{10}$/.test(d)) return false; // 111.111.111-11 etc.

    for (let tamanho = 9; tamanho <= 10; tamanho++) {
        let soma = 0;
        for (let i = 0; i < tamanho; i++) {
            soma += Number(d[i]) * (tamanho + 1 - i);
        }
        const digito = ((soma * 10) % 11) % 10;
        if (digito !== Number(d[tamanho])) return false;
    }
    return true;
}

const ESTADOS = [
    "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA",
    "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"
];

// ---------- Regras por campo ----------

export const regras = {
    nome(valor) {
        const v = valor.trim();
        if (!v) return "Informe seu nome completo.";
        if (v.split(/\s+/).length < 2) return "Digite nome e sobrenome.";
        if (v.length < 5) return "O nome está muito curto.";
        return "";
    },
    email(valor) {
        const v = valor.trim();
        if (!v) return "Informe seu e-mail.";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return "Digite um e-mail válido, como nome@dominio.com.";
        return "";
    },
    nascimento(valor) {
        if (!valor) return "Informe sua data de nascimento.";
        const nasc = new Date(valor + "T00:00:00");
        const hoje = new Date();
        if (nasc > hoje) return "A data não pode estar no futuro.";
        let idade = hoje.getFullYear() - nasc.getFullYear();
        const fezAniversario =
            hoje.getMonth() > nasc.getMonth() ||
            (hoje.getMonth() === nasc.getMonth() && hoje.getDate() >= nasc.getDate());
        if (!fezAniversario) idade--;
        if (idade < 16) return "É preciso ter 16 anos ou mais para ser voluntário.";
        if (idade > 120) return "Confira a data informada.";
        return "";
    },
    cpf(valor) {
        if (!valor.trim()) return "Informe seu CPF.";
        if (!cpfValido(valor)) return "CPF inválido. Confira os números.";
        return "";
    },
    telefone(valor) {
        if (!valor.trim()) return "Informe seu telefone.";
        const d = apenasDigitos(valor);
        if (d.length < 10 || d.length > 11) return "Digite DDD + número, como (11) 99999-9999.";
        return "";
    },
    cep(valor) {
        if (!valor.trim()) return "Informe seu CEP.";
        if (apenasDigitos(valor).length !== 8) return "O CEP precisa ter 8 números.";
        return "";
    },
    cidade(valor) {
        if (!valor.trim()) return "Informe sua cidade.";
        if (valor.trim().length < 2) return "Nome de cidade muito curto.";
        return "";
    },
    estado(valor) {
        if (!valor.trim()) return "Informe o estado (UF).";
        if (!ESTADOS.includes(valor.trim().toUpperCase())) return "UF inválida. Exemplo: SP.";
        return "";
    },
    interesse(valor) {
        if (!valor) return "Escolha uma forma de participação.";
        return "";
    }
};
