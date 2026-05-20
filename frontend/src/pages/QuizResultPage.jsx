import React, { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import './QuizResultPage.css';

const QuizResultPage = () => {
  const { phaseId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const result = location.state;

  useEffect(() => {
    if (!result) {
      navigate(`/quiz/${phaseId}`);
    }
  }, [result, navigate, phaseId]);

  if (!result) {
    return null;
  }

  const { totalQuestions, correctAnswers, xpEarned, newTotalXp, newLevel, leveledUp } = result;
  const xpProgress = newTotalXp % 50;
  const progressPercentage = (xpProgress / 50) * 100;

  const handleContinue = () => {
    const genreSlug = location.state?.genreSlug || 'aventura';
    navigate(`/genres/${genreSlug}`);
  };

  return (
    <div className="quiz-result-page">
      <div className="quiz-result-card">
        <div className="quiz-result-header">
          <h2>Resultado do Quiz</h2>
          <p className="quiz-result-phase">Fase {phaseId}</p>
        </div>

        <div className="quiz-result-stats">
          <div className="stat-box">
            <span className="stat-value">{correctAnswers} de {totalQuestions}</span>
            <span className="stat-label">Acertos</span>
          </div>
          <div className="stat-box xp-box">
            <span className="stat-value">+{xpEarned} XP</span>
            <span className="stat-label">Ganho</span>
          </div>
        </div>

        {leveledUp && (
          <div className="quiz-level-up-message">
            🎉 Parabéns! Você subiu para o Nível {newLevel}!
          </div>
        )}

        <div className="quiz-progress-section">
          <div className="quiz-progress-header">
            <span className="quiz-level-badge">Nível {newLevel}</span>
            <span className="quiz-xp-text">{newTotalXp} XP Total</span>
          </div>
          <div className="quiz-progress-bar-container">
            <div
              className="quiz-progress-bar-fill"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <p className="quiz-progress-hint">{50 - xpProgress} XP para o Nível {Math.min(10, newLevel + 1)}</p>
        </div>

        <button className="quiz-result-continue-btn" onClick={handleContinue}>
          Continuar
        </button>
      </div>
    </div>
  );
};

export default QuizResultPage;
