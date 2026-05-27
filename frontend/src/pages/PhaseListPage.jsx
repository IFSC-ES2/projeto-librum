import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ReadingService } from '../services/ReadingService';
import './PhaseListPage.css';
import mascote from '../assets/librum-mascote-principal.png';
import livro from '../assets/books/ilha-do-tesouro.png';

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

  const completedCount = phases.filter(p => p.isCompleted).length;
  const totalCount = phases.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  const nextPhase = phases.find(p => p.isUnlocked && !p.isCompleted);
  const continueTarget = nextPhase || phases[0];
  const pathHeight = Math.max(phases.length * 80 + 120, 600);

  return (
    <div className="phase-list-container">
      <div className="phase-list-sidebar">
        <button onClick={() => navigate('/genres')} className="btn-back">← Livros</button>

        <div className="book-cover-card">
          <div className="book-cover-image">
            <img src={livro} alt="A Ilha do Tesouro" width="100%" />
            <img src={mascote} alt="Mascote" className="book-mascot" />
          </div>
        </div>

        <h2>A Ilha do Tesouro</h2>
        <p className="book-meta">Robert Louis Stevenson · domínio público · Aventura</p>

        <div className="progress-section">
          <h3>PROGRESSO GERAL</h3>
          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: `${progressPercent}%` }}></div>
          </div>
          <p className="progress-text">Fase {completedCount} de {totalCount} concluída - {progressPercent}% do livro lido</p>
        </div>

        <button className="btn-continue" onClick={() => handlePhaseClick(continueTarget)}>
          ▶ Continuar - Fase {continueTarget?.phaseNumber}
        </button>
      </div>

      <div className="phase-list-content">
        <div className="phase-list-header">
          <h3>TRILHA DE FASES · AVENTURA</h3>
          <p>Complete cada fase para desbloquear a próxima</p>
        </div>

        <div className="phase-path" style={{ height: `${pathHeight}px` }}>
          {phases.map((phase, index) => (
            <React.Fragment key={phase.id}>
              <div
                className={`phase-node ${phase.isCompleted ? 'completed' : ''} ${phase.isUnlocked && !phase.isCompleted ? 'active' : ''} ${!phase.isUnlocked ? 'locked' : ''}`}
                onClick={() => handlePhaseClick(phase)}
                style={{ top: `${index * 80}px`, left: `${(index % 2 === 0 ? 20 : 60)}%` }}
              >
                <div className="phase-circle">
                  {phase.isCompleted ? '✓' : phase.isUnlocked ? phase.phaseNumber : '🔒'}
                </div>
                <span className="phase-label">Fase {phase.phaseNumber}</span>
              </div>
              {index < phases.length - 1 && (
                <div
                  className="phase-connector"
                  style={{
                    position: 'absolute',
                    top: `${index * 80 + 55}px`,
                    left: `${(index % 2 === 0 ? 20 : 60) + 2.5}%`,
                    width: '60px'
                  }}
                >
                  <span className="phase-connector-arrow">↓</span>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
