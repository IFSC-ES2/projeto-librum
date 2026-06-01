# ADR-0012 - Strategy para os temas de leitura

## Contexto

A página de leitura oferece três modos visuais: Padrão, Noturno e Ampliado. Sem um padrão estrutural, o componente `ReadingPage` precisaria de um bloco condicional para aplicar o estilo de cada tema, acoplando a lógica de apresentação ao componente e dificultando a adição de novos temas.

## Decisão

Representar cada tema como um objeto JavaScript com a mesma interface (`label`, `contentBackground`, `contentColor`, `fontFamily`) em `readingThemes.js`. A função `applyTheme(themeId, fontSize, lineSpacing)` seleciona e executa a estratégia, retornando um objeto de estilo, sem condicional no componente.

## Alternativas consideradas

- Condicional (if/else ou switch) dentro da ReadingPage: descartado por acoplar a apresentação ao componente e crescer a cada novo tema.
- Classes CSS alternadas por nome de tema: descartado porque os parâmetros de fonte e espaçamento são dinâmicos e calculados em runtime.

## Módulos afetados

- `readingThemes.js` (define os objetos de estratégia e o applyTheme)
- `ReadingPage.jsx` (contexto que consome applyTheme sem conhecer os temas)

## O que isso implica

Adicionar um novo tema exige apenas um novo objeto em `readingThemes.js`, sem alterar a ReadingPage. O trade-off é a curva de leitura para quem não conhece o padrão Strategy.
