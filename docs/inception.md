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

# Backlog Inicial

---

## Histórias de usuário

1. Como leitor, quero me cadastrar e fazer login para acessar meu progresso. — **Alta prioridade** · ✅ Essencial
2. Como leitor, quero ver a tela de seleção de gêneros para escolher por onde começar. — **Alta prioridade** · ✅ Essencial
3. Como leitor, quero navegar livremente entre gêneros literários. — **Alta prioridade** · ✅ Essencial
4. Como leitor, quero ler os trechos de um livro organizados em fases. — **Alta prioridade** · ✅ Essencial
5. Como leitor, quero que a próxima fase só seja liberada depois que eu concluir a atual. — **Alta prioridade** · ✅ Essencial
6. Como leitor, quero responder um quiz ao final de cada fase para testar minha compreensão. — **Alta prioridade** · ✅ Essencial
7. Como leitor, quero ganhar XP ao concluir fases e quizzes para ver minha evolução. — **Alta prioridade** · ✅ Essencial
8. Como leitor, quero ver meu progresso por gênero e fase para saber onde parei. — **Média prioridade** · ✅ Essencial
9. Como leitor, quero ver um resumo do meu desempenho ao final do quiz. — **Média prioridade** · Complementar
10. Como leitor, quero poder reiniciar uma fase caso queira reler o conteúdo. — **Baixa prioridade** · Pós-MVP

---

## Como os critérios de aceitação estão escritos?

Cada história no repositório segue esse formato:

**Dado** que [contexto],

**quando** [o leitor faz algo],

**então** [o sistema deve responder assim].

Exemplo para a história 6:

- **Dado** que o leitor concluiu a leitura de uma fase,
- **quando** ele clica em "Iniciar quiz",
- **então** o sistema exibe entre 3 e 5 perguntas de múltipla escolha sobre o conteúdo lido.