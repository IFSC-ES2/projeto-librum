# Projeto-Librum

**Discentes:** 
- Antonio Marcos da Silva: 202420800312

  Arquiteto de software
  
- Bernardo Silva Bombazaro: 202420800052

  DevOps

- Giuliano Marcus Bianco: 202420800326

  Engenheiro de qualidade

- Maria Carolina Hammes: 202320003074

  Scrum master

## Descrição
  
O declínio da leitura entre jovens representa uma problemática crescente, caracterizada pela falta de hábito de leitura, analfabetismo funcional e redução significativa do vocabulário e capacidade de concentração.

O sistema proposto é um RPG narrativo gamificado onde o jogador progride através da leitura de textos literários e desafios de compreensão, construindo uma biblioteca virtual pessoal. O jogo integra recomendações adaptativas de livros baseadas no perfil de leitura do usuário, permitindo desbloqueio progressivo de histórias e mundos fictícios que incentivam a continuidade da leitura.

Para operacionalização, o sistema deve prever uma interface web para leitura de capítulos e acompanhamento de progresso. O sistema integra perfis de leitores, gerando progressão narrativa personalizada com todas as leituras realizadas, capítulos completados e desafios superados.

As mecânicas incluem sistema de progressão narrativa que desbloqueia novos livros conforme avanço, quiz de compreensão adaptativo, desafios literários variados, badges e conquistas para marcos de leitura, além de recomendações inteligentes otimizadas por preferência do jogador.

O aprendizado resulta no desenvolvimento efetivo do hábito de leitura, melhora na compreensão textual, expansão de vocabulário, descoberta de novos gêneros e autores, e desenvolvimento de pensamento crítico.

O público-alvo inclui adolescentes e jovens adultos entre 9 e 16 anos.

## Escopo

### Módulo 1 — Autenticação e Perfis

- Cadastro e login de Leitores
- Perfil do leitor: avatar, nível atual, XP acumulado, biblioteca pessoal
- Redefinição de senha

### Módulo 2 — Biblioteca e Leitura

- Catálogo de obras literárias
- Visualização otimizada para leitura
- Marcação de capítulo como lido e registro de progresso
- Barra de progresso por livro e por série
- Desbloqueio progressivo de capítulos conforme conclusão dos anteriores

### Módulo 3 — Gamificação

- **Sistema de XP**: pontos ganhos por capítulo lido e quiz completado
- Níveis de personagem (ex.: Aprendiz > Cronista > Guardião das Histórias)
- Sistema de badges por marcos (1º livro, 10 capítulos, 1ª resenha, etc.)
- Missões diárias de leitura ("Leia 1 capítulo hoje")

### Módulo 4 — Quizzes de Compreensão

- Quiz obrigatório ao final de cada capítulo (3 a 5 questões de múltipla escolha)
- Feedback imediato por questão com explicação da resposta correta
- Pontuação e impacto no XP baseados no desempenho
- Banco de questões gerado dinamicamente por IA

---

### Fora do Escopo

Os itens abaixo são previstos no conceito completo do produto, mas estão excluídos da versão acadêmica de 3 meses por questões de viabilidade:

- App mobile nativo (iOS/Android)
- Painel do Educador
- Sistema Social
- Integração com APIs de catálogos literários externos (Open Library, Google Books)

## Link de Referência

- [Visão do produto e Escopo do MVP](./docs/inception.md)
- [DoD](./docs/dod.md)
- [ADRs iniciais](./docs/adrs)
- [Backlog com as issues](https://github.com/orgs/IFSC-ES2/projects/19)

### Estimativas e métricas

- [Baseline](./docs/baseline.md)
- [Métricas](./docs/metricas/) com fichas individuais para cada uma das 5 métricas definidas (M1 a M5)
- [Estimativas](./docs/estimativas.md)

### Riscos e Consolidação (Entrega 4)

- [Registro de Riscos](./docs/riscos.md) — identificação, análise, priorização e plano de resposta aos riscos do projeto
- [Fluxo de Trabalho](./docs/fluxo-de-trabalho.md) — branches, pull requests, template de PR e ciclo completo de uma história
- [Critérios Iniciais de Qualidade](./docs/qualidade.md) — atributos de qualidade priorizados, relação com riscos e métricas preliminares
- [Template de Pull Request](./.github/PULL_REQUEST_TEMPLATE.md) - template com checklist mínimo de revisão

## Como executar localmente

### Requisitos

- Java 17
- Docker e Docker Compose
- Node.js 20 e npm

### Backend e banco

```bash
docker compose up -d
cd backend
./mvnw spring-boot:run
```

O backend sobe em `http://localhost:8080`. O Flyway aplica as migrations automaticamente.

### Frontend

```bash
cd frontend
cp .env.example .env
```

Edite o `.env` gerado e defina `VITE_API_URL=http://localhost:8080`. Em seguida:

```bash
npm install
npm run dev
```

O frontend fica disponivel em `http://localhost:5173`.

## Como rodar os testes

Backend:

```bash
cd backend
./mvnw test
```

Frontend:

```bash
cd frontend
npm test -- --run
```

## Staging e deploy

Para instrucoes detalhadas de staging (Render), variaveis de ambiente, validacao por curl, credenciais de teste e comportamento de hibernacao, consulte o [`docs/DEPLOY.md`](./docs/DEPLOY.md).

## O que esta no MVP (v1.0.0-rc.1)

- Cadastro de usuario com validacao e hash bcrypt
- Login com autenticacao JWT
- Redirecionamento automatico baseado em estado de autenticacao
- Selecao de generos literarios
- Leitura estruturada em fases e segmentos
- Desbloqueio progressivo de fases conforme o avanco
- Quiz de compreensao ao final de cada fase
- Ganho de XP e progressao de nivel do personagem
- Perfil do leitor com nivel, XP e biblioteca pessoal
- Feedback de carregamento e mensagens de erro na voz do mascote Tinta
