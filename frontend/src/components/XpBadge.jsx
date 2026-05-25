import { useState, useEffect } from 'react';
import './XpBadge.css';

const XpBadge = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('user');
    const token = saved ? JSON.parse(saved)?.token : null;
    if (!token) return; // sem token → não faz fetch

    const fetchProfile = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/users/me`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        setProfile(data);
      } catch (err) {
        console.error('Erro ao buscar perfil:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <div className="xp-badge xp-badge--loading">Carregando...</div>;
  if (!profile) return null;

  return (
    <div className="xp-badge">
      <div className="xp-badge__avatar">
        {profile.name?.charAt(0) ?? '?'}
      </div>
      <div className="xp-badge__info">
        <span className="xp-badge__name">{profile.name}</span>
        <span className="xp-badge__level">
          Nv. {profile.level} · <span className="xp-badge__xp">{profile.xp} XP</span>
        </span>
      </div>
    </div>
  );
};

export default XpBadge;