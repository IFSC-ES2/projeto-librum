# Contrato de API - Leitura e Progresso

Endpoints implementados na Sprint 2 (US04 e US05) e ajustados na Sprint 3-2 (US08 e US09).

URL base: `http://localhost:8080`

---

## GET /genres

Lista todos os gêneros literários disponíveis.

**Autenticação:** não exigida (endpoint público).

**Resposta 200:**

```json
[
  {
    "id": 1,
    "name": "Aventura",
    "slug": "aventura",
    "iconEmoji": "⚔️",
    "description": "Histórias de exploração e descoberta."
  }
]
```

---

## GET /genres/{genreId}/phases

Lista as fases do livro disponível para um gênero, com o status de desbloqueio do usuário autenticado.

**Autenticação:** `Authorization: Bearer <token>` (obrigatório).

**Parâmetros de rota:**

- `genreId` (Long): identificador do gênero.

**Resposta 200:**

```json
[
  {
    "id": 1,
    "phaseNumber": 1,
    "title": "Fase 1: O Início da Aventura",
    "bookTitle": "A Ilha do Tesouro",
    "bookAuthor": "Robert Louis Stevenson",
    "totalSegments": 4,
    "isUnlocked": true,
    "isCompleted": false
  },
  {
    "id": 2,
    "phaseNumber": 2,
    "title": "Fase 2: O Mapa Secreto",
    "bookTitle": "A Ilha do Tesouro",
    "bookAuthor": "Robert Louis Stevenson",
    "totalSegments": 3,
    "isUnlocked": false,
    "isCompleted": false
  }
]
```

- `isUnlocked`: `true` para a Fase 1 sempre; `true` para a Fase N quando o quiz da Fase N-1 foi concluído (`quiz_completed = true` em `user_progress`).
- `isCompleted`: `true` se o usuário leu todos os segmentos da fase. Por si só não desbloqueia a próxima fase: o desbloqueio depende da conclusão do quiz.

**Resposta 401:** token ausente ou inválido.

---

## GET /reading/{phaseId}/{segmentNumber}

Retorna o conteúdo de um segmento de texto de uma fase.

**Autenticação:** `Authorization: Bearer <token>` (obrigatório).

**Parâmetros de rota:**

- `phaseId` (Long): identificador da fase.
- `segmentNumber` (int): número do trecho, começando em 1.

**Resposta 200:**

```json
{
  "segmentNumber": 1,
  "totalSegments": 4,
  "content": "Era uma noite de outubro, fria e com vento...",
  "estimatedMinutes": 3,
  "phaseTitle": "Fase 1: O Início da Aventura",
  "phaseNumber": 1,
  "bookTitle": "A Ilha do Tesouro",
  "bookAuthor": "Robert Louis Stevenson",
  "genreName": "Aventura",
  "genreSlug": "aventura"
}
```

- `genreSlug`: slug do gênero da fase. O frontend usa esse valor para construir links de navegação (breadcrumb e botão de voltar) sem fixar a string `"aventura"` no código.

**Resposta 401:** token ausente ou inválido.

**Resposta 403:** fase bloqueada para o usuário (quiz da fase anterior não concluído).

**Resposta 404:** segmento não existe na fase.

---

## POST /progress/mark-read

Registra que o usuário leu um segmento. Se for o último segmento da fase, marca a fase como concluída e desbloqueia a fase seguinte.

**Autenticação:** `Authorization: Bearer <token>` (obrigatório).

**Corpo da requisição:**

```json
{
  "phaseId": 1,
  "segmentNumber": 2
}
```

- `phaseId`: obrigatório.
- `segmentNumber`: obrigatório.

**Resposta 200:**

```json
{
  "lastSegmentRead": 2,
  "phaseCompleted": false,
  "nextPhaseUnlocked": false
}
```

- `phaseCompleted`: `true` quando `segmentNumber` é o último da fase.
- `nextPhaseUnlocked`: `true` quando a fase foi concluída agora (ou seja, a próxima acabou de ser desbloqueada).

**Resposta 400:** campos ausentes ou inválidos.

**Resposta 401:** token ausente ou inválido.
