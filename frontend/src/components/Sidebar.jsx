import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import XpBadge from './XpBadge';
import logo from '../assets/logo.png';
import mascote from '../assets/librum-mascote-principal.png';
import './AppShell.css';

export default function Sidebar() {
  const { logoutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <img src={logo} alt="Librum" className="sidebar__logo" />
        <span>Librum</span>
      </div>

      <nav className="sidebar__nav">
        <NavLink
          to="/inicio"
          className={({ isActive }) => isActive ? 'sidebar__link active' : 'sidebar__link'}
        >
          Inicio
        </NavLink>
        <NavLink
          to="/genres"
          className={({ isActive }) => isActive ? 'sidebar__link active' : 'sidebar__link'}
        >
          Livros
        </NavLink>
        <NavLink
          to="/perfil"
          className={({ isActive }) => isActive ? 'sidebar__link active' : 'sidebar__link'}
        >
          Perfil
        </NavLink>
      </nav>

      <div className="sidebar__footer">
        <XpBadge />
        <img src={mascote} alt="Mascote Librum" className="sidebar__mascot" />
        <button className="sidebar__logout" onClick={handleLogout}>Sair da conta</button>
      </div>
    </aside>
  );
}
