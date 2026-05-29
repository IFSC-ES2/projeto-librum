# Critérios Iniciais de Qualidade

Este documento define os atributos de qualidade priorizados para o projeto Librum. O objetivo, nesta etapa, é estabelecer quais aspectos de qualidade vão orientar decisões de desenvolvimento, arquitetura e testes ao longo das próximas sprints, com base no modelo ISO/IEC 25010.

**Última atualização:** abril de 2026 (Entrega 4)

---

## Modelo de qualidade adotado

A equipe adota como referência o modelo **ISO/IEC 25010**, que define as características e subcaracterísticas de qualidade de produto de software. Nesta entrega, selecionamos 4 atributos prioritários com base no contexto do MVP e nos riscos identificados no projeto.

---

## Atributos de qualidade priorizados

### 1. Manutenibilidade

**Subcaracterísticas relevantes (ISO/IEC 25010):** modularidade, testabilidade, analisabilidade, modificabilidade.

**Por que é prioritário para o Librum:**
O projeto está em fase inicial de desenvolvimento, com uma equipe pequena e escopo ainda sujeito a ajustes. A capacidade de modificar, corrigir e evoluir o código com segurança é essencial para sobreviver às revisões de escopo que podem ocorrer entre sprints. Além disso, sem manutenibilidade, qualquer refatoração futura (adicionar novos gêneros, novos livros, novas mecânicas de quiz) se torna arriscada e lenta.

**Como vai orientar decisões nas próximas etapas:**
Separação clara de responsabilidades entre camadas (frontend, backend, banco)
Testes automatizados como parte do DoD (Definição do Feito) desde o Sprint 1
Revisão de código obrigatória via Pull Request antes de qualquer merge

---

### 2. Confiabilidade

**Subcaracterísticas relevantes (ISO/IEC 25010):** ausência de falhas, disponibilidade, recuperabilidade.

**Por que é prioritário para o Librum:**
O público-alvo são crianças e adolescentes de 9 a 16 anos. Uma experiência instável, com erros inesperados ou perda de progresso, quebra o engajamento e compromete a proposta central do produto. O Librum só funciona como ferramenta de incentivo à leitura se a experiência for consistente e confiável.

**Como vai orientar decisões nas próximas etapas:**
Tratamento adequado de erros em todas as integrações entre frontend e backend
Persistência confiável do progresso do leitor (XP, fase atual, questões respondidas)
Testes de regressão para as funcionalidades centrais (autenticação, quiz, progressão)

---

### 3. Capacidade de interação

**Subcaracterísticas relevantes (ISO/IEC 25010):** aprendibilidade, proteção contra erros do usuário, operacionalidade.

**Por que é prioritário para o Librum:**
O aplicativo é destinado a um público jovem sem experiência técnica. A interface precisa ser intuitiva o suficiente para que uma criança de 9 anos consiga navegar pelos gêneros, ler uma fase e responder um quiz sem instrução prévia. Se a curva de aprendizado for alta, o produto falha no seu propósito antes mesmo de chegar ao conteúdo.

**Como vai orientar decisões nas próximas etapas:**
Decisões de design de interface priorizando clareza e progressão visual evidente
Feedback imediato e compreensível nas ações do usuário (acerto/erro no quiz, XP ganho, desbloqueio de fase)
Validação de fluxos com usuários reais do público-alvo nas sprints finais

---

### 4. Desempenho

**Subcaracterísticas relevantes (ISO/IEC 25010):** comportamento temporal, utilização de recursos.

**Por que é prioritário para o Librum:**
O requisito não funcional RNF02 já estabelece que o sistema deve responder em menos de 2 segundos. Para um produto gamificado voltado a adolescentes habituados a redes sociais e jogos digitais, lentidão é diretamente percebida como falha. Páginas lentas interrompem o fluxo de leitura e comprometem a experiência de progressão que é o coração do produto.

**Como vai orientar decisões nas próximas etapas:**
Monitoramento de tempo de resposta por endpoint a cada sprint (meta: média abaixo de 2000ms)
Atenção ao carregamento inicial da tela de gêneros e da tela de leitura
Nenhum endpoint essencial deve depender de chamadas encadeadas não necessárias

---

## Relação entre riscos e atributos de qualidade

