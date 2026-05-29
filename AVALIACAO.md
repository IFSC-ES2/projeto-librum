# Avaliação - Engenharia de Software II

| entrega | aluno                    | commit  | data     | correção | nota | peso |
| ------- | ------------------------ | ------- | -------- | -------- | ---- | ---- |
| 1       | equipe                   | 7124b40 | 16/03/26 | 20/03/26 | 9,5  | 2    |
| 2       | equipe                   | 0a2f5d1 | 06/04/26 | 22/04/26 | 9,5  | 2    |
| 3       | equipe                   | adb9e5e | 06/04/26 | 22/04/26 | 9,1  | 3    |
| 4       | equipe                   | 56dee4e | 13/04/26 | 09/05/26 | 9,6  | 3    |
| 5       | Antonio Marcos da Silva  | b3c2151 | 04/05/26 | 24/05/26 | 8,4  | 10   |
| 5       | Bernardo Silva Bombazaro | b3c2151 | 04/05/26 | 24/05/26 | 8,2  | 10   |
| 5       | Giuliano Marcus Bianco   | b3c2151 | 04/05/26 | 24/05/26 | 8,5  | 10   |
| 5       | Maria Carolina Hammes    | b3c2151 | 04/05/26 | 24/05/26 | 8,0  | 10   |
| 6       | Antonio Marcos da Silva  | ba0013e | 15/05/26 | 27/05/26 | 7,6  | 10   |
| 6       | Bernardo Silva Bombazaro | ba0013e | 15/05/26 | 27/05/26 | 7,2  | 10   |
| 6       | Giuliano Marcus Bianco   | ba0013e | 15/05/26 | 27/05/26 | 7,4  | 10   |
| 6       | Maria Carolina Hammes    | ba0013e | 15/05/26 | 27/05/26 | 6,4  | 10   |

## Nota parcial

| aluno                    | nota parcial |
| ------------------------ | ------------ |
| Antonio Marcos da Silva  | 8,5          |
| Bernardo Silva Bombazaro | 8,3          |
| Giuliano Marcus Bianco   | 8,4          |
| Maria Carolina Hammes    | 7,9          |

## Comentários

### Entrega 1

1. Equipe formada: atendido.
2. Tema definido: atendido.
3. MVP: atendido.
4. Governança mínima: atendido.
   - Não foram definidas regras de proteção da ramificação principal e fluxo de trabalho

**observação:** No arquivo `README.md` ainda é possível ver o botão gerado automaticamente pelo sistama. Retirar.

### Entrega 2

- `inception.md` gerado por IA.

- Não há regras de proteção da ramificação principal implementadas no GitHub.
- A equipe apenas definiu algumas regras de proteção da ramificação principal que ainda não estão em vigor.

#### Recuperação

1. Visão do produto: atendido.
2. Definição do MVP: atendido.
3. Backlog inicial com critérios de aceitação: parcial.
   - As prioridades devem esar definidas na própria issue, não no texto da descrição.
4. Definition of Done (DoD): atendido
5. ADRs iniciais: atendido
6. Atualização do README: atendido

- As regras de proteção de ramificação ainda não foram implementadas.

### Entrega 3

1. Planejamento inicial e baseline: parcialmente
   - Informar qual recorte do backlog servirá de base para o planejamento
   - Priorizar os itens mais importantes do backlog
   - A priorização deve estar também no acompanhamento do projeto do Github, não apenas na descrição das _issues_
   - Informar a data de registro do baseline
   - O que acontecerá se a velocity ficar abaixo do estimado?
2. Registro da abordagem de estimativa: atendido
3. Capacidade planejada da equipe: atendido
4. Definição das métricas que serão acompanhadas: atendido
5. Ficha de cada métrica: parcialmente atendido
   - Definir pelo menos uma métrica de projeto
   - Separar as fichas de cada métrica em arquivos diferentes
     - Em cada uma adicionar data do acompanhamento e valor coletado
   - Numerar métricas para facilitar a referenciação

### Entrega 4

1. Registro inicial de riscos do projeto: atendido
2. Análise e priorização dos riscos: parcial
   - A matriz de riscos deve ter como eixos probabilidade x impacto para apresentar visualmente os riscos
3. Plano de resposta aos riscos: atendido
4. Consolidação do fluxo de trabalho no repositório: atendido
5. Definição inicial de critérios de qualidade do projeto: atendido
6. Relação entre riscos e qualidade: atendido
7. Definição preliminar de avaliação da qualidade: atendido
8. Atualização da documentação do projeto: atendido

### Entrega 5

