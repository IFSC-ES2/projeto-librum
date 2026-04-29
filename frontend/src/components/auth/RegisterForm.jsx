// src/components/auth/RegisterForm.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { register } from '../../services/authService';

const RegisterForm = () => {
  const [data, setData] = useState({ username: '', email: '', password: '', confirmPassword: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.password !== data.confirmPassword) return alert('As senhas não coincidem');
    
    try {
      await register({ username: data.username, email: data.email, password: data.password });
      alert('Cadastro realizado!');
    } catch (err) {
      alert('Erro no cadastro.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Nome" onChange={e => setData({...data, username: e.target.value})} required />
      <input type="email" placeholder="Email" onChange={e => setData({...data, email: e.target.value})} required />
      <input type="password" placeholder="Senha" onChange={e => setData({...data, password: e.target.value})} required />
      <input type="password" placeholder="Confirmar Senha" onChange={e => setData({...data, confirmPassword: e.target.value})} required />
      <button type="submit">Cadastrar</button>
      <p>Já tem conta? <Link to="/login">Faça Login</Link></p>
    </form>
  );
};