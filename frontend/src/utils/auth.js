/**
 * Retorna o token JWT salvo no localStorage.
 * O AuthContext salva os dados do usuário sob a chave 'user' como JSON:
 * { userId: string, token: string }
 */
export const getAuthToken = () => {
  try {
    const saved = localStorage.getItem('user');
    if (!saved) return null;
    const parsed = JSON.parse(saved);
    return parsed.token ?? null;
  } catch {
    return null;
  }
};

/**
 * Retorna o header Authorization pronto para uso no fetch.
 * Retorna objeto vazio se não houver token.
 */
export const authHeader = () => {
  const token = getAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};
