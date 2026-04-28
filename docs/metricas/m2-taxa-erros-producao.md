# M2: Taxa de Erros em Produção

**Classificação:** Produto

**Objetivo:** Monitorar a estabilidade do sistema após cada deploy.

**Como medir:** (erros registrados / total de requisições) × 100.

**Fonte:** logs da aplicação em staging ou produção, atualizado a cada deploy.

**Responsável:** Giuliano

**Interpretação:** acima de 2% de erros já indica necessidade de hotfix prioritário.

---

## Histórico de coleta

| Data       | Valor coletado | Observação                        |
|------------|---------------|-----------------------------------|
| 06/04/2026 | —             | Ambiente de staging ainda não disponível. Coleta começa no primeiro deploy do Sprint 1. |
