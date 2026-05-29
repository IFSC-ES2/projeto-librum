# Entrega Sprint 3: Librum

**Data:** 28 de maio de 2026  
**Scrum Master desta sprint:** Giuliano Marcus Bianco

---

## Histórias de Usuário Entregues

| ID | Título | SP | Status |
|----|--------|----|--------|
| US06 | Quiz ao final de cada fase | 8 | Concluída |
| US07 | Sistema de XP e gamificação | 5 | Concluída |
| US08 | Progresso visível por fase e gênero | 3 | Concluída |
| US09 | Página de fase concluída | 2 | Concluída |

**Total entregue:** 18 SP. Maior velocity do projeto até esta data.

Com a entrega desta sprint, o backlog do MVP está 100% concluído: 41 de 41 SP.

---

## Principais Alterações Técnicas

### Banco de dados

- Migration `V6__schema_explanation_quiz_completed.sql`: adição da coluna `explanation TEXT` em `quiz_questions` e da coluna `quiz_completed BOOLEAN NOT NULL DEFAULT FALSE` em `user_progress`.
- Migration `V7__seed_phases_5_6_7.sql`: seed das Fases 5 ("O Cerco ao Forte"), 6 ("Jim e o Hispaniola") e 7 ("O Fim da Aventura") de *A Ilha do Tesouro*, com 3 segmentos cada.
- Migration `V8__seed_quiz_phases_5_6_7_and_explanations.sql`: inserção das questões das Fases 5, 6 e 7 com `explanation` e atualização das questões já existentes das Fases 1–4 com o campo `explanation`.

### Backend

- `UserProgress.java`: adição do campo `quizCompleted` com getter `isQuizCompleted()` e setter `setQuizCompleted()`.
- `UserProgressRepository.java`: adição do método `existsByUserIdAndPhaseIdAndQuizCompletedTrue(UUID, Long)`.
- `PhaseRepository.java`: adição do método `findByBookIdAndPhaseNumber(Long, int)`, necessário para calcular o `nextPhaseId` na submissão do quiz.
- `PhaseSegmentResponse.java`: adição do campo `String genreSlug`.
- `QuizQuestionResponse.java`: adição dos campos `String explanation` e `String correctOption`.
- `QuizResultResponse.java`: adição dos campos `Long nextPhaseId` e `boolean passed`.
- `ReadingService.java`: método `isPhaseUnlocked()` passou a usar `existsByUserIdAndPhaseIdAndQuizCompletedTrue` no lugar de `existsByUserIdAndPhaseIdAndIsCompletedTrue` (padrão Template Method, ver ADR-0009); método `getPhaseSegment()` passou a incluir `genreSlug` no response.
- `QuizService.java`: método `submitQuiz()` passou a calcular `passed` (`totalQuestions - correctAnswers <= 2`), persistir `quizCompleted = true` e `isCompleted = true` no `UserProgress` somente quando aprovado, e retornar `nextPhaseId` e `passed` no `QuizResultResponse`.

### Frontend

- `Layout.jsx` (novo): wrapper para páginas autenticadas que integra a `Navbar` sem duplicação de código.
- `PhaseCompletedPage.jsx` + `PhaseCompletedPage.css` (novos): tela exibida após a submissão do quiz. Quando aprovado, mostra badge "FASE X CONCLUÍDA!", XP ganho em destaque, contagem de acertos, barra de progresso de nível e botão para a próxima fase. Quando reprovado, mostra mensagem explicativa e botão "Reler a Fase".
- `PhaseListPage.jsx`: integração com `Layout`, adição da trilha visual com setas verticais entre os cards de fase (`.phase-connector`) e correção do botão "Continuar" para iniciar sempre na Fase 1 quando não há progresso (BUG-08).
- `PhaseListPage.css`: adição dos estilos `.phase-connector` e `.phase-connector-arrow`.
- `QuizPage.jsx`: remoção da linha que causava crash por desestruturação de `null` (BUG-02); implementação de feedback visual por questão com `correctOption` retornado pelo backend, mostrando a opção correta em verde e a incorreta em vermelho (BUG-03); navegação final via `navigate('/quiz/:phaseId/fase-concluida')`.
- `QuizPage.css`: adição dos estilos `.quiz-option.correct`, `.quiz-option.incorrect`, `.quiz-explanation` e variantes de cor.
- `ReadingPage.jsx`: breadcrumb e botão "← Livros" dinamizados com `genreSlug` retornado pelo backend (BUG-04); texto do botão de avanço condicional entre "Próximo trecho →" e "Ir ao quiz →" conforme segmento atual (BUG-06).
- `GenresPage.jsx`: integração com `Layout` (BUG-07).
- `AppRoutes.jsx`: adição da rota `/quiz/:phaseId/fase-concluida` apontando para `PhaseCompletedPage`.
- `QuizService.js`: mock fallback de `submitQuiz` atualizado com `passed: true` e `nextPhaseId` calculado.

