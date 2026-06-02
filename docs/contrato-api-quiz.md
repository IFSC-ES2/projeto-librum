# Contrato de API - Quiz e Perfil do Usuário

Endpoints implementados na Sprint 3 (US06 e US07) e estendidos na Sprint 3-2 (US08 e US09).

URL base: `http://localhost:8080`

---

## GET /quiz/{phaseId}

Retorna as questões do quiz para uma fase, incluindo a letra da opção correta e o texto de explicação. A validação da submissão continua sendo feita no backend em `POST /quiz/{phaseId}/submit`; expor a letra aqui serve apenas para o frontend destacar a opção certa quando o usuário erra.

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
    "optionD": "O dono da Estalagem do Almirante Benbow",
    "correctOption": "A",
    "explanation": "Capitão Flint era o pirata lendário que enterrou o tesouro procurado na história."
  },
  {
    "id": 2,
    "phaseId": 1,
    "questionText": "Qual era o nome do tesouro procurado por Jim Hawkins?",
    "optionA": "O Tesouro Perdido",
    "optionB": "O Tesouro do Flint",
    "optionC": "O Tesouro Enterrado",
    "optionD": "O Tesouro de Silver",
    "correctOption": "B",
    "explanation": "O tesouro procurado pertencia ao Capitão Flint, daí o nome usado pelos personagens."
  }
]
```

- `correctOption`: letra da opção correta (`"A"`, `"B"`, `"C"` ou `"D"`).
- `explanation`: texto curto exibido após o usuário confirmar a resposta de cada questão.

**Resposta 401:** token ausente ou inválido.

**Resposta 404:** fase não encontrada.

---

## POST /quiz/{phaseId}/submit

Valida as respostas do usuário, calcula o XP ganho e marca a fase como concluída quando o usuário acerta o suficiente. A conclusão do quiz é o que desbloqueia a próxima fase na trilha.

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

**Resposta 200 quando aprovado:**

```json
{
  "totalQuestions": 4,
  "correctAnswers": 3,
  "xpEarned": 15,
  "newTotalXp": 60,
  "newLevel": 2,
  "leveledUp": true,
  "nextPhaseId": 2,
  "passed": true
}
```

**Resposta 200 quando reprovado (mais de 2 erros):**

```json
{
  "totalQuestions": 4,
  "correctAnswers": 1,
  "xpEarned": 5,
  "newTotalXp": 45,
  "newLevel": 1,
  "leveledUp": false,
  "nextPhaseId": null,
  "passed": false
}
```

- `xpEarned`: +5 XP por resposta correta, independente de aprovado ou reprovado.
- `newTotalXp`: XP acumulado do usuário após esta submissão.
- `leveledUp`: `true` se o usuário atingiu um novo nível (a cada 50 XP).
- `passed`: `true` quando `totalQuestions - correctAnswers <= 2`.
- `nextPhaseId`: ID da próxima fase quando `passed = true` e existe próxima fase no livro. `null` se reprovado ou se for a última fase.

**Efeito colateral:** quando `passed = true`, o registro em `user_progress` recebe `quiz_completed = true` e `is_completed = true` para o par (usuário, fase). Quando `passed = false`, nada é alterado em `user_progress` e a próxima fase permanece bloqueada.

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

---

## GET /users/me/progress

Retorna o resumo de progresso do usuário autenticado, agregado por gênero. Usado pela página de Perfil e pela Home para exibir XP, nível e fases concluídas.

**Autenticação:** `Authorization: Bearer <token>` (obrigatório).

**Resposta 200:**

```json
{
  "xp": 60,
  "level": 2,
  "totalCompletedPhases": 3,
  "byGenre": [
    {
      "genreId": 1,
      "genreName": "Aventura",
      "slug": "aventura",
      "completedPhases": 3,
      "totalPhases": 7
    }
  ]
}
```

- `xp` (int): XP acumulado total do usuário.
- `level` (int): nível atual entre 1 e 10.
- `totalCompletedPhases` (int): total de fases concluídas em todos os gêneros.
- `byGenre` (lista): progresso por gênero. Inclui todos os gêneros cadastrados, mesmo os sem livro (nesses casos `completedPhases` e `totalPhases` são 0).
- `completedPhases` (int): fases cujo quiz foi concluído naquele gênero.
- `totalPhases` (int): total de fases do livro do gênero.

**Resposta 401:** token ausente ou inválido.
