const MENSAGENS_POR_STATUS = {
  400: 'Faltou preencher algo direito. O Tinta pede para revisar os campos.',
  401: 'O Tinta nao achou ninguem com esse e-mail e senha. Confira os dados e tente outra vez.',
  403: 'Essa parte ainda esta trancada. Termine a fase anterior para o Tinta liberar.',
  404: 'O Tinta procurou bastante, mas nao achou o que voce pediu.',
  409: 'Esse e-mail ja tem uma conta. O Tinta sugere entrar com ele.',
  422: 'Faltou preencher algo direito. O Tinta pede para revisar os campos.',
  503: 'A biblioteca estava cochilando. O Tinta esta acordando ela, tente de novo em instantes.',
};

const SEM_CONEXAO = 'O Tinta nao conseguiu falar com a biblioteca. Confira sua internet e tente de novo.';
const ERRO_SERVIDOR = 'Algo deu errado do lado da biblioteca. O Tinta ja esta cuidando disso, tente de novo daqui a pouco.';
const GENERICA = 'Ops, algo nao saiu como esperado. O Tinta pede so mais uma tentativa.';

export function mensagemDoTinta(erro) {
  const status = erro?.status;
  if (!status) return SEM_CONEXAO;
  if (MENSAGENS_POR_STATUS[status]) return MENSAGENS_POR_STATUS[status];
  if (status >= 500) return ERRO_SERVIDOR;
  return GENERICA;
}

export const carregandoTinta = {
  login: 'O Tinta esta abrindo a biblioteca...',
  cadastro: 'O Tinta esta preparando sua carteirinha...',
  quiz: 'O Tinta esta corrigindo suas respostas...',
  generico: 'So um instante, o Tinta esta buscando...',
};

export const vazioTinta = {
  quiz: 'O Tinta nao achou questoes para esta fase. Tente novamente mais tarde.',
};
