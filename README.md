# ONG Solidariedade

Plataforma fictícia para a ONG Solidariedade, desenvolvida como projeto acadêmico da disciplina **Desenvolvimento Front-End para Web**. A aplicação é uma *Single Page Application* feita só com HTML, CSS e JavaScript puro (sem frameworks).

## Funcionalidades

- Navegação de página única (SPA) por hash (`#/projetos`), sem recarregar a página
- Templates JavaScript que geram os cards de projetos e a lista de voluntários
- Filtro de projetos por categoria
- Formulário de cadastro de voluntários com validação, máscaras e mensagens de erro por campo (inclui CPF com dígitos verificadores)
- Persistência no `localStorage`: cadastros e rascunho do formulário
- Menu responsivo para celular

## Pré-requisitos

- Navegador atualizado (Chrome, Edge, Firefox ou Safari)
- **Python 3** (só para o servidor local de desenvolvimento) ou a extensão *Live Server* do VS Code
- **Node.js 18 ou superior** (só para gerar a versão de produção com `npm run build`)

## Como executar

A SPA carrega as telas com `fetch()` e usa módulos ES6, por isso **não funciona abrindo o `index.html` com duplo clique**. Use um servidor local:

```bash
python -m http.server 8000
```

Depois acesse <http://localhost:8000>. No Windows, o arquivo `iniciar.bat` faz isso automaticamente. Outra opção é a extensão *Live Server* do VS Code.

## Build e publicação

O código-fonte fica nas pastas `html/`, `css/`, `js/` e `imagens/`. A versão de produção é gerada na pasta `docs/`, que é a publicada no GitHub Pages.

```bash
npm install
npm run build
```

O `build.mjs` usa o **esbuild** para juntar os módulos de `js/` em um único `app.js` minificado e para minificar o CSS, e o **html-minifier-terser** para minificar o HTML. Redução obtida nos arquivos de código: **cerca de 47%** (JS -54%, CSS -44%, HTML -35%). As imagens foram comprimidas separadamente (de 2039 KB para 180 KB).

Para testar a versão de produção localmente:

```bash
python -m http.server 8001 --directory docs
```

## Acessibilidade

O projeto segue as diretrizes WCAG 2.1 nível AA nos pontos verificados:

- Landmarks semânticos (`header`, `nav`, `main`, `footer`), link "Pular para o conteúdo" e foco movido para o conteúdo a cada troca de tela
- Formulário com `label`, `fieldset`/`legend`, `aria-required`, `aria-invalid` e `aria-describedby`
- Foco visível com contorno de 3px e navegação completa por teclado
- Contraste de cores medido pela fórmula do WCAG (texto 4,5:1 ou mais; bordas de campos 3:1 ou mais)
- Respeito a `prefers-reduced-motion`

## Estrutura do projeto

```
ONG-Solidariedade/
├── build.mjs             gera a versão de produção em docs/
├── package.json          scripts (build) e dependências de desenvolvimento
├── docs/                 versão minificada, publicada no GitHub Pages
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
