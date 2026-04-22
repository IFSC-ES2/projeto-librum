# API de Autenticação

Endpoints usados no cadastro e login da US01.

URL base: `http://localhost:8080`

---

## POST /auth/register

Cria uma nova conta de usuário.

**Corpo da requisição:**

```json
{
  "name": "Maria Librum",
  "email": "maria@librum.com",
  "password": "senha1234"
}
```

- `name`: obrigatório
- `email`: obrigatório, formato válido
- `password`: obrigatório, mínimo 8 caracteres

**Respostas:**

- `201` - conta criada com sucesso

```json
{
  "userId": "a1b2c3d4-...",
  "token": "eyJhbGci..."
}
```

- `409` - e-mail já cadastrado

```json
{ "message": "Este e-mail já está em uso" }
```

- `400` - campos inválidos

```json
{ "message": "Campos obrigatórios inválidos" }
```

---

## POST /auth/login

Autentica um usuário existente e retorna um token JWT.

**Corpo da requisição:**

```json
{
  "email": "maria@librum.com",
  "password": "senha1234"
}
```

**Respostas:**

- `200` - login realizado com sucesso

```json
{
  "userId": "a1b2c3d4-...",
  "token": "eyJhbGci..."
}
```

- `401` - credenciais incorretas

```json
{ "message": "E-mail ou senha incorretos" }
```

> A mensagem não especifica qual dos dois está errado, por segurança.

- `400` - campos inválidos

```json
{ "message": "Campos obrigatórios inválidos" }
```

---

## Token JWT

- Algoritmo: HS256
- Validade: 24 horas
- O frontend armazena o token no `localStorage` e envia no header `Authorization: Bearer <token>` nas rotas protegidas.
