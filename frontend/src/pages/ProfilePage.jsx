import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authHeader } from '../utils/auth';
import './ProfilePage.css';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

const niveis = {
  1: 'Aprendiz',
  2: 'Leitor',
  3: 'Cronista',
  4: 'Guardião das Histórias'
};

export default function ProfilePage() {
  const navigate = useNavigate();
  const { logoutUser } = useAuth();
  const [perfil, setPerfil] = useState(null);
  const [progresso, setProgresso] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    const carregar = async () => {
      try {
        const respPerfil = await fetch(`${API_BASE_URL}/users/me`, { headers: { ...authHeader() } });
        const respProgresso = await fetch(`${API_BASE_URL}/users/me/progress`, { headers: { ...authHeader() } });
        if (!respPerfil.ok || !respProgresso.ok) throw new Error('Falha ao carregar perfil');
        setPerfil(await respPerfil.json());
        setProgresso(await respProgresso.json());
      } catch (e) {
        console.error(e);
        setErro(true);
      } finally {
        setLoading(false);
      }
    };
    carregar();
  }, []);

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  if (loading) return <div className="profile-state">Carregando perfil...</div>;
  if (erro || !perfil) return <div className="profile-state">Não foi possível carregar o perfil.</div>;

  const titulo = niveis[perfil.level] || 'Leitor';
  const xpNoNivel = perfil.xp % 50;
  const progressoNivel = (xpNoNivel / 50) * 100;

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="profile-identity">
          <div className="profile-avatar">{perfil.name?.charAt(0).toUpperCase()}</div>
          <div>
            <h1>{perfil.name}</h1>
            <p>Nível {perfil.level} - {titulo} - {perfil.xp} xp</p>
            <div className="profile-xp-bar">
              <div className="profile-xp-fill" style={{ width: `${progressoNivel}%` }} />
            </div>
          </div>
        </div>
      </div>

      <div className="profile-cards">
        <section className="profile-card">
          <h2>Dados da conta</h2>
          <div className="profile-row"><span>Nome</span><span>{perfil.name}</span></div>
          <div className="profile-row"><span>E-mail</span><span>{perfil.email}</span></div>
        </section>

        <section className="profile-card">
          <h2>Preferências de leitura</h2>
          <div className="profile-row"><span>Fonte</span><span>{localStorage.getItem('librum_fontSize') || 17}px</span></div>
          <div className="profile-row"><span>Espaçamento</span><span>{localStorage.getItem('librum_lineSpacing') || 1.9}</span></div>
          <div className="profile-row"><span>Tema</span><span>{localStorage.getItem('librum_theme') || 'padrao'}</span></div>
        </section>
      </div>

      <section className="profile-card">
        <h2>Progresso por gênero</h2>
        <div className="profile-genres">
          {progresso?.byGenre?.map((g) => {
            const pct = g.totalPhases > 0 ? Math.round((g.completedPhases / g.totalPhases) * 100) : 0;
            return (
              <div key={g.genreId} className="profile-genre">
                <div className="profile-genre-top">
                  <span>{g.genreName}</span>
                  <span>{g.completedPhases} / {g.totalPhases} fases</span>
                </div>
                <div className="profile-genre-bar">
                  <div className="profile-genre-fill" style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <button className="profile-logout" onClick={handleLogout}>Sair da conta</button>
    </div>
  );
}
