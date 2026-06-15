# Registro de Riscos

Este documento registra os riscos identificados para o projeto Librum. É um artefato vivo e deve ser revisitado e atualizado a cada entrega.

**Última atualização:** junho de 2026 (Entrega 9 - Release Candidate)

---

## Critério de classificação

### Probabilidade

| Nível | Descrição |
|-------|-----------|
| Alta | Maior chance de acontecer do que não acontecer ao longo do projeto |
| Média | Possível, mas não esperado que aconteça |
| Baixa | Improvável, mas não pode ser descartado |

### Impacto

| Nível | Descrição |
|-------|-----------|
| Alto | Compromete a entrega do MVP no prazo ou inviabiliza funcionalidades essenciais |
| Médio | Afeta o cronograma ou a qualidade, mas pode ser contornado com ajustes |
| Baixo | Causa transtorno pontual, sem comprometer o projeto como um todo |

### Prioridade

A prioridade é derivada da combinação entre probabilidade e impacto:

| | Impacto Alto | Impacto Médio | Impacto Baixo |
|---|---|---|---|
| **Probabilidade Alta** | Crítico | Alto | Médio |
| **Probabilidade Média** | Alto | Médio | Baixo |
| **Probabilidade Baixa** | Médio | Baixo | Baixo |

---

## Matriz de Riscos

| ID | Descrição resumida | Probabilidade | Impacto | Prioridade |
|----|-------------------|---------------|---------|------------|
| R01 | Sobrecarga acadêmica reduz disponibilidade da equipe | Alta | Médio | **Alto** |
| R02 | Escopo real do MVP maior do que o estimado | Média | Alto | **Alto** |
| R03 | Dificuldade técnica com modelagem do conteúdo literário em fases | Média | Alto | **Alto** |
| R04 | Integração entre frontend e backend gera atrasos | Média | Médio | **Médio** |
| R05 | Falta de questões de quiz para os livros selecionados | Alta | Médio | **Alto** |
| R06 | Dependência de livros de domínio público com estrutura inadequada | Baixa | Alto | **Médio** |
| R07 | Ausência de testes automatizados compromete a estabilidade | Alta | Médio | **Alto** |

---

## Detalhamento dos Riscos

### R01 — Sobrecarga acadêmica reduz disponibilidade da equipe

| Campo | Conteúdo |
|-------|----------|
| **Descrição** | A equipe é composta por estudantes com outras disciplinas simultâneas. Em períodos de provas e entregas paralelas, a disponibilidade semanal pode cair significativamente abaixo das 4h por pessoa estimadas na baseline. |
| **Causa** | Calendário acadêmico intenso com sobreposição de avaliações em múltiplas disciplinas. |
| **Consequência** | Atraso nas entregas de sprint, redução da velocity e risco de não concluir o MVP no prazo. |
| **Probabilidade** | Alta |
| **Impacto** | Médio |
| **Prioridade** | Alto |
| **Estratégia de mitigação** | Alinhar antecipadamente as semanas de menor disponibilidade, priorizar issues de maior valor no início de cada sprint e reduzir escopo quando necessário, antes de comprometer a qualidade. |
| **Responsável** | Maria |

---

### R02 — Escopo real do MVP maior do que o estimado

| Campo | Conteúdo |
|-------|----------|
| **Descrição** | Ao iniciar o desenvolvimento das histórias, a equipe pode descobrir que as histórias estimadas exigem mais esforço do que o previsto, especialmente nas camadas de integração entre frontend, backend e banco de dados. |
| **Causa** | Ausência de histórico de velocity e incerteza técnica nas primeiras sprints. |
| **Consequência** | Sprints com carry-over frequente, desmotivação da equipe e entrega incompleta do MVP. |
| **Probabilidade** | Média |
| **Impacto** | Alto |
| **Prioridade** | Alto |
| **Estratégia de mitigação** | Revisar estimativas após o Sprint 1 com dados reais de velocity. Cortar funcionalidades de menor prioridade (US08, US09, US10) antes de comprometer as histórias essenciais. |
| **Responsável** | Giuliano |

