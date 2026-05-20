# Checklist de Teste Ponta a Ponta — Sprint 3

**Data de execução:** 27/05/2026
**Executor:** Giuliano Marcus Bianco
**Pré-requisitos:**
- CI verde em `main`
- `docker-compose up -d` rodando (PostgreSQL na porta 5432)
- `./mvnw spring-boot:run` rodando no backend (porta 8080)
- `npm run dev` rodando no frontend (porta 5173)

---

## Fluxo completo: Login → Leitura → Quiz → Resultado

| # | Passo | Resultado esperado | OK? |
|---|-------|--------------------|-----|
| 1 | Fazer login com usuário válido | Redirecionado para `/genres` | [ ] |
| 2 | Clicar em "Aventura" | Navega para a lista de fases do gênero | [ ] |
| 3 | Clicar na Fase 1 | Abre o trecho 1 de 4 na `ReadingPage` | [ ] |
| 4 | Ler todos os 4 trechos clicando em "Ir ao quiz →" em cada um | Navega corretamente entre os trechos 1 → 2 → 3 → 4 | [ ] |
| 5 | No trecho 4 (último), clicar em "Ir ao quiz →" | Navega para `/quiz/1` — **não mais para `/quiz-placeholder`** | [ ] |
| 6 | Confirmar que a tela do quiz exibe as questões | Lista de 3–5 questões, cada uma com 4 opções de múltipla escolha | [ ] |
| 7 | Confirmar que o campo `correctOption` **não** aparece na resposta da API | Inspecionar a aba Network do DevTools: resposta de `GET /quiz/1` não contém `correctOption` | [ ] |
| 8 | Responder cada questão e clicar em "Confirmar" | Feedback imediato por questão: borda/fundo verde para acerto, vermelho para erro | [ ] |
| 9 | Após a última questão | Navega automaticamente para `/quiz/1/resultado` | [ ] |
| 10 | Na tela de resultado: verificar número de acertos exibido (ex: "3 de 4") | Número bate com as respostas dadas manualmente | [ ] |
| 11 | Verificar "XP ganho: +N XP" na tela de resultado | N = número de acertos × 5 (ex: 3 acertos = +15 XP) | [ ] |
| 12 | Verificar barra de progresso de XP | Barra preenchida proporcionalmente a `xp % 50` (ex: 15 XP = 30% da barra) | [ ] |
| 13 | Se `leveledUp == true`, verificar mensagem de parabéns | Mensagem de subida de nível aparece na tela de resultado | [ ] |
| 14 | Clicar em "Continuar" | Navega para `/genres/aventura` | [ ] |
| 15 | Verificar `XpBadge` no topo da página após retornar | Exibe o XP e nível atualizados (consistente com o resultado do quiz) | [ ] |

---

## Validação direta dos endpoints via DevTools ou Postman

| # | Requisição | Resultado esperado | OK? |
|---|------------|--------------------|-----|
| 16 | `GET /quiz/1` **sem** token Authorization | HTTP 401 Unauthorized | [ ] |
| 17 | `GET /quiz/1` **com** token JWT válido | HTTP 200 com lista de questões; nenhum item contém `correctOption` | [ ] |
| 18 | `POST /quiz/1/submit` com body `{ "answers": [{ "questionId": 1, "selectedOption": "A" }] }` e token válido | HTTP 200 com `xpEarned`, `correctAnswers`, `newTotalXp`, `newLevel` e `leveledUp` | [ ] |
| 19 | `GET /users/me` **sem** token Authorization | HTTP 401 Unauthorized | [ ] |
| 20 | `GET /users/me` **com** token JWT válido | HTTP 200 com `name`, `email`, `xp` e `level` do usuário autenticado | [ ] |

---

## Resultado da execução

**Data real de execução:** ___________
**Testes passaram:** ___ / 20
**Falhas identificadas:**

| # do passo | Descrição do problema | Issue aberta |
|---|---|---|
| | | |

**Decisão:** [ ] Aprovado para release · [ ] Aguardando correção de issues
