import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authHeader } from '../utils/auth';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import GenreBadge from '../components/ui/GenreBadge';
import LoadingState from '../components/ui/LoadingState';
import ErrorState from '../components/ui/ErrorState';
import './HomePage.css';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export default function HomePage() {
  const navigate = useNavigate();
  const [perfil, setPerfil] = useState(null);
  const [progresso, setProgresso] = useState(null);
  const [generos, setGeneros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(false);

  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const carregar = async () => {
      try {
        const [rPerfil, rProgresso, rGeneros] = await Promise.all([
          fetch(`${API_BASE_URL}/users/me`, { headers: { ...authHeader() } }),
          fetch(`${API_BASE_URL}/users/me/progress`, { headers: { ...authHeader() } }),
          fetch(`${API_BASE_URL}/genres`, { headers: { ...authHeader() } })
        ]);
        if (!rPerfil.ok || !rProgresso.ok || !rGeneros.ok) throw new Error('Falha ao carregar');
        setPerfil(await rPerfil.json());
        setProgresso(await rProgresso.json());
        setGeneros(await rGeneros.json());
      } catch (e) {
        console.error(e);
        setErro(true);
      } finally {
        setLoading(false);
      }
    };
    carregar();
  }, [retryCount]);

  const handleRetry = () => {
    setLoading(true);
    setErro(false);
    setRetryCount(c => c + 1);
  };



  if (loading) return <LoadingState message="Carregando início..." />;
  if (erro || !perfil || !progresso) return <ErrorState message="Não foi possível carregar o início." onRetry={handleRetry} />;

  const emProgresso = progresso.byGenre.find(g => g.totalPhases > 0 && g.completedPhases < g.totalPhases)
    || progresso.byGenre.find(g => g.totalPhases > 0);

  return (
    <div className="home-page">
      <header className="home-header">
        <h1>Olá, {perfil.name}</h1>
        <p>Continue de onde parou ou explore um novo gênero.</p>
      </header>

      <div className="home-stats">
        <Card className="home-stat"><span className="home-stat__num">{perfil.xp}</span><span>XP acumulado</span></Card>
        <Card className="home-stat"><span className="home-stat__num">{progresso.totalCompletedPhases}</span><span>Fases concluídas</span></Card>
        <Card className="home-stat"><span className="home-stat__num">Nível {perfil.level}</span><span>Nível atual</span></Card>
      </div>

      {emProgresso && (
        <Card className="home-continue">
          <div>
            <span className="home-continue__label">Continue de onde parou</span>
            <h2>{emProgresso.genreName}</h2>
            <p>{emProgresso.completedPhases} de {emProgresso.totalPhases} fases concluídas</p>
          </div>
          <Button variant="secondary" onClick={() => navigate(`/genres/${emProgresso.genreId}`)}>
            Continuar leitura
          </Button>
        </Card>
      )}

      <section className="home-generos">
        <h2>Explorar gêneros</h2>
        <div className="home-generos__grid">
          {generos.map((g) => (
            <button key={g.id} className="home-genero-card" onClick={() => navigate(`/genres/${g.id}`)}>
              <GenreBadge slug={g.slug}>{g.name}</GenreBadge>
              <span className="home-genero-card__desc">{g.description}</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
