import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { QuizService } from '../services/QuizService';
import MascotBubble from '../components/ui/MascotBubble';
import LoadingState from '../components/ui/LoadingState';
import ErrorState from '../components/ui/ErrorState';
import { mensagemDoTinta, carregandoTinta } from '../utils/tintaMessages';
import mascotePensativo from '../assets/mascots/librum-pensativo.svg';
import './QuizPage.css';

const MASCOT_MESSAGES = {
  idle: 'Leia com atenção antes de responder.',
  correct: 'Muito bem! Você acertou!',
  incorrect: 'Não desanime, releia o trecho.'
};

const QuizPage = () => {
  const { phaseId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [results, setResults] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [questionsData, setQuestionsData] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const data = await QuizService.getQuizQuestions(phaseId);
        setQuestionsData(data);
      } catch (error) {
        console.error('Erro ao carregar o quiz:', error);
        setErro(mensagemDoTinta(error));
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [phaseId]);

  if (loading) return <LoadingState message="Carregando quiz..." />;
  if (erro) return <ErrorState message={erro} />;
  if (!questionsData || questionsData.length === 0) {
    return <ErrorState message="Nenhuma questão encontrada para esta fase." />;
  }

  const currentQuestion = questionsData[currentQuestionIndex];
  const mascotMessage = feedback ? MASCOT_MESSAGES[feedback] : MASCOT_MESSAGES.idle;

  const handleOptionChange = (e) => {
    if (feedback) return;
    setSelectedOption(e.target.value);
  };

  const handleConfirm = () => {
    if (!selectedOption) return;
    const isCorrect = selectedOption === currentQuestion.correctOption;
    setFeedback(isCorrect ? 'correct' : 'incorrect');
    setResults(prev => [...prev, isCorrect]);
    setAnswers(prev => [...prev, { questionId: currentQuestion.id, selectedOption }]);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questionsData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption('');
      setFeedback(null);
    } else {
      submitFinalQuiz(answers);
    }
  };

  const submitFinalQuiz = async (finalAnswers) => {
    try {
      setSubmitting(true);
      const result = await QuizService.submitQuiz(phaseId, finalAnswers);
      navigate(`/quiz/${phaseId}/fase-concluida`, { state: result });
    } catch (error) {
      console.error('Erro ao enviar quiz:', error);
      setErro(mensagemDoTinta(error));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="quiz-page">
      <div className="quiz-container">
        <div className="quiz-header">
          <h2>Quiz da Fase {phaseId}</h2>
          <div className="quiz-progress">
            {questionsData.map((_, i) => {
              let cls = 'quiz-progress__seg';
              if (i < results.length) {
                cls += results[i] ? ' quiz-progress__seg--correct' : ' quiz-progress__seg--incorrect';
              } else if (i === currentQuestionIndex) {
                cls += ' quiz-progress__seg--current';
              }
              return <div key={i} className={cls} />;
            })}
          </div>
        </div>

        <div className="quiz-body">
          <div className="quiz-main">
            <div className="quiz-card">
              <p className="quiz-question-counter">
                Questão {currentQuestionIndex + 1} de {questionsData.length}
              </p>
              <h3 className="quiz-question-text">{currentQuestion.questionText}</h3>

              <div className="quiz-options">
                {['A', 'B', 'C', 'D'].map((opt) => {
                  const isSelected = selectedOption === opt;
                  const isCorrect = currentQuestion.correctOption === opt;
                  let optionClass = '';
                  if (isSelected) optionClass += ' selected';
                  if (feedback) {
                    if (isCorrect) optionClass += ' correct';
                    else if (isSelected) optionClass += ' incorrect';
                  }
                  return (
                    <label key={opt} className={`quiz-option${optionClass}`}>
                      <input
                        type="radio"
                        name="quiz-option"
                        value={opt}
                        checked={isSelected}
                        onChange={handleOptionChange}
                        disabled={feedback !== null}
                      />
                      <span className="quiz-option-letter">{opt}</span>
                      <span className="quiz-option-text">{currentQuestion[`option${opt}`]}</span>
                    </label>
                  );
                })}
              </div>

              {feedback === null ? (
                <button
                  className="quiz-confirm-btn"
                  onClick={handleConfirm}
                  disabled={!selectedOption || submitting}
                >
                  Confirmar
                </button>
              ) : (
                <button
                  className="quiz-confirm-btn"
                  onClick={handleNext}
                  disabled={submitting}
                >
                  {submitting
                    ? carregandoTinta.quiz
                    : currentQuestionIndex < questionsData.length - 1
                      ? 'Próxima questão →'
                      : 'Ver resultado →'}
                </button>
              )}
            </div>

            {feedback && (
              <div className={`quiz-reference quiz-reference--${feedback}`}>
                <span className="quiz-reference__label">Trecho de referência</span>
                <p>{currentQuestion.explanation || 'Sem explicação disponível.'}</p>
              </div>
            )}
          </div>

          <div className="quiz-side">
            <MascotBubble
              src={mascotePensativo}
              alt="Mascote Librum pensativo"
              message={mascotMessage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
