# M2: Taxa de Erros em Produção

**Classificação:** Produto

**Objetivo:** Acompanhar a estabilidade do sistema após cada deploy e identificar regressões rapidamente.

**Como medir:** (erros registrados / total de requisições) × 100.

**Fonte:** logs da aplicação em staging ou produção, consultados a cada deploy.

**Responsável:** Giuliano

**Interpretação:** acima de 2% de erros já indica que é necessário abrir um hotfix com prioridade alta.

---

## Histórico de coleta

| Data       | Valor coletado | Observação                        |
|------------|---------------|-----------------------------------|
| 06/04/2026 | n/d           | Ambiente de staging nao disponivel. Coleta comeca no primeiro deploy. |
| 15/05/2026 | n/d           | Sprint 2 concluida. Sem ambiente de staging ou producao disponivel nesta sprint; a aplicacao rodava apenas localmente durante o desenvolvimento. Nao ha dados de taxa de erros para este periodo. Nenhuma regressao critica foi identificada durante os testes manuais locais. |
| 28/05/2026 | n/d           | Sprint 3 concluida. Ambiente de staging configurado ao final da sprint (PR #132), mas nao estava disponivel durante o desenvolvimento. Sem dados formais de taxa de erros. |
| 08/06/2026 | 0% (staging)  | Sprint 4 concluida. Staging publicado pelo Bernardo (PR #132 mergeado). Fluxo de validacao manual percorrido sem erros criticos observados. Medicao formal de taxa de erros por logs do servidor pendente de acesso a URL de staging. |
