import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../services/authService';
import { useAuth } from '../../context/AuthContext';

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
    <form className="auth-form" onSubmit={handleSubmit}>
      <div className="auth-field">
        <label className="auth-label">E-MAIL</label>
        <input
          className="auth-input"
          type="email"
          placeholder="seu@email.com"
          onChange={e => setCredentials({ ...credentials, email: e.target.value })}
          required
        />
      </div>

      <div className="auth-field">
        <label className="auth-label">SENHA</label>
        <input
          className="auth-input"
          type="password"
          placeholder="••••••••"
          onChange={e => setCredentials({ ...credentials, password: e.target.value })}
          required
        />
      </div>

      {error && <p className="auth-error">{error}</p>}

      <button className="auth-btn-primary" type="submit">Entrar</button>
      <Link to="/register">
        <button className="auth-btn-secondary" type="button">Criar conta</button>
      </Link>
    </form>
  );
};

export default LoginForm;