import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../../services/authService';

const RegisterForm = () => {
  const [data, setData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (data.password < 8) {
      setError ('A senha deve ter no mpinimo 8 caracteres');
      return
    }

    if (data.password !== data.confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }
    
    try {
      await register (data.name, data.email, data.password);
      navigate('/login');
    } catch (err) {
      setError(err.message || 'Erro no cadastro');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Nome" onChange={e => setData({...data, name: e.target.value})} required />
      <input type="email" placeholder="Email" onChange={e => setData({...data, email: e.target.value})} required />
      <input type="password" placeholder="Senha" onChange={e => setData({...data, password: e.target.value})} required />
      <input type="password" placeholder="Confirmar Senha" onChange={e => setData({...data, confirmPassword: e.target.value})} required />
      <button type="submit">Cadastrar</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <p>Já tem conta? <Link to="/login">Faça Login</Link></p>
    </form>
  );
};

export default RegisterForm;
