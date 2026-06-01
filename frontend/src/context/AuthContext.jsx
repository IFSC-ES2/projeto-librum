import { createContext, useState } from 'react';

const AuthContext = createContext();

function carregarSessao() {
  const saved = localStorage.getItem('user');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return null;
    }
  }
  return null;
}

export { AuthContext };

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => carregarSessao());
  const [token, setToken] = useState(() => {
    const saved = carregarSessao();
    return saved ? (saved.token ?? null) : null;
  });

  const loginUser = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    setToken(userData.token ?? null);
  };

  const logoutUser = () => {
    localStorage.removeItem('user');
    setUser(null);
    setToken(null);
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser, isAuthenticated, token }}>
      {children}
    </AuthContext.Provider>
  );
};