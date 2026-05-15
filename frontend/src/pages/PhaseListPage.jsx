import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ReadingService } from '../services/ReadingService';
import './PhaseListPage.css';

export default function PhaseListPage() {
  const { genreId } = useParams();
  const navigate = useNavigate();
  const [phases, setPhases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPhases = async () => {
      const data = await ReadingService.getPhases(genreId);
      setPhases(data);
      setLoading(false);
    };
    loadPhases();
  }, [genreId]);

  const handlePhaseClick = (phase) => {
    if (phase.isUnlocked) {
      navigate(`/reading/${phase.id}/1`);
    }
  };

  if (loading) return <div>Carregando fases...</div>;

  return (
    <div className="phase-list-container">
      <div className="phase-list-sidebar">
        <button onClick={() => navigate('/genres')} className="btn-back">← Livros</button>

        <div className="book-cover-card">
          <div className="book-cover-image">
            <img src="/assets/books/ilha-do-tesouro.jpg" alt="A Ilha do Tesouro" />
            <img src="/assets/mascots/aventura.png" alt="Aventura" className="book-mascot" />
          </div>
        </div>

        <h2>A Ilha do Tesouro</h2>
        <p className="book-meta">Robert Louis Stevenson · domínio público · Aventura</p>

        <div className="progress-section">
          <h3>PROGRESSO GERAL</h3>
          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: '37%' }}></div>
          </div>
          <p className="progress-text">Fase 3 de 8 concluída - 37% do livro lido</p>
        </div>

        <button className="btn-continue" onClick={() => handlePhaseClick(phases.find(p => !p.isCompleted && p.isUnlocked) || phases[0])}>
          ▶ Continuar — Fase 3
        </button>
      </div>

      <div className="phase-list-content">
        <div className="phase-list-header">
          <h3>TRILHA DE FASES · AVENTURA</h3>
          <p>Complete cada fase para desbloquear a próxima</p>
        </div>

        <div className="phase-path">
          {phases.map((phase, index) => (
            <div
              key={phase.id}
              className={`phase-node ${phase.isCompleted ? 'completed' : ''} ${phase.isUnlocked && !phase.isCompleted ? 'active' : ''} ${!phase.isUnlocked ? 'locked' : ''}`}
              onClick={() => handlePhaseClick(phase)}
              style={{ top: `${index * 80}px`, left: `${(index % 2 === 0 ? 20 : 60)}%` }}
            >
              <div className="phase-circle">
                {phase.isCompleted ? '✓' : phase.isUnlocked ? phase.id : '🔒'}
              </div>
              <span className="phase-label">Fase {phase.id}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
