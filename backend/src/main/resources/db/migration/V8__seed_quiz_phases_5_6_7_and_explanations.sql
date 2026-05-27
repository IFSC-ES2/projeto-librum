-- Atualiza as questões existentes (fases 1 a 4) com o texto de explicação introduzido em V6.

UPDATE quiz_questions
SET explanation = 'Billy Bones pagava a Jim uma moeda de prata por mês para ficar de olho em um marinheiro de uma perna só, que viria a ser o famoso Long John Silver.'
WHERE question_text = 'O que o velho marinheiro pediu a Jim em troca de uma moeda de prata por mês?';

UPDATE quiz_questions
SET explanation = 'O papel negro era o sinal de morte usado entre piratas. Pew o entregou ao capitão Billy Bones, que morreu de choque logo em seguida.'
WHERE question_text = 'O que o homem cego Pew colocou na mão do capitão?';

UPDATE quiz_questions
SET explanation = 'No fundo do baú havia um mapa com três cruzes vermelhas apontando o tesouro do Capitão Flint, ponto de partida de toda a aventura.'
WHERE question_text = 'O que Jim e sua mãe encontraram no fundo do baú do capitão?';

UPDATE quiz_questions
SET explanation = 'O capitão Billy Bones teve um ataque fulminante logo após receber o papel negro de Pew, morrendo naquela mesma noite.'
WHERE question_text = 'Como o capitão morreu naquela noite?';

UPDATE quiz_questions
SET explanation = 'Long John Silver se locomovia com uma muleta de madeira, pois havia perdido a perna em batalha. Ele também tinha um papagaio no ombro que gritava "Peças de oito!".'
WHERE question_text = 'Como Long John Silver se locomovia a bordo do Hispaniola?';

UPDATE quiz_questions
SET explanation = 'Jim havia entrado no barril para pegar uma maçã e adormecido. Acordou quando Silver e outros piratas começaram a conversar ao lado, sem saber que Jim estava escutando tudo.'
WHERE question_text = 'Onde Jim estava escondido quando ouviu o plano de Silver?';

UPDATE quiz_questions
SET explanation = 'Silver planejava esperar o tesouro ser encontrado e então eliminar todos os homens leais ao capitão, tomando o navio e o tesouro para si.'
WHERE question_text = 'O que Silver planejava fazer quando o tesouro fosse encontrado?';

UPDATE quiz_questions
SET explanation = 'Jim contou o plano de Silver ao doutor Livesey e ao capitão Smollett. Eles decidiram aguardar a chegada à ilha para agir, pois os piratas eram maioria a bordo.'
WHERE question_text = 'A quem Jim avisou sobre a traição de Silver?';

UPDATE quiz_questions
SET explanation = 'Ben Gunn havia sido abandonado na ilha há três anos pelos seus antigos companheiros piratas, como castigo. Sobreviveu sozinho todo esse tempo.'
WHERE question_text = 'Quem era Ben Gunn?';

UPDATE quiz_questions
SET explanation = 'Jim cortou as amarras do Hispaniola para impedir os piratas de usarem o navio para fugir ou se reabastecer, deixando-o à deriva na baía.'
WHERE question_text = 'O que Jim fez com o Hispaniola durante a noite?';

UPDATE quiz_questions
SET explanation = 'Silver havia ido ao forte com uma bandeira branca para negociar, propondo que os homens leais entregassem o mapa em troca de salvo-conduto. O capitão recusou e Silver voltou furioso.'
WHERE question_text = 'O que aconteceu quando Silver foi negociar com o capitão Smollett?';

UPDATE quiz_questions
SET explanation = 'Ben Gunn havia encontrado e removido o tesouro meses antes. Por isso o doutor entregou o mapa sem medo, sabendo que lá não havia mais nada.'
WHERE question_text = 'O que os piratas encontraram no local marcado no mapa?';

UPDATE quiz_questions
SET explanation = 'Ben Gunn havia transferido o tesouro para sua caverna meses antes. O doutor Livesey sabia disso e por isso entregou o mapa a Silver sem hesitar.'
WHERE question_text = 'Quem havia movido o tesouro antes dos piratas chegarem ao local?';

UPDATE quiz_questions
SET explanation = 'Silver aproveitou a confusão para desaparecer com uma bolsa de ouro durante a viagem de volta. Ninguém foi atrás dele, e a maioria considerou uma saída justa para alguém tão escorregadio.'
WHERE question_text = 'O que aconteceu com Long John Silver ao final da história?';

