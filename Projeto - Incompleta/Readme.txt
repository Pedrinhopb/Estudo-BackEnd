🚀 Projeto Node.js + MongoDB + JWT

Este projeto é uma API REST desenvolvida com **Node.js**, **Express**, **MongoDB** e **JWT** para autenticação. Ele implementa um sistema completo de **usuários, posts, comentários, perfis e categorias**, com autenticação protegida.

---

📌 **Tecnologias Utilizadas**
- Node.js
- Express
- MongoDB + Mongoose
- JSON Web Token (JWT) para autenticação
- bcrypt para hash de senhas
- express-validator para validação de dados
- dotenv para configuração de variáveis de ambiente

---

📌 **Instalação e Configuração**

  1️⃣ Clonar o Repositório**

Para baixar o projeto, abra o terminal e execute o seguinte comando:
```sh
git clone https://github.com/seu-usuario/seu-repositorio.git
```
Em seguida, entre na pasta do projeto:
```sh
cd seu-repositorio
```

  2️⃣ Instalar as Dependências**

Dentro do diretório do projeto, instale as dependências necessárias executando:
```sh
npm install
```

Isso irá baixar todas as bibliotecas listadas no `package.json`.

  3️⃣ Configurar Variáveis de Ambiente**
Crie um arquivo **`.env`** na raiz do projeto e adicione:
```sh
PORT=3000
MONGO_URI=mongodb://localhost:27017/seu-banco
SECRET=seu-segredo-jwt
```

Certifique-se de que o MongoDB está rodando na sua máquina ou servidor.

  4️⃣ Iniciar o Servidor**

Para rodar a API, execute o seguinte comando:
```sh
npm start
```
Se estiver utilizando `nodemon` para desenvolvimento, execute:
```sh
npm run dev
```
O servidor rodará em `http://localhost:3000` 🚀

---

📌 **Documentação da API**

  1️⃣ Usuários** (`/users`)
- **Criar Usuário** → `POST /auth/register`
- **Login** → `POST /auth/login`
- **Buscar Todos** → `GET /users`
- **Buscar por ID** → `GET /users/:id`
- **Atualizar** → `PUT /users/:id`
- **Deletar** → `DELETE /users/:id`

  2️⃣ Posts** (`/posts`)
- **Criar Post** → `POST /posts`
- **Buscar Todos** → `GET /posts`
- **Buscar por ID** → `GET /posts/:id`
- **Atualizar** → `PUT /posts/:id`
- **Deletar** → `DELETE /posts/:id`

  3️⃣ Comentários** (`/comments`)
- **Criar Comentário** → `POST /comments`
- **Buscar Todos de um Post** → `GET /posts/:id/comments`
- **Deletar Comentário** → `DELETE /comments/:id`

  4️⃣ Perfis** (`/profiles`)
- **Criar Perfil** → `POST /profiles`
- **Buscar por Usuário** → `GET /profiles/:userId`
- **Atualizar Perfil** → `PUT /profiles/:userId`
- **Deletar Perfil** → `DELETE /profiles/:userId`

---

📌 **Autenticação (JWT)**
Algumas rotas exigem autenticação. Para acessá-las, envie o token JWT no **header** da requisição:
```json
{
  "Authorization": "Bearer SEU_TOKEN_JWT"
}
```

---

📌 **Testando a API no Insomnia**

  1️⃣ Criar Usuário** (`POST /auth/register`)
```json
{
  "name": "Pedro",
  "email": "pedro@email.com",
  "password": "123456",
  "confirmpassword": "123456"
}
```

  2️⃣ Login para Obter Token** (`POST /auth/login`)
```json
{
  "email": "pedro@email.com",
  "password": "123456"
}
```

  3️⃣ Criar um Post** (`POST /posts`)
```json
{
  "title": "Meu primeiro post",
  "content": "Testando autenticação com JWT!",
  "authorId": "ID_DO_USUARIO"
}
```

---

📌 **Prints da API em funcionamento** 📸

Adicione prints das requisições e respostas aqui!



---

📌 **Contribuição**
Sinta-se à vontade para contribuir! Fork o repositório, crie uma branch e faça um pull request. 💡

---

📌 **Licença**
Este projeto está sob a licença MIT. 📝

