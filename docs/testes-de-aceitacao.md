# Testes de Aceitacao - Librum (Release Candidate)

Roteiro de testes de aceitacao das funcionalidades principais do MVP. Execucao manual documentada. Cada caso indica a historia, o criterio de aceitacao, os passos, o resultado esperado, o resultado obtido e a evidencia.

Legenda de resultado: Aprovado, Reprovado, Aprovado com ressalvas.

Ambiente da execucao: local (frontend em localhost:5173, backend em localhost:8080 com PostgreSQL via docker compose). O TA-01, TA-02 e TA-03 tambem foram conferidos no staging (https://librum-frontend.onrender.com).
Data da execucao: 14/06/2026.
Responsavel: Giuliano.

| ID | Funcionalidade | Historia | Criterio de aceitacao | Passos | Resultado esperado | Resultado | Evidencia |
|----|----------------|----------|-----------------------|--------|--------------------|-----------|-----------|
| TA-01 | Cadastro de usuario | US01 | Usuario cria conta e entra autenticado | Abrir /register, preencher nome, e-mail e senha validos, enviar | Conta criada, login automatico e redirecionamento para /inicio | Aprovado | Conta criada e redirecionamento para a tela inicial, no local e no staging |
| TA-02 | Login | US01 | Usuario entra com credenciais validas | Abrir /login, informar e-mail e senha corretos | Acesso ao /inicio | Aprovado | Acesso a tela inicial, no local e no staging |
| TA-03 | Login invalido com feedback do Tinta | US01 (hardening) | Erro claro ao errar a senha | Informar senha errada | Mensagem do Tinta de e-mail ou senha incorretos; botao volta ao normal | Aprovado com ressalvas | Local: mensagem do Tinta correta. Staging: mensagem antiga "E-mail ou senha incorretos" por build desatualizado. Defeito #172 |
| TA-04 | Selecao de genero | US02 | Lista de generos vinda do backend | Abrir /genres | Generos listados; Aventura ativo; demais como em breve | Aprovado com ressalvas | Generos listados do backend e Aventura abre. Demais generos aparecem clicaveis e levam a 404 em vez de "em breve". Defeito #173 |
| TA-05 | Trilha e desbloqueio | US05/US08 | So a Fase 1 liberada para usuario novo | Abrir a trilha de Aventura | Fase 1 ativa, demais bloqueadas | Aprovado | Trilha com Fase 1 ativa e Fases 2 a 7 bloqueadas para usuario novo |
| TA-06 | Leitura de segmentos | US04 | Ler os trechos da fase | Abrir a Fase 1 e navegar pelos trechos | Conteudo exibido; botao avanca ate o quiz | Aprovado | Trechos 1 a 3 exibidos, com barra de progresso e botao avancando ate "Ir ao quiz" |
| TA-07 | Quiz aprovado | US06 | Acertar o quiz desbloqueia a proxima fase | Responder o quiz acertando o suficiente | Tela de fase concluida; Fase 2 liberada na trilha | Aprovado | 2 de 4 acertos (borda minima) aprovou: tela de fase concluida, +10 XP e Fase 2 liberada |
| TA-08 | Quiz reprovado | US06 | Reprovar nao desbloqueia | Responder errando a maioria | Mensagem de reprovacao; proxima fase segue bloqueada | Aprovado com ressalvas | 1 de 4 acertos reprovou e a Fase 3 seguiu bloqueada (criterio atendido). Porem a fase apareceu como concluida na trilha e concedeu XP. Defeito #174 |
| TA-09 | XP e nivel | US07 | XP aumenta ao concluir fase | Concluir uma fase | XP e nivel atualizados no badge e no perfil | Aprovado | Badge e perfil mostraram nivel e XP coerentes apos concluir a fase |
| TA-10 | Progresso por genero | US08 | Perfil mostra progresso | Abrir /perfil | Progresso por genero e fases concluidas corretos | Aprovado | Perfil mostrou Aventura contando apenas as fases com quiz aprovado (1/7 no momento do teste) |
| TA-11 | Fase concluida | US09 | Tela de celebracao apos aprovacao | Aprovar um quiz | Tela com XP ganho e botao para a proxima fase | Aprovado | Tela de celebracao com XP ganho, acertos, nivel e botao para a proxima fase |
| TA-12 | Feedback de carregamento | Entrega 9 (hardening) | Acoes assincronas indicam carregamento | Enviar login, cadastro e quiz observando o botao | Botao desabilita e mostra carregamento na voz do Tinta | Aprovado | Com rede lenta, login e quiz mostraram o texto do Tinta no botao desabilitado; demais telas indicaram carregamento |
| TA-13 | Erro sem conexao | Entrega 9 (hardening) | Erro amigavel sem a API | Com a API fora do ar, tentar carregar uma pagina | ErrorState com a mensagem do Tinta de sem conexao | Aprovado com ressalvas | Inicio e telas do hardening mostraram a mensagem do Tinta de sem conexao com "Tentar de novo". O Perfil mostrou mensagem fixa sem a voz do Tinta nem retry. Defeito #175 |

## Resumo da execucao

- Total de casos: 13
- Aprovados: 9 (TA-01, TA-02, TA-05, TA-06, TA-07, TA-09, TA-10, TA-11, TA-12)
- Aprovados com ressalvas: 4 (TA-03, TA-04, TA-08, TA-13)
- Reprovados: 0
- Defeitos abertos:
  - #172 - Frontend do staging desatualizado, nao reflete o RC (mensagens do Tinta ausentes)
  - #173 - Generos sem conteudo aparecem clicaveis e levam a 404 em vez de "em breve"
  - #174 - Fase reprovada no quiz conta como concluida na trilha e concede XP
  - #175 - Pagina de Perfil nao usa a voz do Tinta no erro e nao tem botao de tentar de novo