### Documentação técnica

- `docs/adrs/ADR-0009-template-method-phase-unlock.md`: decisão de aplicar o padrão Template Method na verificação de desbloqueio de fases.
- `docs/contrato-api-quiz.md`: atualizado com os campos `correctOption`, `explanation`, `passed` e `nextPhaseId`.
- `docs/contrato-api-leitura.md`: atualizado com o campo `genreSlug` e a nova regra de desbloqueio por `quiz_completed`.
- `docs/pradroes-de-projeto.md` (novo): documento consolidado com os quatro padrões GoF aplicados ao longo do projeto: Facade, Strategy, Command e Template Method.
- `docs/qualidade.md`: adicionada a seção de evidências da Sprint 3.
- `docs/metricas/m1-cobertura-testes.md`: atualizado com os dados de cobertura da Sprint 3.
- `docs/metricas/m5-velocity.md`: preenchido com o velocity real da sprint (18 SP).

---

## Padrões OO Aplicados

### Command em `QuizService.java`

O `QuizController` precisaria realizar múltiplas operações para processar uma submissão de quiz: validar respostas, contar acertos, calcular XP, atualizar nível, persistir progresso de quiz e montar o response. A solução foi encapsular todas essas operações no método `submitQuiz(userId, phaseId, answers)`. O controller chama apenas esse método sem conhecer nenhum detalhe de cálculo. Registrado em ADR-0008.

Classes afetadas: `QuizService`, `QuizController`, `XpService`, `QuizQuestionRepository`, `UserProgressRepository`, `UserRepository`.

### Template Method em `ReadingService.isPhaseUnlocked()`

O critério de desbloqueio mudou de "leitura concluída" (`is_completed`) para "quiz concluído" (`quiz_completed`). O método `isPhaseUnlocked()` mantém um esqueleto fixo de três passos — verificar se é a primeira fase, localizar a fase anterior, consultar o repositório — e o passo variável (a chamada ao repositório) foi trocado de `existsByUserIdAndPhaseIdAndIsCompletedTrue` para `existsByUserIdAndPhaseIdAndQuizCompletedTrue`. Nenhuma outra linha do método foi alterada. Registrado em ADR-0009.

Classes afetadas: `ReadingService`, `UserProgressRepository`, `UserProgress`, `QuizService`.

Detalhamento em `docs/pradroes-de-projeto.md`.

---

## Testes Incluídos

| Arquivo | Tipo | Casos |
|---------|------|-------|
| `QuizServiceUnlockTest.java` | Unidade | 5 |
| `ReadingServiceUnlockTest.java` | Unidade | 3 |
| `XpServiceTest.java` | Unidade | 3 |

**Total de novos testes:** 11. Todos passando no CI.

Casos de `QuizServiceUnlockTest.java`: `quizCompleted` marcado como `true` quando aprovado; não marcado quando reprovado com 3 ou mais erros; `passed = true` com 2 erros ou menos; `passed = false` com 3 ou mais erros; fase seguinte desbloqueada somente quando aprovado.

Casos de `ReadingServiceUnlockTest.java`: retorna `false` se quiz anterior não concluído; retorna `true` se quiz anterior concluído; retorna `true` para a Fase 1 sem checar progresso.

Casos de `XpServiceTest.java`: XP calculado corretamente por número de acertos; nível incrementado ao atingir o limiar de 50 XP; XP total acumulado corretamente entre chamadas.

---

## Situação do CI

O pipeline `.github/workflows/ci.yml` executa automaticamente em todo pull request aberto contra `main`.

O job `backend-tests` foi reconfigurado para usar o perfil H2 em memória (`application-test.properties`), eliminando a dependência do PostgreSQL nos runners do GitHub Actions. Todos os testes de integração passam sem precisar do banco real.

Todos os merges desta sprint foram realizados com CI verde: PR #110 (`docs/atualizacao-contratos`), PR #117 (`fix/frontend-bugs-us08-us09`) e PR #118 (`feat/atualizacao-backend`).

---

## Bugs Corrigidos

