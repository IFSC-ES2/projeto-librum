# Fluxo de Trabalho

Este documento define o fluxo de trabalho colaborativo adotado pela equipe do Librum a partir da Entrega 4. Este fluxo deve ser seguido em todas as sprints seguintes.

**Última atualização:** abril de 2026 (Entrega 4)

---

## Branches

Todo desenvolvimento acontece em branches separadas da branch principal (`main`). Envios diretos para `main` são proibidos.

### Convenção de nomenclatura

```
<tipo>/<identificador-curto>

Exemplos:
  feat/us01-cadastro-login
  feat/us04-leitura-fases
  fix/quiz-calculo-xp
  docs/riscos-entrega4
  chore/configuracao-ci
```

Tipos aceitos: `feat`, `fix`, `docs`, `chore`, `test`, `refactor`.

### Branch principal

- **`main`**: branch estável, representa o estado atual do projeto.
- Merges em `main` só são feitos via Pull Request aprovado.

---

## Pull Requests

### Regras obrigatórias

- Todo PR deve ser aberto com base na branch de desenvolvimento, nunca diretamente de `main`.
- O PR deve referenciar a issue correspondente com `Closes #<número>`.
- É exigida **no mínimo 1 aprovação** de outro integrante da equipe antes do merge.
- O autor do PR não pode aprovar o próprio PR.
- PRs não podem ser mergeados enquanto houver comentários de revisão não resolvidos.

### Quem revisa e aprova

A revisão é responsabilidade de qualquer integrante que não seja o autor do PR. A distribuição preferencial é:

| Autor do PR | Revisor preferencial |
|-------------|----------------------|
| Antonio | Giuliano ou Maria |
| Bernardo | Antonio ou Giuliano |
| Giuliano | Maria ou Bernardo |
| Maria | Antonio ou Bernardo |

Qualquer integrante pode revisar qualquer PR. A tabela acima é uma sugestão para evitar que o mesmo par sempre revise junto, mas não é obrigatória.

---

## Template de PR

O repositório já possui um template em `.github/PULL_REQUEST_TEMPLATE.md`. Ao abrir um PR, o GitHub preenche automaticamente a descrição com o template. O autor deve preencher **todos os campos** antes de solicitar revisão.

O template inclui:

- **Descrição**: o que foi feito e por quê, com referência à issue.
- **Tipo de mudança**: nova funcionalidade, correção de bug, documentação etc.
- **Como testar**: passos para validar a mudança manualmente.
- **Checklist mínimo de revisão**:
  - [ ] Código compila e executa sem erros
  - [ ] Testes adicionados/atualizados e passando
  - [ ] Padrões de código seguidos (lint/formatação)
  - [ ] Commits seguem Conventional Commits
  - [ ] Branch atualizada com `main`

---

## Commits

Os commits seguem o padrão **Conventional Commits**:

```
<tipo>(<escopo opcional>): <descrição curta>

Exemplos:
  feat(auth): implementa endpoint de cadastro de usuário
  fix(quiz): corrige cálculo de XP quando pontuação é zero
  docs(riscos): adiciona registro inicial de riscos (entrega 4)
  test(auth): adiciona testes unitários para validação de e-mail
```

Tipos aceitos: `feat`, `fix`, `docs`, `chore`, `test`, `refactor`, `style`, `ci`.

---

## Ciclo completo de uma história

1. Issue criada e estimada no backlog
2. Issue movida para "In Progress" no board quando iniciada
3. Branch criada a partir de `main` com nomenclatura correta
4. Desenvolvimento realizado com commits seguindo Conventional Commits
5. PR aberto com template preenchido e referência à issue
6. Revisão realizada por pelo menos 1 integrante
7. Ajustes solicitados na revisão são implementados (se houver)
8. PR aprovado e mergeado em `main`
9. Branch de desenvolvimento deletada
10. Issue movida para "Done" no board

---

## Observações

- Este fluxo pode ser ajustado ao longo do projeto mediante decisão da equipe registrada em ADR.
- Em caso de emergência (ex: hotfix crítico), o Scrum Master pode autorizar um merge simplificado com aprovação verbal, desde que um PR retroativo seja aberto e documentado.
