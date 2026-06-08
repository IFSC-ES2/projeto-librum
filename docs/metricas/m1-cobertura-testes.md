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
| 06/04/2026 | n/d           | Sprint 1 ainda nao iniciado. Coleta comeca a partir do primeiro PR com codigo de producao. |
| 15/05/2026 | ~70% (backend) | Sprint 2 concluida. 12 testes implementados: 5 em ReadingServiceTest, 4 em ProgressServiceTest, 3 em ReadingControllerIntegrationTest. Cobertura de frontend nao iniciada, prioridade para Sprint 3. |
| 28/05/2026 | ~75% (backend) | Sprint 3 concluida. 11 novos testes: 5 em QuizServiceUnlockTest, 3 em ReadingServiceUnlockTest, 3 em XpServiceTest. Total acumulado: 31 testes no backend. Cobertura de frontend nao iniciada; permanece como divida tecnica. |
| 08/06/2026 | ~75% (backend) + frontend iniciada | Sprint 4 concluida. Cobertura de backend estavel em relacao a Sprint 3; a extracao do PhaseUnlockService redistribuiu responsabilidades sem reduzir cobertura. Frontend: cobertura iniciada com 11 testes de componentes do design system (Button: 4 testes, GenreBadge: 3 testes, ReadingPage: 4 testes). Evidencia objetiva do relatorio JaCoCo/Maven a ser anexada a partir da saida de `mvn test -Djacoco.skip=false` no CI ou localmente. |

> Nota C6: a avaliacao da Entrega 6 apontou que as entradas anteriores citavam o percentual sem evidencia objetiva. A partir desta entrada, a referencia deve ser a saida textual do relatorio JaCoCo (secao "Coverage summary" ou equivalente), nao apenas o numero estimado.
