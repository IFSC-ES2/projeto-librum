# ADR-0003 - Como o projeto vai ser organizado

## Contexto

Precisávamos definir como separar as responsabilidades do sistema para facilitar o desenvolvimento em equipe.

## Decisão

Separação em **camadas**: frontend (interface), backend (API) e banco de dados, cada um no seu lugar.

## Alternativas consideradas

- Solução fullstack em um só projeto
- Microsserviços

## O que isso implica

Cada parte do sistema tem uma responsabilidade clara. Exige um pouco mais de configuração no início, mas deixa o projeto mais organizado para uma equipe pequena trabalhar em paralelo.