---

### R03 — Dificuldade técnica com modelagem do conteúdo literário em fases

| Campo | Conteúdo |
|-------|----------|
| **Descrição** | A US04 (leitura em fases) envolve modelar capítulos de livros reais divididos em partes menores, o que ainda não tem uma solução definida. A estrutura de dados para representar livros, fases e progresso pode se mostrar mais complexa do que o esperado. |
| **Causa** | Dependência de conteúdo real e decisão de design de dados ainda pendente (registrada na baseline). |
| **Consequência** | Atraso no início do desenvolvimento da US04 e das histórias que dependem dela (US05, US06, US07). |
| **Probabilidade** | Média |
| **Impacto** | Alto |
| **Prioridade** | Alto |
| **Estratégia de mitigação** | Priorizar a decisão de design de dados — incluindo como o conteúdo literário será armazenado — antes ou durante o Sprint 1. Registrar a decisão como ADR. |
| **Responsável** | Antonio |

---

### R04 — Integração entre frontend e backend gera atrasos

| Campo | Conteúdo |
|-------|----------|
| **Descrição** | Membros desenvolvendo partes diferentes do sistema (frontend e backend) podem ter desalinhamento nos contratos de API, causando retrabalho na integração. |
| **Causa** | Trabalho paralelo sem contrato de API definido previamente. |
| **Consequência** | Funcionalidades prontas individualmente que não se integram, gerando atrasos na finalização das histórias. |
| **Probabilidade** | Média |
| **Impacto** | Médio |
| **Prioridade** | Médio |
| **Estratégia de mitigação** | Definir e documentar os contratos de API (endpoints, payloads, status codes) antes de começar o desenvolvimento de cada funcionalidade. |
| **Responsável** | Antonio |

---

### R05 — Falta de questões de quiz para os livros selecionados

| Campo | Conteúdo |
|-------|----------|
| **Descrição** | O quiz de compreensão (US06) depende de um banco de questões vinculado ao conteúdo de cada fase. Essas questões precisam ser criadas manualmente para cada livro e fase, o que representa um esforço de conteúdo não estimado separadamente. |
| **Causa** | A criação de conteúdo (questões) não foi incluída nas estimativas de story points e não tem responsável definido. |
| **Consequência** | O sistema de quiz pode ficar pronto do ponto de vista técnico, mas sem conteúdo para servir ao usuário no MVP. |
| **Probabilidade** | Alta |
| **Impacto** | Médio |
| **Prioridade** | Alto |
| **Estratégia de mitigação** | Iniciar a criação das questões assim que o livro for selecionado, em paralelo ao desenvolvimento. Avaliar uso de IA generativa para agilizar a produção do banco inicial de questões, com revisão humana. |
| **Responsável** | Maria |

---

### R06 — Dependência de livros de domínio público com estrutura inadequada

| Campo | Conteúdo |
|-------|----------|
| **Descrição** | Os livros selecionados para o MVP precisam ser de domínio público. Pode ocorrer de o livro escolhido não se encaixar bem no formato de fases curtas, seja por estilo narrativo, extensão dos capítulos ou inadequação ao público-alvo de 9 a 16 anos. |
| **Causa** | Limitação legal (domínio público) combinada com requisito de adequação ao público. |
| **Consequência** | Necessidade de substituir o livro escolhido próximo ao início do desenvolvimento, gerando retrabalho. |
| **Probabilidade** | Baixa |
| **Impacto** | Alto |
| **Prioridade** | Médio |
| **Estratégia de mitigação** | Validar antecipadamente os livros candidatos quanto à adequação ao público e ao formato de fases antes de iniciar qualquer modelagem de conteúdo. |
| **Responsável** | Maria |

---

### R07 — Ausência de testes automatizados compromete a estabilidade

