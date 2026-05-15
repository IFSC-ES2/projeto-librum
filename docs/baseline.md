# Baseline

**Data de registro:** 06 de abril de 2026

---

## Recorte do backlog

O planejamento cobre as **9 histórias de usuário do backlog inicial** (US01 a US09), conforme definidas no [inception.md](./inception.md). Essas histórias compõem o MVP completo do projeto.

| ID   | História                                 | SP | Prioridade |
|------|------------------------------------------|----|------------|
| US01 | Cadastro e login                         | 5  | Alta       |
| US02 | Seleção de gêneros literários            | 3  | Alta       |
| US03 | Navegação entre gêneros                  | 2  | Alta       |
| US04 | Leitura em fases                         | 8  | Alta       |
| US05 | Desbloqueio progressivo de fases         | 5  | Alta       |
| US06 | Quiz ao final de cada fase               | 8  | Alta       |
| US07 | Sistema de XP                            | 5  | Alta       |
| US08 | Progresso por gênero/fase                | 3  | Média      |
| US09 | Resumo do desempenho pós-quiz            | 2  | Média      |
| **Total** |                                    | **41 SP** | |

O planejamento **não inclui** US10 (refazer fase) nem funcionalidades fora do escopo definidas no inception.md (painel do educador, funcionalidades sociais, badges, modo offline, app mobile).

---

## Capacidade da equipe

Somos 4 integrantes ativos, cada um com disponibilidade de aproximadamente 4h por semana, totalizando cerca de 16h semanais de equipe.

| Integrante              | Papel              |
|-------------------------|--------------------|
| Antonio Marcos          | Arquiteto de Software |
| Bernardo Silva Bombazaro| DevOps / Infra     |
| Giuliano Marcus Bianco  | Quality Engineer   |
| Maria Carolina Hammes   | Scrum Master       |

---

## Restrições conhecidas

- Todo mundo tem outras disciplinas no mesmo período, então a disponibilidade pode variar por semana.
- Ainda não temos histórico de velocity; a velocidade real só vai aparecer depois do Sprint 1.
- Curva de aprendizado com algumas tecnologias do projeto.

---

## Linha de base

A velocity inicial estimada é de **8 SP por sprint** (ciclos de 2 semanas). Esse número é conservador: parte do pressuposto de que cada membro entrega em média 2 SP por sprint, considerando a carga acadêmica paralela e a ausência de histórico.

### Previsão de conclusão

| Sprint   | Histórias planejadas                          | SP do sprint | SP acumulados |
|----------|-----------------------------------------------|-------------|---------------|
| Sprint 1 | US01 + US02 — autenticação e seleção de gênero| 8           | 8             |
| Sprint 2 | US04 + US05 — leitura em fases e desbloqueio  | 13          | 21            |
| Sprint 3 | US06 + US07 — quiz e sistema de XP            | 13          | 34            |
| Sprint 4 | US03 + US08 + US09 + hardening               | 7–12        | 41            |

Se a velocity real ficar próxima da estimada, o MVP pode ser concluído dentro do Sprint 4, no prazo da Entrega 8.

---

## Plano de contingência para velocity abaixo do estimado

Se a velocity real ficar abaixo de 8 SP por sprint, as ações serão aplicadas em ordem, conforme a gravidade do desvio:

| Desvio observado | Ação |
|---|---|
| Velocity entre 6–7 SP (desvio leve) | Revisar estimativas na Sprint Retrospective e verificar se há impedimentos pontuais (prova, feriado). Nenhum corte de escopo ainda. |
| Velocity entre 4–5 SP (desvio moderado) | Repriorizar o backlog: garantir que as histórias de alta prioridade (US01–US07) sejam concluídas antes das de média prioridade. US08 e US09 podem ser postergadas para o Sprint 4. |
| Velocity abaixo de 4 SP (desvio crítico) | Acionar o Scrum Master para redefinição formal do escopo do MVP. US08 e US09 são removidas do MVP e tratadas como extensão. Se necessário, reduzir critérios de aceitação de histórias menos críticas (ex: US03). |

O desvio será calculado ao final de cada sprint com base nas issues movidas para "Done" no board do GitHub Projects.

---

## Fatores que podem afetar a previsibilidade

- Provas e entregas de outras disciplinas no mesmo período.
- Curva de aprendizado com tecnologias do projeto.
- Decisões de design de dados para o conteúdo literário ainda pendentes.

## Acompanhamento de Velocity

### Sprint 1 (Finalizada em: 30/04/2026)

| História | SP Estimado | Status | SP Real |
|----------|-------------|--------|---------|
| US01 - Cadastro e Login | 5 | ✅ Concluída | 5 |
| US02 - Seleção de Gêneros | 3 | ⚠️ Em andamento | 0 |
| **Total do Sprint** | **8 SP** | | **5 SP** |

**Velocity Real do Sprint 1:** 5 SP

#### Análise do Desvio
A velocity real (5 SP) ficou abaixo da estimativa inicial (8 SP). Conforme o **Plano de Contingência**, o desvio é classificado como **Moderado (entre 4-5 SP)**. 

**Causas do desvio:**
1. **Curva de Aprendizado e Ambiente:** Foram encontrados impedimentos técnicos significativos na configuração do ambiente React (Vite) e na gestão de dependências (ausência do Axios), o que demandou tempo extra de depuração do Scrum Master.
2. **Integração Backend/Frontend:** O Bloco 3-A do backend teve um tempo de execução maior que o previsto, postergando o início dos testes de integração de ponta a ponta.
3. **Atraso na US02:** Devido aos ajustes estruturais necessários na US01 (solicitados em Peer Review), a US02 foi iniciada, mas não movida para "Done", acumulando para a Sprint 2.

#### Ações para a Sprint 2
- **Repriorização:** Manter o foco total na conclusão da US02 no início da próxima sprint.
- **Mitigação de Riscos:** Documentar no README os pré-requisitos de instalação (`npm install`) para evitar que novos membros ou revisores enfrentem os mesmos erros de ambiente.
- **Ajuste de Expectativa:** A velocity média da equipe será monitorada na Sprint 2 antes de uma redefinição formal do escopo do MVP, visando recuperar o ritmo nas histórias US04 e US05.

### Sprint 2 (Finalizada em: 15/05/2026)

| História | SP Estimado | Status | SP Real |
|----------|-------------|--------|---------|
| US02 - Seleção de Gêneros (Carry-over) | 3 | ✅ Concluída | 3 |
| US04 - Leitura em Fases | 8 | ✅ Concluída | 8 |
| US05 - Desbloqueio Progressivo | 5 | ✅ Concluída | 5 |
| **Total do Sprint** | **16 SP** | | **16 SP** |

**Velocity Real do Sprint 2:** 16 SP

#### Análise do Desvio
A velocity real (16 SP) superou significativamente a estimativa inicial (8 SP) e a velocity do Sprint 1 (5 SP). Isso se deve à resolução dos impedimentos técnicos iniciais e ao ganho de fluidez na integração entre frontend e backend. O uso de padrões como Strategy e Facade ajudou a organizar o código e acelerar o desenvolvimento.

**Velocity Média (S1+S2):** 10.5 SP/sprint.
A equipe agora está alinhada com a meta original de concluir o MVP no Sprint 4.