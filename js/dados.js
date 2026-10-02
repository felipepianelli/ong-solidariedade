// ==========================================================
// DADOS - lista de projetos da ONG
// Para criar um projeto novo, basta adicionar um item aqui:
// o card aparece sozinho na tela (template cardProjeto).
// ==========================================================

export const projetos = [
    {
        id: 1,
        titulo: "Cestas de Alimentos",
        categoria: "doacao",
        descricao: "Arrecadação e distribuição de alimentos não perecíveis para famílias atendidas pela ONG.",
        imagem: "imagens/doacoes.jpg",
        alt: "Caixa contendo alimentos e outros itens destinados a doações"
    },
    {
        id: 2,
        titulo: "Ação Voluntária nos Bairros",
        categoria: "voluntariado",
        descricao: "Grupos de voluntários se reúnem aos finais de semana para apoiar as comunidades locais.",
        imagem: "imagens/voluntariado.jpg",
        alt: "Grupo de voluntários reunidos em uma ação social"
    },
    {
        id: 3,
        titulo: "Campanha do Agasalho",
        categoria: "campanha",
        descricao: "Campanha de arrecadação de roupas e cobertores para o período de frio.",
        imagem: "imagens/doacoes.jpg",
        alt: "Caixa contendo roupas e itens destinados a doações"
    },
    {
        id: 4,
        titulo: "Horta Comunitária",
        categoria: "voluntariado",
        descricao: "Projeto social de cultivo de alimentos com a participação dos moradores da região.",
        imagem: "imagens/projeto-social.jpg",
        alt: "Mãos cuidando de uma muda de planta"
    }
];

export const nomesCategorias = {
    doacao: "Doação",
    voluntariado: "Voluntariado",
    campanha: "Campanha"
};
