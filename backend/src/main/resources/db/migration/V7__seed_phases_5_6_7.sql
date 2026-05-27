-- Fase 5: O Cerco ao Forte
INSERT INTO phases (book_id, phase_number, title)
SELECT id, 5, 'Fase 5: O Cerco ao Forte' FROM books WHERE title = 'A Ilha do Tesouro';

INSERT INTO phase_segments (phase_id, segment_number, content, estimated_minutes)
SELECT p.id, 1,
'O forte de madeira era mais seguro do que esperávamos. Construído anos antes por um grupo de buscadores de ouro, tinha paredes grossas de troncos e uma clareira ao redor que impediria qualquer abordagem surpresa.

Passamos a noite organizando as defesas. O capitão Smollett distribuiu as posições com precisão militar, colocando dois homens em cada janela e mantendo uma reserva no centro. A névoa da madrugada tornava tudo mais silencioso e tenso.

Ao amanhecer, avistamos as primeiras sombras se movendo entre as árvores. Os piratas haviam cercado o forte completamente. Eu contei pelo menos quinze deles, todos armados.',
3
FROM phases p JOIN books b ON p.book_id = b.id
WHERE b.title = 'A Ilha do Tesouro' AND p.phase_number = 5;

INSERT INTO phase_segments (phase_id, segment_number, content, estimated_minutes)
SELECT p.id, 2,
'O ataque começou com um grito de guerra de Silver ordenando o avanço. Uma chuva de balas varreu as paredes de madeira. O capitão Smollett foi atingido no ombro mas continuou de pé, gritando ordens com voz firme.

Quando os piratas tentaram escalar as paredes, os repelimos com coronhadas e baionetas. A batalha durou menos de vinte minutos mas pareceu uma eternidade. No fim, seis piratas jaziam na clareira. Nós havíamos perdido dois homens.

Ficamos em silêncio depois que os tiros cessaram. O doutor Livesey curou os feridos enquanto o capitão fazia a contagem: restavam cinco homens leais contra os cerca de doze piratas sobreviventes.',
4
FROM phases p JOIN books b ON p.book_id = b.id
WHERE b.title = 'A Ilha do Tesouro' AND p.phase_number = 5;

INSERT INTO phase_segments (phase_id, segment_number, content, estimated_minutes)
SELECT p.id, 3,
'Na manhã seguinte, Silver apareceu na beira da floresta com uma bandeira branca improvisada com um lenço. Caminhou devagar até a entrada do forte, sua muleta afundando na terra mole.

Disse ao capitão Smollett que era um homem razoável e ofereceu uma proposta: entregassem o mapa e em troca todos poderiam voltar para casa em segurança. Tinha aquele sorriso que eu havia aprendido a não confiar.

O capitão o escutou sem piscar. Respondeu com calma que sair daquele forte seria a última coisa que fariam e que podiam tentar tomá-lo quando quisessem. Silver partiu sem seu sorriso.',
3
FROM phases p JOIN books b ON p.book_id = b.id
WHERE b.title = 'A Ilha do Tesouro' AND p.phase_number = 5;

-- Fase 6: Jim e o Hispaniola
INSERT INTO phases (book_id, phase_number, title)
SELECT id, 6, 'Fase 6: Jim e o Hispaniola' FROM books WHERE title = 'A Ilha do Tesouro';

INSERT INTO phase_segments (phase_id, segment_number, content, estimated_minutes)
SELECT p.id, 1,
'Naquela noite, enquanto os outros dormiam, tomei a decisão mais temerária da minha vida. Saí pelo postigo traseiro do forte, descendo cuidadosamente pela madeira escorregadia.

Ben Gunn havia me mostrado, dias antes, onde escondia sua corácula, uma pequena embarcação de couro construída com as próprias mãos. Era frágil e difícil de manobrar, mas suficiente para chegar até o Hispaniola, que balançava ancorado na baía.

Remei silenciosamente pela água escura, orientado apenas pelas luzes distantes do navio. Sentia que estava fazendo algo importante, ainda que não soubesse exatamente o que esperava encontrar a bordo.',
3
FROM phases p JOIN books b ON p.book_id = b.id
WHERE b.title = 'A Ilha do Tesouro' AND p.phase_number = 6;

INSERT INTO phase_segments (phase_id, segment_number, content, estimated_minutes)
SELECT p.id, 2,
'A bordo do Hispaniola, encontrei Israel Hands, o timoneiro, completamente bêbado. O outro pirata estava morto, vítima de uma briga entre os dois.

