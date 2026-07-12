# BookStore Manager CLI

Aplicação de terminal (CLI) para gerenciamento de uma pequena livraria, desenvolvida como projeto avaliativo do Módulo 01. Permite administrar **autores**, **livros**, **clientes** e **empréstimos**, com persistência dos dados em **PostgreSQL** e geração de **relatórios gerenciais**.

## Objetivo

Substituir o controle manual de uma livraria por uma aplicação CLI capaz de:

- gerenciar autores, livros, clientes e empréstimos;
- persistir informações em um banco de dados PostgreSQL;
- aplicar regras de negócio durante as operações do sistema;
- realizar consultas relacionais utilizando SQL;
- gerar relatórios gerenciais a partir dos dados armazenados;
- organizar o código em camadas, promovendo modularização e reutilização.

## Tecnologias utilizadas

- [Node.js](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [node-postgres (pg)](https://node-postgres.com/)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [ts-node-dev](https://www.npmjs.com/package/ts-node-dev)

## Requisitos para execução

- Node.js 18 ou superior
- PostgreSQL 13 ou superior
- npm

## Configuração do banco de dados

1. Crie um banco de dados no PostgreSQL (via pgAdmin ou terminal):

   ```sql
   CREATE DATABASE bookstore_manager;
   ```

2. Execute o script disponível em `src/database/schema.sql` para criar as tabelas e relacionamentos. Pode ser feito pela Query Tool do pgAdmin (copiando e colando o conteúdo do arquivo) ou via terminal:

   ```bash
   psql -U postgres -d bookstore_manager -f src/database/schema.sql
   ```

## Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/Brrn91/bookstore-manager-cli.git
   cd bookstore-manager-cli
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Copie o arquivo de variáveis de ambiente e preencha com suas credenciais:

   ```bash
   cp .env.example .env
   ```

   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=postgres
   DB_PASSWORD=sua_senha_aqui
   DB_NAME=bookstore_manager
   ```

## Execução

Ambiente de desenvolvimento (com recarregamento automático):

```bash
npm run dev
```

Build de produção e execução:

```bash
npm run build
npm start
```

## Arquitetura do projeto

A aplicação segue uma arquitetura em camadas, separando responsabilidades entre interface (CLI), regras de negócio e acesso a dados:

```
Usuário (terminal)
      │
      ▼
    Menu            → navegação e captura de opções
      │
      ▼
  Controller        → recebe entradas, validações básicas, aciona o Service
      │
      ▼
   Service          → regras de negócio e validações
      │
      ▼
  Repository        → executa comandos SQL (INSERT, UPDATE, DELETE, SELECT)
      │
      ▼
  PostgreSQL        → armazenamento persistente dos dados
```

**Responsabilidade das camadas:**

| Camada       | Responsabilidade                                                                                         |
| ------------ | -------------------------------------------------------------------------------------------------------- |
| Main         | Inicia a aplicação, estabelece a conexão com o banco e inicia o menu principal                           |
| Menus        | Organiza a navegação da aplicação, exibindo opções e delegando para os Controllers                       |
| Controllers  | Interagem com o usuário via terminal: exibem prompts, capturam entradas e tratam erros com `try/catch`   |
| Services     | Implementam as regras de negócio: validações de existência, unicidade, disponibilidade e formato         |
| Repositories | Executam os comandos SQL (INSERT, UPDATE, DELETE, SELECT) via biblioteca `pg`                            |
| Models       | Representam as entidades do sistema (Author, Book, Client, Loan) como classes tipadas                    |
| Database     | Centraliza a configuração de conexão (`connection.ts`) e o script de criação do banco (`schema.sql`)     |
| Utils        | Funções auxiliares reutilizáveis: leitura de input, validações e classe de erro customizada (`AppError`) |

## Estrutura de pastas

```
bookstore-manager-cli/
├── 📁 src
│   ├── 📁 controllers # Interação com o usuário via terminal
│   │   ├── 📄 AuthorController.ts
│   │   ├── 📄 BookController.ts
│   │   ├── 📄 ClientController.ts
│   │   ├── 📄 LoanController.ts
│   │   └── 📄 ReportController.ts
│   ├── 📁 database # Conexão com o PostgreSQL e schema.sql
│   │   ├── 📄 connection.ts
│   │   └── 📄 schema.sql
│   ├── 📁 menus # Menus e navegação da aplicação
│   │   ├── 📄 authorMenu.ts
│   │   ├── 📄 bookMenu.ts
│   │   ├── 📄 clientMenu.ts
│   │   ├── 📄 loanMenu.ts
│   │   ├── 📄 mainMenu.ts
│   │   └── 📄 reportMenu.ts
│   ├── 📁 models # Classes e interfaces das entidades
│   │   ├── 📄 Author.ts
│   │   ├── 📄 Book.ts
│   │   ├── 📄 Client.ts
│   │   └── 📄 Loan.ts
│   ├── 📁 repositories # Acesso ao banco de dados (SQL)
│   │   ├── 📄 AuthorRepository.ts
│   │   ├── 📄 BookRepository.ts
│   │   ├── 📄 ClientRepository.ts
│   │   ├── 📄 LoanRepository.ts
│   │   └── 📄 ReportRepository.ts
│   ├── 📁 services # Regras de negócio e validações
│   │   ├── 📄 AuthorService.ts
│   │   ├── 📄 BookService.ts
│   │   ├── 📄 ClientService.ts
│   │   ├── 📄 LoanService.ts
│   │   └── 📄 ReportService.ts
│   ├── 📁 utils # Funções auxiliares
│   │   ├── 📄 errors.ts
│   │   ├── 📄 inputHelper.ts
│   │   └── 📄 validators.ts
│   └── 📄 main.ts # Ponto de entrada da aplicação
├── ⚙️ .env.example
├── ⚙️ .gitignore
├── ⚙️ package.json
├── 📝 readme.md
└── ⚙️ tsconfig.json
```

## Funcionalidades implementadas

- **Autores**: cadastrar, listar, consultar por ID, atualizar e remover (bloqueando a remoção caso existam livros vinculados a esse autor).
- **Livros**: cadastrar (vinculado obrigatoriamente a um autor já existente), listar (com nome do autor via `JOIN`), consultar, atualizar e remover.
- **Clientes**: cadastrar (com validação de e-mail único), listar, consultar, atualizar e remover (bloqueando a remoção caso existam empréstimos vinculados a esse cliente).
- **Empréstimos**: registrar empréstimo (validando existência de livro e cliente, disponibilidade de exemplares e formato de data), registrar devolução (com controle de status `ATIVO`/`DEVOLVIDO`, impedindo devolução duplicada) e listar empréstimos.
- **Relatórios**:
  - Livros disponíveis para empréstimo;
  - Livros atualmente emprestados;
  - Quantidade de livros cadastrados por autor;
  - Quantidade de empréstimos por livro (top 10);
  - Clientes com empréstimos ativos no momento.
- **Tratamento de erros**: validações de negócio centralizadas em uma classe `AppError`, e blocos `try/catch` em todos os métodos dos Controllers, exibindo mensagens claras sem interromper a execução da aplicação.
- **Programação assíncrona**: todas as operações de banco de dados utilizam `Promises` e `async/await`.
- **Consultas relacionais**: uso de `INNER JOIN`, `LEFT JOIN`, `GROUP BY`, `ORDER BY`, `LIMIT` e funções de agregação (`COUNT`) nos relatórios e listagens.

## Exemplos de utilização

Ao iniciar a aplicação, o menu principal é exibido:

```

=============================================
   BOOKSTORE MANAGER CLI - Menu Principal
=============================================
1. Autores
2. Livros
3. Clientes
4. Empréstimos
5. Relatórios
0. Encerrar aplicação
=============================================
```

**Fluxo típico de uso:**

1. Cadastre um autor pelo menu "Autores" (opção 1).
2. Liste os autores (opção 2) para anotar o `id` gerado.
3. Cadastre um livro pelo menu "Livros", informando o `id` do autor anotado.
4. Cadastre um cliente pelo menu "Clientes".
5. Registre um empréstimo pelo menu "Empréstimos", informando os `id`s do livro e do cliente.
6. Consulte os relatórios gerenciais pelo menu "Relatórios" para visualizar o estado atual do sistema.

## Integrante

- Lucas Bruno da Costa Mafra

## Link do Kanban

- [Kanban](https://github.com/users/Brrn91/projects/3/views/1)
