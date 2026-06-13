# Deploy e Staging

Este documento descreve como publicar o Librum em um ambiente de staging acessível usando a infraestrutura do Render, e como executar o projeto localmente para desenvolvimento e testes.

## Visão geral

- Backend Spring Boot e banco PostgreSQL: Render (Web Service e PostgreSQL).
- Frontend React (Vite): Render (Static Site).
- O frontend conversa com o backend pela variável VITE_API_URL.

## Ambiente de staging

- **Backend:** https://projeto-librum.onrender.com
- **Frontend:** https://librum-frontend.onrender.com

> **Atencao:** o plano gratuito do Render hiberna o servico apos inatividade. Veja a secao [Comportamento de hibernacao](#comportamento-de-hibernacao) antes de testar.

---

## Rodar localmente

### Requisitos

- Java 17
- Docker e Docker Compose
- Node.js 20 e npm

### Banco de dados

```bash
docker compose up -d
```

Isso sobe o PostgreSQL na porta 5432. O Flyway aplica as migrations automaticamente ao iniciar o backend.

### Backend

```bash
cd backend
./mvnw spring-boot:run
```

Para gerar o jar e rodar de forma empacotada:

```bash
./mvnw clean package -DskipTests
java -jar target/*.jar
```

O backend fica disponivel em `http://localhost:8080`.

### Frontend

```bash
cd frontend
cp .env.example .env
```

Edite o `.env` e configure `VITE_API_URL=http://localhost:8080`. Em seguida:

```bash
npm install
npm run dev
```

O frontend fica disponivel em `http://localhost:5173`.

Para gerar o build de producao e visualizar:

```bash
npm run build
npm run preview
```

### Testes

```bash
cd backend && ./mvnw test
cd frontend && npm test -- --run
```

---

## Variáveis de ambiente

| Variavel | Onde usar | O que faz | Exemplo |
|----------|-----------|-----------|---------|
| `DATABASE_URL` | Backend | URL JDBC do PostgreSQL | `jdbc:postgresql://HOST:5432/BANCO` |
| `DB_USER` | Backend | Usuario do banco | `librum` |
| `DB_PASSWORD` | Backend | Senha do banco | `senha_forte` |
| `JWT_SECRET` | Backend | Chave para assinar tokens JWT (minimo 32 caracteres) | `chave-secreta-muito-longa-aqui` |
| `VITE_API_URL` | Frontend | URL base do backend | `https://projeto-librum.onrender.com` |

Para execucao local, o `.env.example` na raiz do repositorio contem um modelo preenchido para Docker Compose.

---

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

---

## Validação por curl

Substitua `$API` pela URL do backend (local ou staging).

```bash
export API=https://projeto-librum.onrender.com
```

Cadastrar um usuario:

```bash
curl -s -X POST "$API/auth/register" \
  -H "Content-Type: application/json" \
  -d '{"name":"Teste","email":"teste@librum.dev","password":"senha1234"}'
```

Fazer login e obter o token:

```bash
curl -s -X POST "$API/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"teste@librum.dev","password":"senha1234"}'
```

Listar generos (rota publica):

```bash
curl -s "$API/genres"
```

---

## Credenciais de teste e dados de demonstracao

Nao ha uma conta pre-criada fixa no staging, pois o banco pode ser recriado a qualquer momento. Para testar, crie uma conta pela propria tela de cadastro do frontend:

- **Email:** `teste@librum.dev`
- **Senha:** `senha1234`

O cadastro ja faz login automaticamente, sem etapa extra.

**Dados disponiveis no staging (semeados pelas migrations):**

- Genero: **Aventura** — com o livro **A Ilha do Tesouro**
- O livro possui **7 fases** com segmentos de texto e quizzes
- Os demais generos aparecem como "em breve" na interface

---

## Comportamento de hibernacao

**Contexto:** o plano gratuito do Render hiberna o servico de backend apos um periodo de inatividade (aproximadamente 15 minutos sem requisicoes).

**Sintomas observados na avaliacao da Entrega 8:** requisicoes `GET /` e `GET /genres` retornaram 503. O `POST /auth/register` respondeu normalmente, o que confirma que o servico estava acordando durante o teste.

**Investigacao do SecurityConfig:** a analise do [`SecurityConfig.java`](../backend/src/main/java/com/librum/security/SecurityConfig.java) confirma que:
- `GET /genres` esta configurado como `permitAll()` — e publica e deve responder 200 quando o servico esta ativo.
- `POST /auth/register` e `POST /auth/login` tambem sao `permitAll()`.
- `GET /auth/login` nao existe como endpoint (so existe `POST`) — retorna 405, o que e comportamento esperado.
- `GET /` nao tem mapeamento explicito e cai em `anyRequest().authenticated()`, retornando 401 sem token — nao e um bug.

**Conclusao:** os 503 sao exclusivamente causados pela hibernacao do plano gratuito do Render. Nao ha misconfiguracao de seguranca. Apos a primeira requisicao acordar o servico (pode levar de 30 a 60 segundos), todas as rotas respondem normalmente.

**Como proceder antes de avaliar ou demonstrar:**
1. Acesse o link do frontend e tente fazer login (isso acorda o backend).
2. Aguarde de 30 a 60 segundos caso a primeira tentativa falhe.
3. A mensagem exibida sera "A biblioteca estava cochilando. O Tinta esta acordando ela, tente de novo em instantes." — comportamento intencional.
4. Repita a acao; a partir dai o servico responde normalmente.

---

## Vulnerabilidades de dependencia (npm audit)

Auditoria executada em 2026-06-13 com `npm audit` e `npm audit fix` no diretorio `frontend`.

**Vulnerabilidades encontradas (antes do fix):**

| Pacote | Severidade | Problema |
|--------|-----------|---------|
| `axios` 1.0.0 - 1.15.2 | high | Multiplas CVEs: ReDoS via cookie name injection, proxy-authorization credential leak, prototype pollution, alocacao ilimitada de recursos, bypass de NO_PROXY |
| `react-router` 7.0.0 - 7.14.2 | high | DoS via expansao ilimitada de path no endpoint `__manifest` |
| `react-router-dom` 7.0.0 - 7.14.2 | high | Depende da versao vulneravel de `react-router` |

**Resultado apos `npm audit fix`:**

- 0 vulnerabilidades restantes — todas foram corrigidas pela atualizacao de versao minor.
- `npm run build` passou sem erros.
- `npm test -- --run` passou: 11 testes em 3 arquivos.
- `package.json` e `package-lock.json` foram atualizados.

Nao foi necessario `npm audit fix --force` (nenhuma correcao exigiu major version bump).

