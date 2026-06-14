# ADR-0013 - Feedback de carregamento e mensagens de erro na voz do mascote Tinta

## Contexto

A aplicacao nao dava sinal de carregamento em acoes assincronas (login e cadastro, por exemplo), entao a tela parecia travada, ainda mais com a hibernacao do staging no Render. As mensagens de erro eram tecnicas e variavam de tela para tela, cada componente montando o proprio texto. Para o publico de 9 a 16 anos, isso e confuso.

## Decisao

Padronizar o feedback ao usuario em dois pontos. Primeiro, toda acao assincrona com botao passa a indicar carregamento (botao desabilitado e indicador visual). Segundo, as mensagens de erro e de carregamento passam a falar na voz do mascote Tinta, curtas e simples, vindas de um catalogo unico em `tintaMessages.js`. A funcao `mensagemDoTinta(erro)` traduz o status HTTP (ou a ausencia dele, no caso de falha de rede) para a frase certa. Os componentes `LoadingState`, `Button` e `ErrorState` foram aprimorados para suportar o indicador visual e o mascote.

## Alternativas consideradas

- Manter cada tela montando o proprio texto de erro: descartado por inconsistencia e por espalhar a regra.
- Exibir a mensagem tecnica do backend direto na tela: descartado por nao ser compreensivel ao usuario final.

## O que isso implica

Adicionar ou ajustar uma mensagem passa a ser uma mudanca em um arquivo so. Toda tela que faz requisicao deve usar `mensagemDoTinta` no tratamento de erro e indicar carregamento nos botoes. Os erros lancados pelos servicos passam a carregar o status HTTP para o catalogo poder mapear.