A tabela abaixo explicita quais atributos de qualidade são afetados pelos riscos mais críticos identificados no [Registro de Riscos](./riscos.md), e como as ações de mitigação ajudam a protegê-los.

| Risco | Atributo(s) afetado(s) | Como a mitigação protege o atributo |
|-------|------------------------|--------------------------------------|
| R02 — Escopo real do MVP maior do que o estimado | Manutenibilidade | Manter o escopo sob controle reduz a pressão por atalhos técnicos que comprometem a estrutura do código |
| R03 — Dificuldade com modelagem do conteúdo em fases | Manutenibilidade, Confiabilidade | Uma decisão de modelagem bem fundamentada (registrada como ADR) evita estruturas frágeis e difíceis de manter |
| R04 — Integração entre frontend e backend gera atrasos | Confiabilidade, Desempenho | Contratos de API bem definidos reduzem retrabalho e evitam integrações instáveis ou lentas |
| R05 — Falta de questões de quiz | Capacidade de interação | Sem conteúdo adequado, a experiência gamificada se torna vazia e desmotivadora para o usuário |
| R07 — Ausência de testes automatizados | Manutenibilidade, Confiabilidade | Testes automatizados são a principal salvaguarda contra regressões silenciosas e viabilizam refatoração segura |

---

## Avaliação preliminar da qualidade

### Escopo inicial do que se pretende avaliar

Nesta etapa, a avaliação de qualidade ainda não inclui medições ou testes formais. O objetivo é estabelecer quais aspectos serão observados nas próximas sprints, criando uma base para avaliações futuras mais concretas.

O foco inicial estará nos seguintes pontos:
Cobertura de testes automatizados como proxy de manutenibilidade e confiabilidade
Tempo de resposta dos endpoints principais como evidência de desempenho
Clareza do fluxo de navegação avaliada informalmente com usuários do público-alvo

### Métricas e evidências preliminares por atributo

| Atributo | Métrica ou evidência futura | Como será observado |
|----------|-----------------------------|---------------------|
| Manutenibilidade | Cobertura de testes automatizados | Relatório de cobertura gerado no CI a cada PR (meta: ≥ 60%) |
| Confiabilidade | Taxa de erros em produção/staging | Logs da aplicação após cada deploy (meta: < 2%) |
| Capacidade de interação | Observação de uso com usuários reais | Sessão informal com pessoas do público-alvo nas sprints finais |
| Desempenho | Tempo médio de resposta por endpoint | Monitoramento via logs do backend a cada sprint (meta: < 2000ms) |

> As métricas de cobertura, taxa de erros e tempo de resposta já estão formalizadas em [docs/metricas.md](./metricas.md). Este documento as relaciona explicitamente aos atributos de qualidade da ISO/IEC 25010.

---

## Observações

Os atributos definidos aqui são um ponto de partida, não uma lista exaustiva. À medida que o projeto avança e a equipe acumula dados reais, cobertura e uso, esses critérios serão revisados e expandidos nas próximas entregas.

## Sprint 1 - Resultados e Evidências (Atualização: 28/04/2026)

Nesta sprint, os atributos de qualidade foram validados através das seguintes ações práticas durante o desenvolvimento da US01 (Autenticação):

### 1. Evidências de Manutenibilidade
* **Revisão por Pares (Peer Review):** O código do frontend passou por inspeção rigorosa. Foram identificados débitos técnicos iniciais (falta de componentes de formulário e caminhos de rota inconsistentes), que foram corrigidos antes do merge final para garantir a modularidade.
* **Padronização de Código:** Implementação da camada de `services/authService.js` para isolar as chamadas de API, facilitando futuras manutenções conforme o padrão ADR-0005.
* **Cobertura de Testes Automatizados (Backend):** Foram implementados e aprovados 8 testes de unidade com o framework JUnit 5 e Mockito, com foco nas lógicas de negócio e segurança (classes `AuthService` e `JwtUtil`).

### 2. Evidências de Confiabilidade
* **Tratamento de Erros:** Foram implementadas mensagens de erro específicas para falhas de rede ("Network Error") e credenciais inválidas (Erro 401/409), garantindo que o sistema não falhe silenciosamente perante o usuário.
* **Gestão de Dependências:** Identificada e corrigida a ausência da biblioteca `axios` no ambiente de desenvolvimento, estabelecendo a necessidade de execução de `npm install` como pré-requisito de build estável.
* **Integração Contínua (CI):** O pipeline do GitHub Actions foi configurado com sucesso e exige que todos os testes automatizados passem antes de permitir merge na branch principal.

