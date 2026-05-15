# Entrega Sprint 2 - Librum

**Data:** 15 de maio de 2026

---

## Histórias de Usuário Entregues

| ID | Título | SP | Status |
|----|--------|----|--------|
| US02 | Seleção de gêneros literários | 3 | Concluída |
| US04 | Leitura em fases | 8 | Concluída |
| US05 | Desbloqueio progressivo de fases | 5 | Concluída |

**Total entregue:** 16 SP. Inclui carry-over de 3 SP da US02 da Sprint 1.

---

## Principais Alterações Técnicas

### Banco de dados

- Migration `V2__reading_schema.sql`: criação das tabelas `genres`, `books`, `phases`, `phase_segments` e `user_progress`.
- Migration `V3__seed_initial_content.sql`: seed com 5 gêneros e conteúdo completo de A Ilha do Tesouro (4 fases, 3 a 4 segmentos cada).

### Backend

- Entidades JPA: `Genre`, `Book`, `Phase`, `PhaseSegment`, `UserProgress`.
- Repositories: `GenreRepository`, `BookRepository`, `PhaseRepository`, `PhaseSegmentRepository`, `UserProgressRepository`.
- DTOs: `GenreResponse`, `PhaseReadingResponse`, `PhaseSegmentResponse`, `ProgressRequest`.
- `ReadingService.java`: padrão Facade orquestrando 4 repositories (ver seção de padrões OO).
- `ReadingController.java`: endpoints `GET /genres`, `GET /genres/{id}/phases`, `GET /reading/{phaseId}/{segmentNumber}`.
- `ProgressService.java` e `ProgressController.java`: endpoint `POST /progress/mark-read`.
- `SecurityConfig.java`: `GET /genres` liberado publicamente; demais endpoints exigem autenticação.

### Frontend

- `GenresPage.jsx` e `GenresPage.css`: tela de seleção de gêneros com 5 cartões.
- `PhaseListPage.jsx` e `PhaseListPage.css`: trilha de fases com status calculado da API.
- `ReadingPage.jsx` e `ReadingPage.css`: interface de leitura em 3 colunas, drop cap, botão "Ir ao quiz".
- `readingThemes.js`: padrão Strategy com 3 temas: Padrão, Noturno e Ampliado.
- `ReadingService.js`: chamadas autenticadas a `/genres`, `/reading` e `/progress`.
- `QuizPlaceholder.jsx`: página provisória do quiz, a ser implementada na Sprint 3.

### Documentação técnica

- `docs/contrato-api-leitura.md`: contrato dos 4 endpoints com método, rota, autenticação, body e códigos de resposta.
- `docs/adrs/ADR-0006-modelagem-conteudo-leitura.md`: decisão de modelagem das 5 tabelas de conteúdo.
- `docs/adrs/ADR-0007-facade-reading-service.md`: decisão de aplicar Facade no ReadingService.

---

## Padrões OO Aplicados

### Facade em ReadingService.java

O `ReadingController` precisaria acessar 4 repositories diferentes para montar a resposta de um único segmento. Isso espalharia lógica de negócio no controller. A solução foi criar o `ReadingService` como único ponto de entrada para operações de leitura; o controller apenas chama este service.

Classes afetadas: `ReadingService`, `ReadingController`, `PhaseRepository`, `PhaseSegmentRepository`, `UserProgressRepository`, `BookRepository`.

Benefício: o controller fica simples e testável; a lógica interna pode mudar sem alterar a interface. Trade-off: o `ReadingService` cresce em responsabilidade com o tempo. Registrado em ADR-0007.

### Strategy em readingThemes.js

A `ReadingPage` tem 3 modos visuais. Sem o padrão, o componente teria um bloco condicional para cada tema. A solução foi representar cada tema como um objeto com a mesma interface (`contentBackground`, `contentColor`, `fontFamily`). A função `applyTheme(themeId, fontSize, lineSpacing)` aceita qualquer objeto de tema e retorna o estilo correto como objeto React.

Módulos afetados: `readingThemes.js`, `ReadingPage.jsx`.

Benefício: adicionar um novo tema exige apenas um novo objeto em `readingThemes.js`; o componente não precisa mudar. Trade-off: pode parecer complexidade desnecessária para quem não conhece o padrão.

Detalhamento em `docs/pradroes-de-projeto.md`.

---

## Testes Incluídos

| Arquivo | Tipo | Casos |
|---------|------|-------|
| `ReadingServiceTest.java` | Unidade | 5 |
| `ProgressServiceTest.java` | Unidade | 4 |
| `ReadingControllerIntegrationTest.java` | Integração | 3 |

**Total:** 12 testes. Todos passando no CI.

Casos de `ReadingServiceTest.java`: fase destravada retorna segmento correto; fase travada lança exceção 403; segmento inexistente lança exceção 404; lista de fases com desbloqueio correto após conclusão; somente fase 1 destravada sem progresso.

