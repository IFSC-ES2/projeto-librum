# Release Candidate - Librum (v1.0.0-rc.1)

**Data:** 14 de junho de 2026  
**Scrum Master desta sprint:** Antonio Marcos da Silva

---

## O que é o MVP entregue

O Librum é uma aplicação web de incentivo à leitura para o público de 9 a 16 anos, com leitura por fases, quiz de compreensão ao final de cada fase e gamificação por XP e nível. O MVP cobre as nove histórias de usuário do backlog inicial (US01 a US09), integradas de ponta a ponta: autenticação com JWT, seleção de gênero, leitura por fases com desbloqueio progressivo, quiz ao final de cada fase, XP e nível, progresso por gênero e página de perfil.

O gênero Aventura (A Ilha do Tesouro, 7 fases) é o conteúdo completo de demonstração; os demais gêneros aparecem como em breve.

---

## Funcionalidades entregues

| História | Descrição | Situação |
|----------|-----------|----------|
| US01 | Cadastro e login | Entregue |
| US02 | Seleção de gêneros literários | Entregue |
| US03 | Navegação entre gêneros | Entregue |
| US04 | Leitura em fases | Entregue |
| US05 | Desbloqueio progressivo de fases | Entregue |
| US06 | Quiz ao final de cada fase | Entregue |
| US07 | Sistema de XP | Entregue |
| US08 | Progresso por gênero/fase | Entregue |
| US09 | Resumo do desempenho pós-quiz | Entregue |

Além das histórias, as páginas Início e Perfil (previstas nos wireframes) estão integradas e fazem parte do MVP entregue.

---

## Correções e melhorias do Release Candidate

- Hardening de feedback ao usuário: indicação de carregamento e mensagens do mascote Tinta no login, cadastro, gêneros, leitura, trilha, quiz e demais fluxos assíncronos, a partir de um catálogo único em `tintaMessages.js` (ADR-0013).
- Contrato de erro do backend completado: todo erro responde no formato `{ message }`, inclusive falha inesperada (500) e acesso negado (403); as exceções do Spring MVC mantêm o status correto (400, 405, 415) para o frontend mapear a mensagem certa.
- Fechamento das métricas pendentes da Entrega 8: tempo de resposta (m3) medido no staging acordado, taxa de aprovação de PRs (m4) das Sprints 3 e 4, velocity (m5) e comparação antes/depois da reengenharia do PhaseUnlockService (m6), com evidência de cobertura do JaCoCo.
- Testes de aceitação do MVP (TA-01 a TA-13) executados e documentados em `docs/testes-de-aceitacao.md`, com evidências em `docs/evidencias/aceitacao`.
- Ambiente de staging documentado e operacional, com instruções de build, execução local e credenciais de teste em `docs/DEPLOY.md`.

---

## Limitações conhecidas

- Só o gênero Aventura tem conteúdo cadastrado; os demais aparecem como em breve.
- O staging usa o plano gratuito do Render, que hiberna após inatividade; a primeira requisição depois da hibernação é mais lenta (cold start).
- Defeitos abertos na execução dos testes de aceitação, registrados para tratamento após a RC:
  - #172 - frontend do staging desatualizado, ainda não reflete o RC (mensagens do Tinta ausentes no staging).
  - #173 - gêneros sem conteúdo aparecem clicáveis e levam a 404 em vez de "em breve".
  - #174 - fase reprovada no quiz conta como concluída na trilha e concede XP (defeito de integridade de progresso; o desbloqueio da próxima fase continua respeitando a regra).
  - #175 - página de Perfil não usa a voz do Tinta no erro e não tem botão de tentar de novo.

---

## Ambiente de teste

- Frontend: https://librum-frontend.onrender.com
- Backend: https://projeto-librum.onrender.com
- Credenciais de teste, dados de demonstração e instruções para rodar localmente: ver `docs/DEPLOY.md`.

---

## Mapa de aliases git

A análise de contribuição da Entrega 8 foi dificultada por aliases git diferentes do nome real. O mapa abaixo resolve a correspondência.

| Alias no git | Integrante |
|--------------|------------|
| anthyer | Antonio Marcos da Silva |
| bombazaro | Bernardo Silva Bombazaro |
| Maria0912204 | Maria Carolina Hammes |
| giuliano-marcus-bianco | Giuliano Marcus Bianco |

## Contribuições individuais na Sprint 5

Cada integrante ficou responsável por três blocos de esforço comparável. O vínculo por issue e PR foi conferido pelo autor real de cada PR mergeado.

### Antonio Marcos da Silva (anthyer) - Scrum Master e Arquiteto

- A1 - Contrato de erro do backend: handlers para falha inesperada (500) e acesso negado (403) no formato único, com testes. Issue #155, PR #157.
- A2 - Comparação antes/depois da reengenharia (m6): ficha com LOC, responsabilidades, dependências e cobertura do PhaseUnlockService. Issue #156, PR #158.
- A3 - Fechamento do Release Candidate: documentação final, backlog, riscos, contribuições e tags. Issue #177, este PR.

### Bernardo Silva Bombazaro (bombazaro) - DevOps e Frontend

- B1 - Feedback do Tinta na autenticação: carregamento e mensagens no login e cadastro. Issue #151, PR #161.
- B2 - Feedback do Tinta em Gêneros e Home. Issue #152, PR #164.
- B3 - Ambiente acessível e deploy: DEPLOY.md operacional, credenciais de teste, README e triagem do npm audit. Issue #153, PR #154.

### Maria Carolina Hammes (Maria0912204) - Líder de Frontend

- M1 - Catálogo do Tinta e componentes de feedback: tintaMessages.js, LoadingState, Button e ErrorState, com a ADR-0013. Issue #159, PR #160.
- M2 - Feedback do Tinta na Leitura e na Trilha. Issue #162, PR #163.
- M3 - Testes dos componentes de feedback. Issue #165, PR #166.

### Giuliano Marcus Bianco (giuliano-marcus-bianco) - Quality Engineer e Frontend

- G1 - Feedback do Tinta no Quiz e na Fase Concluída. Issue #167, PR #168.
- G2 - Testes de aceitação do MVP (TA-01 a TA-13), com evidências. Issue #171, PR #176.
- G3 - Fechamento das métricas m3, m4 e m5 e evidência de cobertura do PhaseUnlockService. Issue #169, PR #170.
