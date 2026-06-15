import { describe, it, expect } from 'vitest';
import { mensagemDoTinta } from './tintaMessages';

describe('mensagemDoTinta', () => {
  it('sem status retorna mensagem de sem conexao', () => {
    expect(mensagemDoTinta({})).toMatch(/internet/i);
  });

  it('401 fala de e-mail e senha', () => {
    expect(mensagemDoTinta({ status: 401 })).toMatch(/e-mail e senha/i);
  });

  it('403 fala de parte trancada', () => {
    expect(mensagemDoTinta({ status: 403 })).toMatch(/trancada/i);
  });

  it('409 fala de e-mail ja cadastrado', () => {
    expect(mensagemDoTinta({ status: 409 })).toMatch(/ja tem uma conta/i);
  });

  it('503 fala de biblioteca cochilando', () => {
    expect(mensagemDoTinta({ status: 503 })).toMatch(/cochilando/i);
  });

  it('500 cai na mensagem de erro do servidor', () => {
    expect(mensagemDoTinta({ status: 500 })).toMatch(/lado da biblioteca/i);
  });

  it('status desconhecido cai no fallback', () => {
    expect(mensagemDoTinta({ status: 418 })).toMatch(/mais uma tentativa/i);
  });
});