| Campo | Conteúdo |
|-------|----------|
| **Descrição** | A equipe pode priorizar entrega de funcionalidades em detrimento de testes automatizados, especialmente nas primeiras sprints. Isso reduz a rastreabilidade de regressões e a confiança no código entregue. |
| **Causa** | Pressão por velocidade de entrega e curva de aprendizado com configuração de testes na stack escolhida. |
| **Consequência** | Bugs silenciosos em funcionalidades já entregues, dificuldade de refatorar com segurança e não cumprimento da meta de 60% de cobertura definida nas métricas. |
| **Probabilidade** | Alta |
| **Impacto** | Médio |
| **Prioridade** | Alto |
| **Estratégia de mitigação** | Incluir testes como critério de DoD desde o Sprint 1. Bloquear merge de PRs abaixo da cobertura mínima via CI. Reservar parte do tempo de cada sprint para escrita de testes. |
| **Responsável** | Bernardo |

---

## Riscos mais críticos no momento

Os riscos **R01**, **R02**, **R03**, **R05** e **R07** são os mais críticos neste momento, pois possuem prioridade **Alta** e estão ativos já nas primeiras sprints do projeto.

- **R01 e R05** têm alta probabilidade e exigem ações preventivas imediatas.
- **R02 e R03** têm impacto muito alto sobre a viabilidade do MVP.
- **R07** é estrutural: se não for controlado desde o começo, compromete todo o ciclo de qualidade definido nas métricas.

---

## Plano de Resposta aos Riscos

### Ações preventivas

- **R01:** Maria alinha com a equipe no início de cada sprint quais semanas têm maior carga acadêmica e ajusta o planejamento.
- **R02:** Giuliano monitora a velocity após cada sprint e aciona revisão de escopo se necessário.
- **R03:** Antonio lidera a decisão de modelagem de conteúdo antes do Sprint 2 e registra como ADR.
- **R04:** Antonio define contratos de API antes do início de cada história que envolva integração.
- **R05:** Maria inicia a curadoria de questões assim que o livro for selecionado.
- **R06:** Maria valida adequação dos livros ao formato e público antes de qualquer modelagem.
- **R07:** Bernardo configura CI com verificação de cobertura, inclui testes no DoD desde o Sprint 1.

### Ações caso o risco se concretize

- **R01:** Reduzir escopo da sprint, mover histórias menos prioritárias para a próxima iteração.
- **R02:** Cortar US08, US09, US10 do MVP se necessário para proteger US01–US07.
- **R03:** Adotar estrutura mais simples inicialmente (texto plano por fase, sem formatação elaborada) e evoluir depois.
- **R04:** Realizar sessão de integração dedicada entre os membros responsáveis pelo frontend e backend.
- **R05:** Lançar o MVP com um gênero e conjunto mínimo de questões validadas manualmente.
- **R06:** Substituir o livro por outro candidato já previamente mapeado na lista de obras de domínio público.
- **R07:** Priorizar cobertura de testes nas histórias mais críticas (autenticação, quiz, XP) antes do merge final.

### Acompanhamento

Os riscos serão revisitados ao final de cada sprint na retrospectiva. Maria é responsável por atualizar este documento a cada entrega com o status atual de cada risco (ativo, mitigado, concretizado ou encerrado).

---

## Status da Sprint 2 (15/05/2026)

**R03 (Dificuldade técnica modelagem): Encerrado.** A modelagem foi concluída com sucesso e implementada via migration V2 e ADR-0006.

**R04 (Integração FE/BE): Mitigado.** O uso de contratos de API claros e do padrão Facade no backend reduziu os erros de integração nesta sprint.

**R07 (Testes automatizados): Ativo.** Foram criados 12 testes para o backend. A cobertura do frontend ainda não foi iniciada e é prioridade para a Sprint 3.

**R01 (Sobrecarga acadêmica): Monitorado.** A equipe manteve o ritmo nesta sprint, mas o risco permanece para o final do semestre.

**R05 (Falta de questões de quiz): Ativo.** O sistema de quiz (US06) foi postergado para a Sprint 3. As questões precisam ser criadas antes do início do desenvolvimento.

