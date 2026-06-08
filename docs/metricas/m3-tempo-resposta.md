# M3: Tempo de Resposta das Requisições

**Classificação:** Produto

**Objetivo:** Verificar se o sistema atende ao RNF02, que define resposta máxima de 2 segundos por requisição.

**Como medir:** tempo médio entre o envio da requisição e o recebimento da resposta (em ms), por endpoint principal.

**Fonte:** logs do backend ou ferramenta de monitoramento, consultados a cada sprint.

**Responsável:** Giuliano

**Interpretação:** média acima de 2000 ms é sinal de problema de desempenho e precisa ser investigado antes da próxima entrega.

---

## Histórico de coleta

| Data       | Valor coletado | Observação                        |
|------------|---------------|-----------------------------------|
| 06/04/2026 | n/d                               | Nenhum endpoint implementado ainda.                               |
| 20/05/2026 | POST /auth/login: ~511ms          | Medido localmente com curl. Abaixo do limite de 2000ms (RNF02).   |
| 20/05/2026 | POST /quiz/1/submit: ~11ms        | Medido localmente com curl. Bem abaixo do limite.                 |
| 21/05/2026 | GET /quiz/1: ~109ms | Medido localmente com curl apos merge do SecurityConfig. Abaixo do limite de 2000ms (RNF02). |
| 08/06/2026 | pendente (staging) | Sprint 4 concluida. Medicao no ambiente de staging pendente de acesso a URL publicada pelo Bernardo. As medicoes locais de maio continuam validas como referencia: todos os endpoints principais ficaram abaixo de 600ms em ambiente local, bem dentro do RNF02 (2000ms). Medicao formal no staging deve ser feita antes da release v0.4.0. |