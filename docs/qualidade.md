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