INSERT INTO genres (name, slug, icon_emoji, description) VALUES
  ('Aventura', 'aventura', 'Histórias de ação, exploração e coragem'),
  ('Terror', 'terror', 'Narrativas de suspense e medo'),
  ('Romance', 'romance', 'Histórias de amor e relacionamentos'),
  ('Fantasia', 'fantasia', 'Mundos mágicos e criaturas fantásticas'),
  ('Suspense', 'suspense', 'Mistérios e reviravoltas inesperadas');

INSERT INTO books (genre_id, title, author)
SELECT id, 'A Ilha do Tesouro', 'Robert Louis Stevenson'
FROM genres WHERE slug = 'aventura';

INSERT INTO phases (book_id, phase_number, title)
SELECT id, 1, 'Fase 1: O Início da Aventura' FROM books WHERE title = 'A Ilha do Tesouro';
INSERT INTO phases (book_id, phase_number, title)
SELECT id, 2, 'Fase 2: A Bordo do Hispaniola' FROM books WHERE title = 'A Ilha do Tesouro';
INSERT INTO phases (book_id, phase_number, title)
SELECT id, 3, 'Fase 3: Segredos da Ilha' FROM books WHERE title = 'A Ilha do Tesouro';
INSERT INTO phases (book_id, phase_number, title)
SELECT id, 4, 'Fase 4: O Tesouro do Capitão Flint' FROM books WHERE title = 'A Ilha do Tesouro';

INSERT INTO phase_segments (phase_id, segment_number, content, estimated_minutes)
SELECT p.id, 1,
'O velho marinheiro chegou numa tarde fria de outono, carregando um baú enorme nas costas. Ele era um homem alto, forte, com as mãos calejadas e um corte profundo na bochecha esquerda. Pediu um quarto e ficou olhando para o mar por horas.

Meu pai disse que era um hóspede difícil, mas que pagava bem. O homem bebia rum todas as noites e cantava velhas canções de marinheiro, batendo o punho na mesa quando chegava ao refrão.

Ele me chamou de lado no segundo dia e me ofereceu uma moeda de prata por mês se eu ficasse de olho em um marinheiro de uma perna só. Eu não sabia o que pensar daquilo, mas aceitei o trato.',
3
FROM phases p
JOIN books b ON p.book_id = b.id
WHERE b.title = 'A Ilha do Tesouro' AND p.phase_number = 1;

INSERT INTO phase_segments (phase_id, segment_number, content, estimated_minutes)
SELECT p.id, 2,
'Certa noite, um homem cego bateu à porta da estalagem. Ele se apresentou como Pew e pediu para ser levado até o capitão. Algo naquele homem me deixou com os cabelos em pé.

O capitão ficou pálido quando Pew lhe colocou algo na mão. Mais tarde descobri que era o papel negro, o sinal da morte entre os piratas.

Naquela mesma noite, o capitão teve um ataque fulminante e morreu. Minha mãe e eu sabíamos que precisávamos agir rápido antes que os outros voltassem.',
3
FROM phases p
JOIN books b ON p.book_id = b.id
WHERE b.title = 'A Ilha do Tesouro' AND p.phase_number = 1;

INSERT INTO phase_segments (phase_id, segment_number, content, estimated_minutes)
SELECT p.id, 3,
'Abrimos o baú do capitão à luz de uma vela tremulante. Havia roupas velhas, uma bússola, alguns papéis e, no fundo, um mapa dobrado com cuidado.

O mapa mostrava uma ilha com três cruzes vermelhas e uma anotação: "Tesouro principal aqui". Era a carta náutica do lendário Capitão Flint.

Fugimos com o mapa pouco antes de os piratas invadirem a estalagem. Eu podia ouvir os passos deles na estrada enquanto corríamos pela escuridão.',
4
FROM phases p
JOIN books b ON p.book_id = b.id
WHERE b.title = 'A Ilha do Tesouro' AND p.phase_number = 1;

INSERT INTO phase_segments (phase_id, segment_number, content, estimated_minutes)
SELECT p.id, 1,
'O Esquire Trelawney ficou animadíssimo com o mapa e prometeu armar uma expedição imediatamente. Em poucas semanas, ele havia comprado um brigue chamado Hispaniola e contratado uma tripulação em Bristol.

O cozinheiro do navio era um homem chamado Long John Silver, que se locomovia com uma muleta de madeira. Ele tinha um papagaio no ombro que repetia "Peças de oito!" sem parar.

Silver era inteligente, bem-humorado e parecia conhecer cada porto do mundo. Eu gostei dele desde o primeiro momento, sem imaginar o que estava por vir.',
3
FROM phases p
JOIN books b ON p.book_id = b.id
WHERE b.title = 'A Ilha do Tesouro' AND p.phase_number = 2;

INSERT INTO phase_segments (phase_id, segment_number, content, estimated_minutes)
SELECT p.id, 2,
'Na primeira noite no mar, eu não conseguia dormir. Resolvi me esconder num barril de maçãs no convés para pegar uma fruta, mas acabei adormecendo lá dentro.

Acordei com vozes sussurrando bem perto. Era Silver, conversando com dois marujos. O que ouvi me gelou o sangue: ele planejava matar todos nós assim que o tesouro fosse encontrado.

Fiquei imóvel, contendo a respiração, enquanto eles tramavam cada detalhe da traição. Quando eles foram embora, eu sabia que precisava avisar o capitão Smollett.',
3
FROM phases p
JOIN books b ON p.book_id = b.id
WHERE b.title = 'A Ilha do Tesouro' AND p.phase_number = 2;

