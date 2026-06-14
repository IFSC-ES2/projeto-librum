import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authHeader } from '../utils/auth';
import { mensagemDoTinta } from '../utils/tintaMessages';
import Button from '../components/ui/Button';
import GenreBadge from '../components/ui/GenreBadge';
import LoadingState from '../components/ui/LoadingState';
import ErrorState from '../components/ui/ErrorState';
import aventura from '../assets/genres/librum-aventura.svg';
import terror from '../assets/genres/librum-terror.svg';
import fantasia from '../assets/genres/librum-fantasia.svg';
import romance from '../assets/genres/librum-romance.svg';
import suspense from '../assets/genres/librum-suspense.svg';
import './GenresPage.css';

const genreImages = { aventura, terror, fantasia, romance, suspense };

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export default function GenresPage() {
  const navigate = useNavigate();
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');

  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const carregar = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/genres`, {
          headers: { ...authHeader() },
        });
        if (!response.ok) {
          const err = new Error('falha ao carregar generos');
          err.status = response.status;
          throw err;
        }
        setGenres(await response.json());
      } catch (e) {
        console.error(e);
        setErro(mensagemDoTinta(e));
      } finally {
        setLoading(false);
      }
    };
    carregar();
  }, [retryCount]);

  const handleRetry = () => {
    setLoading(true);
    setErro('');
    setRetryCount(c => c + 1);
  };



  if (loading) return <LoadingState message="Carregando gêneros..." />;
  if (erro) return <ErrorState message={erro} onRetry={handleRetry} />;

  return (
    <div className="genres-page">
      <header className="genres-header">
        <h1>Escolha um gênero para ler</h1>
        <p>Livros de domínio público, sem custo</p>
      </header>

      <div className="genres-grid">
        {genres.map((genre) => (
          <article key={genre.id} className="genre-card">
            {genreImages[genre.slug] && (
              <img src={genreImages[genre.slug]} alt={genre.name} className="genre-card__image" />
            )}
            <div className="genre-card__top">
              <GenreBadge slug={genre.slug}>{genre.name}</GenreBadge>
            </div>
            <p className="genre-card__desc">{genre.description}</p>
            <Button variant="secondary" onClick={() => navigate(`/genres/${genre.id}`)}>
              Abrir
            </Button>
          </article>
        ))}
      </div>
    </div>
  );
}
