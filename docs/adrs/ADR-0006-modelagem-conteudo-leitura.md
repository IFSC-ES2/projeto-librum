# ADR-0006 - Modelagem do conteúdo literário e rastreamento de progresso

## Contexto

Precisávamos decidir como organizar livros, fases e trechos de texto no banco, e como registrar o progresso de cada usuário por fase, de forma que o sistema consiga determinar quais fases estão desbloqueadas.

## Decisão

Cinco tabelas relacionadas: `genres`, `books`, `phases`, `phase_segments` e `user_progress`.

- `genres`: armazena os gêneros literários disponíveis (Aventura, Terror, etc.).
- `books`: cada livro pertence a um gênero. Nesta sprint, há somente um livro por gênero.
- `phases`: cada fase pertence a um livro e tem um número de ordem.
- `phase_segments`: cada segmento de texto pertence a uma fase e tem um número de ordem. O campo `content` armazena o trecho literário.
- `user_progress`: registra, por par (usuário, fase), o último segmento lido e se a fase foi concluída.

A regra de desbloqueio é: a Fase N fica desbloqueada quando `user_progress.is_completed = true` para a Fase N-1 do mesmo livro. A Fase 1 está sempre desbloqueada.

## Alternativas consideradas

- Campo JSON de progresso na tabela `users`: descartado porque dificulta queries de desbloqueio e não permite registrar progresso por fase de forma independente.
- Tabela única de conteúdo sem divisão em fases: descartado porque não suporta desbloqueio progressivo nem a navegação trecho a trecho exigida pelo wireframe.

## O que isso implica

O `ReadingService` consulta `user_progress` para verificar se uma fase está desbloqueada antes de entregar o conteúdo. Se não houver registro para aquela (usuário, fase), a fase não foi iniciada e o desbloqueio é determinado somente pela conclusão da fase anterior. A constraint `UNIQUE(user_id, phase_id)` garante que há no máximo um registro de progresso por par.
