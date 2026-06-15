# Testes de Aceitacao - Librum (Release Candidate)

Roteiro de testes de aceitacao das funcionalidades principais do MVP. Execucao manual documentada. Cada caso indica a historia, o criterio de aceitacao, os passos, o resultado esperado, o resultado obtido e a evidencia.

Legenda de resultado: Aprovado, Reprovado, Aprovado com ressalvas.

Ambiente da execucao: local (frontend em localhost:5173, backend em localhost:8080 com PostgreSQL via docker compose). O TA-01, TA-02 e TA-03 tambem foram conferidos no staging (https://librum-frontend.onrender.com).
Data da execucao: 14/06/2026.
Responsavel: Giuliano.

As capturas de cada caso estao em `docs/evidencias/aceitacao/` e reunidas na secao [Evidencias](#evidencias).

| ID | Funcionalidade | Historia | Criterio de aceitacao | Passos | Resultado esperado | Resultado | Evidencia |
|----|----------------|----------|-----------------------|--------|--------------------|-----------|-----------|
| TA-01 | Cadastro de usuario | US01 | Usuario cria conta e entra autenticado | Abrir /register, preencher nome, e-mail e senha validos, enviar | Conta criada, login automatico e redirecionamento para /inicio | Aprovado | Conta criada e redirecionamento para a tela inicial, no local e no staging |
| TA-02 | Login | US01 | Usuario entra com credenciais validas | Abrir /login, informar e-mail e senha corretos | Acesso ao /inicio | Aprovado | Acesso a tela inicial, no local e no staging |
| TA-03 | Login invalido com feedback do Tinta | US01 (hardening) | Erro claro ao errar a senha | Informar senha errada | Mensagem do Tinta de e-mail ou senha incorretos; botao volta ao normal | Aprovado com ressalvas | Local: mensagem do Tinta correta. Staging: mensagem antiga "E-mail ou senha incorretos" por build desatualizado. Defeito #172. Capturas: ta-03-login-invalido-local.png, ta-03-login-invalido-staging.png |
| TA-04 | Selecao de genero | US02 | Lista de generos vinda do backend | Abrir /genres | Generos listados; Aventura ativo; demais como em breve | Aprovado com ressalvas | Generos listados do backend e Aventura abre. Demais generos aparecem clicaveis e levam a 404 em vez de "em breve". Defeito #173. Capturas: ta-04-lista-generos.png, ta-04-genero-sem-conteudo-404.png, ta-04-trilha-aventura.png |
| TA-05 | Trilha e desbloqueio | US05/US08 | So a Fase 1 liberada para usuario novo | Abrir a trilha de Aventura | Fase 1 ativa, demais bloqueadas | Aprovado | Trilha com Fase 1 ativa e Fases 2 a 7 bloqueadas para usuario novo. Captura: ta-04-trilha-aventura.png |
| TA-06 | Leitura de segmentos | US04 | Ler os trechos da fase | Abrir a Fase 1 e navegar pelos trechos | Conteudo exibido; botao avanca ate o quiz | Aprovado | Trechos 1 a 3 exibidos, com barra de progresso e botao avancando ate "Ir ao quiz". Capturas: ta-06-trecho-1.png a ta-06-trecho-3.png, ta-06-quiz-fase-1.png |
| TA-07 | Quiz aprovado | US06 | Acertar o quiz desbloqueia a proxima fase | Responder o quiz acertando o suficiente | Tela de fase concluida; Fase 2 liberada na trilha | Aprovado | 2 de 4 acertos (borda minima) aprovou: tela de fase concluida, +10 XP e Fase 2 liberada. Capturas: ta-07-fase-concluida-xp.png, ta-07-trilha-fase-2-liberada.png |
| TA-08 | Quiz reprovado | US06 | Reprovar nao desbloqueia | Responder errando a maioria | Mensagem de reprovacao; proxima fase segue bloqueada | Aprovado com ressalvas | 1 de 4 acertos reprovou e a Fase 3 seguiu bloqueada (criterio atendido). Porem a fase apareceu como concluida na trilha e concedeu XP. Defeito #174 (integridade de progresso, o mais severo). Capturas: ta-08-fase-nao-concluida.png, ta-08-trilha-fase-2-check-indevido.png |
| TA-09 | XP e nivel | US07 | XP aumenta ao concluir fase | Concluir uma fase | XP e nivel atualizados no badge e no perfil | Aprovado | Badge e perfil mostraram nivel e XP coerentes apos concluir a fase. Captura: ta-09-10-perfil.png |
| TA-10 | Progresso por genero | US08 | Perfil mostra progresso | Abrir /perfil | Progresso por genero e fases concluidas corretos | Aprovado | Perfil mostrou Aventura contando apenas as fases com quiz aprovado (1/7 no momento do teste). Captura: ta-09-10-perfil.png |
| TA-11 | Fase concluida | US09 | Tela de celebracao apos aprovacao | Aprovar um quiz | Tela com XP ganho e botao para a proxima fase | Aprovado | Tela de celebracao com XP ganho, acertos, nivel e botao para a proxima fase. Captura: ta-07-fase-concluida-xp.png |
| TA-12 | Feedback de carregamento | Entrega 9 (hardening) | Acoes assincronas indicam carregamento | Enviar login, cadastro e quiz observando o botao | Botao desabilita e mostra carregamento na voz do Tinta | Aprovado | Com rede lenta, login e quiz mostraram o texto do Tinta no botao desabilitado; demais telas indicaram carregamento. Capturas: ta-12-login-carregando.png, ta-12-quiz-corrigindo.png, ta-12-carregando-fases.png, ta-12-carregando-trecho.png, ta-12-leitura-carregando.png |
| TA-13 | Erro sem conexao | Entrega 9 (hardening) | Erro amigavel sem a API | Com a API fora do ar, tentar carregar uma pagina | ErrorState com a mensagem do Tinta de sem conexao | Aprovado com ressalvas | Inicio e telas do hardening mostraram a mensagem do Tinta de sem conexao com "Tentar de novo". O Perfil mostrou mensagem fixa sem a voz do Tinta nem retry. Defeito #175. Capturas: ta-13-inicio-erro-tinta.png, ta-13-perfil-erro-sem-tinta.png |

## Resumo da execucao

- Total de casos: 13
- Aprovados: 9 (TA-01, TA-02, TA-05, TA-06, TA-07, TA-09, TA-10, TA-11, TA-12)
- Aprovados com ressalvas: 4 (TA-03, TA-04, TA-08, TA-13)
- Reprovados: 0
- Defeitos abertos:
  - #172 - Frontend do staging desatualizado, nao reflete o RC (mensagens do Tinta ausentes)
  - #173 - Generos sem conteudo aparecem clicaveis e levam a 404 em vez de "em breve"
  - #174 - Fase reprovada no quiz conta como concluida na trilha e concede XP. E o defeito mais severo dos quatro: e um problema de integridade de progresso, pois grava um estado incorreto (fase reprovada marcada como concluida no campo is_completed e XP concedido por acerto), o que mascara o progresso real do usuario. A classificacao do TA-08 como "aprovado com ressalvas" se sustenta apenas porque o desbloqueio em si respeitou a regra (a Fase 3 seguiu bloqueada, pois usa quiz_completed); ainda assim, exige correcao antes da release.
  - #175 - Pagina de Perfil nao usa a voz do Tinta no erro e nao tem botao de tentar de novo

## Evidencias

Capturas da execucao, em `docs/evidencias/aceitacao/`.

### TA-03 - Login invalido com feedback do Tinta

![Login invalido no local, com a mensagem na voz do Tinta](evidencias/aceitacao/ta-03-login-invalido-local.png)
![Login invalido no staging, com a mensagem antiga](evidencias/aceitacao/ta-03-login-invalido-staging.png)
![Login invalido no staging, detalhe](evidencias/aceitacao/ta-03-login-invalido-staging-detalhe.png)

### TA-04 - Selecao de genero

![Lista de generos com todos clicaveis](evidencias/aceitacao/ta-04-lista-generos.png)
![Genero sem conteudo levando a 404](evidencias/aceitacao/ta-04-genero-sem-conteudo-404.png)
![Trilha de Aventura ao abrir o genero com conteudo](evidencias/aceitacao/ta-04-trilha-aventura.png)

### TA-05 - Trilha e desbloqueio

![Trilha com a Fase 1 ativa e as demais bloqueadas](evidencias/aceitacao/ta-04-trilha-aventura.png)

### TA-06 - Leitura de segmentos

![Trecho 1 de 3](evidencias/aceitacao/ta-06-trecho-1.png)
![Trecho 2 de 3](evidencias/aceitacao/ta-06-trecho-2.png)
![Trecho 3 de 3, com botao Ir ao quiz](evidencias/aceitacao/ta-06-trecho-3.png)
![Quiz da Fase 1](evidencias/aceitacao/ta-06-quiz-fase-1.png)

### TA-07 - Quiz aprovado

![Quiz da Fase 1, questao 1](evidencias/aceitacao/ta-07-quiz-q1.png)
![Quiz da Fase 1, questao 2](evidencias/aceitacao/ta-07-quiz-q2.png)
![Quiz da Fase 1, questao 3](evidencias/aceitacao/ta-07-quiz-q3.png)
![Quiz da Fase 1, questao 4](evidencias/aceitacao/ta-07-quiz-q4.png)
![Tela de fase concluida com XP](evidencias/aceitacao/ta-07-fase-concluida-xp.png)
![Trilha com a Fase 2 liberada](evidencias/aceitacao/ta-07-trilha-fase-2-liberada.png)

### TA-08 - Quiz reprovado

![Quiz da Fase 2, questao 1](evidencias/aceitacao/ta-08-quiz-q1.png)
![Quiz da Fase 2, questao 2](evidencias/aceitacao/ta-08-quiz-q2.png)
![Quiz da Fase 2, questao 3](evidencias/aceitacao/ta-08-quiz-q3.png)
![Quiz da Fase 2, questao 4](evidencias/aceitacao/ta-08-quiz-q4.png)
![Tela de fase nao concluida apos reprovar](evidencias/aceitacao/ta-08-fase-nao-concluida.png)
![Trilha mostrando a Fase 2 com check indevido apos reprovar (defeito #174)](evidencias/aceitacao/ta-08-trilha-fase-2-check-indevido.png)

### TA-09 e TA-10 - XP, nivel e progresso por genero

![Perfil com nivel, XP e progresso por genero](evidencias/aceitacao/ta-09-10-perfil.png)

### TA-12 - Feedback de carregamento

![Login com o botao na voz do Tinta](evidencias/aceitacao/ta-12-login-carregando.png)
![Carregando fases](evidencias/aceitacao/ta-12-carregando-fases.png)
![Carregando trecho](evidencias/aceitacao/ta-12-carregando-trecho.png)
![Leitura com botao carregando](evidencias/aceitacao/ta-12-leitura-carregando.png)
![Quiz com o botao na voz do Tinta](evidencias/aceitacao/ta-12-quiz-corrigindo.png)

### TA-13 - Erro sem conexao

![Inicio com a mensagem do Tinta de sem conexao e botao tentar de novo](evidencias/aceitacao/ta-13-inicio-erro-tinta.png)
![Perfil com mensagem fixa, sem a voz do Tinta (defeito #175)](evidencias/aceitacao/ta-13-perfil-erro-sem-tinta.png)
![Carregando perfil antes do erro](evidencias/aceitacao/ta-13-carregando-perfil.png)
![Trilha exibida com a API ainda respondendo](evidencias/aceitacao/ta-13-trilha.png)
