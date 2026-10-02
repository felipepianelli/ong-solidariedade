# ONG Solidariedade

Plataforma fictícia para a ONG Solidariedade, desenvolvida como projeto acadêmico da disciplina **Desenvolvimento Front-End para Web**. A aplicação é uma *Single Page Application* feita só com HTML, CSS e JavaScript puro (sem frameworks).

## Funcionalidades

- Navegação de página única (SPA) por hash (`#/projetos`), sem recarregar a página
- Templates JavaScript que geram os cards de projetos e a lista de voluntários
- Filtro de projetos por categoria
- Formulário de cadastro de voluntários com validação, máscaras e mensagens de erro por campo (inclui CPF com dígitos verificadores)
- Persistência no `localStorage`: cadastros e rascunho do formulário
- Menu responsivo para celular

## Como executar

A SPA carrega as telas com `fetch()` e usa módulos ES6, por isso **não funciona abrindo o `index.html` com duplo clique**. Use um servidor local:

```bash
python -m http.server 8000
```

Depois acesse <http://localhost:8000>. No Windows, o arquivo `iniciar.bat` faz isso automaticamente. Outra opção é a extensão *Live Server* do VS Code.

## Estrutura do projeto

```
ONG-Solidariedade/
├── index.html            casca da SPA (cabeçalho, <main id="app">, rodapé)
├── html/                 telas carregadas pelo roteador
├── css/style.css         Design System e componentes
├── imagens/              fotos usadas nas telas
└── js/
    ├── main.js           ponto de entrada
    ├── router.js         navegação SPA
    ├── templates.js      templates de HTML
    ├── validacao.js      regras e máscaras do formulário
    ├── armazenamento.js  acesso ao localStorage
    ├── menu.js           menu responsivo
    ├── toast.js          avisos temporários
    ├── dados.js          lista de projetos
    └── views/            um arquivo por tela
```

## Fluxo de trabalho (GitFlow)

| Branch | Uso |
|---|---|
| `main` | versões estáveis, marcadas com tags (ex.: `v1.0.0`) |
| `develop` | integração do desenvolvimento |
| `feature/*` | cada nova funcionalidade, mesclada em `develop` |
| `hotfix/*` | correções urgentes a partir de `main` |

Os commits seguem o padrão semântico: `feat`, `fix`, `refactor`, `docs`, `chore`.

## Autor

Felipe, aluno da disciplina Desenvolvimento Front-End para Web.
