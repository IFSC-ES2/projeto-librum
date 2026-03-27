# Visão do Produto

---

## Qual problema o sistema resolve?

Muita gente - especialmente adolescentes - tem dificuldade de criar o hábito de leitura. Listas de livros obrigatórios da escola não costumam funcionar, e é difícil competir com redes sociais e jogos que prendem a atenção de forma muito mais imediata.

O **Librum** quer mudar isso transformando a leitura em uma experiência mais parecida com um jogo: o leitor escolhe um gênero que gosta, lê trechos de livros reais, responde perguntas e vai desbloqueando novas fases. A ideia é que ler vire algo prazeroso e com progressão visível, não uma obrigação.

---

## Quem vai usar?

- **Leitor:** adolescentes e jovens entre 9 e 16 anos que querem criar ou fortalecer o hábito de leitura.
- **Interessados indiretos:** pais, professores, escolas e bibliotecas que acompanham ou incentivam a leitura.

---

## O que o Librum oferece de diferente?

A navegação do app é inspirada no Duolingo: assim como lá você escolhe um idioma para aprender, aqui você escolhe um **gênero literário** - terror, suspense, romance, fantasia, etc. Dentro do gênero, você avança por fases lendo trechos de um livro real, ganha pontos (XP) e responde um quiz ao final de cada fase para ver se absorveu o conteúdo.

A proposta é simples: tornar a leitura mais engajante e mostrar que ler pode ser tão envolvente quanto qualquer outro entretenimento digital.

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

Entregar um ciclo completo e funcional: o usuário escolhe um gênero, lê os trechos de um livro divididos em fases, responde um quiz ao final de cada fase e acumula progresso. Se esse fluxo funcionar bem, o produto tem valor, tudo mais pode ser construído em cima disso.

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

Com um livro por gênero e um quiz simples por fase, conseguimos entregar algo completo e testável sem precisar de meses a mais de desenvolvimento. O foco é validar se a proposta funciona antes de escalar.

---

## Como decidimos o que entra e o que fica de fora?

Usamos dois critérios:

1. **É necessário para o fluxo principal funcionar?** Se sim, entra.
2. **Dá para fazer no semestre com o tamanho da equipe?** Se não, fica para depois.

Funcionalidades que são legais mas não são essenciais para a experiência central foram todas deixadas para versões futuras.