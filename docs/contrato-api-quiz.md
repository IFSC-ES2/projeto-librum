# Contrato de API - Quiz e Perfil do Usuário

Endpoints implementados na Sprint 3 para as US06 e US07.

URL base: `http://localhost:8080`

---

## GET /quiz/{phaseId}

Retorna as questões do quiz para uma fase, sem expor a resposta correta.

**Autenticação:** `Authorization: Bearer <token>` (obrigatório).

**Parâmetros de rota:**

- `phaseId` (Long): identificador da fase.

**Resposta 200:**

```json
[
  {
    "id": 1,
    "phaseId": 1,
    "questionText": "Quem era o capitão Flint?",
    "optionA": "Um pirata lendário",
    "optionB": "O pai de Jim",
    "optionC": "Um marinheiro aposentado",
    "optionD": "O dono da Estalagem do Almirante Benbow"
  },
  {
    "id": 2,
    "phaseId": 1,
    "questionText": "Qual era o nome do tesouro procurado por Jim Hawkins?",
    "optionA": "O Tesouro Perdido",
    "optionB": "O Tesouro do Flint",
    "optionC": "O Tesouro Enterrado",
    "optionD": "O Tesouro de Silver"
  }
]
```

**Resposta 401:** token ausente ou inválido.

**Resposta 404:** fase não encontrada.

---

## POST /quiz/{phaseId}/submit

Valida as respostas do usuário, calcula o XP ganho e retorna o resultado.

**Autenticação:** `Authorization: Bearer <token>` (obrigatório).

**Parâmetros de rota:**

- `phaseId` (Long): identificador da fase.

**Corpo da requisição:**

```json
{
  "answers": [
    { "questionId": 1, "selectedOption": "A" },
    { "questionId": 2, "selectedOption": "B" }
  ]
}
```

- `answers` (obrigatório): lista com pelo menos 1 resposta.
- `questionId`: ID da questão.
- `selectedOption`: aceita somente `"A"`, `"B"`, `"C"` ou `"D"` (maiúsculo).

**Resposta 200:**

```json
{
  "totalQuestions": 2,
  "correctAnswers": 1,
  "xpEarned": 5,
  "newTotalXp": 45,
  "newLevel": 1,
  "leveledUp": false
}
```

- `xpEarned`: +5 XP por resposta correta.
- `newTotalXp`: XP acumulado do usuário após esta submissão.
- `leveledUp`: `true` se o usuário atingiu um novo nível (a cada 50 XP).

**Resposta 400:** payload inválido ou questões/respostas inconsistentes.

**Resposta 401:** token ausente ou inválido.

**Resposta 404:** fase ou questões não encontradas.

---

## GET /users/me

Retorna o perfil do usuário autenticado com XP e nível atual.

**Autenticação:** `Authorization: Bearer <token>` (obrigatório).

**Resposta 200:**

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "João Silva",
  "email": "joao@email.com",
  "xp": 45,
  "level": 1
}
```

- `id` (UUID): identificador único do usuário.
- `xp` (int): XP acumulado total.
- `level` (int): nível atual entre 1 e 10.

**Resposta 401:** token ausente ou inválido.
