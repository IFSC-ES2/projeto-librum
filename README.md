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
- 
### Estimativas e métricas

- [Baseline](./docs/baseline.md)
- [Métricas](./docs/metricas.md)
- [Estimativas](./docs/estimativas.md)
