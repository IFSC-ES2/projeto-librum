# ADR-0007 - Uso do padrão Facade no ReadingService

## Contexto

O controller de leitura precisaria acessar quatro repositories diferentes para montar a resposta de um único segmento: `PhaseRepository` (verificar se a fase existe), `UserProgressRepository` (verificar se está desbloqueada), `PhaseSegmentRepository` (buscar o conteúdo) e `BookRepository` (buscar título e autor). Colocar essa lógica diretamente no controller violaria a separação de responsabilidades e dificultaria os testes.

## Decisão

`ReadingService.java` implementa o padrão Facade: é o único ponto de entrada para toda a lógica de leitura. O controller chama apenas dois métodos: `getPhaseSegment` e `getPhasesForGenre`. Internamente, o service coordena os quatro repositories.

## Alternativas consideradas

- Controller acessando os repositories diretamente: descartado porque espalha lógica de negócio no controller e torna o teste do controller dependente de quatro mocks.
- DTO assembler separado: descartado porque adicionaria uma camada extra sem benefício claro dentro do escopo desta sprint.

## Classes afetadas

- `ReadingService` (implementa a Facade)
- `ReadingController` (consume a Facade)
- `PhaseRepository`, `PhaseSegmentRepository`, `UserProgressRepository`, `BookRepository` (internos à Facade)

## O que isso implica

O controller fica simples e testável: depende de um único collaborator. A lógica de desbloqueio, busca de conteúdo e montagem do DTO ficam centralizadas em `ReadingService`. O trade-off é que `ReadingService` tende a crescer em responsabilidade conforme novas funcionalidades de leitura forem adicionadas nas próximas sprints.
