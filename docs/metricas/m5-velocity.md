# M5: Velocity por Sprint

**Classificação:** Projeto

**Objetivo:** Acompanhar a capacidade real de entrega da equipe sprint a sprint e comparar com a estimativa de 8 SP/sprint definida no baseline.

**Como medir:** somar os Story Points de todas as issues movidas para "Done" no board do GitHub Projects ao final de cada sprint.

**Fonte:** board do GitHub Projects (projeto Librum), coluna "Done", filtrado por sprint.

**Responsável:** Maria (Scrum Master)

**Interpretação:**
- Velocity maior ou igual a 8 SP: dentro do planejado.
- Velocity entre 6 e 7 SP: desvio leve, revisar impedimentos na retrospectiva.
- Velocity entre 4 e 5 SP: desvio moderado, repriorizar o backlog conforme o plano de contingência.
- Velocity abaixo de 4 SP: desvio crítico, acionar redefinição formal de escopo (ver `baseline.md`).

---

## Histórico de coleta

| Sprint   | Data de coleta | Velocity (SP entregues) | Observação                          |
|----------|---------------|------------------------|-------------------------------------|
| Sprint 1 | 23/04/2026     | 8 SP                   | US01 entregue completa.                          |
| Sprint 2 | 07/05/2026     | 13 SP                  | US02 (3SP) + US04 (5SP) + US05 (5SP) entregues. |
| Sprint 3 | 28/05/2026     | 18 SP                  | US06 (8SP) + US07 (5SP) + US08 (3SP) + US09 (2SP) entregues. Maior velocity do projeto. |
| Sprint 4 | 08/06/2026     | 2 SP                   | Sprint de consolidacao. A unica historia de produto entregue foi a US03 (navegacao entre generos, 2 SP); o restante foi esforco tecnico sem SP de historia: reestilizacao de quiz e fase concluida, assets em SVG, extracao do PhaseUnlockService, deploy de staging e cobertura de testes de frontend. Com a US03, o acumulado chega a 41 SP, fechando todo o backlog estimado. Velocity baixa em SP por ser sprint de robustez e fechamento, nao de novas historias. A faixa de "desvio critico" da interpretacao acima pressupoe sprints de novas historias; nao se aplica aqui, pois nao havia historias pendentes a entregar e o backlog fechou 100% (41 de 41 SP). |
