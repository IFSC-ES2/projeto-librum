import React from 'react';
import { useNavigate } from 'react-router-dom';
import './GenresPage.css';

const genres = [
  {
    id: 'aventura',
    title: 'Aventura',
    bookTitle: 'A Ilha do Tesouro',
    author: 'Robert Louis Stevenson',
    phases: 8,
    active: true,
    emoji: '⛵',
  },
  {
    id: 'terror',
    title: 'Terror',
    bookTitle: 'O Médico e o Monstro',
    author: 'Robert Louis Stevenson',
    phases: 8,
    active: false,
    emoji: '🕷️',
  },
  {
    id: 'fantasia',
    title: 'Fantasia',
    bookTitle: 'Dom Quixote (I)',
    author: 'Miguel de Cervantes',
    phases: 6,
    active: false,
    emoji: '✨',
  },
  {
    id: 'romance',
    title: 'Romance',
    bookTitle: 'Orgulho e Preconceito',
    author: 'Jane Austen',
    phases: 8,
    active: false,
    emoji: '🌸',
  },
  {
    id: 'suspense',
    title: 'Suspense',
    bookTitle: 'A definir',
    author: 'A definir',
    phases: 0,
    active: false,
    emoji: '🕵️',
  }
];

export default function GenresPage() {
  const navigate = useNavigate();

  const handleGenreClick = (genre) => {
    if (genre.active) {
      navigate(`/genres/${genre.id}`);
    }
  };

  return (
    <div className="genres-container">
      <div className="genres-header">
        <h1>Escolha um gênero para ler</h1>
        <p>1 livro disponível por gênero · domínio público · sem custo</p>
      </div>

      <div className="genres-grid">
        {genres.map(genre => (
          <div
            key={genre.id}
            className={`genre-card ${genre.active ? 'active' : 'disabled'}`}
          >
            <div className="genre-card-header">
              <span className="genre-icon">{genre.emoji}</span>
              <span className={`genre-badge ${genre.active ? 'active' : ''}`}>
                {genre.active ? 'Em andamento' : 'Em breve'}
              </span>
            </div>

            <div className="genre-info">
              <h2>{genre.title}</h2>
              <p>{genre.bookTitle}<br />{genre.author}{genre.phases > 0 ? ` · ${genre.phases} fases` : ''}</p>
            </div>

            <div className="genre-action">
              <button
                className={`btn-genre ${genre.active ? 'active' : 'disabled'}`}
                onClick={() => handleGenreClick(genre)}
                disabled={!genre.active}
              >
                {genre.active ? 'Continuar ▶' : 'Em breve'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