Hands e eu chegamos a um acordo provisório: ele me ensinaria a manobrar o navio em troca de comida e vinho. Passei horas aprendendo a controlar o leme enquanto ele me observava com olhos calculistas.

Então, num momento de descuido meu, ele agarrou uma faca ensanguentada e avançou. Subi pelo mastro como um macaco, mas ele me acertou o ombro com a lâmina. No momento em que tentou subir atrás de mim, disparei minha pistola. Israel Hands caiu no mar para nunca mais aparecer.',
4
FROM phases p JOIN books b ON p.book_id = b.id
WHERE b.title = 'A Ilha do Tesouro' AND p.phase_number = 6;

INSERT INTO phase_segments (phase_id, segment_number, content, estimated_minutes)
SELECT p.id, 3,
'Consegui ancorar o Hispaniola numa pequena enseada ao norte, escondida pela vegetação densa. Os piratas não poderiam mais usar o navio para fugir.

Quando voltei ao forte pela madrugada, encontrei a porta escancarada e trevas absolutas. Acendi um fósforo e vi rostos desconhecidos. Eram piratas, e eu estava preso.

Long John Silver surgiu das sombras e impediu os outros de me atacar. Disse com voz tranquila que aquele rapaz ficaria com ele. Eu era agora um prisioneiro, mas sentia que Silver, de alguma forma inexplicável, estava tentando me proteger dos seus próprios homens.',
4
FROM phases p JOIN books b ON p.book_id = b.id
WHERE b.title = 'A Ilha do Tesouro' AND p.phase_number = 6;

-- Fase 7: O Fim da Aventura
INSERT INTO phases (book_id, phase_number, title)
SELECT id, 7, 'Fase 7: O Fim da Aventura' FROM books WHERE title = 'A Ilha do Tesouro';

INSERT INTO phase_segments (phase_id, segment_number, content, estimated_minutes)
SELECT p.id, 1,
'O doutor Livesey chegou ao acampamento dos piratas no dia seguinte com uma oferta surpreendente: ele entregaria o mapa original em troca da minha liberdade e da vida de Silver. Silver aceitou sem hesitar.

Quando vi o doutor me olhar com um sorriso calmo antes de ir embora, compreendi que havia algo que eu não sabia. O mapa já não importava da maneira que Silver supunha.

A marcha para o interior da ilha começou ao amanhecer. Silver comandava com sua autoridade habitual, mas eu podia ver nos rostos dos outros piratas uma desconfiança crescente. Eles sabiam que Silver havia negociado sua própria pele às custas deles.',
3
FROM phases p JOIN books b ON p.book_id = b.id
WHERE b.title = 'A Ilha do Tesouro' AND p.phase_number = 7;

INSERT INTO phase_segments (phase_id, segment_number, content, estimated_minutes)
SELECT p.id, 2,
'Quando chegamos ao local marcado no mapa, os piratas escavaram freneticamente sob o sol do meio-dia. A terra era solta, o que indicava que havia sido escavada antes.

Então um dos piratas gritou de dentro da vala que o buraco estava vazio. O silêncio que se seguiu foi mais assustador do que qualquer batalha.

Os piratas olharam para Silver com raiva pura, as espingardas sendo levantadas. Mas antes que pudessem agir, tiros ecoaram pela floresta. O doutor Livesey, o esquire Trelawney e Ben Gunn caíram sobre os piratas pelo flanco. A batalha foi breve. Os piratas restantes fugiram ou se renderam.',
4
FROM phases p JOIN books b ON p.book_id = b.id
WHERE b.title = 'A Ilha do Tesouro' AND p.phase_number = 7;

INSERT INTO phase_segments (phase_id, segment_number, content, estimated_minutes)
SELECT p.id, 3,
'Ben Gunn havia encontrado o tesouro meses antes da nossa chegada e o havia carregado sozinho, peça por peça, para sua caverna nas colinas do norte. Era por isso que o doutor havia entregado o mapa sem relutância.

Levamos três dias para carregar as barras de ouro e as moedas para o Hispaniola. Era uma quantidade que nenhum de nós havia imaginado, suficiente para mudar o destino de cada um de nós para sempre.

Quando partimos da Ilha do Tesouro, Silver pediu sua parte e recebeu uma bolsa modesta. Numa das noites da viagem, ele simplesmente desapareceu com ela. Ninguém foi atrás dele. Chegamos à Inglaterra ricos e com histórias que guardaríamos pelo resto de nossas vidas.',
5
FROM phases p JOIN books b ON p.book_id = b.id
WHERE b.title = 'A Ilha do Tesouro' AND p.phase_number = 7;
