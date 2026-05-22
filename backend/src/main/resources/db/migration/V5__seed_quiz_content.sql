-- Questões baseadas no conteúdo dos segmentos inseridos em V3__seed_initial_content.sql

-- Fase 1: O Início da Aventura (4 questões)
INSERT INTO quiz_questions (phase_id, question_text, option_a, option_b, option_c, option_d, correct_option, order_index)
SELECT p.id,
    'O que o velho marinheiro pediu a Jim em troca de uma moeda de prata por mês?',
    'Que cuidasse do seu baú',
    'Que ficasse de olho em um marinheiro de uma perna só',
    'Que lhe servisse rum todas as noites',
    'Que lhe mostrasse o caminho para o mar',
    'B', 1
FROM phases p JOIN books b ON p.book_id = b.id
WHERE b.title = 'A Ilha do Tesouro' AND p.phase_number = 1;

INSERT INTO quiz_questions (phase_id, question_text, option_a, option_b, option_c, option_d, correct_option, order_index)
SELECT p.id,
    'O que o homem cego Pew colocou na mão do capitão?',
    'Uma moeda de ouro',
    'Uma carta de amor',
    'O papel negro, o sinal da morte entre os piratas',
    'Um mapa da ilha',
    'C', 2
FROM phases p JOIN books b ON p.book_id = b.id
WHERE b.title = 'A Ilha do Tesouro' AND p.phase_number = 1;

INSERT INTO quiz_questions (phase_id, question_text, option_a, option_b, option_c, option_d, correct_option, order_index)
SELECT p.id,
    'O que Jim e sua mãe encontraram no fundo do baú do capitão?',
    'Barras de ouro e joias',
    'Roupas velhas e uma bússola apenas',
    'Um mapa com a localização do tesouro do Capitão Flint',
    'Rum e documentos de viagem',
    'C', 3
FROM phases p JOIN books b ON p.book_id = b.id
WHERE b.title = 'A Ilha do Tesouro' AND p.phase_number = 1;

INSERT INTO quiz_questions (phase_id, question_text, option_a, option_b, option_c, option_d, correct_option, order_index)
SELECT p.id,
    'Como o capitão morreu naquela noite?',
    'Foi assassinado por Pew',
    'Teve um ataque fulminante',
    'Afogou-se no mar',
    'Morreu envenenado pelo rum',
    'B', 4
FROM phases p JOIN books b ON p.book_id = b.id
WHERE b.title = 'A Ilha do Tesouro' AND p.phase_number = 1;

-- Fase 2: A Bordo do Hispaniola (4 questões)
INSERT INTO quiz_questions (phase_id, question_text, option_a, option_b, option_c, option_d, correct_option, order_index)
SELECT p.id,
    'Como Long John Silver se locomovia a bordo do Hispaniola?',
    'Com uma bengala de madeira',
    'Com uma muleta de madeira',
    'Com o apoio de um marinheiro',
    'Arrastando uma perna rígida',
    'B', 1
FROM phases p JOIN books b ON p.book_id = b.id
WHERE b.title = 'A Ilha do Tesouro' AND p.phase_number = 2;

INSERT INTO quiz_questions (phase_id, question_text, option_a, option_b, option_c, option_d, correct_option, order_index)
SELECT p.id,
    'Onde Jim estava escondido quando ouviu o plano de Silver?',
    'Atrás das velas do navio',
    'Embaixo de um bote salva-vidas',
    'Dentro de um barril de maçãs',
    'Na cabine do capitão',
    'C', 2
FROM phases p JOIN books b ON p.book_id = b.id
WHERE b.title = 'A Ilha do Tesouro' AND p.phase_number = 2;

INSERT INTO quiz_questions (phase_id, question_text, option_a, option_b, option_c, option_d, correct_option, order_index)
SELECT p.id,
    'O que Silver planejava fazer quando o tesouro fosse encontrado?',
    'Dividir o tesouro igualmente com toda a tripulação',
    'Fugir sozinho com o tesouro antes de todos',
    'Matar todos os homens leais ao capitão',
    'Entregar o tesouro ao rei da Inglaterra',
    'C', 3
FROM phases p JOIN books b ON p.book_id = b.id
WHERE b.title = 'A Ilha do Tesouro' AND p.phase_number = 2;

INSERT INTO quiz_questions (phase_id, question_text, option_a, option_b, option_c, option_d, correct_option, order_index)
SELECT p.id,
    'A quem Jim avisou sobre a traição de Silver?',
    'Ao esquire Trelawney e a Long John Silver',
    'Ao doutor Livesey e ao capitão Smollett',
    'Ao Ben Gunn e ao capitão Smollett',
    'Apenas ao capitão Smollett',
    'B', 4
