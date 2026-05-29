# Padrões de Projeto Aplicados: Librum

Este documento registra os padrões de projeto GOF (Gang of Four) aplicados ao longo das sprints do Librum, com a justificativa de uso, as classes afetadas e os trade-offs de cada decisão. Cada padrão tem um ADR correspondente para rastreabilidade da decisão.

**Última atualização:** maio de 2026 (Sprint 3)

---

## 1. Facade — `ReadingService.java`

**Sprint de aplicação:** Sprint 2  
**ADR de referência:** [ADR-0007](./adrs/ADR-0007-facade-reading-service.md)

### Problema

O `ReadingController` precisaria acessar quatro repositories diferentes para montar a resposta de um único segmento de leitura: `PhaseRepository` (verificar se a fase existe), `UserProgressRepository` (verificar se está desbloqueada), `PhaseSegmentRepository` (buscar o conteúdo) e `BookRepository` (buscar título e autor). Colocar essa lógica diretamente no controller violaria a separação de responsabilidades e tornaria os testes dependentes de quatro mocks simultâneos.

### Solução aplicada

`ReadingService.java` atua como Facade: é o único ponto de entrada para toda a lógica de leitura. O controller chama apenas dois métodos: `getPhaseSegment` e `getPhasesForGenre`, sem precisar conhecer nenhum dos repositories internos.

```
ReadingController
      │
      ▼
ReadingService  ◄── Facade
   ├── PhaseRepository
   ├── PhaseSegmentRepository
   ├── UserProgressRepository
   └── BookRepository
```

### Classes afetadas

- `ReadingService`: implementa a Facade
- `ReadingController`: consome a Facade
- `PhaseRepository`, `PhaseSegmentRepository`, `UserProgressRepository`, `BookRepository`: internos à Facade

### Trade-offs

**Benefício:** o controller fica simples, testável e independente de como a leitura é buscada internamente. A lógica de desbloqueio, busca de conteúdo e montagem do DTO ficam centralizadas em um único lugar.

**Custo:** o `ReadingService` tende a crescer em responsabilidade à medida que novas funcionalidades de leitura forem adicionadas. Se esse crescimento se tornar excessivo, a solução seria dividir em services especializados.

---

## 2. Strategy — `readingThemes.js`

**Sprint de aplicação:** Sprint 2  
**ADR de referência:** [ADR-0006](./adrs/ADR-0006-modelagem-conteudo-leitura.md)

### Problema

A `ReadingPage` suporta três modos visuais de leitura: Padrão, Noturno e Ampliado. Sem o padrão, o componente teria um bloco condicional para cada tema uma cadeia de `if/else` ou `switch` que precisaria ser modificada toda vez que um novo tema fosse adicionado.

### Solução aplicada

Cada tema é representado como um objeto com a mesma interface (`contentBackground`, `contentColor`, `fontFamily`). A função `applyTheme(themeId, fontSize, lineSpacing)` aceita qualquer objeto de tema e retorna o estilo correto como objeto React. O componente não conhece os temas diretamente — ele chama `applyTheme` com o ID selecionado pelo usuário.

```js
// readingThemes.js
export const themes = {
  padrao:   { contentBackground: '#FFFFFF', contentColor: '#1a1a1a', fontFamily: '...' },
  noturno:  { contentBackground: '#1a1a2e', contentColor: '#e0e0e0', fontFamily: '...' },
  ampliado: { contentBackground: '#FDF6E3', contentColor: '#333333', fontFamily: '...' },
};
```

### Classes afetadas

- `readingThemes.js`: define as estratégias
- `ReadingPage.jsx`: consome a estratégia selecionada

### Trade-offs

**Benefício:** adicionar um novo tema exige apenas um novo objeto em `readingThemes.js`. O componente `ReadingPage` não precisa mudar.

**Custo:** pode parecer complexidade desnecessária para quem não conhece o padrão ao ler o código pela primeira vez.

---

## 3. Command — `QuizService.java`

**Sprint de aplicação:** Sprint 3  
**ADR de referência:** [ADR-0008](./adrs/ADR-0008-command-quiz-service.md)

### Problema

Quando um usuário submete as respostas de um quiz, o sistema precisa executar várias operações em sequência: validar as respostas contra o banco, contar acertos, calcular XP ganho, incrementar o nível do usuário se necessário e salvar tudo. Colocar essa sequência diretamente no controller tornaria o controller grande demais, cheio de regras de negócio e difícil de testar.

### Solução aplicada