### Novos riscos identificados

**R08: Integração do quiz com o progresso de leitura**

A US06 precisa se integrar ao sistema de progresso da US05. O endpoint `POST /progress/mark-read` já existe, mas a lógica de aprovação no quiz (acertar X questões para liberar a próxima fase) ainda não foi definida. Se essa regra for decidida tarde, pode gerar retrabalho no backend e no frontend.

- Probabilidade: Média
- Impacto: Alto
- Prioridade: Alto
- Responsável: Antonio

**R09: Cobertura de testes no frontend**

Nenhum teste de componente foi implementado no frontend até o final da Sprint 2. Com a ReadingPage, PhaseListPage e GenresPage prontas, o risco de regressão em funcionalidades já entregues aumenta a cada sprint.

- Probabilidade: Alta
- Impacto: Médio
- Prioridade: Alto
- Responsável: Giuliano

### Ações de mitigação para a Sprint 3

- R07 e R09: Giuliano implementa ReadingPage.test.jsx no início da sprint, antes de começar as histórias novas. Os testes entram como critério de DoD do PR.
- R08: Antonio define a regra de aprovação do quiz e registra em ADR antes do desenvolvimento da US06 começar.
- R05: Maria inicia a criação das questões de quiz assim que o livro e o formato de perguntas forem validados.
- R01: Maria alinha com a equipe as semanas de maior carga acadêmica no início da sprint e ajusta o planejamento.

---

## Status da Sprint 5 — Release Candidate (14/06/2026)

**R07 e R09 (Testes automatizados, backend e frontend): Mitigado.** O CI passou a executar `npm test -- --run` no job de frontend (antes o pipeline não rodava os testes de front), e foram adicionados testes dos componentes de feedback (Button em carregamento, ErrorState) e do catálogo do Tinta, somando-se aos testes de backend já existentes. A regressão de frontend deixa de passar despercebida no pipeline.

**R01 (Sobrecarga acadêmica): Ativo.** No fechamento do semestre o risco permanece. A sprint foi organizada em três blocos de esforço equilibrado por integrante para diluir a carga.

**R05 (Falta de questões de quiz): Encerrado para o MVP.** O gênero Aventura (A Ilha do Tesouro) tem o conjunto completo de questões via seed (migration V5). O MVP é demonstrado com um gênero completo; os demais aparecem como em breve.

**Vulnerabilidades de dependências (npm audit): Encerrado.** A auditoria do frontend (13/06/2026) foi corrigida com `npm audit fix`, restando 0 vulnerabilidades, sem necessidade de major version bump. Registrado no `DEPLOY.md`.

### Novo risco identificado

**R10: Hibernação do ambiente de staging (plano gratuito do Render)**

O staging roda no plano gratuito do Render, que hiberna após período de inatividade. A primeira requisição depois da hibernação tem cold start elevado (acima de 120s), o que pode dar a impressão de aplicação travada durante a demonstração.

- Probabilidade: Alta
- Impacto: Baixo
- Prioridade: Médio
- Responsável: Bernardo
- Estratégia de mitigação: comportamento documentado no `DEPLOY.md`; a mensagem do Tinta de "biblioteca cochilando" cobre o 503 de cold start; aquecer a aplicação com uma requisição antes da demonstração; as medições de tempo de resposta (m3) foram feitas com a aplicação já acordada.

### Defeitos abertos no Release Candidate

A execução dos testes de aceitação (Bloco G2) registrou quatro defeitos. O #172 (frontend do staging desatualizado) já foi resolvido com o redeploy do staging. Permanecem para tratamento após a RC, nas limitações conhecidas do `release-candidate.md`: #173 (gêneros sem conteúdo levam a 404), #174 (fase reprovada conta como concluída e concede XP) e #175 (Perfil sem a voz do Tinta no erro). O #174 é o mais relevante por afetar a integridade do progresso; são tratados em PRs dedicados.
