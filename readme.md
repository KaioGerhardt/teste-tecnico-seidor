# 🚗 Sistema de Controle de Utilização de Automóveis

Este projeto é uma API RESTful desenvolvida com **Node.js** e **Express**, cujo objetivo é controlar a utilização de automóveis por motoristas de uma empresa. O sistema permite o cadastro de automóveis e motoristas, o registro de utilizações e a aplicação de regras de uso exclusivo.

---

## 📚 Funcionalidades

### 📦 Automóveis
- Cadastrar um novo automóvel
- Atualizar, excluir e buscar automóvel por ID
- Listar automóveis com filtros por **cor** e **marca**

### 👤 Motoristas
- Cadastrar um novo motorista
- Atualizar, excluir e buscar motorista por ID
- Listar motoristas com filtro por **nome**

### 🚗 Utilização de Automóveis
- Registrar início de uma utilização (com data e motivo)
- Finalizar utilização (registrando a data de término)
- Listar todas as utilizações com **nome do motorista** e **detalhes do automóvel**

---

## 📌 Regras de Negócio

- Um **automóvel** só pode ser utilizado por um motorista por vez
- Um **motorista** não pode utilizar mais de um automóvel ao mesmo tempo

---

## ✅ Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Jest](https://jestjs.io/) – Testes unitários
- [Swagger (OpenAPI)](https://swagger.io/) – Documentação interativa dos endpoints

---

## ⚙️ Requisitos

- Node.js 18+
- npm (ou yarn)

---

## ▶️ Como Executar

1. Clone o repositório:
   ```bash
   git clone https://github.com/KaioGerhardt/teste-tecnico-seidor.git
   cd teste-tecnico-seidor
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie a aplicação:
    ```bash
   npm start
   ```

##  🧪 Executar Testes
   ```bash
   npm test
   ```

Todos os testes de unidade estão localizados em **tests/** e usam persistência em memória.

##  📘 Documentação da API (Swagger)
A documentação completa dos endpoints está disponível via Swagger em:

   ```bash
   http://localhost:3000/docs
   ```

Inclui detalhes de:

* Estrutura dos dados
* Exemplos de requisição/resposta
* Códigos de status

## 📁 Estrutura de Pastas

  ```bash
    src/
    ├── controllers/      # Camada de entrada (Express)
    ├── models/           # Definições das entidades
    ├── repositories/     # Persistência em memória
    ├── routes/           # Definições das rotas
    ├── services/         # Regras de negócio
    └── swagger/          # Arquivo OpenAPI (YAML)
    tests/                # Testes unitários com Jest
 ```
## 📝 Considerações Finais
> Optei por não aplicar uma arquitetura mais robusta como Clean Architecture, pois o escopo do desafio é direto e bem delimitado. Para manter o código simples, legível e funcional, segui uma estrutura mais próxima do padrão MVC, que atende bem a esse tipo de projeto sem adicionar complexidade desnecessária.

