# ADR-0010 - Extração da regra de desbloqueio para PhaseUnlockService

## Contexto

O `ReadingService` foi criado como Facade da leitura (ADR-0007), mas com o tempo passou a abrigar também a regra de domínio que decide se uma fase está desbloqueada para o usuário (`isPhaseUnlocked`). O próprio ADR-0007 já apontava o risco de a classe crescer demais. Misturar a orquestração da leitura com a regra de desbloqueio prejudica a coesão e dificulta testar a regra isoladamente.

## Decisão

Extrair o método `isPhaseUnlocked` para uma classe dedicada `PhaseUnlockService`. O `ReadingService` passa a receber esse serviço por injeção e apenas delega a verificação. A regra em si continua a mesma: a Fase 1 está sempre liberada e as demais dependem de o quiz da fase anterior ter sido concluído.

## Alternativas consideradas

- Manter a regra dentro do ReadingService: descartado por baixa coesão e por ir contra o alerta do ADR-0007.
- Colocar a regra no controller: descartado porque acopla a regra de domínio à camada web.

## Classes afetadas

- `PhaseUnlockService` (nova, contém a regra)
- `ReadingService` (passa a delegar)
- `PhaseUnlockServiceTest` (novo, testa a regra direto)
- `ReadingServiceTest` (passa a mockar o PhaseUnlockService)

## O que isso implica

A regra de desbloqueio fica testável de forma isolada e o ReadingService volta a ser apenas orquestrador. Mudar o critério de desbloqueio no futuro passa a afetar somente o PhaseUnlockService.
