# M6: Reengenharia - Extracao do PhaseUnlockService

**Classificacao:** Projeto

**Objetivo:** medir de forma objetiva o efeito da extracao da regra de desbloqueio do ReadingService para o PhaseUnlockService (ADR-0010), comparando antes e depois.

**Como medir:** linhas de codigo (wc -l), numero de responsabilidades e de dependencias por classe, e cobertura de teste da regra extraida.

**Fonte:** codigo na tag v0.3.0 (antes) e na main (depois); relatorio JaCoCo.

**Responsavel:** Antonio (Arquiteto), com a evidencia de cobertura levantada por Giuliano.

---

## Comparacao antes/depois

| Indicador | Antes (v0.3.0) | Depois (main) |
|-----------|----------------|---------------|
| LOC do ReadingService | 108 | 93 |
| Responsabilidades do ReadingService | Facade da leitura mais a regra de desbloqueio (isPhaseUnlocked) | So Facade da leitura, delegando o desbloqueio |
| Regra de desbloqueio | metodo privado dentro do ReadingService | classe propria PhaseUnlockService (39 LOC) |
| Testabilidade da regra | so via ReadingService | direta, em PhaseUnlockServiceTest |
| Cobertura do PhaseUnlockService | nao aplicavel | a confirmar (evidencia JaCoCo do Bloco G3) |

## Analise

A extracao reduziu o ReadingService de 108 para 93 linhas e separou a regra de dominio numa classe focada, sem mudar comportamento. A regra passou a ser testavel isoladamente, sem precisar passar pelo contexto de leitura. O ganho principal e de coesao: o ReadingService volta a ser apenas orquestrador, conforme o alerta do ADR-0007 e a decisao do ADR-0010.
