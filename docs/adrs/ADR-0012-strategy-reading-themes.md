# ADR-0012 - Strategy para os temas de leitura

## Contexto

A página de leitura oferece três modos visuais: Padrão, Noturno e Ampliado. Sem um padrão estrutural, o componente `ReadingPage` precisaria de um bloco condicional para aplicar o estilo de cada tema, acoplando a lógica de apresentação ao componente e dificultando a adição de novos temas.

## Decisão

Representar cada tema como um objeto JavaScript com a mesma interface em `readingThemes.js`. Cada tema expõe `id` (chave de seleção), `label` (rótulo exibido na UI) e os campos visuais `contentBackground`, `contentColor`, `fontFamily`, `dropCapColor`, `sidebarBg` e `controlsBg`. A função `applyTheme(themeId, fontSize, lineSpacing)` seleciona o tema, grava as cores nas variáveis CSS de leitura (`--reading-bg`, `--reading-text`, `--reading-dropcap`, `--reading-sidebar-bg`, `--reading-controls-bg`) e retorna um objeto de estilo com `backgroundColor`, `color`, `fontFamily`, `fontSize` e `lineHeight`, sem condicional no componente.

## Alternativas consideradas

- Condicional (if/else ou switch) dentro da ReadingPage: descartado por acoplar a apresentação ao componente e crescer a cada novo tema.
- Classes CSS alternadas por nome de tema: descartado porque os parâmetros de fonte e espaçamento são dinâmicos e calculados em runtime.

## Módulos afetados

- `readingThemes.js` (define os objetos de estratégia e o applyTheme)
- `ReadingPage.jsx` (contexto que consome applyTheme sem conhecer os temas)

## O que isso implica

Adicionar um novo tema exige apenas um novo objeto em `readingThemes.js`, sem alterar a ReadingPage. O trade-off é a curva de leitura para quem não conhece o padrão Strategy.