INSERT INTO phase_segments (phase_id, segment_number, content, estimated_minutes)
SELECT p.id, 3,
'Contei tudo ao doutor Livesey e ao capitão Smollett durante a madrugada. Eles me ouviram em silêncio, com rostos sérios.

O capitão disse que não podíamos agir ainda, pois os piratas eram maioria a bordo. Precisávamos esperar chegar à ilha e encontrar uma oportunidade.

Na manhã seguinte, avistamos a ilha no horizonte. O mapa batia perfeitamente com o que víamos: duas colinas ao norte e uma grande baía ao sul. Senti um frio na espinha que não era do vento.',
4
FROM phases p
JOIN books b ON p.book_id = b.id
WHERE b.title = 'A Ilha do Tesouro' AND p.phase_number = 2;

INSERT INTO phase_segments (phase_id, segment_number, content, estimated_minutes)
SELECT p.id, 1,
'Desembarcamos na ilha divididos em dois grupos. Quando os piratas começaram a matar, corri para o interior da floresta sem olhar para trás.

Foi então que ouvi uma voz vinda de cima de uma árvore. Era Ben Gunn, um marinheiro que havia sido abandonado na ilha há três anos. Ele estava com a barba enorme e as roupas em farrapos, mas os olhos brilhavam de inteligência.

Ben me contou que conhecia o esconderijo do tesouro. Ele havia encontrado os ossos do Capitão Flint meses atrás, e desde então guardava um segredo valioso.',
3
FROM phases p
JOIN books b ON p.book_id = b.id
WHERE b.title = 'A Ilha do Tesouro' AND p.phase_number = 3;

INSERT INTO phase_segments (phase_id, segment_number, content, estimated_minutes)
SELECT p.id, 2,
'O capitão Smollett e os homens leais se refugiaram num forte de madeira que constava no mapa. Era uma posição defensável, mas estávamos em desvantagem numérica.

Os piratas atacaram ao amanhecer. A batalha foi confusa e brutal, com tiros vindos de todos os lados. Quando a fumaça baixou, havíamos perdido dois homens, mas os piratas haviam recuado.

Silver hasteou uma bandeira branca no dia seguinte e veio negociar. O capitão o recusou, e Silver voltou furioso, prometendo que não teríamos misericórdia.',
4
FROM phases p
JOIN books b ON p.book_id = b.id
WHERE b.title = 'A Ilha do Tesouro' AND p.phase_number = 3;

INSERT INTO phase_segments (phase_id, segment_number, content, estimated_minutes)
SELECT p.id, 3,
'Tomei uma decisão impulsiva durante a noite: fui sozinho até a praia e cortei as amarras do Hispaniola para deixar o navio à deriva, longe dos piratas.

A operação quase me custou a vida. Passei horas boiando no mar escuro antes de conseguir subir a bordo do navio que derivava. Lá dentro, encontrei dois piratas bêbados e um deles veio me atacar com uma faca.

Consegui controlar o Hispaniola e o ancorei numa pequena enseada do norte da ilha, escondido da vista dos piratas. Voltei ao forte exausto, mas satisfeito.',
4
FROM phases p
JOIN books b ON p.book_id = b.id
WHERE b.title = 'A Ilha do Tesouro' AND p.phase_number = 3;

INSERT INTO phase_segments (phase_id, segment_number, content, estimated_minutes)
SELECT p.id, 1,
'O doutor Livesey havia entregado o mapa a Silver em troca de um acordo. Quando descobri isso, fiquei indignado, mas o doutor me olhou com um sorriso misterioso.

Silver e seus homens foram até o local marcado no mapa, com eu amarrado e sendo arrastado junto. A tensão entre os piratas era palpável; eles não confiavam uns nos outros.

Quando chegamos ao ponto marcado, encontramos apenas um buraco vazio na terra. O tesouro havia sumido. Os piratas explodiram em fúria e viraram as armas contra Silver.',
3
FROM phases p
JOIN books b ON p.book_id = b.id
WHERE b.title = 'A Ilha do Tesouro' AND p.phase_number = 4;

INSERT INTO phase_segments (phase_id, segment_number, content, estimated_minutes)
SELECT p.id, 2,
'Foi então que tiros ecoaram pela floresta. O doutor Livesey, o Squire Trelawney e Ben Gunn apareceram pelos arbustos, espingardas na mão. Os piratas fugiram em pânico.

Ben Gunn havia encontrado o tesouro meses antes e o havia transferido para sua caverna. Era por isso que o doutor havia entregado o mapa sem medo: ele já sabia que lá não havia mais nada.

Silver, esperto como sempre, percebeu rapidamente como as coisas estavam e ficou ao nosso lado, fingindo que sempre foi leal. Nenhum de nós tinha energia para discutir.',
3
FROM phases p
JOIN books b ON p.book_id = b.id
WHERE b.title = 'A Ilha do Tesouro' AND p.phase_number = 4;

INSERT INTO phase_segments (phase_id, segment_number, content, estimated_minutes)
SELECT p.id, 3,
'Carregamos o tesouro do Capitão Flint ao longo de dois dias exaustivos. Eram barras de ouro, moedas de dezenas de países e joias que brilhavam à luz das tochas.

Deixamos os três piratas restantes na ilha com mantimentos suficientes para sobreviver. Eles preferiram ficar a enfrentar a justiça na Inglaterra.

Silver desapareceu numa das noites seguintes, levando consigo uma pequena bolsa de ouro. Ninguém foi atrás dele. Chegamos à Inglaterra ricos e com histórias que nenhum de nós jamais esqueceria.',
5
FROM phases p
JOIN books b ON p.book_id = b.id
WHERE b.title = 'A Ilha do Tesouro' AND p.phase_number = 4;