1. Primeiro incremento funcional do sistema: atendido com ressalvas.
   - O vertical slice entregue foi cadastro e login de usuários, correspondente à US01 e alinhado ao MVP descrito no README e em `inception.md`.
   - A implementação atravessa frontend, backend e persistência: telas de login/cadastro em React, `AuthContext`, `authService`, endpoints `POST /auth/register` e `POST /auth/login`, `AuthService`, `UserRepository`, entidade `User`, Flyway e PostgreSQL.
   - Após login, a aplicação redireciona para `/genres`, que ainda é uma tela provisória informando que a seleção de gêneros será implementada na próxima sprint; isso é aceitável para o slice de autenticação, mas mostra que a integração com a próxima funcionalidade ainda não existe.
   - O frontend depende de `VITE_API_URL`, documentado em `.env.example`, mas o README não orienta copiar/configurar o `.env`; sem essa variável, `authService.js` monta chamadas para `undefined/auth` em tempo de execução.
2. Testes de unidade automatizados: atendido.
   - Há testes unitários versionados para `AuthService` e `JwtUtil`, cobrindo cadastro, e-mail duplicado, hash de senha, login válido, senha incorreta, e-mail inexistente, geração e leitura de token JWT.
   - Os testes são automatizados e integrados ao workflow `.github/workflows/ci.yml`.
3. Escopo da Sprint 1 explicitado e justificado: parcial.
   - O README registra o que funciona na `v0.1.0` e `baseline.md` registra que a Sprint 1 concluiu a US01 e deixou a US02 em andamento, com velocity real de 5 SP contra 8 SP planejados.
   - Não há um documento próprio de entrega da sprint listando claramente todas as issues planejadas, concluídas, parciais e replanejadas com vínculos completos entre issues, commits e PRs.
   - A justificativa do vertical slice aparece de forma indireta pela priorização do backlog e pela escolha da autenticação como primeira história, mas poderia estar consolidada em um relatório de sprint.
4. Backlog e board atualizados: parcial.
   - O projeto referencia o board do GitHub Projects e a documentação indica US01 concluída e US02 em andamento.
   - As evidências em PRs e commits são coerentes com as histórias da sprint, mas a documentação da entrega não consolida a vinculação entre cada issue, PR e commit.
5. Fluxo de trabalho evidenciado no repositório: atendido.
   - Há desenvolvimento via branches e PRs relevantes revisados e aprovados: `#49` para schema/base, `#52` para frontend de autenticação, `#55` para backend de autenticação, `#56` para CI e `#57` para documentação final da sprint.
   - Os PRs principais tiveram aprovação de outro integrante antes do merge.
   - O workflow `.github/workflows/ci.yml` foi adicionado na Sprint 1 e executa testes do backend e build do frontend em push/PR.
6. Registro das contribuições individuais: parcial.
   - Não há um relatório específico de contribuições individuais da Sprint 1, mas a autoria é rastreável por commits e PRs.
   - As contribuições descritas implicitamente nos documentos e evidenciadas nos commits são coerentes com os papéis.
   - Contribuições individuais:
     - Antonio: contribuiu de forma central no backend da autenticação, incluindo migration Flyway, ADR/API de autenticação, DTOs, controller, service, tratamento de exceções e ajustes de frontend; Protagonismo técnico no slice principal.
     - Bernardo Silva Bombazaro: contribuiu com setup do backend/frontend, Docker, `.env.example`, configuração de aplicação, entidade/repositório/segurança, layout de autenticação e workflow de CI. Sustentação de infraestrutura e integração, limitada pelos problemas remanescentes de instrução de ambiente e lint.
     - Giuliano Marcus Bianco: contribuiu fortemente com qualidade, testes unitários (`AuthServiceTest`, `JwtUtilTest`), `JwtUtil`, revisão/merge dos PRs principais, documentação de métricas/baseline e atualização final da sprint. Coerência com o papel de qualidade e pela evidência rastreável de testes e CI.
     - Maria Carolina Hammes: contribuiu com telas de login/cadastro, validações e correções de rota/import, além de documentação de métricas/baseline. A participação é relevante, mas a parte final de integração/infra/testes teve maior protagonismo dos outros integrantes e o frontend ainda ficou com falhas de lint e dependência de configuração não documentada no README.
7. Documentação atualizada: parcial.
   - README, `api-auth.md`, `baseline.md` e `qualidade.md` foram atualizados para a Sprint 1.
   - Faltam instruções explícitas no README para criar o `.env`/configurar `VITE_API_URL`, apesar de existir `.env.example`.
   - A documentação não concentra em um único relatório da sprint todas as evidências obrigatórias da Entrega 5.
8. Release do marco: atendido com atraso.
    - A tag `v0.1.0` existe e aponta para `b3c2151`.
    - A release `v0.1.0 - Sprint 1: Cadastro e Login` foi publicada no GitHub.

### Entrega 6

