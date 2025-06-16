# TCC - Análise de Qualidade do E-commerce EBAC Shop

Este repositório contém o projeto de conclusão de curso para a formação de Engenheiro de Qualidade de Software da EBAC. O projeto consiste em uma estratégia de testes completa e automatizada para a plataforma de e-commerce "EBAC Shop".

## 🚀 Escopo do Projeto

A análise de qualidade abrange múltiplas camadas de teste para garantir a robustez e a performance das funcionalidades chave da aplicação:

*   **Funcionalidades Testadas:**
    *   `[US-0001]` - Adição e manipulação de itens no carrinho.
    *   `[US-0002]` - Autenticação de usuários (Login).
    *   `[US-0003]` - API de gerenciamento de cupons (GET e POST).
    *   `[US-0004]` - Catálogo de produtos (Busca e visualização).
    *   `[US-0005]` - Testes Mobile no Catálogo de Produtos.

## 🛠️ Tecnologias Utilizadas

| Ferramenta / Tecnologia | Finalidade |
| ----------------------- | ---------------------------------------------------- |
| **Cypress**             | Testes automatizados de Interface (UI) - End-to-End. |
| **Supertest**           | Testes automatizados de API.                         |
| **Chai**                | Biblioteca de asserções para os testes de API.       |
| **Mocha**               | Framework para execução dos testes de API.           |
| **WebdriverIO**         | Framework para automação de testes Mobile.           |
| **Appium**              | Servidor de automação para aplicativos móveis.      |
| **BrowserStack**        | Plataforma de nuvem para execução de testes Mobile.  |
| **K6**                  | Testes de Performance e Carga.                       |
| **GitHub Actions**      | Integração Contínua e execução automática dos testes.|
| **Faker.js**            | Geração de massa de dados dinâmica para os testes.   |
| **Mochawesome**         | Geração de relatórios HTML para os testes Cypress.   |
| **Allure Reporter**     | Geração de relatórios para os testes Mobile.         |

## 📂 Estrutura de Pastas

```
/
├── .github/workflows/   # Arquivos de Integração Contínua (CI)
├── API/                 # Testes de API (Supertest)
├── Mobile/              # Testes Mobile (WebdriverIO)
├── Performance/         # Testes de Performance (K6)
├── UI/                  # Testes de UI (Cypress)
└── ...
```

## ⚙️ Configuração e Execução

### Pré-requisitos

*   [Node.js](https://nodejs.org/) (versão 18.x ou superior)
*   [K6](https://k6.io/docs/getting-started/installation/) (para testes de performance locais)
*   Conta no [BrowserStack](https://www.browserstack.com/) (para testes mobile)

### Instalação

1.  Clone o repositório:
    ```bash
    git clone https://github.com/Ieozin/TCC-EBAC-QE.git
    ```
2.  Navegue até a pasta do projeto:
    ```bash
    cd TCC-EBAC-QE
    ```
3.  Instale todas as dependências:
    ```bash
    npm install
    ```

### Executando os Testes

Todos os testes podem ser executados através dos scripts NPM definidos no `package.json`.

#### Testes de UI (Cypress)

```bash
npm run test:ui
```
Os relatórios serão gerados em `UI/cypress/reports/`.

#### Testes de API (Supertest)

```bash
npm run test:api
```

#### Testes Mobile (WebdriverIO)

1.  Crie um arquivo `.env` dentro da pasta `Mobile/`.
2.  Adicione suas credenciais e App ID do BrowserStack:
    ```env
    BROWSERSTACK_USERNAME=SEU_USUARIO_BROWSERSTACK
    BROWSERSTACK_ACCESS_KEY=SUA_CHAVE_DE_ACESSO
    BROWSERSTACK_APP_ID=SEU_APP_ID_BS
    ```
3.  Execute o teste:
    ```bash
    npm run test:mobile
    ```

#### Testes de Performance (K6)

```bash
npm run test:performance
```

## 🔄 Integração Contínua (CI)

O pipeline de CI está configurado em `.github/workflows/main.yml` e é acionado a cada `push` ou `pull request` para a branch `main`. Ele executa os testes de UI, API e Performance em paralelo para fornecer um feedback rápido sobre a qualidade do código.