Casos de `ProgressServiceTest.java`: primeiro segmento cria progresso novo; segmento repetido mantém maior valor; último segmento marca fase como concluída; conclusão da fase indica desbloqueio da próxima.

Casos de `ReadingControllerIntegrationTest.java`: `GET /genres` sem token retorna 200; `GET /reading/{id}/1` sem token retorna 401; `GET /reading/{id}/1` com token válido retorna 200.

Testes de componente do frontend (`ReadingPage.test.jsx`) estão planejados para a Sprint 3.

---

## Situação do CI

O workflow `.github/workflows/ci.yml` executa automaticamente em todo pull request aberto contra `main`. Tem 4 jobs independentes.

**backend-tests:** compila o backend e executa `./mvnw test` com banco PostgreSQL real provisionado pelo GitHub Actions.

**frontend-build:** instala dependências com `npm ci` e executa `npm run build`.

**validate-yaml:** valida a sintaxe de todos os arquivos YAML do repositório com yamllint.

**check-required-files:** verifica a presença dos arquivos `README.md`, `.github/workflows/ci.yml`, `docs/riscos.md` e `.github/PULL_REQUEST_TEMPLATE.md`. Falha com mensagem clara se algum estiver ausente.

Todos os merges desta sprint foram realizados com CI verde.

---

## Limitações Conhecidas

- O botão "Ir ao quiz" ao final do último segmento navega para `/quiz-placeholder`. O sistema de quiz será implementado na Sprint 3 (US06).
- Apenas o gênero Aventura tem livro e conteúdo cadastrados. Os outros 4 gêneros aparecem na tela com status "Em breve".
- Testes de componente do frontend não foram implementados nesta sprint.
- O tempo estimado de leitura e o nome do gênero na `ReadingPage` são valores estáticos. Serão dinamizados quando a API retornar esses campos.

---

## Pendências para a Sprint 3

- US06: sistema de quiz ao final de cada fase.
- US07: sistema de XP e gamificação.
- Testes de componente com React Testing Library para `ReadingPage`.
- Dinamização dos campos estáticos restantes na `ReadingPage`.

---

## Registro de Contribuições Individuais

### Antonio Marcos - Arquiteto de Software

- Criou `docs/contrato-api-leitura.md` com os 4 endpoints da sprint (PR `docs/sprint2-contratos`).
- Registrou ADR-0006 (modelagem de conteúdo literário) e ADR-0007 (Facade no ReadingService).
- Implementou as entidades `Phase`, `PhaseSegment` e `UserProgress` com seus repositories.
- Implementou os DTOs `PhaseReadingResponse`, `PhaseSegmentResponse` e `ProgressRequest`.
- Implementou `ReadingService.java` com o padrão Facade.
- Implementou `ReadingController.java` e atualizou `SecurityConfig.java`.
- Implementou `ProgressService.java` e `ProgressController.java`.

### Maria Carolina Hammes - Scrum Master

- Organizou o board do GitHub Projects e criou as issues US02, US04 e US05 com critérios de aceitação.
- Implementou `GenresPage.jsx` e `GenresPage.css` (US02, PR `feat/us02-generos`).
- Atualizou `AppRoutes.jsx` com as rotas de gêneros, leitura e quiz.
- Implementou `ReadingPage.jsx` e `ReadingPage.css` com layout fiel ao wireframe.
- Implementou `PhaseListPage.jsx` e `PhaseListPage.css`.
- Implementou `ReadingService.js` com chamadas autenticadas à API.
- Implementou `readingThemes.js` com padrão Strategy.
- Criou `QuizPlaceholder.jsx`.
- Atualizou `docs/baseline.md`, `docs/riscos.md` e este documento de entrega.

### Bernardo Silva Bombazaro - DevOps e Infra

- Criou migration `V2__reading_schema.sql` com as 5 novas tabelas.
- Criou migration `V3__seed_initial_content.sql` com 5 gêneros e conteúdo de A Ilha do Tesouro.
- Implementou entidades `Genre` e `Book` com seus repositories.
- Atualizou `.github/workflows/ci.yml` com os jobs `validate-yaml` e `check-required-files`.

### Giuliano Marcus Bianco - Quality Engineer

- Implementou `ReadingServiceTest.java` com 5 casos de teste de unidade.
- Implementou `ProgressServiceTest.java` com 4 casos de teste de unidade.
- Implementou `ReadingControllerIntegrationTest.java` com 3 casos de integração.
- Criou `docs/pradroes-de-projeto.md` documentando Facade e Strategy.
- Atualizou `docs/qualidade.md` com evidências da Sprint 2.
- Atualizou `docs/metricas/m1-cobertura-testes.md` com os dados reais da sprint.
