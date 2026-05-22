# ADR-0008 - Uso do padrão Command no QuizService

## Contexto

Seguindo o mesmo raciocínio do ADR-0007, centralizar a lógica de negócio em um serviço dedicado evita que o controller acumule responsabilidades.

Quando um usuário submete as respostas de um quiz, o controller precisaria fazer várias coisas ao mesmo tempo: validar as respostas contra o banco, contar quantas acertou, calcular o XP ganho, incrementar o nível do usuário se necessário e salvar tudo. Isso espalha regras de negócio no controller, tornando-o grande demais e difícil de testar.

## Decisão

`QuizService.java` implementa uma adaptação do padrão Command: cada submissão de quiz é tratada como um comando único, encapsulado no método `submitQuiz(userId, phaseId, answers)`. O controller chama apenas esse método e retorna o resultado sem conhecer os detalhes de cálculo.

O padrão é uma adaptação porque não há um objeto Command separado com método `execute()`, o que seria complexidade desnecessária para o escopo. O comportamento central do padrão está presente: a operação completa é encapsulada em um único ponto, isolando o controller das regras de negócio.

## Alternativas consideradas

- **Lógica dentro do controller** - descartado porque viola separação de responsabilidades; controller fica grande demais e difícil de testar sem mockar tudo.
- **DTO com método execute()** - descartado porque adiciona complexidade sem ganho real; uma classe Service simples resolve o problema.

## Classes afetadas

- `QuizService` (implementa o Command)
- `QuizController` (consome o Command)
- `XpService` (chamado internamente pelo QuizService)
- `QuizQuestionRepository`, `UserRepository` (internos ao QuizService)

## O que isso implica

- O controller apenas chama `quizService.submitQuiz()` e retorna o resultado.
- Testes de `QuizService` precisam mockar `QuizQuestionRepository`, `XpService` e `UserRepository`.
- Trade-off: se novos tipos de submissão forem adicionados (ex: bônus de tempo), o `QuizService` cresce em responsabilidade; a alternativa seria criar um novo service específico.

## Exemplo de dado

Questão de quiz armazenada no banco (Migration V5):

```sql
INSERT INTO quiz_questions 
  (phase_id, question_text, option_a, option_b, option_c, option_d, correct_option, order_index)
VALUES
  (1, 'Qual era o nome do tesouro procurado por Jim Hawkins?', 
       'O Tesouro Perdido', 'O Tesouro do Flint', 'O Tesouro Enterrado', 'O Tesouro de Silver', 
       'B', 1);
```
