# ADR-0005 - Modelagem do usuário e autenticação

## Contexto

Precisávamos definir como guardar os dados do usuário no banco e como manter a sessão após o login, já que o sistema precisa identificar quem está usando para liberar as funcionalidades corretas.

## Decisão

**JWT (JSON Web Token)** para autenticação stateless, com a senha armazenada usando **bcrypt**.

A tabela `users` fica assim:

| Campo | Tipo | Detalhe |
|-------|------|---------|
| id | UUID | gerado automaticamente |
| name | VARCHAR(100) | nome do usuário |
| email | VARCHAR(255) | único, usado no login |
| password | VARCHAR(255) | hash bcrypt, nunca a senha pura |
| xp | INTEGER | pontos de experiência, padrão 0 |
| level | INTEGER | nível do usuário, padrão 1 |
| created_at | TIMESTAMP | data de criação da conta |

## Alternativas consideradas

- Sessão no servidor (session + cookie): exigiria guardar estado no backend, mais complexo de escalar.
- OAuth (login com Google): mais fácil pro usuário, mas adiciona dependência externa e complexidade fora do escopo da sprint.

## O que isso implica

O frontend recebe um token JWT no login e no cadastro, guarda no `localStorage` e envia no header `Authorization: Bearer <token>` nas requisições seguintes. O token expira em 24 horas. O backend não precisa guardar sessão em nenhum lugar, o que simplifica a implementação.

O bcrypt garante que, mesmo que o banco vaze, as senhas não ficam expostas.
