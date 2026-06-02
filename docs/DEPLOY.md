# Deploy e Staging

Este documento descreve como publicar o Librum em um ambiente de staging acessível usando a infraestrutura do Render.

## Visão geral

- Backend Spring Boot e banco PostgreSQL: Render (Web Service e PostgreSQL).
- Frontend React (Vite): Render (Static Site).
- O frontend conversa com o backend pela variável VITE_API_URL.

## Variáveis de ambiente

Backend (Render):

- DATABASE_URL: a URL JDBC do Postgres do Render, no formato jdbc:postgresql://HOST:PORT/BANCO
- DB_USER: usuário do banco
- DB_PASSWORD: senha do banco
- JWT_SECRET: uma chave secreta forte para assinar os tokens

Frontend:

- VITE_API_URL: a URL pública do backend no Render, por exemplo https://projeto-librum.onrender.com

## Passo a passo no Render (backend e banco)

1. Criar um banco PostgreSQL no Render e anotar a URL de conexão interna.
2. Criar um Web Service apontando para a pasta backend do repositório.
3. Definir o comando de build com o Maven Wrapper e o comando de start do jar gerado.
4. Configurar as variáveis DATABASE_URL, DB_USER, DB_PASSWORD e JWT_SECRET.
5. Subir o serviço e conferir nos logs que o Flyway aplicou as migrations.

## Passo a passo no Render (Frontend - Static Site)

1. Criar um Static Site no painel do Render, apontando para o repositório.
2. Em "Root Directory", preencher a pasta `frontend`.
3. Em "Build Command", preencher `npm run build`.
4. Em "Publish Directory", preencher `dist`.
5. Definir a variável de ambiente VITE_API_URL com a URL do backend.
6. Clicar em "Create Static Site".

## Links de staging

- Backend: https://projeto-librum.onrender.com
- Frontend: https://librum-frontend.onrender.com

## Observações

- O plano gratuito do Render pode hibernar o serviço apos um tempo sem uso. A primeira requisicao depois disso demora mais, o que afeta a medicao de tempo de resposta.
