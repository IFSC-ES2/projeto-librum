# Entrega Sprint 4: Librum

**Data:** 08 de junho de 2026  
**Scrum Master desta sprint:** Antonio Marcos da Silva

---

## Escopo da Sprint

O backlog do MVP foi concluido na Sprint 3 (41 de 41 SP). Esta sprint nao adiciona novas Historias de Usuario de produto: ela consolida a qualidade do que ja existe. O foco foi estabilizar o MVP, refatorar pontos de baixa coesao no backend, eliminar dividas de hardcode e de mocks enganosos no frontend, dar a aplicacao uma identidade visual coesa baseada nos wireframes e publicar o ambiente de staging.

As paginas Inicio e Perfil, previstas nos wireframes desde a concepcao, foram construidas aqui como parte da consolidacao da experiencia, reaproveitando dados ja existentes e um novo endpoint de progresso agregado.

A sprint absorveu ainda as correcoes tecnicas e de documentacao apontadas na avaliacao da Entrega 6 que ainda estavam em aberto: lint no CI e correcao dos erros de lint, versionamento de `docs/padroes-de-projeto.md`, ADR do padrao Strategy, backfill das fichas de metricas m2 a m5 com os valores da Sprint 2, atualizacao do README e este relatorio de contribuicoes individuais.

---

## Issues da Sprint

| Issue | Titulo | Responsavel | PR | Status |
|-------|--------|-------------|----|--------|
| #120 | Extrair regra de desbloqueio para `PhaseUnlockService` | Antonio | #133 | Concluida |
| #121 | Conteudo repetido entre as fases de Aventura | Antonio | #134 | Concluida |
| #122 | Endpoint de progresso por genero e pagina de Perfil | Antonio | #138 | Concluida |
| #123 | Versionar padroes de projeto e registrar ADR de Strategy | Antonio | #135 | Concluida |
| #125 | Criar design system e app shell | Maria | #136 | Concluida |
| #126 | Reestilizar trilha de fases e leitura | Maria | #137 | Concluida |
| #127 | Revalidar CI, lint, README, deploy e staging | Bernardo | #132 | Concluida |
| #128 | Reestilizar auth e generos e criar a Home | Bernardo | #140 | Concluida |
| #129 | Gerar SVGs faltantes e migrar assets | Giuliano | #146 | Concluida |
| #130 | Reestilizar quiz e fase concluida e remover mock | Giuliano | #139 | Concluida |
| #131 | Cobertura de frontend e metricas | Giuliano | #143 | Concluida |
| #141 | Correcao da trilha em zigue-zague | Antonio | #142 | Concluida |
| #145 | Visao arquitetural C4 (contexto e conteineres) | Antonio | este PR | Concluida |
| #124 | Relatorio da sprint e contribuicoes individuais | Antonio | este PR | Concluida |
| #147 | Publicar release v0.4.0 | Antonio | - | Em aberto |

