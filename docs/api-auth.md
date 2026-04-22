# API de Autenticacao

Endpoints usados no cadastro e login da US01.

URL base: `http://localhost:8080`

---

## POST /auth/register

Cria uma nova conta de usuario.

**Corpo da requisicao:**

```json
{
  "name": "Maria Librum",
  "email": "maria@librum.com",
  "password": "senha1234"
}
```

- `name`: obrigatorio
- `email`: obrigatorio, formato valido
- `password`: obrigatorio, minimo 8 caracteres

**Respostas:**

- `201` - conta criada com sucesso

```json
{
  "userId": "a1b2c3d4-...",
  "token": "eyJhbGci..."
}
```

- `409` - e-mail ja cadastrado

```json
{ "message": "Este e-mail já está em uso" }
```

- `400` - campos invalidos

```json
{ "message": "Campos obrigatorios invalidos" }
```

---

## POST /auth/login

Autentica um usuario existente e retorna um token JWT.

**Corpo da requisicao:**

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

> A mensagem nao especifica qual dos dois esta errado, por seguranca.

- `400` - campos invalidos

```json
{ "message": "Campos obrigatorios invalidos" }
```

---

## Token JWT

- Algoritmo: HS256
- Validade: 24 horas
- O frontend armazena o token no `localStorage` e envia no header `Authorization: Bearer <token>` nas rotas protegidas.