`QuizService.java` implementa uma adaptação do padrão Command: toda a submissão de quiz é encapsulada no método `submitQuiz(userId, phaseId, answers)`. O controller chama apenas esse método e devolve o resultado sem conhecer nenhum detalhe de cálculo.

É uma adaptação porque não há um objeto Command separado com método `execute()` — isso seria cerimônia desnecessária para o escopo do MVP. O comportamento central do padrão está presente: a operação completa é encapsulada em um único ponto, isolando o controller das regras de negócio.

```
QuizController
      │
      ▼
QuizService.submitQuiz()  ◄── Command adaptado
   ├── valida respostas (QuizQuestionRepository)
   ├── conta acertos
   ├── calcula XP e nível (XpService)
   ├── persiste quizCompleted (UserProgressRepository)  ← adicionado na Sprint 3 Parte 2
   └── retorna QuizResultResponse
```

### Classes afetadas

- `QuizService`: implementa o Command
- `QuizController`: consome o Command
- `XpService`: chamado internamente
- `QuizQuestionRepository`, `UserProgressRepository`, `UserRepository`: internos ao QuizService

### Trade-offs

**Benefício:** o controller chama `quizService.submitQuiz()` e devolve o resultado. Toda a lógica de negócio fica isolada e testável com mocks.

**Custo:** se novos tipos de submissão forem adicionados (ex: bônus por tempo de resposta), o `QuizService` crescerá em responsabilidade. A alternativa seria criar um service especializado por tipo de operação.

---

## 4. Template Method: `ReadingService.isPhaseUnlocked()`

**Sprint de aplicação:** Sprint 3  
**ADR de referência:** [ADR-0009](./adrs/ADR-0009-template-method-phase-unlock.md)

### Problema

Na Sprint 2, o critério de desbloqueio de uma fase era: o usuário leu todos os segmentos da fase anterior (`is_completed = true`). Na Sprint 3, o critério mudou: o desbloqueio passou a depender da conclusão do quiz da fase anterior (`quiz_completed = true`). Era necessário trocar esse critério sem reescrever o fluxo inteiro de verificação nem espalhar `if`s no service.

### Solução aplicada

`ReadingService.isPhaseUnlocked()` mantém um esqueleto fixo de três passos:

1. Se é a primeira fase do livro → retorna `true` diretamente.
2. Localiza a fase anterior pelo `phaseNumber - 1` dentro do mesmo livro.
3. Consulta o repositório para verificar se a fase anterior atende ao critério de conclusão.

O passo 3 é a parte variável — o "método a ser sobrescrito" na terminologia do Template Method. Nesta sprint, trocou-se a chamada de `existsByUserIdAndPhaseIdAndIsCompletedTrue` por `existsByUserIdAndPhaseIdAndQuizCompletedTrue`. Nenhuma outra linha de `isPhaseUnlocked()` foi modificada.

```
isPhaseUnlocked(userId, phase)
   │
   ├── [FIXO] fase.phaseNumber == 1? → true
   │
   ├── [FIXO] busca faseAnterior pelo phaseNumber - 1
   │
   └── [VARIÁVEL] userProgressRepository
                    .existsByUserIdAndPhaseIdAndQuizCompletedTrue(...)
                         ↑
                    (antes era IsCompletedTrue — trocado nesta sprint)
```

### Classes afetadas

- `ReadingService`: mantém o esqueleto do algoritmo
- `UserProgressRepository`: fornece o passo variável (`existsByUserIdAndPhaseIdAndQuizCompletedTrue`)
- `UserProgress`: ganhou o campo `quizCompleted`
- `QuizService`: responsável por marcar `quizCompleted = true` quando o quiz é aprovado

### Trade-offs

**Benefício:** trocar a regra de desbloqueio no futuro exige apenas alterar a chamada feita no passo 3. O esqueleto, o controller e o restante do service não são afetados.

**Custo:** a abstração só compensa enquanto a verificação envolver uma única chamada ao repositório. Se a regra evoluir para combinar várias verificações (ex: leitura concluída E quiz aprovado E nota mínima), valerá reavaliar entre manter o Template Method ou migrar para Strategy com uma interface `PhaseUnlockPolicy`.

---

## Resumo por sprint

| Sprint | Padrão | Classe principal | ADR |
|--------|--------|------------------|-----|
| Sprint 2 | Facade | `ReadingService.java` | ADR-0007 |
| Sprint 2 | Strategy | `readingThemes.js` | ADR-0006 |
| Sprint 3 (P1) | Command | `QuizService.java` | ADR-0008 |
| Sprint 3 (P2) | Template Method | `ReadingService.isPhaseUnlocked()` | ADR-0009 |