A ordem de merge respeitou as dependencias reais: o design system (PR #136) e a migracao de assets (PR #146) entraram primeiro, porque destravam as demais paginas; em seguida os refactors e o endpoint de backend; por ultimo as paginas reestilizadas.

---

## Principais Alteracoes Tecnicas

### Backend

- `PhaseUnlockService.java` (novo): a regra `isPhaseUnlocked` foi extraida do `ReadingService`, que era Facade mas ainda abrigava essa regra de dominio (alerta do ADR-0007). O `ReadingService` passou a receber o servico por injecao e apenas delegar a verificacao. Comportamento inalterado. Registrado na ADR-0010 (PR #133, commit `313a595`).
- `ProgressSummaryService.java` e `UserProgressSummaryResponse.java` (novos) mais o endpoint `GET /users/me/progress` no `UserController`: retornam XP, nivel, total de fases concluidas e, por genero, fases concluidas e total. Esse endpoint alimenta a Home e a pagina de Perfil. A consulta foi ajustada para evitar N+1 durante a revisao do PR (PR #138, commits `2d29740` e `261206a`).
- Migrations `V9__reescreve_fases_3_4.sql` e `V10__corrige_quiz_fases_3_4.sql` (novas): as Fases 3 e 4 e o quiz dessas fases foram reescritos para que as 7 fases formem um arco linear unico. O cerco ao forte, a tomada do Hispaniola e o desfecho passam a existir somente nas Fases 5 a 7, eliminando a repeticao de eventos e a pergunta duplicada que existiam entre as Fases 4 e 7. As migrations V1 a V8 nao foram editadas; a correcao e forward-only (PR #134, commit `dfbb020`).

### Frontend

- Design system: `frontend/src/styles/tokens.css`, reescrita do `index.css`, fontes Fraunces, Mulish e Spectral via `@fontsource` e a biblioteca de componentes em `frontend/src/components/ui/` (`Button`, `Card`, `ProgressBar`, `GenreBadge`, `MascotBubble`, `LoadingState`, `EmptyState`, `ErrorState`). O `AppShell` com `Sidebar` substituiu a Navbar fina. Registrado na ADR-0011 (PR #136, commit `e4ad947`).
- Trilha de fases e leitura: a trilha foi reconstruida como caminho serpenteante com nos de fase (bloqueada, ativa, concluida); a `ReadingPage` recebeu a tipografia de leitura e o painel de visual; titulo e autor do livro deixaram de ser hardcoded; o texto sobre persistencia de preferencias passou a refletir o comportamento real (local). O fallback mockado do `ReadingService.js` que fabricava progresso foi removido (PR #137, commit `dc635b5`; ajuste posterior da trilha em zigue-zague no PR #142, commit `81c1e36`).
- Auth, generos e Home: login e cadastro no layout dividido; `GenresPage` passou a consumir `/genres` em vez do array fixo, com os generos sem conteudo marcados como "em breve"; a contagem de fases passou a vir do backend (sem o "8 fases" hardcoded); a `HomePage` foi criada com saudacao, stats e o card "Continue de onde parou", e `/inicio` virou o destino pos-login (PR #140, commit `fa78998`).
- Quiz e fase concluida: `QuizPage` com barra de progresso segmentada, painel do mascote e trecho de referencia; `PhaseCompletedPage` com a animacao de level-up respeitando `prefers-reduced-motion`; o fallback mockado do `QuizService.js`, que sempre aprovava e nao trazia `correctOption`/`explanation`, foi removido (PR #139, commit `edae767`).
- Pagina de Perfil: `ProfilePage.jsx` e `.css` consumindo `/users/me` e `/users/me/progress`, com dados da conta, preferencias de leitura e progresso por genero, e a rota `/perfil` dentro do app shell (PR #138, commit `261206a`).

### Documentacao tecnica

- `docs/adrs/ADR-0010-extract-phase-unlock.md`: extracao da regra de desbloqueio para o `PhaseUnlockService`.
- `docs/adrs/ADR-0011-design-system-e-assets.md`: design system, tipografia e organizacao de assets.
- `docs/adrs/ADR-0012-strategy-reading-themes.md`: padrao Strategy aplicado nos temas de leitura.
- `docs/padroes-de-projeto.md`: o documento, que existia no working tree mas nao havia sido versionado (ausente na tag `v0.2.0`), foi versionado e passou a referenciar a ADR-0012 na secao de Strategy e a nota sobre a extracao do `PhaseUnlockService` na secao de Template Method (PR #135, commit `1c7c39c`).
- `docs/DEPLOY.md` (novo): passo a passo de deploy no Render e variaveis de ambiente.
- `docs/arquitetura.md` (novo): visao C4 de contexto e conteineres do sistema (este PR).
- `docs/contrato-api-quiz.md`: secao do endpoint `GET /users/me/progress`.

---

## Padroes OO Aplicados

### Extracao do Template Method para o PhaseUnlockService

A regra `isPhaseUnlocked` ja seguia o padrao Template Method desde a Sprint 3 (ADR-0009): um esqueleto fixo de tres passos (verificar se e a primeira fase, localizar a fase anterior, consultar o repositorio). O problema era de coesao: a regra vivia dentro do `ReadingService`, que tem o papel de Facade. Nesta sprint a regra foi movida na integra para o `PhaseUnlockService`, mantendo o mesmo algoritmo. O `ReadingService` passou a delegar a verificacao por injecao de dependencia. Registrado na ADR-0010.

Classes afetadas: `PhaseUnlockService`, `ReadingService`, `PhaseUnlockServiceTest`, `ReadingServiceTest`.

### Strategy nos temas de leitura

A pagina de leitura oferece os modos Padrao, Noturno e Ampliado. Cada tema e um objeto com a mesma interface em `readingThemes.js`, e a funcao `applyTheme` seleciona a estrategia sem condicional no componente. O padrao ja estava no codigo desde antes, mas sem ADR propria, ao contrario de Facade e Template Method. A ADR-0012 fechou essa lacuna.

Detalhamento em `docs/padroes-de-projeto.md`.

---

## Testes e CI

- O job `frontend-build` do CI passou a executar `npm run lint` (correcao C1 da Entrega 6). Para o pipeline ficar verde, os tres erros de lint apontados na Entrega 6 foram corrigidos: dois em `AuthContext.jsx` (PR #132) e um em `ReadingPage.jsx` (PR #137). A trava de lint so passou a bloquear depois que os dois fixes estavam na `main`.
- A cobertura de testes de frontend, antes praticamente nula, foi iniciada com Vitest e React Testing Library, com testes para componentes do design system (PR #143, commit `a835481`). O JaCoCo foi configurado no backend e a evidencia objetiva de cobertura foi anexada a `docs/metricas/m1-cobertura-testes.md` (correcao C6).
- Apos a sprint, o job `frontend-build` recebeu tambem o passo `npm test -- --run`, para que os testes de frontend rodem no CI antes do build (PR #149).
- O job `check-required-files` passou a verificar `docs/padroes-de-projeto.md` (correcao C2), o que so foi possivel apos o arquivo ser versionado no PR #135.

As migrations V9 e V10 nao sao exercitadas pelo CI, porque o perfil de teste usa H2 com Flyway desabilitado. Elas foram validadas contra Postgres real via `docker compose`, conferindo nos logs do Flyway que aplicaram sem erro, e por leitura manual das Fases 1 a 7 confirmando o arco unico.

---

## Staging

O backend, o banco PostgreSQL e o frontend foram publicados no Render, conforme `docs/DEPLOY.md`:

- Backend: `https://projeto-librum.onrender.com`
- Frontend: `https://librum-frontend.onrender.com`

O frontend aponta para o backend pela variavel `VITE_API_URL`. O plano gratuito do Render hiberna o servico apos um tempo sem uso, o que afeta a primeira requisicao e a medicao de tempo de resposta. Esse comportamento esta documentado no `DEPLOY.md`.

---

## Backfill de Metricas (Entrega 6)

A avaliacao da Entrega 6 apontou as fichas m2, m3, m4 e m5 sem os valores observados da Sprint 2. O historico de coleta dessas fichas foi preenchido com os valores da Sprint 2, incluindo a data e uma analise do planejado contra o executado. A ficha m5 (velocity) passou a registrar a velocity real de cada sprint (8, 13 e 18 SP nas Sprints 1, 2 e 3); a velocity da Sprint 4 sera fechada apos a release. A ficha m1 recebeu a evidencia do relatorio de cobertura do backend (saida do JaCoCo).

---

## Registro de Contribuicoes Individuais

### Antonio Marcos da Silva: Scrum Master e Arquiteto

- Extraiu a regra de desbloqueio para o `PhaseUnlockService` e registrou a ADR-0010 (issue #120, PR #133).
- Reescreveu o conteudo das Fases 3 e 4 e o quiz dessas fases com as migrations V9 e V10, eliminando a repeticao narrativa (issue #121, PR #134).
- Criou o endpoint `GET /users/me/progress` (`ProgressSummaryService`, DTO e `UserController`) e a pagina de Perfil (issue #122, PR #138).
- Versionou `docs/padroes-de-projeto.md` e criou a ADR-0012 do padrao Strategy (issue #123, PR #135).
- Corrigiu a trilha de fases para o desenho em zigue-zague e a cor do nome no cabecalho do perfil (issue #141, PR #142).
- Criou a visao arquitetural C4 em `docs/arquitetura.md` e este relatorio de fechamento (issues #145 e #124).
- Coordenou a ordem de merge da sprint e a trava de lint no CI.

### Maria Carolina Hammes: Lider de Frontend

- Criou o design system: tokens, reescrita do `index.css`, fontes via `@fontsource` e a biblioteca de componentes em `components/ui/`, mais o `AppShell` com `Sidebar`, registrando a ADR-0011 (issue #125, PR #136).
- Reconstruiu a trilha de fases como caminho serpenteante e aplicou a identidade visual na leitura, removendo o hardcode de titulo/autor e o fallback mockado do `ReadingService.js` (issue #126, PR #137).
- Corrigiu o erro de lint do `ReadingPage.jsx` (C1), parte da trava de lint no CI.

### Bernardo Silva Bombazaro: DevOps e Frontend

- Adicionou o passo de lint ao CI, corrigiu os dois erros de lint do `AuthContext.jsx`, acrescentou `docs/padroes-de-projeto.md` ao check de arquivos obrigatorios, atualizou o README e criou o `docs/DEPLOY.md`; publicou o staging no Render (issue #127, PR #132, correcoes C1, C2 e C3).
- Reestilizou auth e generos, fez a `GenresPage` consumir `/genres` e criou a `HomePage` com a rota `/inicio` como destino pos-login (issue #128, PR #140).

### Giuliano Marcus Bianco: Quality Engineer e Frontend

- Gerou os SVGs faltantes (Aventura, Romance, Suspense, capa do livro e logo branca) e migrou todos os assets para `frontend/src/assets/` no bundle do Vite, removendo os PNGs de baixa resolucao (issue #129, PR #146).
- Reestilizou o quiz e a tela de fase concluida e removeu o fallback mockado do `QuizService.js` que sempre aprovava (issue #130, PR #139).
- Configurou Vitest e React Testing Library, escreveu os testes de componentes, configurou o JaCoCo e fez o backfill das fichas de metricas m2 a m5 da Sprint 2 (issue #131, PR #143, correcao C6). Adicionou tambem o `npm test` ao CI (PR #149).
- Revisou os PRs de backend e documentacao da sprint.

---

## Limitacoes Conhecidas e Pendencias

- A release `v0.4.0` (issue #147) ainda nao foi publicada; e o ultimo item de fechamento da sprint, a ser criado apos a confirmacao final do staging.
- O genero Aventura continua sendo o unico com livro e conteudo cadastrados. Os demais quatro generos aparecem com status "em breve".
- O staging usa o plano gratuito do Render, que hiberna apos inatividade; a primeira requisicao depois da hibernacao e mais lenta.
- A velocity da Sprint 4 sera registrada na ficha m5 apos a release e o fechamento das issues no board.
