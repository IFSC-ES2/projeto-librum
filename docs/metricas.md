# Métricas

As métricas abaixo ainda não têm dados, sendo que essa entrega só a definição inicial. O acompanhamento começa a partir do Sprint 1.

## Métricas de Produto

### Cobertura de Testes Automatizados

**Classificação:** Produto

**Objetivo:** Garantir que o código está sendo testado de forma adequada.

**Como medir:** percentual de linhas cobertas por testes em relação ao total — (linhas cobertas / total de linhas) × 100.

**Fonte:** relatório de cobertura gerado no CI a cada Pull Request.

**Responsável:** Giuliano

**Interpretação:** a meta mínima é 60%. Abaixo disso, a ideia é bloquear o merge até cobrir o que está faltando.

### Taxa de Erros em Produção

**Classificação:** Produto

**Objetivo:** Monitorar a estabilidade do sistema após cada deploy.

**Como medir:** (erros registrados / total de requisições) × 100.

**Fonte:** logs da aplicação em staging ou produção, atualizado a cada deploy.

**Responsável:** Giuliano

**Interpretação:** acima de 2% de erros já indica necessidade de hotfix prioritário.

### Tempo de Resposta das Requisições

**Classificação:** Produto

**Objetivo:** Verificar se o sistema está dentro do RNF02, que exige resposta abaixo de 2 segundos.

**Como medir:** tempo médio entre requisição e resposta (em ms) por endpoint principal.

**Fonte:** logs do backend ou ferramenta de monitoramento, atualizado a cada sprint.

**Responsável:** Giuliano

**Interpretação:** média acima de 2000ms sinaliza problema de desempenho a ser investigado.

### Taxa de Aprovação de Pull Requests

**Classificação:** Processo

**Objetivo:** Avaliar a qualidade do código entregue antes do merge.

**Como medir:** (PRs aprovados sem revisão adicional / total de PRs abertos) × 100.

**Fonte:** GitHub Pull Requests, atualizado a cada sprint.

**Responsável:** Giuliano

**Interpretação:** taxa baixa pode indicar falta de alinhamento entre membros ou DoD mal aplicado.