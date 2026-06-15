import { authHeader } from '../utils/auth';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export const QuizService = {
  getQuizQuestions: async (phaseId) => {
    const response = await fetch(`${API_BASE_URL}/quiz/${phaseId}`, {
      headers: { ...authHeader() }
    });
    if (!response.ok) {
      const err = new Error('falha ao carregar as questoes');
      err.status = response.status;
      throw err;
    }
    return await response.json();
  },

  submitQuiz: async (phaseId, answers) => {
    const response = await fetch(`${API_BASE_URL}/quiz/${phaseId}/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...authHeader()
      },
      body: JSON.stringify({ answers })
    });
    if (!response.ok) {
      const err = new Error('falha ao enviar o quiz');
      err.status = response.status;
      throw err;
    }
    return await response.json();
  }
};
