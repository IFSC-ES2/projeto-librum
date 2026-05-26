# ADR-0009 - Template Method na verificação de desbloqueio de fases

## Contexto

Na Sprint 2 definimos que a Fase N ficaria desbloqueada quando o usuário tivesse lido todos os segmentos da Fase N-1 (`is_completed = true`). Essa regra foi implementada em `ReadingService.isPhaseUnlocked()`, que consulta `UserProgressRepository.existsByUserIdAndPhaseIdAndIsCompletedTrue`.

Nesta sprint, o critério mudou: o desbloqueio passa a depender da conclusão do quiz da fase anterior (`quiz_completed = true`), e não mais apenas da leitura. Ler todos os segmentos sem concluir o quiz não desbloqueia mais a próxima fase.

A questão era como aplicar essa troca sem espalhar `if` espalhados pelo service e sem reescrever o fluxo de verificação inteiro.

## Decisão

`ReadingService.isPhaseUnlocked()` mantém um esqueleto fixo de verificação e delega o critério de conclusão ao `UserProgressRepository`. O esqueleto faz três coisas, em ordem:

1. Se a fase é a primeira do livro, retorna `true`.
2. Localiza a fase anterior pelo `phaseNumber - 1` dentro do mesmo livro.
3. Consulta o repositório para saber se a fase anterior atende ao critério de conclusão.

O passo 3 é a parte variável. Nesta sprint, troca-se a chamada de `existsByUserIdAndPhaseIdAndIsCompletedTrue` por `existsByUserIdAndPhaseIdAndQuizCompletedTrue`. Nenhuma outra linha de `isPhaseUnlocked()` muda.

Essa é uma adaptação do padrão Template Method. O esqueleto do algoritmo fica no service e o passo variável é delegado a um colaborador (o repository), em vez de a uma subclasse. A intenção do padrão (manter a estrutura geral fixa e permitir variação em um único ponto) é preservada.

## Alternativas consideradas

- **Lógica de desbloqueio dentro do controller**: descartado porque acopla a verificação à camada HTTP e impede reaproveitamento em outros pontos do service.
- **Strategy com interface `PhaseUnlockPolicy`**: descartado por excesso de cerimônia. Não há previsão concreta de termos múltiplas políticas convivendo no MVP; uma interface, mais uma classe por estratégia e a injeção da política tornariam o código mais difícil de ler sem benefício imediato.
- **Manter o nome do método antigo (`isCompletedTrue`) e mudar o significado da coluna**: descartado porque criaria divergência entre o nome do campo no banco e o que ele representa.

## Classes afetadas

- `ReadingService` (mantém o esqueleto do algoritmo).
- `UserProgressRepository` (ganha o método `existsByUserIdAndPhaseIdAndQuizCompletedTrue` e mantém o anterior para rastreio de leitura).
- `UserProgress` (ganha o campo `quizCompleted`).
- `QuizService` (passa a marcar `quizCompleted = true` no `UserProgress` quando o quiz é aprovado).

## O que isso implica

Trocar a regra de desbloqueio no futuro (por exemplo, exigir tanto leitura quanto quiz, ou exigir uma nota mínima) significa alterar somente a chamada feita no passo 3 de `isPhaseUnlocked()`. O esqueleto, o controller e o restante do service não são afetados.

A coluna `is_completed` continua sendo persistida pelo `ProgressService` quando o usuário lê o último segmento, mas deixa de ser o critério de desbloqueio. Ela permanece útil para indicar visualmente, na trilha de fases, se a leitura foi concluída independentemente do quiz.

Trade-off: a abstração só compensa enquanto a verificação envolver uma única chamada ao repository. Se a regra evoluir para combinar várias verificações (por exemplo, leitura concluída E quiz aprovado E nota mínima), valerá reavaliar entre manter o Template Method aqui ou migrar para Strategy.
