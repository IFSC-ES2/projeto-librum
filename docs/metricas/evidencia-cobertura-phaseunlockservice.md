# Evidencia de cobertura - PhaseUnlockService e ReadingService

Evidencia de cobertura de teste levantada para apoiar a metrica m6 (reengenharia). Relatorio JaCoCo gerado em 14/06/2026 com `cd backend && ./mvnw clean test`. Relatorio completo em `backend/target/site/jacoco/`.

## Linhas do relatorio (jacoco.csv)

| Classe | Instrucoes cobertas | Linhas cobertas | Branches cobertos | Metodos cobertos |
|--------|---------------------|-----------------|-------------------|------------------|
| PhaseUnlockService | 51/54 (94,4%) | 13/14 (92,9%) | 4/6 (66,7%) | 3/3 (100%) |
| ReadingService | 143/153 (93,5%) | 41/41 (100%) | 2/2 (100%) | 5/7 (71,4%) |

## Observacao

A regra de desbloqueio, antes acoplada ao ReadingService, foi extraida para o PhaseUnlockService (ADR-0010) e passou a ser testavel isoladamente em PhaseUnlockServiceTest, atingindo 94,4% de cobertura de instrucoes. Esse numero alimenta a comparacao antes/depois registrada em `m6-reengenharia.md`.