### 3. Evidências de Capacidade de Interação
* **Feedback Visual:** Implementação de alertas de sucesso e redirecionamento automático (Timer de 2s) após o cadastro, melhorando a operacionalidade para o público jovem.
* **Proteção contra Erros do Usuário:** Adição de validações no frontend para senhas com menos de 8 caracteres e divergência entre campos de "Confirmação de Senha" antes do envio para o servidor.

### 4. Evidências de Desempenho
* **Build Otimizado:** O projeto passou com sucesso pelo teste de build (`npm run build`), gerando artefatos leves e validados pelo compilador do Vite, garantindo o comportamento temporal esperado para o primeiro vertical slice.

---

## Sprint 2 - Resultados e Evidências (Atualização: 15/05/2026)

Nesta sprint, os atributos de qualidade foram validados durante o desenvolvimento das histórias US02, US04 e US05.

### 1. Evidências de Manutenibilidade

Aplicação de dois padrões de projeto documentados em `docs/pradroes-de-projeto.md`:

O padrão Facade foi aplicado no `ReadingService.java` para isolar a lógica de orquestração dos repositories do controller. Isso mantém o `ReadingController` simples e focado em receber requisições e devolver respostas, sem conter regras de negócio.

O padrão Strategy foi aplicado em `readingThemes.js` para separar os temas de leitura do componente `ReadingPage.jsx`. Cada tema é um objeto independente com a mesma interface, eliminando condicionais no componente.

Ambos os padrões foram registrados em ADRs (ADR-0006 e ADR-0007) para rastreabilidade das decisões.

### 2. Evidências de Confiabilidade

Foram implementados 12 testes automatizados no backend, todos passando no CI:

- `ReadingServiceTest.java`: 5 casos cobrindo fase destravada, fase travada (403), segmento inexistente (404), lista de fases com desbloqueio correto e estado inicial sem progresso.
- `ProgressServiceTest.java`: 4 casos cobrindo criação de progresso, atualização sem regressão, marcação de fase concluída e desbloqueio da fase seguinte.
- `ReadingControllerIntegrationTest.java`: 3 casos cobrindo acesso público a `/genres`, bloqueio sem token em `/reading` e acesso autenticado com sucesso.

O endpoint `GET /genres` foi configurado como público no `SecurityConfig.java` para não exigir autenticação na tela inicial de seleção. Os demais endpoints exigem token JWT válido.

### 3. Evidências de Capacidade de Interação

A tela de seleção de gêneros (`GenresPage.jsx`) exibe claramente quais gêneros estão disponíveis com o badge "Em andamento" e quais estão indisponíveis com o badge "Em breve". O botão dos gêneros inativo é visualmente desabilitado e não pode ser clicado.

A `PhaseListPage.jsx` exibe o progresso do leitor como barra percentual calculada dinamicamente a partir dos dados da API, com indicação visual das fases concluídas e da próxima fase disponível.

### 4. Evidências de Desempenho

Todos os merges da Sprint 2 foram realizados com CI verde. O job `frontend-build` valida que o bundle gerado pelo Vite compila sem erros. Nenhum endpoint essencial da sprint depende de chamadas encadeadas desnecessárias: a lógica de orquestração está centralizada no `ReadingService` e retorna tudo em uma única resposta por requisição.

---

## Sprint 3: Resultados e Evidências (Atualização: 28/05/2026)

Nesta sprint, os atributos de qualidade foram validados durante o desenvolvimento das histórias US06, US07, US08 e US09, e na correção dos bugs BUG-02 a BUG-08 identificados no frontend.

### 1. Evidências de Manutenibilidade

Aplicação de mais dois padrões de projeto, documentados em `docs/pradroes-de-projeto.md`:

O padrão Command foi aplicado no `QuizService.java` para encapsular toda a lógica de submissão de quiz — validação de respostas, cálculo de XP, atualização de nível e persistência de progresso — em um único método `submitQuiz()`. O controller chama apenas esse método sem conhecer nenhuma regra de negócio interna. Registrado em ADR-0008.