| Bug | Descrição | Status |
|-----|-----------|--------|
| BUG-02 | Crash do `QuizPage` por desestruturação de `null` | Corrigido |
| BUG-03 | Feedback do quiz sem indicação de acerto ou erro | Corrigido |
| BUG-04 | Breadcrumb e botão "← Livros" hardcoded em `ReadingPage` | Corrigido |
| BUG-05 | `QuizResultPage` navegava para `/genres/aventura` hardcoded | Corrigido (substituída por `PhaseCompletedPage`) |
| BUG-06 | Botão "Ir ao quiz →" aparecia em todos os segmentos | Corrigido |
| BUG-07 | `Navbar` criada mas não integrada nas páginas autenticadas | Corrigido |
| BUG-08 | Novo usuário começava na Fase 3 em vez da Fase 1 | Corrigido |
| BUG-09 | Compilação falhava ao adicionar campos a records Java nos testes | Corrigido |

---

## Limitações Conhecidas

- A cobertura de testes do frontend (React Testing Library) não foi implementada nesta sprint e permanece como dívida técnica para a Sprint Pré-4.
- O redesign visual completo (design system, tokens CSS, tipografia) foi movido para `sprint-pre-4.md`. A aplicação mantém o visual atual.
- O gênero Aventura continua sendo o único com livro e conteúdo cadastrados. Os demais quatro gêneros aparecem com status "Em breve".

---

## Registro de Contribuições Individuais

### Antonio Marcos: Arquiteto de Software

- Registrou ADR-0009 (Template Method no `isPhaseUnlocked`).
- Atualizou `docs/contrato-api-quiz.md` e `docs/contrato-api-leitura.md` com os novos campos e regras desta sprint.
- Criou as migrations V6, V7 e V8 com schema, seed de fases e seed de questões com explanações.
- Adicionou o campo `quizCompleted` em `UserProgress.java` com getter e setter.
- Adicionou `existsByUserIdAndPhaseIdAndQuizCompletedTrue` em `UserProgressRepository.java`.
- Adicionou `findByBookIdAndPhaseNumber` em `PhaseRepository.java`.
- Adicionou os campos `genreSlug`, `explanation`, `correctOption`, `nextPhaseId` e `passed` aos DTOs (`PhaseSegmentResponse`, `QuizQuestionResponse`, `QuizResultResponse`).
- Atualizou `ReadingService.java` com a nova regra de desbloqueio e o campo `genreSlug` no response.
- Atualizou `QuizService.java` com o cálculo de `passed`, persistência de `quizCompleted` e retorno de `nextPhaseId`.

### Maria Carolina Hammes: Engenheira de Frontend

- Criou `Layout.jsx` integrando a `Navbar` como wrapper das páginas autenticadas.
- Criou `PhaseCompletedPage.jsx` e `PhaseCompletedPage.css` com os fluxos de aprovação e reprovação.
- Atualizou `PhaseListPage.jsx` com integração de `Layout`, trilha visual com setas e correção do botão "Continuar" para BUG-08.
- Atualizou `PhaseListPage.css` com os estilos da trilha de fases.
- Atualizou `QuizPage.jsx` corrigindo o crash (BUG-02), implementando o feedback por questão com `correctOption` (BUG-03) e navegando para `PhaseCompletedPage` ao final.
- Atualizou `QuizPage.css` com os estilos de feedback correto/incorreto e painel de explicação.
- Atualizou `ReadingPage.jsx` com breadcrumb dinâmico (BUG-04) e botão condicional (BUG-06).
- Integrou `Layout` em `GenresPage.jsx` (BUG-07).
- Atualizou `AppRoutes.jsx` com a rota `/quiz/:phaseId/fase-concluida`.
- Atualizou o mock fallback de `QuizService.js` com `passed` e `nextPhaseId`.

### Bernardo Silva Bombazaro: Quality Engineer

- Implementou `QuizServiceUnlockTest.java` com 5 casos de teste para `quizCompleted` e `passed`.
- Implementou `ReadingServiceUnlockTest.java` com 3 casos de teste para a nova regra de desbloqueio.
- Implementou `XpServiceTest.java` com 3 casos de teste para cálculo de XP e progressão de nível.
- Configurou `application-test.properties` com perfil H2 em memória para os testes de integração.
- Atualizou os construtores dos testes de integração (`QuizControllerIntegrationTest`, `ReadingControllerIntegrationTest`) com os novos campos dos DTOs (BUG-09).

### Giuliano Marcus Bianco: Scrum Master

- Abriu as issues US08 e US09 no GitHub com critérios de aceitação.
- Revisou os PRs #110, #117 e #118.
- Criou `docs/pradroes-de-projeto.md` documentando Facade, Strategy, Command e Template Method.
- Atualizou `docs/qualidade.md` com as evidências da Sprint 3.
- Atualizou `docs/metricas/m1-cobertura-testes.md` com os dados de cobertura da sprint.
- Atualizou `docs/metricas/m5-velocity.md` com o velocity real (18 SP).
