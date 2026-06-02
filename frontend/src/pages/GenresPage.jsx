import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authHeader } from '../utils/auth';
import Button from '../components/ui/Button';
import GenreBadge from '../components/ui/GenreBadge';
import LoadingState from '../components/ui/LoadingState';
import ErrorState from '../components/ui/ErrorState';
import './GenresPage.css';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export default function GenresPage() {
  const navigate = useNavigate();
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(false);

  const fetchDados = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/genres`, {
        headers: { ...authHeader() },
      });
      if (!response.ok) throw new Error('Falha ao carregar generos');
      setGenres(await response.json());
    } catch (e) {
      console.error(e);
      setErro(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchDados(); }, []);

  const handleRetry = () => {
    setLoading(true);
    setErro(false);
    fetchDados();
  };

  if (loading) return <LoadingState message="Carregando generos..." />;
  if (erro) return <ErrorState message="Nao foi possivel carregar os generos." onRetry={handleRetry} />;

  return (
    <div className="genres-page">
      <header className="genres-header">
        <h1>Escolha um genero para ler</h1>
        <p>Livros de dominio publico, sem custo</p>
      </header>

      <div className="genres-grid">
        {genres.map((genre) => (
          <article key={genre.id} className="genre-card">
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
