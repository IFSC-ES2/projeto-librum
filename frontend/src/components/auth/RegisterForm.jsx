import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../services/authService';
import { useAuth } from '../../context/useAuth';
import { mensagemDoTinta, carregandoTinta } from '../../utils/tintaMessages';

const RegisterForm = () => {
  const [data, setData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [carregando, setCarregando] = useState(false);
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (data.password.length < 8) {
      setError('A senha deve ter no mínimo 8 caracteres');
      return;
    }

    if (data.password !== data.confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    setCarregando(true);
    try {
      const response = await register(data.name, data.email, data.password);
      loginUser({ userId: response.userId, token: response.token });
      navigate('/inicio');
    } catch (err) {
      setError(mensagemDoTinta(err));
    } finally {
      setCarregando(false);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <div className="auth-field">
        <label className="auth-label">NOME</label>
        <input
          className="auth-input"
          type="text"
          placeholder="Seu nome completo"
          onChange={e => setData({ ...data, name: e.target.value })}
          required
        />
      </div>

      <div className="auth-field">
        <label className="auth-label">E-MAIL</label>
        <input
          className="auth-input"
          type="email"
          placeholder="seu@email.com"
          onChange={e => setData({ ...data, email: e.target.value })}
          required
        />
      </div>

      <div className="auth-field">
        <label className="auth-label">SENHA</label>
        <input
          className="auth-input"
          type="password"
          placeholder="Mínimo 8 caracteres"
          onChange={e => setData({ ...data, password: e.target.value })}
          required
        />
      </div>

      <div className="auth-field">
        <label className="auth-label">CONFIRMAR SENHA</label>
        <input
          className="auth-input"
          type="password"
          placeholder="Repita a senha"
          onChange={e => setData({ ...data, confirmPassword: e.target.value })}
          required
        />
      </div>

      {error && <p className="auth-error">{error}</p>}

      <button className="auth-btn-primary" type="submit" disabled={carregando}>
        {carregando ? carregandoTinta.cadastro : 'Criar conta'}
      </button>
    </form>
  );
};

export default RegisterForm;
