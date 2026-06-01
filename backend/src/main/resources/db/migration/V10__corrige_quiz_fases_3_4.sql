DELETE FROM quiz_questions
WHERE phase_id IN (
    SELECT p.id FROM phases p JOIN books b ON p.book_id = b.id
    WHERE b.title = 'A Ilha do Tesouro' AND p.phase_number IN (3, 4)
);

INSERT INTO quiz_questions (phase_id, question_text, option_a, option_b, option_c, option_d, correct_option, order_index, explanation)
SELECT p.id,
    'O que Jim fez quando os primeiros tiros soaram no desembarque?',
    'Correu para o interior da floresta',
    'Voltou nadando para o navio',
    'Escondeu-se atrás dos botes na praia',
    'Enfrentou os piratas sozinho',
    'A', 1,
    'No meio da confusão do desembarque, Jim correu para o interior da floresta sem olhar para trás, e foi lá que encontrou Ben Gunn.'
FROM phases p JOIN books b ON p.book_id = b.id
WHERE b.title = 'A Ilha do Tesouro' AND p.phase_number = 3;

INSERT INTO quiz_questions (phase_id, question_text, option_a, option_b, option_c, option_d, correct_option, order_index, explanation)
SELECT p.id,
    'Quem Jim encontrou escondido na ilha?',
    'O capitão Flint',
    'Ben Gunn',
    'Israel Hands',
    'Long John Silver',
    'B', 2,
    'Jim encontrou Ben Gunn, um homem magro e em farrapos que havia sido abandonado na ilha.'
FROM phases p JOIN books b ON p.book_id = b.id
WHERE b.title = 'A Ilha do Tesouro' AND p.phase_number = 3;

INSERT INTO quiz_questions (phase_id, question_text, option_a, option_b, option_c, option_d, correct_option, order_index, explanation)
SELECT p.id,
    'Há quanto tempo Ben Gunn estava abandonado na ilha?',
    'Um ano',
    'Três anos',
    'Seis meses',
    'Dez anos',
    'B', 3,
    'Ben Gunn contou que havia sido deixado na ilha três anos antes, como castigo dos próprios companheiros.'
FROM phases p JOIN books b ON p.book_id = b.id
WHERE b.title = 'A Ilha do Tesouro' AND p.phase_number = 3;

INSERT INTO quiz_questions (phase_id, question_text, option_a, option_b, option_c, option_d, correct_option, order_index, explanation)
SELECT p.id,
    'O que Ben Gunn ofereceu em troca de ajuda para deixar a ilha?',
    'Um mapa novo do tesouro',
    'Seu conhecimento da ilha e ajuda contra os piratas',
    'Uma parte do navio',
    'Armas escondidas na praia',
    'B', 4,
    'Ben Gunn conhecia cada trilha e caverna da ilha e se ofereceu para ficar do lado dos homens leais em troca de ajuda para voltar para casa.'
FROM phases p JOIN books b ON p.book_id = b.id
WHERE b.title = 'A Ilha do Tesouro' AND p.phase_number = 3;

INSERT INTO quiz_questions (phase_id, question_text, option_a, option_b, option_c, option_d, correct_option, order_index, explanation)
SELECT p.id,
    'Para onde os homens leais ao capitão se refugiaram?',
    'Para o navio Hispaniola',
    'Para uma caverna nas colinas',
    'Para o forte de madeira',
    'Para a praia ao sul',
    'C', 1,
    'Os homens leais se refugiaram num velho forte de madeira cercado por uma paliçada, o único ponto onde poucos poderiam resistir a muitos.'
FROM phases p JOIN books b ON p.book_id = b.id
WHERE b.title = 'A Ilha do Tesouro' AND p.phase_number = 4;

INSERT INTO quiz_questions (phase_id, question_text, option_a, option_b, option_c, option_d, correct_option, order_index, explanation)
SELECT p.id,
    'Por que a situação dos homens no forte era difícil?',
    'Estavam sem nenhum mantimento',
    'Eram poucos contra a maioria da tripulação',
    'Não tinham armas',
    'O forte estava em ruínas',
    'B', 2,
    'Os homens leais eram minoria diante da tripulação que agora seguia Long John Silver sem disfarce.'
FROM phases p JOIN books b ON p.book_id = b.id
WHERE b.title = 'A Ilha do Tesouro' AND p.phase_number = 4;

INSERT INTO quiz_questions (phase_id, question_text, option_a, option_b, option_c, option_d, correct_option, order_index, explanation)
SELECT p.id,
    'Que decisão silenciosa Jim tomou durante a noite no forte?',
    'Fugir da ilha sozinho',
    'Render-se aos piratas',
    'Não ficar apenas esperando e agir se tivesse a chance',
    'Roubar o mapa do capitão',
    'C', 3,
    'Deitado no chão do forte, Jim decidiu que não ficaria só esperando e faria a sua parte se a oportunidade aparecesse.'
FROM phases p JOIN books b ON p.book_id = b.id
WHERE b.title = 'A Ilha do Tesouro' AND p.phase_number = 4;

INSERT INTO quiz_questions (phase_id, question_text, option_a, option_b, option_c, option_d, correct_option, order_index, explanation)
SELECT p.id,
    'O que o capitão Smollett anunciou ao amanhecer?',
    'Que iriam abandonar o forte',
    'Que um ataque dos piratas era iminente e definiu as posições',
    'Que o tesouro havia sido encontrado',
    'Que Silver tinha se rendido',
    'B', 4,
    'O capitão avisou que um ataque era questão de horas e distribuiu as posições de cada um na defesa do forte.'
FROM phases p JOIN books b ON p.book_id = b.id
WHERE b.title = 'A Ilha do Tesouro' AND p.phase_number = 4;
