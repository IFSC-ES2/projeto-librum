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
| 06/04/2026 | n/d           | Ambiente de staging ainda não disponível. Coleta começa no primeiro deploy do Sprint 1. |
