# Entrega Sprint 2 - Librum

**Data:** 15 de maio de 2026  
**Responsável:** Maria Carolina Hammes (Scrum Master)

## Resumo da Entrega
Esta sprint focou na implementação do núcleo da experiência de leitura do Librum, integrando o frontend React com o backend Spring Boot. Foram entregues as funcionalidades de seleção de gêneros, interface de leitura dinâmica com temas e o sistema de desbloqueio de fases.

## Histórias de Usuário Entregues

| ID | Título | SP | Descrição |
|----|--------|----|-----------|
| US02 | Seleção de gêneros | 3 | Interface para o usuário escolher o gênero literário de sua preferência. |
| US04 | Leitura em fases | 8 | Interface de leitura com suporte a temas (Claro, Escuro, Sépia) usando o padrão Strategy. |
| US05 | Desbloqueio progressivo | 5 | Lógica de progressão onde a leitura de uma fase libera o acesso à fase seguinte. |

**Total de Story Points:** 16 SP

## Artefatos Técnicos
- **Frontend:**
  - `GenresPage.jsx`: Seleção de gêneros.
  - `ReadingPage.jsx`: Interface de leitura principal.
  - `PhaseListPage.jsx`: Listagem de fases por livro/gênero.
  - `ReadingService.js`: Integração com API de leitura e progresso.
  - `readingThemes.js`: Implementação do padrão Strategy para temas.
- **Backend (contribuído por Antonio/Bernardo/Giuliano):**
  - Schema de banco de dados V2 (Conteúdo e Progresso).
  - Padrão Facade no `ReadingService.java`.
  - Controllers de Leitura e Progresso.
  - Testes de integração e unitários.

## Métricas de Qualidade
- **Velocity:** 16 SP (Aumento significativo em relação à Sprint 1).
- **Cobertura de Testes (Backend):** ~70% nas classes de serviço principais.
- **Riscos:** R03 encerrado, R04 mitigado.

## Próximos Passos
- Implementação do Sistema de Quizzes (US06).
- Sistema de XP e Gamificação (US07).
- Início dos testes automatizados no Frontend.
