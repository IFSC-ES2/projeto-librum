import RegisterForm from '../components/auth/RegisterForm';
import '../pages/auth.css';
import mascote from '../assets/mascots/librum-mascote-principal.svg';
import logo from '../assets/brand/logo-branca.svg';

const RegisterPage = () => {
  return (
    <div className="auth-page">
      <div className="auth-left">
        <div className="auth-brand">
          <img src={logo} alt="Logo Livrum" className="logo-img" />
        </div>
        <div className="auth-left-content">
          <img src={mascote} alt="Mascote Livrum" className="auth-hero-img" />
          <h2 className="auth-tagline">Comece sua jornada literária hoje</h2>
          <p className="auth-sub">Crie sua conta e explore um mundo de livros, quizzes e desafios.</p>
        </div>
      </div>

      <div className="auth-right">
        <h1 className="auth-title">Criar conta</h1>
        <p className="auth-subtitle">
          Já tem conta? <a href="/login">Faça login.</a>
        </p>
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;