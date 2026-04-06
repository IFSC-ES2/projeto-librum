# Visão do Produto

---

## Qual problema o sistema resolve?

Atualmente, muitas crianças e adolescentes têm dificuldade em criar o hábito de leitura. No mundo escolar, as listas de livros obrigatórios não funcionar. É difícil competir com redes sociais e jogos que prendem a atenção de forma imediata.

O **Librum** quer mudar isso e transformar a leitura em uma experiência mais divertida e interativa, parecida com um jogo. O leitor escolhe um gênero que gosta, lê trechos de livros reais, responde perguntas e vai desbloqueando novas fases. A ideia é que ler vire algo prazeroso e com progressão visível, não uma obrigação.

---

## Quem vai usar?

- **Leitor:** crianças e adolescentes entre 9 e 16 anos que querem criar ou fortalecer o hábito de leitura.
- **Interessados indiretos:** pais, professores e bibliotecas que acompanham ou incentivam a leitura.

---

## O que o Librum oferece de diferente?

A navegação do app é inspirada no Duolingo: ao invés de escolher um idioma para aprender, o usuário escolhe um **gênero literário** (terror, suspense, romance, fantasia e etc.) Dentro de cada gênero, o usuário avança por fases lendo trechos de livros reais, respondendo perguntas e ganhando pontos ao final de cada fase para fixar o conteúdo.

A proposta é simples: tornar a leitura mais engajante e mostrar que ler pode ser tão divertido quanto qualquer outro entretenimento digital.

---

## O que queremos entregar neste semestre?

- Tela de seleção de gênero literário com navegação livre entre eles
- Pelo menos um livro por gênero, dividido em fases progressivas
- Quiz de compreensão ao final de cada fase
- Sistema básico de XP e nível do leitor
- Um MVP que funcione e possa ser testado por usuários reais

---

## O que já sabemos que vai limitar o projeto?

- Vamos começar com **1 livro por gênero** para não sobrecarregar a equipe no prazo acadêmico. A estrutura já vai permitir adicionar mais livros depois.
- Os livros precisam ser de **domínio público** para evitar problemas de direitos autorais.
- A equipe é pequena e tem outras disciplinas - o escopo precisa ser realista.
- A versão deste semestre será **apenas web** (sem app mobile).
- Não vai ter painel para professores nem funcionalidades sociais no MVP.

# Definição do MVP

---

## Qual é o objetivo do MVP?

Entregar um ciclo completo e funcional da aplicação, ou seja, o usuário escolhe um gênero, lê os trechos de um livro que serão divididos em fases, responde um quiz de múltipla escolha ao final de cada fase e acumula progresso. Se esse fluxo funcionar bem, o produto tem valor e tudo mais pode ser construído em cima disso.

---

## O que entra no MVP?

- Cadastro e login
- Tela de seleção de gênero literário
- Navegação livre entre gêneros
- Leitura de trechos divididos em fases
- Desbloqueio da próxima fase só após concluir a atual
- Quiz de múltipla escolha ao final de cada fase
- Sistema de XP e nível do leitor
- Registro do progresso por gênero e fase

---

## O que fica de fora por agora?

- Mais de um livro por gênero
- Painel do educador
- Funcionalidades sociais (resenhas, clubes de leitura, ranking)
- Sistema de badges e conquistas
- Missões diárias
- Recomendações personalizadas por perfil
- App mobile
- Modo offline

---

## Por que esse recorte faz sentido?

Com um livro por gênero e um questionário simples por fase, conseguimos entregar algo completo e testável sem precisar de muito tempo de desenvolvimento. O foco é validar se a proposta funciona antes de escalar.

---

## Como decidimos o que entra e o que fica de fora?

Usamos dois critérios:

1. **É necessário para o fluxo principal funcionar?** Se sim, entra.
2. **Dá para fazer no semestre com o tamanho da equipe?** Se não, fica para depois.

Funcionalidades que são legais mas não são essenciais para a experiência central foram todas deixadas para versões futuras.

# Backlog Inicial

---

## Histórias de usuário

1. Como leitor, quero me cadastrar e fazer login para que meu progresso seja salvo entre as sessões. (Alta prioridade)
2. Como leitor, quero ver uma tela com os gêneros disponíveis assim que entrar na aplicação, para poder escolher por onde quero começar. (Alta prioridade)
3. Como leitor, quero conseguir trocar de gênero quando quiser, sem precisar recomeçar do zero. (Alta prioridade)
4. Como leitor, quero ler os trechos de um livro divididos em partes menores, para não ter que ler tudo de uma vez. (Alta prioridade)
5. Como leitor, quero que a fase seguinte só apareça disponível depois que eu terminar a atual, para sentir que estou avançando de verdade. (Alta prioridade)
6. Como leitor, quero responder perguntas sobre o que li ao final de cada fase, para ver se entendi o conteúdo. (Alta prioridade)
7. Como leitor, quero acumular pontos conforme termino as fases e os questionários, para acompanhar minha evolução ao longo do tempo. (Alta prioridade)
8. Como leitor, quero ver onde parei em cada gênero, para retomar de onde fui sem precisar lembrar manualmente. (Média prioridade)
9. Como leitor, quero ver um resumo do meu resultado logo depois do questionário, para saber quantas perguntas acertei. (Média prioridade)
10. Como leitor, quero ter a opção de refazer uma fase, caso queira reler o trecho antes de tentar o questionário de novo. (Baixa prioridade)

---

## Como os critérios de aceitação estão escritos?

Cada história no repositório segue esse formato:

**Dado** que [contexto],

**quando** [o leitor faz algo],

**então** [o sistema deve responder assim].

Exemplo para a história 6:

- **Dado** que o leitor concluiu a leitura de uma fase,
- **quando** ele clica em "Iniciar questionário",
- **então** o sistema exibe entre 3 e 5 perguntas de múltipla escolha sobre o conteúdo lido.