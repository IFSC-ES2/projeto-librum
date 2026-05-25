import { useState, useEffect } from 'react';
import './XpBadge.css';
import { getAuthToken } from '../utils/auth';

const XpBadge = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = getAuthToken();
        const response = await fetch(`${import.meta.env.VITE_API_URL}/users/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await response.json();
        setProfile(data);
      } catch (err) {
        console.error('Erro ao buscar perfil:', err);
      }
    };

    fetchProfile();
  }, []);

  if (!profile) return <div className="xp-badge xp-badge--loading">Carregando...</div>;

  return (
    <div className="xp-badge">
      <span className="xp-badge__name">{profile.name}</span>
      <span className="xp-badge__info">Nível {profile.level} · {profile.xp} XP</span>
    </div>
  );
};

export default XpBadge;