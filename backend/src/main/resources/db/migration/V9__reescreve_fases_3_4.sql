UPDATE phases SET title = 'Fase 4: O Forte de Madeira'
WHERE phase_number = 4 AND book_id = (SELECT id FROM books WHERE title = 'A Ilha do Tesouro');

UPDATE phase_segments SET content =
'Desembarcamos na ilha em dois grupos, e a tensão era tão espessa quanto a névoa que subia da praia. Bastou um gesto em falso para que os primeiros tiros ecoassem entre as árvores, e os homens de Silver mostraram de uma vez de que lado estavam.

No meio da confusão, corri para o interior da floresta sem olhar para trás. O coração batia tão forte que eu mal ouvia os gritos que ficavam para trás. Embrenhei-me no mato fechado até que as vozes sumissem e só restasse o som da minha própria respiração.

Foi quando uma figura magra saltou de detrás de um tronco e me encarou com olhos arregalados. Estava coberto de farrapos e tinha a barba crescida, mas havia algo gentil no jeito como ergueu as mãos, mostrando que não queria me fazer mal.',
estimated_minutes = 3
WHERE segment_number = 1 AND phase_id = (SELECT p.id FROM phases p JOIN books b ON p.book_id = b.id WHERE b.title = 'A Ilha do Tesouro' AND p.phase_number = 3);

UPDATE phase_segments SET content =
'O homem se apresentou como Ben Gunn. Contou que havia sido abandonado naquela ilha três anos antes, deixado para trás pelos próprios companheiros como castigo, e que desde então vivia de cabras e ostras, sonhando em voltar para casa.

Três anos sozinho o haviam deixado estranho no falar, mas não tolo. Ele conhecia cada enseada, cada trilha e cada caverna daquele lugar melhor do que qualquer mapa. E garantiu, baixando a voz como se as árvores pudessem escutar, que sabia segredos sobre o tesouro do Capitão Flint que os piratas nem imaginavam.

Em troca de ajuda para deixar a ilha e de uma parte justa, Ben Gunn se ofereceu para ficar do nosso lado. Eu não sabia se podia confiar nele, mas algo me dizia que aquele encontro não tinha sido por acaso.',
estimated_minutes = 4
WHERE segment_number = 2 AND phase_id = (SELECT p.id FROM phases p JOIN books b ON p.book_id = b.id WHERE b.title = 'A Ilha do Tesouro' AND p.phase_number = 3);

UPDATE phase_segments SET content =
'Ben Gunn me explicou onde os homens leais ao capitão haviam se refugiado: um velho forte de madeira, cercado por uma paliçada, construído tempos atrás por buscadores de ouro. Era o único ponto da ilha onde poucos poderiam resistir a muitos.

Voltei na direção indicada, contornando o terreno aberto para não ser visto, até avistar a paliçada e a bandeira inglesa hasteada sobre ela. O doutor Livesey e o capitão Smollett me receberam aliviados, pois já me davam por perdido.

Contei tudo o que Ben Gunn havia me dito. O capitão ouviu em silêncio, pesando cada palavra, e concluiu que aquele forte seria o nosso refúgio enquanto pensávamos no próximo passo. Pela primeira vez desde o desembarque, senti que ainda tínhamos uma chance.',
estimated_minutes = 3
WHERE segment_number = 3 AND phase_id = (SELECT p.id FROM phases p JOIN books b ON p.book_id = b.id WHERE b.title = 'A Ilha do Tesouro' AND p.phase_number = 3);

UPDATE phase_segments SET content =
'O forte de madeira era simples, mas resistente: paredes grossas de troncos e uma clareira ao redor que impedia qualquer aproximação despercebida. Lá dentro, fizemos a contagem dos nossos e o número não animava ninguém.

Éramos poucos homens leais contra a maioria da tripulação, que agora seguia Long John Silver sem disfarce. O capitão Smollett, porém, não demonstrava medo. Distribuiu tarefas com a calma de quem já havia enfrentado coisa pior e nos lembrou de que paredes firmes valiam por muitos braços.

Enquanto organizávamos os mantimentos e a pólvora, eu observava o doutor Livesey cuidar de tudo com atenção. Havia nele uma serenidade estranha, como se soubesse de algo que ainda não havia nos contado.',
estimated_minutes = 3
WHERE segment_number = 1 AND phase_id = (SELECT p.id FROM phases p JOIN books b ON p.book_id = b.id WHERE b.title = 'A Ilha do Tesouro' AND p.phase_number = 4);

UPDATE phase_segments SET content =
'A primeira noite no forte foi longa. Cada estalo de galho lá fora parecia o passo de um pirata, e revezávamos a vigília nas frestas da paliçada, de olhos fixos na escuridão da floresta.

Eu não conseguia dormir. Pensava em Ben Gunn, sozinho na ilha por tanto tempo, e no segredo que ele guardava sobre o tesouro. Comecei a desconfiar de que o mapa que tanto sangue já havia custado talvez não valesse o que todos imaginavam.

Guardei essa desconfiança para mim. Mas, deitado no chão de terra batida do forte, tomei uma decisão silenciosa: não ficaria apenas esperando. Se a chance aparecesse, eu faria a minha parte, custasse o que custasse.',
estimated_minutes = 3
WHERE segment_number = 2 AND phase_id = (SELECT p.id FROM phases p JOIN books b ON p.book_id = b.id WHERE b.title = 'A Ilha do Tesouro' AND p.phase_number = 4);

UPDATE phase_segments SET content =
'Ao amanhecer, o capitão reuniu todos e foi direto: os piratas não nos deixariam em paz, e um ataque era questão de horas. Cada homem recebeu sua posição, e a minha era ajudar a carregar as armas e vigiar a clareira pelos fundos.

Trelawney, que era um excelente atirador, escolheu a janela com melhor ângulo. Livesey preparou o que tinha para tratar feridos. Havia uma coragem quieta no ar, dessas que não precisam de palavras para se reconhecerem.

Ficamos prontos, em silêncio, ouvindo o vento na copa das árvores. Em algum lugar lá fora, Silver e seus homens preparavam o golpe. O cerco ao forte estava prestes a começar, e nós o esperávamos firmes.',
estimated_minutes = 4
WHERE segment_number = 3 AND phase_id = (SELECT p.id FROM phases p JOIN books b ON p.book_id = b.id WHERE b.title = 'A Ilha do Tesouro' AND p.phase_number = 4);
