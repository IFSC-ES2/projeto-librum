import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../services/authService';
import { useAuth } from '../../AuthContext';

const LoginForm = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const [error, setError] = useState('');
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const data = await login(credentials.email, credentials.password);
      loginUser(data);
      navigate('/genres');
    } catch (err) {
      setError(err.message || 'E-mail ou senha incorretos');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" placeholder="Email" onChange={e => setCredentials({...credentials, email: e.target.value})} required />
      <input type="password" placeholder="Senha" onChange={e => setCredentials({...credentials, password: e.target.value})} required />
      <button type="submit">Entrar</button>

      {error && <p style={{ color: 'red'  }}>{error}</p>}

      <p>Não tem conta? <Link to="/register">Cadastre-se</Link></p>
    </form>
  );
};

export default LoginForm;