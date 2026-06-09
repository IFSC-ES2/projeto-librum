import LoginForm from '../components/auth/LoginForm';
import '../pages/auth.css';
import mascote from '../assets/mascots/librum-mascote-principal.svg';
import logo from '../assets/brand/logo-branca.svg';

const LoginPage = () => {
  return (
    <div className="auth-page">
      <div className="auth-left">
        <div className="auth-brand">
          <img src={logo} alt="Logo Livrum" className="logo-img" />
        </div>
        <div className="auth-left-content">
          <img src={mascote} alt="Mascote Livrum" className="auth-hero-img" />
          <h2 className="auth-tagline">A sua próxima aventura literária começa aqui</h2>
          <p className="auth-sub">Ler virou jogo!</p>
        </div>
      </div>

      <div className="auth-right">
        <h1 className="auth-title">Entrar na conta</h1>
        <p className="auth-subtitle">
          Novo por aqui? <a href="/register">Crie uma conta gratuitamente.</a>
        </p>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;