FROM phases p JOIN books b ON p.book_id = b.id
WHERE b.title = 'A Ilha do Tesouro' AND p.phase_number = 2;

-- Fase 3: Segredos da Ilha (3 questões)
INSERT INTO quiz_questions (phase_id, question_text, option_a, option_b, option_c, option_d, correct_option, order_index)
SELECT p.id,
    'Quem era Ben Gunn?',
    'Um espião contratado por Silver',
    'Um marinheiro abandonado na ilha há três anos',
    'Um antigo tripulante do Hispaniola',
    'O filho do Capitão Flint',
    'B', 1
FROM phases p JOIN books b ON p.book_id = b.id
WHERE b.title = 'A Ilha do Tesouro' AND p.phase_number = 3;

INSERT INTO quiz_questions (phase_id, question_text, option_a, option_b, option_c, option_d, correct_option, order_index)
SELECT p.id,
    'O que Jim fez com o Hispaniola durante a noite?',
    'Afundou o navio para que os piratas não fugissem',
    'Cortou as amarras e deixou o navio à deriva',
    'Levou o navio de volta para a Inglaterra',
    'Escondeu o navio numa caverna na costa',
    'B', 2
FROM phases p JOIN books b ON p.book_id = b.id
WHERE b.title = 'A Ilha do Tesouro' AND p.phase_number = 3;

INSERT INTO quiz_questions (phase_id, question_text, option_a, option_b, option_c, option_d, correct_option, order_index)
SELECT p.id,
    'O que aconteceu quando Silver foi negociar com o capitão Smollett?',
    'Os dois fizeram um acordo de paz',
    'Silver foi preso pelos homens do capitão',
    'O capitão recusou e Silver voltou furioso',
    'Silver entregou o mapa em troca de liberdade',
    'C', 3
FROM phases p JOIN books b ON p.book_id = b.id
WHERE b.title = 'A Ilha do Tesouro' AND p.phase_number = 3;

-- Fase 4: O Tesouro do Capitão Flint (4 questões)
INSERT INTO quiz_questions (phase_id, question_text, option_a, option_b, option_c, option_d, correct_option, order_index)
SELECT p.id,
    'O que os piratas encontraram no local marcado no mapa?',
    'O tesouro intacto do Capitão Flint',
    'Apenas ossos e objetos velhos',
    'Um buraco vazio na terra',
    'Uma segunda parte do mapa',
    'C', 1
FROM phases p JOIN books b ON p.book_id = b.id
WHERE b.title = 'A Ilha do Tesouro' AND p.phase_number = 4;

INSERT INTO quiz_questions (phase_id, question_text, option_a, option_b, option_c, option_d, correct_option, order_index)
SELECT p.id,
    'Quem havia movido o tesouro antes dos piratas chegarem ao local?',
    'O doutor Livesey, durante a noite anterior',
    'O capitão Smollett, antes da viagem',
    'Ben Gunn, meses antes da expedição chegar',
    'Long John Silver, que escondia o tesouro',
    'C', 2
FROM phases p JOIN books b ON p.book_id = b.id
WHERE b.title = 'A Ilha do Tesouro' AND p.phase_number = 4;

INSERT INTO quiz_questions (phase_id, question_text, option_a, option_b, option_c, option_d, correct_option, order_index)
SELECT p.id,
    'O que aconteceu com Long John Silver ao final da história?',
    'Foi preso e levado para a Inglaterra',
    'Desapareceu durante a noite com uma bolsa de ouro',
    'Ficou na ilha com os outros piratas restantes',
    'Morreu durante a batalha na ilha',
    'B', 3
FROM phases p JOIN books b ON p.book_id = b.id
WHERE b.title = 'A Ilha do Tesouro' AND p.phase_number = 4;

INSERT INTO quiz_questions (phase_id, question_text, option_a, option_b, option_c, option_d, correct_option, order_index)
SELECT p.id,
    'O que os personagens leais fizeram com os três piratas restantes?',
    'Os levaram presos para a Inglaterra',
    'Os executaram na ilha',
    'Os deixaram na ilha com mantimentos suficientes',
    'Os forçaram a ajudar a carregar o tesouro',
    'C', 4
FROM phases p JOIN books b ON p.book_id = b.id
WHERE b.title = 'A Ilha do Tesouro' AND p.phase_number = 4;
