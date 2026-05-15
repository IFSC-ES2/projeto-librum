# Entrega Sprint 1 - Librum

**Data:** 28 de abril de 2026
**Responsável:** Maria Carolina Hammes (Scrum Master)

---

## Histórias de Usuário Entregues

| ID | Título | SP | Status |
|----|--------|----|--------|
| US01 | Cadastro e login | 5 | Concluída |
| US02 | Seleção de gêneros literários | 3 | Carry-over (transferida para Sprint 2) |

**Total entregue:** 5 SP. A US02 foi iniciada mas não concluída dentro da sprint, sendo transferida como carry-over para a Sprint 2.

---

## Principais Alterações Técnicas

### Banco de dados

- Migration `V1__create_users.sql`: criação da tabela `users` com os campos `id` (UUID), `name`, `email`, `password` (hash bcrypt), `xp`, `level` e `created_at`.

### Backend

- Entidade JPA: `User.java`.
- Repository: `UserRepository.java` com busca por e-mail.
- DTOs: `LoginRequest.java`, `RegisterRequest.java`, `AuthResponse.java` com validação via Bean Validation.
- `AuthService.java`: lógica de registro (hash bcrypt) e login (geração de token JWT).
- `JwtUtil.java`: geração e validação de tokens JWT com algoritmo HS256.
- `JwtAuthenticationFilter.java`: filtro que valida o token em cada requisição.
- `SecurityConfig.java`: rotas públicas (`/auth/register`, `/auth/login`) e configuração de CORS.
- `AuthController.java`: endpoints `POST /auth/register` e `POST /auth/login`.
- `DuplicateEmailException.java` e `GlobalExceptionHandler.java`: tratamento centralizado de erros com respostas padronizadas.

### Frontend

- `LoginPage.jsx`: tela de login com validação de campos e tratamento de erro 401.
- `RegisterPage.jsx`: tela de cadastro com validação de senha mínima de 8 caracteres e confirmação de senha.
- `authService.js`: camada de serviço que encapsula as chamadas às rotas `/auth/register` e `/auth/login`, armazenando o token JWT no `localStorage`.
- `AppRoutes.jsx`: configuração inicial de rotas com LoginPage e RegisterPage como rotas públicas.

### Documentação técnica

- `docs/api-auth.md`: contrato dos dois endpoints de autenticação com método, rota, body e códigos de resposta.
- `docs/adrs/ADR-0005-modelagem-usuario-auth.md`: decisão sobre uso de JWT e bcrypt para autenticação.
- `docs/baseline.md`: registro da baseline com recorte do backlog, capacidade da equipe e plano de contingência.

---

## Padrões OO Aplicados

Nenhum padrão de projeto GOF foi formalmente aplicado nesta sprint. A organização do código seguiu a arquitetura em camadas padrão do Spring Boot (Controller, Service, Repository, Model), com separação clara de responsabilidades entre as camadas.

No frontend, a criação de `authService.js` como camada de serviço isolou as chamadas à API do código dos componentes React, seguindo o mesmo princípio de separação de responsabilidades. Essa decisão foi registrada no ADR-0005.

---

## Testes Incluídos

| Arquivo | Tipo | Casos |
|---------|------|-------|
| `AuthServiceTest.java` | Unidade | 6 |
| `JwtUtilTest.java` | Unidade | 2 |

**Total:** 8 testes. Todos passando no CI.

Casos de `AuthServiceTest.java`: registro com usuário válido retorna token JWT; registro com e-mail duplicado lança DuplicateEmailException; senha armazenada com hash bcrypt; login com credenciais corretas retorna token; login com senha errada lança BadCredentialsException; login com e-mail inexistente lança BadCredentialsException.

Casos de `JwtUtilTest.java`: token gerado para e-mail válido é validado com sucesso; e-mail extraído do token corresponde ao original.

---

## Situação do CI

O workflow `.github/workflows/ci.yml` foi configurado nesta sprint com 2 jobs executados automaticamente em todo pull request aberto contra `main`.

**backend-tests:** compila o backend e executa `./mvnw test` com banco PostgreSQL real provisionado pelo GitHub Actions.

**frontend-build:** instala dependências com `npm ci` e executa `npm run build`.

Todos os merges desta sprint foram realizados com CI verde.

---

## Limitações Conhecidas

- A US02 (seleção de gêneros) não foi concluída nesta sprint e foi transferida como carry-over para a Sprint 2.
- O CI contém apenas os jobs de testes de backend e build do frontend. Validação de YAML e verificação de arquivos obrigatórios serão adicionados na Sprint 2.
- Nenhum teste de integração foi implementado nesta sprint.
- O frontend ainda não tem rota protegida: qualquer página acessível sem autenticação, pois o `PrivateRoute` será implementado junto com as rotas de leitura na Sprint 2.

---

## Pendências para a Sprint 2

- US02: seleção de gêneros literários (carry-over).
- US04: leitura em fases.
- US05: desbloqueio progressivo de fases.
- Adicionar jobs de validação de YAML e verificação de arquivos obrigatórios ao CI.
- Implementar `PrivateRoute` e proteger as rotas que exigem autenticação.

---

## Registro de Contribuições Individuais

### Antonio Marcos - Arquiteto de Software

- Registrou ADR-0005 (modelagem do usuário e escolha de JWT).
- Criou `docs/api-auth.md` com o contrato dos dois endpoints de autenticação.
- Implementou `AuthService.java` com lógica de registro e login usando bcrypt e JWT.
- Implementou `AuthController.java` com os endpoints `POST /auth/register` e `POST /auth/login`.
- Implementou `JwtUtil.java`, `JwtAuthenticationFilter.java` e `SecurityConfig.java`.
- Implementou os DTOs `LoginRequest`, `RegisterRequest` e `AuthResponse`.
- Implementou `DuplicateEmailException.java` e `GlobalExceptionHandler.java`.

### Maria Carolina Hammes - Scrum Master

- Organizou o board do GitHub Projects e criou as issues US01 e US02 com critérios de aceitação.
- Implementou `LoginPage.jsx` e `RegisterPage.jsx` com validações de campo e tratamento de erros.
- Implementou `authService.js` com chamadas autenticadas à API e armazenamento do token.
- Configurou `AppRoutes.jsx` com as rotas públicas iniciais.
- Atualizou `docs/baseline.md` e `docs/riscos.md` com o estado ao final da sprint.

### Bernardo Silva Bombazaro - DevOps e Infra

- Criou migration `V1__create_users.sql` com a tabela de usuários.
- Implementou a entidade `User.java` e o `UserRepository.java`.
- Configurou `docker-compose.yml` com o serviço PostgreSQL para ambiente local.
- Configurou `application.properties` com variáveis de ambiente para banco e JWT.
- Criou `.github/workflows/ci.yml` com os jobs `backend-tests` e `frontend-build`.

### Giuliano Marcus Bianco - Quality Engineer

- Implementou `AuthServiceTest.java` com 6 casos de teste de unidade.
- Implementou `JwtUtilTest.java` com 2 casos de teste de unidade.
- Atualizou `docs/qualidade.md` com as evidências da Sprint 1.
- Atualizou `docs/metricas/m1-cobertura-testes.md` com os dados reais da sprint.
