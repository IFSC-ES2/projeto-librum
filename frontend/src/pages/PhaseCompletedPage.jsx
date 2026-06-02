import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import './PhaseCompletedPage.css';

const PhaseCompletedPage = () => {
  const { phaseId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state;

  if (!result) {
    navigate(`/quiz/${phaseId}`);
    return null;
  }

  const {
    totalQuestions = 3,
    correctAnswers = 0,
    xpEarned = 0,
    newTotalXp = 0,
    newLevel = 1,
    leveledUp = false,
    nextPhaseId = null,
    passed = false
  } = result;

  const xpProgress = newTotalXp % 50;
  const progressPercentage = (xpProgress / 50) * 100;
  const hasNextPhase = !!nextPhaseId && passed;

  const handleContinue = () => {
    if (hasNextPhase) {
      navigate(`/reading/${nextPhaseId}/1`);
    } else {
      navigate('/genres');
    }
  };

  const handleReRead = () => {
    navigate(`/reading/${phaseId}/1`);
  };

  return (
    <div className="phase-completed-page">
      <div className="phase-completed-card">
        {passed ? (
          <>
            <div className="phase-completed-badge">FASE {phaseId} CONCLUÍDA!</div>
            <div className="phase-completed-xp">+{xpEarned} XP</div>
            
            {leveledUp && (
              <div className="phase-completed-levelup">
                Você subiu para o Nível {newLevel}!
              </div>
            )}

            <div className="phase-completed-stats">
              <div className="stat-box">
                <span className="stat-value">{correctAnswers}/{totalQuestions}</span>
                <span className="stat-label">Acertos</span>
              </div>
              <div className="stat-box">
                <span className="stat-value">Nível {newLevel}</span>
                <span className="stat-label">Nível Atual</span>
              </div>
            </div>

            <div className="phase-completed-progress">
              <div className="phase-completed-progress-header">
                <span>{xpProgress} / 50 XP</span>
                <span>Próximo nível: {Math.min(10, newLevel + 1)}</span>
              </div>
              <div className="phase-completed-progress-bar">
                <div
                  className="phase-completed-progress-fill"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>

            <div className="phase-completed-actions">
              <button className="btn-phase-continue" onClick={handleContinue}>
                {hasNextPhase ? `Ir para a Fase ${nextPhaseId} →` : 'Voltar ao início'}
              </button>
              <button
                className="btn-phase-secondary"
                onClick={() => navigate('/genres')}
              >
                Voltar ao início
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="phase-completed-badge error">TENTE NOVAMENTE</div>
            <h2 className="phase-completed-title-error">Fase Não Concluída</h2>
            <p className="phase-completed-text-error">
              Você acertou {correctAnswers} de {totalQuestions} questões. É preciso acertar pelo menos {totalQuestions - 2} questões para concluir a fase.
            </p>
            <p className="phase-completed-text-error-sub">
              Reler os trechos ajudará você a absorver melhor a história e responder corretamente na próxima tentativa.
            </p>
            
            <div className="phase-completed-actions">
              <button className="btn-phase-continue" onClick={handleReRead}>
                Reler a Fase
              </button>
              <button
                className="btn-phase-secondary"
                onClick={() => navigate('/genres')}
              >
                Voltar ao início
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PhaseCompletedPage;
