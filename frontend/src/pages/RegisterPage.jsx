import { useState } from 'react';
import { register } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import './auth.css';

export const RegisterPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password.length < 8) {
      setError('A senha deve ter no mínimo 8 caracteres');
      return;
    }
    try {
      await register(formData.name, formData.email, formData.password);
      navigate('/login');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      <h1>Criar Conta no Librum</h1>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input type="text" placeholder="Nome" required 
          onChange={(e) => setFormData({...formData, name: e.target.value})} />
        <input type="email" placeholder="E-mail" required 
          onChange={(e) => setFormData({...formData, email: e.target.value})} />
        <input type="password" placeholder="Senha" required 
          onChange={(e) => setFormData({...formData, password: e.target.value})} />
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};