O padrão Template Method foi aplicado em `ReadingService.isPhaseUnlocked()` para trocar o critério de desbloqueio de fase (de "leitura concluída" para "quiz concluído") sem modificar o esqueleto do algoritmo de verificação. O passo variável foi delegado ao `UserProgressRepository` via `existsByUserIdAndPhaseIdAndQuizCompletedTrue`. Registrado em ADR-0009.

A troca do critério de desbloqueio exigiu alterar apenas uma linha no método `isPhaseUnlocked()` — evidência direta de que o Template Method atingiu seu objetivo de isolar a variação.

### 2. Evidências de Confiabilidade

Foram corrigidos 8 bugs críticos do frontend identificados durante a pré-sprint:

- BUG-02: crash do `QuizPage` por desestruturação de `null` na linha 8.
- BUG-03: feedback do quiz não mostrava acerto ou erro (mock sempre retornava A/B como correto).
- BUG-04: breadcrumb e botão "← Livros" hardcoded em `ReadingPage`.
- BUG-05: `QuizResultPage` navegava para `/genres/aventura` hardcoded.
- BUG-06: botão "Ir ao quiz →" aparecia em todos os segmentos, inclusive nos intermediários.
- BUG-07: `Navbar` criada mas não integrada em nenhuma página autenticada.
- BUG-08: novo usuário começava na Fase 3 em vez da Fase 1.
- BUG-09: compilação falhava ao adicionar campos novos a records Java nos testes de integração.

Foram implementados 11 novos testes automatizados no backend, todos passando no CI:

- `QuizServiceUnlockTest.java`: 5 casos cobrindo `quizCompleted = true` quando aprovado, não marcação quando reprovado, `passed = true` com até 2 erros, `passed = false` com 3+ erros e desbloqueio de fase somente quando aprovado.
- `ReadingServiceUnlockTest.java`: 3 casos cobrindo retorno `false` se quiz anterior não concluído, retorno `true` se quiz concluído e retorno `true` para a Fase 1 sempre.
- `XpServiceTest.java`: 3 casos cobrindo cálculo de XP por acertos, incremento de nível ao atingir limiar e acúmulo correto de XP total.

O CI foi reconfigurado para usar perfil H2 em memória nos testes de integração (`application-test.properties`), eliminando a dependência do PostgreSQL nos runners do GitHub Actions e tornando o pipeline mais estável.

### 3. Evidências de Capacidade de Interação

A `PhaseListPage.jsx` passou a exibir as fases conectadas por setas verticais (`.phase-connector`), formando uma trilha visual que comunica claramente a progressão sequencial do conteúdo.

A `PhaseCompletedPage.jsx` foi criada para exibir, ao término de cada quiz, o resultado de aprovação ou reprovação com: badge "FASE X CONCLUÍDA!", XP ganho em destaque, contagem de acertos, barra de progresso de nível e botão de navegação para a próxima fase (ou "Reler a Fase" em caso de reprovação).

O `QuizPage.jsx` passou a exibir feedback imediato por questão após o usuário confirmar cada resposta: a opção correta fica verde, a incorreta fica vermelha, e o painel de explicação (`explanation`) exibe o raciocínio da resposta correta — tornando o quiz uma ferramenta de aprendizado, não apenas de avaliação.

A integração da `Navbar` via `Layout.jsx` garantiu que o menu de navegação e o botão de logout estejam disponíveis em todas as páginas autenticadas, sem redundância de código.

### 4. Evidências de Desempenho

Todos os merges desta sprint (PR #110, #117, #118) foram realizados com CI verde. Os novos endpoints introduzidos na sprint foram medidos localmente:

- `GET /reading/{phaseId}/{segmentNumber}` com o campo `genreSlug` adicionado: nenhuma query adicional ao banco, campo já disponível via relacionamento JPA existente.
- `POST /quiz/{phaseId}/submit` com lógica de `quizCompleted` e `nextPhaseId`: medido abaixo de 50ms em ambiente local, bem dentro do RNF02 (< 2000ms).
- `GET /quiz/{phaseId}` com os campos `correctOption` e `explanation`: campos adicionados à query JPA existente sem join extra; tempo de resposta mantido abaixo de 150ms.

As migrations V6, V7 e V8 foram aplicadas sem recriar dados existentes, garantindo que o progresso de usuários de sprints anteriores fosse preservado.

