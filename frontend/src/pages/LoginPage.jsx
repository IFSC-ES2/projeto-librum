import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../services/authService';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      navigate('/genres'); // Rota corrigida conforme plano
    } catch (err) {
      setError('E-mail ou senha incorretos');
    }
  };

  return (
    <div className="auth-container">
      <h2>Acessar Librum</h2>
      {error && <p className="error-msg" style={{color: 'red'}}>{error}</p>}
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="E-mail" value={email} 
          onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Senha" value={password} 
          onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Entrar</button>
      </form>
      <p>Novo por aqui? <Link to="/register">Crie sua conta</Link></p>
    </div>
  );
};

export default LoginPage;