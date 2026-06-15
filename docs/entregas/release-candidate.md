# Release Candidate - Librum (v1.0.0-rc.1)

**Data:** 14 de junho de 2026  
**Scrum Master desta sprint:** Antonio Marcos da Silva

---

## O que e o MVP entregue

O Librum e uma aplicacao web de incentivo a leitura para o publico de 9 a 16 anos, com leitura por fases, quiz de compreensao ao final de cada fase e gamificacao por XP e nivel. O MVP cobre as nove historias de usuario do backlog inicial (US01 a US09), integradas de ponta a ponta: autenticacao com JWT, selecao de genero, leitura por fases com desbloqueio progressivo, quiz ao final de cada fase, XP e nivel, progresso por genero e pagina de perfil.

O genero Aventura (A Ilha do Tesouro, 7 fases) e o conteudo completo de demonstracao; os demais generos aparecem como em breve.

---

## Funcionalidades entregues

| Historia | Descricao | Situacao |
|----------|-----------|----------|
| US01 | Cadastro e login | Entregue |
| US02 | Selecao de generos literarios | Entregue |
| US03 | Navegacao entre generos | Entregue |
| US04 | Leitura em fases | Entregue |
| US05 | Desbloqueio progressivo de fases | Entregue |
| US06 | Quiz ao final de cada fase | Entregue |
| US07 | Sistema de XP | Entregue |
| US08 | Progresso por genero/fase | Entregue |
| US09 | Resumo do desempenho pos-quiz | Entregue |

Alem das historias, as paginas Inicio e Perfil (previstas nos wireframes) estao integradas e fazem parte do MVP entregue.

---

## Correcoes e melhorias do Release Candidate

- Hardening de feedback ao usuario: indicacao de carregamento e mensagens do mascote Tinta no login, cadastro, generos, leitura, trilha, quiz e demais fluxos assincronos, a partir de um catalogo unico em `tintaMessages.js` (ADR-0013).
- Contrato de erro do backend completado: todo erro responde no formato `{ message }`, inclusive falha inesperada (500) e acesso negado (403); as excecoes do Spring MVC mantem o status correto (400, 405, 415) para o frontend mapear a mensagem certa.
- Fechamento das metricas pendentes da Entrega 8: tempo de resposta (m3) medido no staging acordado, taxa de aprovacao de PRs (m4) das Sprints 3 e 4, velocity (m5) e comparacao antes/depois da reengenharia do PhaseUnlockService (m6), com evidencia de cobertura do JaCoCo.
- Testes de aceitacao do MVP (TA-01 a TA-13) executados e documentados em `docs/testes-de-aceitacao.md`, com evidencias em `docs/evidencias/aceitacao`.
- Ambiente de staging documentado e operacional, com instrucoes de build, execucao local e credenciais de teste em `docs/DEPLOY.md`.

---

## Limitacoes conhecidas

- So o genero Aventura tem conteudo cadastrado; os demais aparecem como em breve.
- O staging usa o plano gratuito do Render, que hiberna apos inatividade; a primeira requisicao depois da hibernacao e mais lenta (cold start).
- Defeitos abertos na execucao dos testes de aceitacao, registrados para tratamento apos a RC:
  - #172 - frontend do staging desatualizado, ainda nao reflete o RC (mensagens do Tinta ausentes no staging).
  - #173 - generos sem conteudo aparecem clicaveis e levam a 404 em vez de "em breve".
  - #174 - fase reprovada no quiz conta como concluida na trilha e concede XP (defeito de integridade de progresso; o desbloqueio da proxima fase continua respeitando a regra).
  - #175 - pagina de Perfil nao usa a voz do Tinta no erro e nao tem botao de tentar de novo.

---

## Ambiente de teste

- Frontend: https://librum-frontend.onrender.com
- Backend: https://projeto-librum.onrender.com
- Credenciais de teste, dados de demonstracao e instrucoes para rodar localmente: ver `docs/DEPLOY.md`.

---

## Mapa de aliases git

A analise de contribuicao da Entrega 8 foi dificultada por aliases git diferentes do nome real. O mapa abaixo resolve a correspondencia.

| Alias no git | Integrante |
|--------------|------------|
| anthyer | Antonio Marcos da Silva |
| bombazaro | Bernardo Silva Bombazaro |
| Maria0912204 | Maria Carolina Hammes |
| giuliano-marcus-bianco | Giuliano Marcus Bianco |

## Contribuicoes individuais na Sprint 5

Cada integrante ficou responsavel por tres blocos de esforco comparavel. O vinculo por issue e PR foi conferido pelo autor real de cada PR mergeado.

### Antonio Marcos da Silva (anthyer) - Scrum Master e Arquiteto

- A1 - Contrato de erro do backend: handlers para falha inesperada (500) e acesso negado (403) no formato unico, com testes. Issue #155, PR #157.
- A2 - Comparacao antes/depois da reengenharia (m6): ficha com LOC, responsabilidades, dependencias e cobertura do PhaseUnlockService. Issue #156, PR #158.
- A3 - Fechamento do Release Candidate: documentacao final, backlog, riscos, contribuicoes e tags. Issue #177, este PR.

### Bernardo Silva Bombazaro (bombazaro) - DevOps e Frontend

- B1 - Feedback do Tinta na autenticacao: carregamento e mensagens no login e cadastro. Issue #151, PR #161.
- B2 - Feedback do Tinta em Generos e Home. Issue #152, PR #164.
- B3 - Ambiente acessivel e deploy: DEPLOY.md operacional, credenciais de teste, README e triagem do npm audit. Issue #153, PR #154.

### Maria Carolina Hammes (Maria0912204) - Lider de Frontend

- M1 - Catalogo do Tinta e componentes de feedback: tintaMessages.js, LoadingState, Button e ErrorState, com a ADR-0013. Issue #159, PR #160.
- M2 - Feedback do Tinta na Leitura e na Trilha. Issue #162, PR #163.
- M3 - Testes dos componentes de feedback. Issue #165, PR #166.

### Giuliano Marcus Bianco (giuliano-marcus-bianco) - Quality Engineer e Frontend

- G1 - Feedback do Tinta no Quiz e na Fase Concluida. Issue #167, PR #168.
- G2 - Testes de aceitacao do MVP (TA-01 a TA-13), com evidencias. Issue #171, PR #176.
- G3 - Fechamento das metricas m3, m4 e m5 e evidencia de cobertura do PhaseUnlockService. Issue #169, PR #170.
