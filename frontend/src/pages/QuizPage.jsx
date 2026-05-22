import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { QuizService } from '../services/QuizService';
import './QuizPage.css';

const QuizPage = () => {
  const { phaseId } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = null;
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState([]);
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
        console.error("Erro ao carregar o quiz:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [phaseId]);

  if (loading) {
    return <div className="quiz-loading">Carregando quiz...</div>;
  }

  if (!questionsData || questionsData.length === 0) {
    return <div className="quiz-loading">Nenhuma questão encontrada para esta fase.</div>;
  }

  const currentQuestion = questionsData[currentQuestionIndex];

  const handleOptionChange = (e) => {
    if (feedback) return;
    setSelectedOption(e.target.value);
  };

  const handleConfirm = () => {
    if (!selectedOption) return;

    const isCorrectMock = selectedOption === 'A' || selectedOption === 'B';
    setFeedback(isCorrectMock ? 'correct' : 'incorrect');

    const newAnswer = {
      questionId: currentQuestion.id,
      selectedOption: selectedOption
    };

    const newAnswersList = [...answers, newAnswer];
    setAnswers(newAnswersList);

    setTimeout(() => {
      if (currentQuestionIndex < questionsData.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption('');
        setFeedback(null);
      } else {
        submitFinalQuiz(newAnswersList);
      }
    }, 1500);
  };

  const submitFinalQuiz = async (finalAnswers) => {
    try {
      setSubmitting(true);
      const result = await QuizService.submitQuiz(phaseId, finalAnswers);
      navigate(`/quiz/${phaseId}/resultado`, { state: result });
    } catch (error) {
      console.error("Erro ao enviar quiz:", error);
      alert("Houve um erro ao enviar suas respostas.");
      setSubmitting(false);
    }
  };

  return (
    <div className="quiz-page">
      <div className="quiz-container">
        <h2>Quiz da Fase {phaseId}</h2>
        <div className="quiz-card">
          <p className="quiz-question-counter">Questão {currentQuestionIndex + 1} de {questionsData.length}</p>
          <h3 className="quiz-question-text">{currentQuestion.questionText}</h3>

          <div className="quiz-options">
            {['A', 'B', 'C', 'D'].map((opt) => (
              <label
                key={opt}
                className={`quiz-option ${selectedOption === opt ? 'selected' : ''} ${feedback && selectedOption === opt ? feedback : ''}`}
              >
                <input
                  type="radio"
                  name="quiz-option"
                  value={opt}
                  checked={selectedOption === opt}
                  onChange={handleOptionChange}
                  disabled={feedback !== null}
                />
                <span className="quiz-option-letter">{opt}</span>
                <span className="quiz-option-text">{currentQuestion[`option${opt}`]}</span>
              </label>
            ))}
          </div>

          <button
            className="quiz-confirm-btn"
            onClick={handleConfirm}
            disabled={!selectedOption || feedback !== null || submitting}
          >
            {submitting ? 'Enviando...' : 'Confirmar'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
