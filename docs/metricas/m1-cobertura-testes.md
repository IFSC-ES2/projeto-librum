# M1: Cobertura de Testes Automatizados

**Classificação:** Produto

**Objetivo:** Verificar se o código está sendo coberto por testes em proporção suficiente para garantir segurança nas mudanças.

**Como medir:** percentual de linhas cobertas por testes em relação ao total, usando a fórmula (linhas cobertas / total de linhas) × 100.

**Fonte:** relatório de cobertura gerado no CI a cada Pull Request.

**Responsável:** Giuliano

**Interpretação:** a meta mínima é 60%. Abaixo disso, o merge fica bloqueado até que a cobertura seja complementada.

---

## Histórico de coleta

| Data       | Valor coletado | Observação                        |
|------------|---------------|-----------------------------------|
| 06/04/2026 | n/d           | Sprint 1 ainda não iniciado. Coleta começa a partir do primeiro PR com código de produção. |
| 15/05/2026 | ~70% (backend) | Sprint 2 concluída. 12 testes implementados: 5 em ReadingServiceTest, 4 em ProgressServiceTest, 3 em ReadingControllerIntegrationTest. Cobertura de frontend não iniciada, prioridade para Sprint 3. |
| 28/05/2026 | ~75% (backend) | Sprint 3 concluída. 11 novos testes: 5 em QuizServiceUnlockTest, 3 em ReadingServiceUnlockTest, 3 em XpServiceTest. Total acumulado: 31 testes no backend. Cobertura de frontend não iniciada; permanece como dívida técnica. |
