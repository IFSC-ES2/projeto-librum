import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  // Lazy initializer: localStorage é síncrono, então o valor já está disponível na primeira renderização — sem necessidade de useEffect
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => {
    const saved = localStorage.getItem('user');
    if (!saved) return null;
    const parsed = JSON.parse(saved);
    return parsed.token ?? null;
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
    <AuthContext.Provider value={{ user, loginUser, logoutUser, loading: false /* leitura do localStorage é síncrona: o estado já está pronto na primeira renderização, nunca há carregamento assíncrono */, isAuthenticated, token }}>
      {children}
    </AuthContext.Provider>
  );
};