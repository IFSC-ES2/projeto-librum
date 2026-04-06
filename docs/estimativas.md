## Técnica de estimativa

Nós usamos *Story Points com escala de Fibonacci* (1, 2, 3, 5, 8, 13). O número representa uma combinação de complexidade, esforço e incerteza - não exatamente horas diretas de trabalho.

Todos os quatro participantes da equipe participaram da estimativa. A história de referência foi a **US01 (cadastro e login)**, que ficou em **5 pontos** por ser a mais equilibrada em termos de camadas (frontend, backend e banco). As demais foram estimadas em relação essa história.

## Estimativas por história

- **US01 - Cadastro e login - 5 SP:** referência da estimativa; envolve formulário, API, JWT e banco de dados.
- **US02 - Seleção de gêneros literários - 3 SP:** tela mais simples, navegação direta sem lógica complexa.
- **US03 - Navegação entre gêneros literários - 2 SP:** extensão da US02, sem lógica adicionada.
- **US04 - Leitura em fases - 8 SP:** maior incerteza pois envolve modelagem do conteúdo literário, visualizador e divisão em fases.
- **US05 - Desbloqueio progressivo - 5 SP:** lógica de controle de progresso no backend.
- **US06 - Quiz ao final da fase - 8 SP:** banco de questões, cálculo de pontuação e feedback ao terminar a lição.
- **US07 - Sistema de XP - 5 SP:** cálculo, persistência e exibição do XP acumulado.
- **US08 - Progresso por gênero/fase - 3 SP:** consulta e exibição de dados já existentes no sistema.
- **US09 - Resumo do desempenho - 2 SP:** tela de feedback pós-quiz com dados já disponíveis.

**Total: 41 Story Points**