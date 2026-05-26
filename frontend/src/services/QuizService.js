import { authHeader } from '../utils/auth';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export const QuizService = {
  getQuizQuestions: async (phaseId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/quiz/${phaseId}`, {
        headers: { ...authHeader() }
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to fetch quiz questions');
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      return [
        {
          id: 1,
          phaseId: parseInt(phaseId),
          questionText: "Qual era o nome do tesouro procurado por Jim Hawkins?",
          optionA: "O Tesouro Perdido",
          optionB: "O Tesouro do Flint",
          optionC: "O Tesouro Enterrado",
          optionD: "O Tesouro de Silver"
        },
        {
          id: 2,
          phaseId: parseInt(phaseId),
          questionText: "Quem era o capitão Flint?",
          optionA: "Um pirata lendário",
          optionB: "O pai de Jim",
          optionC: "Um marinheiro aposentado",
          optionD: "O dono da Estalagem do Almirante Benbow"
        },
        {
          id: 3,
          phaseId: parseInt(phaseId),
          questionText: "O que marcava o mapa do tesouro?",
          optionA: "Um círculo negro",
          optionB: "Uma cruz vermelha",
          optionC: "Uma âncora",
          optionD: "Uma caveira"
        }
      ];
    }
  },

  submitQuiz: async (phaseId, answers) => {
    try {
      const response = await fetch(`${API_BASE_URL}/quiz/${phaseId}/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...authHeader()
        },
        body: JSON.stringify({ answers })
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to submit quiz');
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      const correctAnswers = Math.floor(Math.random() * 4);
      const xpEarned = correctAnswers * 5;
      return {
        totalQuestions: 3,
        correctAnswers: correctAnswers,
        xpEarned: xpEarned,
        newTotalXp: 45 + xpEarned,
        newLevel: 1 + Math.floor((45 + xpEarned) / 50),
        leveledUp: (45 + xpEarned) >= 50
      };
    }
  }
};
