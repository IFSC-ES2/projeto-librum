# M1: Cobertura de Testes Automatizados

**Classificação:** Produto

**Objetivo:** Verificar se o código está sendo coberto por testes em proporção suficiente para garantir segurança nas mudanças.

**Como medir:** percentual de linhas cobertas por testes em relação ao total, usando a fórmula (linhas cobertas / total de linhas) × 100.

**Fonte:** relatório de cobertura gerado pelo plugin JaCoCo 0.8.11 (`mvn test`), configurado no `backend/pom.xml` a partir da Sprint 4.

**Responsável:** Giuliano

**Interpretação:** a meta mínima é 60%. Abaixo disso, o merge fica bloqueado até que a cobertura seja complementada.

---

## Histórico de coleta

| Data       | Valor coletado | Observação                        |
|------------|---------------|-----------------------------------|
| 06/04/2026 | n/d           | Sprint 1 ainda nao iniciado. Coleta comeca a partir do primeiro PR com codigo de producao. |
| 15/05/2026 | ~70% (backend, estimado) | Sprint 2 concluida. 12 testes implementados: 5 em ReadingServiceTest, 4 em ProgressServiceTest, 3 em ReadingControllerIntegrationTest. Cobertura de frontend nao iniciada, prioridade para Sprint 3. Valor estimado; JaCoCo nao estava configurado nesta sprint. |
| 28/05/2026 | ~75% (backend, estimado) | Sprint 3 concluida. 11 novos testes: 5 em QuizServiceUnlockTest, 3 em ReadingServiceUnlockTest, 3 em XpServiceTest. Total acumulado: 31 testes no backend. Valor estimado; JaCoCo nao estava configurado nesta sprint. |
| 08/06/2026 | 85,6% linhas (backend) + frontend iniciada | Sprint 4 concluida. JaCoCo 0.8.11 configurado no pom.xml e executado. Backend: 44 testes, BUILD SUCCESS. Frontend: 11 testes de componentes (Button: 4, GenreBadge: 3, ReadingPage: 4). Ver evidencia abaixo. |

## Evidencia de cobertura - Sprint 4 (08/06/2026)

Gerado por `mvn test` com jacoco-maven-plugin 0.8.11 em `backend/`:

```
[INFO] Tests run: 44, Failures: 0, Errors: 0, Skipped: 0
[INFO] --- jacoco:0.8.11:report (report) @ librum-backend ---
[INFO] Loading execution data file .../backend/target/jacoco.exec
[INFO] BUILD SUCCESS
```

Resumo do relatório (`jacoco.xml`):

| Metrica      | Coberto | Perdido | Total | Percentual |
|--------------|---------|---------|-------|------------|
| Instrucoes   | 1636    | 310     | 1946  | 84,1%      |
| Linhas       | 417     | 70      | 487   | 85,6%      |
| Branches     | 40      | 12      | 52    | 76,9%      |

Cobertura por camada (linhas):

| Camada                   | Cobertura aproximada |
|--------------------------|----------------------|
| com.librum.service       | 96-100%              |
| com.librum.controller    | 31-100% (media ~67%) |
| com.librum.security      | 54-100% (media ~82%) |
| com.librum.model         | 20-100% (media ~79%) |
| com.librum.dto           | 0-100% (media ~87%)  |
| com.librum.exception     | 11-100%              |

> Nota C6: a avaliacao da Entrega 6 apontou que as entradas anteriores citavam o percentual sem evidencia objetiva. O plugin JaCoCo foi configurado no pom.xml nesta sprint para gerar evidencia real a cada execucao de `mvn test`.
