import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import XpBadge from './XpBadge';
import './Navbar.css';

export default function Navbar() {
  const { logoutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/genres" className="navbar-logo">
          Librum
        </Link>
      </div>
      <div className="navbar-right">
        <XpBadge />
        <button onClick={handleLogout} className="btn-logout">
          Sair
        </button>
      </div>
    </nav>
  );
}