1. Incremento funcional do MVP: parcial.
   - Funcionalidade declaradas para entrega na Sprint 2:
      - US02 - Seleção de gêneros literários 
      - US04 - Leitura em fases 
      - US05 - Desbloqueio progressivo de fases
   - O backend evoluiu de forma relevante: migrations `V2` e `V3`, entidades/repositories de gêneros, livros, fases, segmentos e progresso, endpoints `GET /genres`, `GET /genres/{genreId}/phases`, `GET /reading/{phaseId}/{segmentNumber}` e `POST /progress/mark-read`, com controle de desbloqueio por usuário.
   - O backend iniciou com PostgreSQL via Docker Compose e `./mvnw test` passou com 21 testes após recriar o container com a porta publicada corretamente.
   - O frontend tem telas para seleção de gêneros, lista de fases e leitura, mas a integração final está incompleta: `ReadingService.js` chama `http://localhost:8080/api/...`, enquanto o backend não usa prefixo `/api`; `GenresPage.jsx` usa dados hardcoded e navega por slug (`aventura`), enquanto o backend espera `genreId` numérico.
   - Como o serviço frontend possui fallbacks com dados fictícios quando a API falha, a interface pode aparentar funcionamento mesmo sem integração real com o backend. 
   - As issues principais têm critérios de aceitação, mas vários checkboxes permaneceram desmarcados mesmo após o fechamento.
2. Testes automatizados: atendido.
   - A cobertura é concentrada no backend; não há testes automatizados de frontend, mas documentação registra essa pendência para a Sprint 3.
3. Integração contínua mínima: parcial.
   - O CI não executa `npm run lint`, que falha com 3 erros em `AuthContext.jsx` e `ReadingPage.jsx`.
   - O CI também não detecta a quebra de integração frontend/backend causada por prefixo `/api`, uso de slug no frontend e endpoint numérico no backend.
4. Pull requests com revisão: atendido.
   - Algumas descrições/checklists ficaram inconsistentes, por exemplo checklist de branch atualizada com `develop` e itens de teste/lint não marcados em PRs de frontend.
5. Aplicação justificada de padrões OO: parcial.
   - Facade documentado em `ADR-0007` e aplicado em `ReadingService`.
   - A documentação declara Strategy em `readingThemes.js`, mas o arquivo `pradroes-de-projeto.md` não existe e não há ADR específica para esse padrão.
6. Atualização das métricas: parcial.
   - `baseline.md` foi atualizado com a velocity da Sprint 2: 16 SP entregues, incluindo carry-over da US02.
   - `metricas/m1-cobertura-testes.md` registra aproximadamente 70% de cobertura no backend e os 12 testes da sprint.
   - As demais fichas de métricas (`m2`, `m3`, `m4`) não registram valores observados da Sprint 2, e `m5-velocity.md` ainda mantém a Sprint 1 como `n/d`, apesar de a velocity estar no `baseline.md`.
   - Não há evidência objetiva do relatório de cobertura que sustente o valor de ~70% dentro da tag.
7. Atualização dos riscos: atendido.
   - `riscos.md` registra o status da Sprint 2, encerra/mitiga riscos relacionados à modelagem e integração, mantém riscos ativos, cria R08 e R09 e define ações de mitigação para a Sprint 3.
8. Release do marco: parcial.
   - A tag `v0.2.0` aponta para o commit `ba0013e`.
   - A release `v0.2.0 - Sprint 2: Leitura Gamificada` foi publicada com descrição objetiva, testes, CI e instruções de execução.
   - O README usa o comando legado `docker-compose up -d`; no ambiente avaliado esse comando falhou por problema do Compose v1, mas `docker compose up -d` funcionou. A documentação poderia adotar o comando moderno ou citar ambas as opções.
9. Registro das contribuições individuais: parcial.
   - O registro das contribuições apresenta divergências: o documento atribui a Maria a criação das issues US02, US04 e US05, mas no GitHub as issues centrais verificadas são `#15`, `#16`, `#17` e `#18`; também atribui a Giuliano a criação de `pradroes-de-projeto.md`, arquivo ausente na entrega.
   - Contribuições individuais:
      - Antonio: contribuiu de forma central nos contratos, ADRs, entidades de fase/segmento/progresso, `ReadingService`, controllers, segurança e correções de integração. Protagonismo no backend e arquitetura, mas limitado pela integração frontend/backend ainda quebrada e documentação de padrões incompleta.
      - Bernardo: contribuiu com migrations, seed de dados, entidades de gênero/livro, CI e publicação da tag. A contribuição é relevante para infraestrutura e persistência, mas parte do backend central foi de Antonio e o CI não cobre lint nem integração real do frontend.
      - Giuliano: contribuiu com os testes unitários e de integração do backend, coerente com o papel de qualidade. A participação é forte na qualidade backend, mas não houve testes frontend e algumas métricas sob sua responsabilidade não foram atualizadas com valores da Sprint 2.
      - Maria: contribuiu com as telas e documentação da sprint, mas o frontend entregue é o ponto mais frágil: dados hardcoded, chamadas para rotas com prefixo `/api` inexistente, navegação por slug incompatível com o backend e fallback que mascara falhas de API. 
10. Documentação atualizada: parcial.
    - A documentação superestima a integração do frontend e cita arquivo de padrões inexistente na tag.
    - O README não foi atualizado para resumir o que funciona na `v0.2.0`, mantendo a seção “O que já funciona” apenas para `v0.1.0`.
