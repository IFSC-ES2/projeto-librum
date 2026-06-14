const API_URL = `${import.meta.env.VITE_API_URL}/auth`;

const lerCorpo = async (response) => {
  const text = await response.text();
  try {
    return text ? JSON.parse(text) : {};
  } catch {
    return {};
  }
};

const erroComStatus = (status) => {
  const err = new Error('falha na autenticacao');
  err.status = status;
  return err;
};

export const register = async (name, email, password) => {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });

  const data = await lerCorpo(response);
  if (!response.ok) throw erroComStatus(response.status);
  return data;
};

export const login = async (email, password) => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data = await lerCorpo(response);
  if (!response.ok) throw erroComStatus(response.status);
  return data;
};
