// src/components/auth/LoginForm.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { login } from '../../services/authService';

const LoginForm = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(credentials);
      window.location.href = '/genres';
    } catch (err) {
      alert('Erro ao entrar. Verifique as credenciais.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" placeholder="Email" onChange={e => setCredentials({...credentials, email: e.target.value})} required />
      <input type="password" placeholder="Senha" onChange={e => setCredentials({...credentials, password: e.target.value})} required />
      <button type="submit">Entrar</button>
      <p>Não tem conta? <Link to="/register">Cadastre-se</Link></p>
    </form>
  );
};