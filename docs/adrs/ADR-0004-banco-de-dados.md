# ADR-0004 - Banco de dados

## Contexto

Precisávamos escolher onde e como guardar os dados do sistema: usuários, progresso de leitura, conteúdo dos livros e questões dos quizzes. Também precisávamos de uma ferramenta para criar e versionar as tabelas do banco.

## Decisão

**PostgreSQL** como banco de dados e **Flyway** para gerenciamento de migrations (scripts SQL versionados que criam e evoluem o schema do banco).

## Alternativas consideradas

- MongoDB
- SQLite
- Prisma (ORM Node.js) para migrations - descartado por exigir Node.js em um projeto Java, adicionando dependência desnecessária ao ambiente de build
- Hibernate `ddl-auto=create` - descartado por não versionar o schema e não ser adequado para produção

## O que isso implica

PostgreSQL é robusto e se encaixa bem com a estrutura de dados do projeto (usuários, fases, questões - tudo bem relacionado). O Flyway é nativo do ecossistema Spring Boot: roda automaticamente na inicialização da aplicação, versiona cada alteração de schema como um arquivo SQL numerado (`V1__`, `V2__`, ...) e não exige nenhuma ferramenta externa além do Java.
