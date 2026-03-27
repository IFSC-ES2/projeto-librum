# ADR-0004 - Banco de dados

## Contexto

Precisávamos escolher onde e como guardar os dados do sistema: usuários, progresso de leitura, conteúdo dos livros e questões dos quizzes.

## Decisão

**PostgreSQL** como banco de dados, usando o **Prisma** como ORM (ferramenta que facilita a comunicação entre o código e o banco).

## Alternativas consideradas

- MongoDB
- SQLite

## O que isso implica

PostgreSQL é robusto e se encaixa bem com a estrutura de dados do projeto (usuários, fases, questões - tudo bem relacionado). O Prisma facilita criar e atualizar as tabelas sem precisar escrever SQL na mão o tempo todo.
