import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../services/authService';

const RegisterPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    if (formData.password.length < 8) {
      setError('A senha deve ter no mínimo 8 caracteres');
      return;
    }

    try {
      await register(formData.name, formData.email, formData.password);
      setSuccess('Cadastro realizado com sucesso! Redirecionando para o login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Criar Conta no Librum</h2>
      {error && <p className="error-msg" style={{color: 'red'}}>{error}</p>}
      {success && <p className="success-msg" style={{color: 'green'}}>{success}</p>}
      
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nome" required 
          onChange={(e) => setFormData({...formData, name: e.target.value})} />
        <input type="email" placeholder="E-mail" required 
          onChange={(e) => setFormData({...formData, email: e.target.value})} />
        <input type="password" placeholder="Senha" required 
          onChange={(e) => setFormData({...formData, password: e.target.value})} />
        <input type="password" placeholder="Confirme a Senha" required 
          onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} />
        <button type="submit">Cadastrar</button>
      </form>
      <p>Já tem uma conta? <Link to="/login">Faça login aqui</Link></p>
    </div>
  );
};

export default RegisterPage;