UPDATE quiz_questions
SET explanation = 'Os três piratas preferiram ficar na ilha a enfrentar a justiça na Inglaterra, onde seriam provavelmente enforcados por pirataria.'
WHERE question_text = 'O que os personagens leais fizeram com os três piratas restantes?';

-- Fase 5: O Cerco ao Forte (4 questões)
INSERT INTO quiz_questions (phase_id, question_text, option_a, option_b, option_c, option_d, correct_option, order_index, explanation)
SELECT p.id,
    'Quem foi atingido durante o ataque pirata ao forte?',
    'Jim Hawkins',
    'O doutor Livesey',
    'O capitão Smollett',
    'Ben Gunn',
    'C', 1,
    'O capitão Smollett foi atingido no ombro durante o ataque, mas continuou de pé comandando a defesa do forte.'
FROM phases p JOIN books b ON p.book_id = b.id
WHERE b.title = 'A Ilha do Tesouro' AND p.phase_number = 5;

INSERT INTO quiz_questions (phase_id, question_text, option_a, option_b, option_c, option_d, correct_option, order_index, explanation)
SELECT p.id,
    'Quantos piratas morreram no ataque ao forte?',
    'Dois',
    'Quatro',
    'Seis',
    'Doze',
    'C', 2,
    'Seis piratas jaziam na clareira após a batalha. Os homens leais perderam dois companheiros, mas conseguiram repelir o ataque.'
FROM phases p JOIN books b ON p.book_id = b.id
WHERE b.title = 'A Ilha do Tesouro' AND p.phase_number = 5;

INSERT INTO quiz_questions (phase_id, question_text, option_a, option_b, option_c, option_d, correct_option, order_index, explanation)
SELECT p.id,
    'O que Silver propôs ao vir com a bandeira branca?',
    'Uma trégua de 24 horas',
    'Que entregassem o mapa em troca de segurança',
    'A entrega dos homens leais',
    'Uma divisão igual do tesouro',
    'B', 3,
    'Silver propôs que entregassem o mapa e, em troca, todos poderiam ir para casa em segurança. O capitão Smollett recusou a proposta.'
FROM phases p JOIN books b ON p.book_id = b.id
WHERE b.title = 'A Ilha do Tesouro' AND p.phase_number = 5;

INSERT INTO quiz_questions (phase_id, question_text, option_a, option_b, option_c, option_d, correct_option, order_index, explanation)
SELECT p.id,
    'O que a clareira ao redor do forte impediria?',
    'Que os piratas escavassem',
    'Qualquer abordagem surpresa',
    'Que Ben Gunn chegasse ao forte',
    'Que o vento apagasse as tochas',
    'B', 4,
    'A clareira ao redor eliminava qualquer possibilidade de aproximação sem ser visto, tornando o forte difícil de cercar sem ser detectado.'
FROM phases p JOIN books b ON p.book_id = b.id
WHERE b.title = 'A Ilha do Tesouro' AND p.phase_number = 5;

-- Fase 6: Jim e o Hispaniola (4 questões)
INSERT INTO quiz_questions (phase_id, question_text, option_a, option_b, option_c, option_d, correct_option, order_index, explanation)
SELECT p.id,
    'O que Jim usou para chegar ao Hispaniola à noite?',
    'Uma tábua de madeira',
    'A lancha dos piratas',
    'A corácula de Ben Gunn',
    'Um barco de pesca',
    'C', 1,
    'Jim usou a corácula de Ben Gunn, uma pequena embarcação de couro artesanal que Ben havia construído com as próprias mãos durante seus três anos na ilha.'
FROM phases p JOIN books b ON p.book_id = b.id
WHERE b.title = 'A Ilha do Tesouro' AND p.phase_number = 6;

INSERT INTO quiz_questions (phase_id, question_text, option_a, option_b, option_c, option_d, correct_option, order_index, explanation)
SELECT p.id,
    'Quem era o único pirata a bordo do Hispaniola quando Jim chegou?',
    'Long John Silver',
    'Dick Johnson',
    'Israel Hands, o timoneiro',
    'O capitão dos piratas',
    'C', 2,
    'Israel Hands era o timoneiro e o único sobrevivente de uma briga entre dois piratas que haviam ficado a bordo para vigiar o navio.'
FROM phases p JOIN books b ON p.book_id = b.id
WHERE b.title = 'A Ilha do Tesouro' AND p.phase_number = 6;

