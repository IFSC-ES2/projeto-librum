# Padrões de Projeto

Este documento registra os padrões de projeto aplicados no Librum, com a motivação de cada escolha e referência às ADRs correspondentes.

---

## Facade em ReadingService

### Problema

O controller de leitura precisaria acessar quatro repositories diretamente para montar a resposta de um segmento: `PhaseRepository`, `UserProgressRepository`, `PhaseSegmentRepository` e `BookRepository`. Isso espalharia lógica de negócio na camada HTTP e tornaria os testes do controller dependentes de múltiplos mocks.

### Solução

`ReadingService` implementa o padrão Facade: é o único ponto de entrada para toda a lógica de leitura. O controller expõe apenas `getPhaseSegment` e `getPhasesForGenre`. Internamente, o service coordena os repositories necessários.

### Arquivos

- `backend/src/main/java/com/librum/service/ReadingService.java`
- `backend/src/main/java/com/librum/controller/ReadingController.java`

**Registro:** ADR-0007

---

## Strategy em readingThemes.js

### Problema

A página de leitura oferece três modos visuais (Padrão, Noturno e Ampliado). Sem um padrão estrutural, o `ReadingPage` precisaria de um bloco condicional para aplicar o estilo de cada tema, acoplando a lógica de apresentação ao componente e dificultando a adição de novos temas.

### Solução

Cada tema é um objeto JavaScript com a mesma interface (`label`, `contentBackground`, `contentColor`, `fontFamily`, `dropCapColor`, `sidebarBg`, `controlsBg`) definido em `readingThemes.js`. A função `applyTheme(themeId, fontSize, lineSpacing)` seleciona e executa a estratégia correta, retornando um objeto de estilo sem que o componente precise conhecer os temas individualmente.

### Arquivos

- `frontend/src/utils/readingThemes.js` (define os objetos de estratégia e o applyTheme)
- `frontend/src/pages/ReadingPage.jsx` (consome applyTheme sem conhecer os temas)

**Registro:** ADR-0012

---

## Command em QuizService

### Problema

A submissão de um quiz dispara várias operações em sequência: validar as respostas contra o banco, contar acertos, calcular o XP ganho, subir o nível do usuário quando for o caso e persistir tudo. Deixar essa sequência no controller o tornaria grande, cheio de regra de negócio e difícil de testar.

### Solução

`QuizService` encapsula toda a submissão no método `submitQuiz(userId, phaseId, answers)`. O controller chama só esse método e devolve o resultado, sem conhecer os passos internos. É uma adaptação do Command: não há um objeto Command separado com `execute()` (cerimônia desnecessária para o MVP), mas a operação completa fica encapsulada num único ponto, isolando o controller das regras de negócio.

### Arquivos

- `backend/src/main/java/com/librum/service/QuizService.java` (encapsula a submissão)
- `backend/src/main/java/com/librum/controller/QuizController.java` (consome o service)

**Registro:** ADR-0008

---

## Template Method em isPhaseUnlocked

### Problema

A regra de desbloqueio de fases precisava ser trocada na Sprint 2 (de `is_completed` para `quiz_completed`) sem reescrever todo o fluxo de verificação. O risco era espalhar condicionais pelo service ou duplicar o algoritmo de verificação.

### Solução

O método `isPhaseUnlocked` mantém um esqueleto fixo de três passos: (1) retorna `true` se for a Fase 1, (2) localiza a fase anterior pelo `phaseNumber - 1`, (3) consulta o repositório para verificar o critério de conclusão. Apenas o passo 3 varia — trocar o critério significa alterar apenas a chamada ao repository, sem tocar no esqueleto.

Na Sprint 4, a regra foi extraída do `ReadingService` para uma classe dedicada `PhaseUnlockService`, mantendo o mesmo algoritmo e melhorando a coesão do service (ADR-0010).

### Arquivos

- `backend/src/main/java/com/librum/service/PhaseUnlockService.java` (contém o algoritmo desde a Sprint 4)
- `backend/src/main/java/com/librum/repository/UserProgressRepository.java` (fornece o passo variável)

**Registro:** ADR-0009