INSERT INTO quiz_questions (phase_id, question_text, option_a, option_b, option_c, option_d, correct_option, order_index, explanation)
SELECT p.id,
    'O que aconteceu com Israel Hands?',
    'Fez um acordo e fugiu',
    'Caiu ao mar após ser atingido por Jim',
    'Se rendeu ao capitão Smollett',
    'Ficou aprisionado no porão',
    'B', 3,
    'Após tentar atacar Jim com uma faca e acertá-lo no ombro, Hands foi atingido pela pistola de Jim quando tentava subir o mastro, caindo ao mar.'
FROM phases p JOIN books b ON p.book_id = b.id
WHERE b.title = 'A Ilha do Tesouro' AND p.phase_number = 6;

INSERT INTO quiz_questions (phase_id, question_text, option_a, option_b, option_c, option_d, correct_option, order_index, explanation)
SELECT p.id,
    'Em que condição Jim voltou ao forte?',
    'Como herói com o navio controlado',
    'Ferido mas livre',
    'Como prisioneiro dos piratas',
    'Com reforços de Ben Gunn',
    'C', 4,
    'Jim encontrou o forte ocupado pelos piratas e foi capturado. Silver interveio para protegê-lo de ser atacado pelos outros piratas que queriam vingança.'
FROM phases p JOIN books b ON p.book_id = b.id
WHERE b.title = 'A Ilha do Tesouro' AND p.phase_number = 6;

-- Fase 7: O Fim da Aventura (4 questões)
INSERT INTO quiz_questions (phase_id, question_text, option_a, option_b, option_c, option_d, correct_option, order_index, explanation)
SELECT p.id,
    'O que o doutor Livesey ofereceu em troca da liberdade de Jim?',
    'Ouro para os piratas',
    'O mapa do tesouro',
    'A liberdade de Silver em separado',
    'Uma passagem para a Inglaterra',
    'B', 1,
    'O doutor entregou o mapa original do Capitão Flint. Ele podia fazer isso sem risco porque Ben Gunn já havia removido o tesouro meses antes, de modo que o mapa não levaria a mais nada.'
FROM phases p JOIN books b ON p.book_id = b.id
WHERE b.title = 'A Ilha do Tesouro' AND p.phase_number = 7;

INSERT INTO quiz_questions (phase_id, question_text, option_a, option_b, option_c, option_d, correct_option, order_index, explanation)
SELECT p.id,
    'Por que o buraco no local marcado no mapa estava vazio?',
    'Silver havia escondido o tesouro em outro lugar',
    'O tesouro nunca existiu',
    'Ben Gunn havia movido o tesouro para sua caverna',
    'Os piratas já tinham escavado antes',
    'C', 2,
    'Ben Gunn havia encontrado o tesouro meses antes da expedição chegar e carregou tudo sozinho para sua caverna secreta nas colinas do norte da ilha.'
FROM phases p JOIN books b ON p.book_id = b.id
WHERE b.title = 'A Ilha do Tesouro' AND p.phase_number = 7;

INSERT INTO quiz_questions (phase_id, question_text, option_a, option_b, option_c, option_d, correct_option, order_index, explanation)
SELECT p.id,
    'Quanto tempo levou para carregar o tesouro para o Hispaniola?',
    'Um dia',
    'Dois dias',
    'Três dias',
    'Uma semana',
    'C', 3,
    'Foram necessários três dias de trabalho exaustivo para transportar todas as barras de ouro, moedas de dezenas de países e joias da caverna de Ben Gunn até o Hispaniola.'
FROM phases p JOIN books b ON p.book_id = b.id
WHERE b.title = 'A Ilha do Tesouro' AND p.phase_number = 7;

INSERT INTO quiz_questions (phase_id, question_text, option_a, option_b, option_c, option_d, correct_option, order_index, explanation)
SELECT p.id,
    'O que aconteceu com Long John Silver ao final da história?',
    'Foi preso ao chegar na Inglaterra',
    'Morreu durante a batalha final',
    'Recebeu parte do tesouro e desapareceu durante a viagem',
    'Foi abandonado na ilha',
    'C', 4,
    'Silver recebeu uma bolsa modesta de ouro como acordo e, numa das noites da viagem de volta para a Inglaterra, simplesmente sumiu. Ninguém foi atrás dele.'
FROM phases p JOIN books b ON p.book_id = b.id
WHERE b.title = 'A Ilha do Tesouro' AND p.phase_number = 7;
