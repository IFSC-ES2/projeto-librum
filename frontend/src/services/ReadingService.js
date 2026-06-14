import { authHeader } from '../utils/auth';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export const ReadingService = {
  getPhases: async (genreId) => {
    const response = await fetch(`${API_BASE_URL}/genres/${genreId}/phases`, {
      headers: { ...authHeader() }
    });
    if (!response.ok) {
      const err = new Error('falha ao carregar as fases');
      err.status = response.status;
      throw err;
    }
    return await response.json();
  },

  getSegmentContent: async (phaseId, segmentNumber) => {
    const response = await fetch(`${API_BASE_URL}/reading/${phaseId}/${segmentNumber}`, {
      headers: { ...authHeader() }
    });
    if (!response.ok) {
      const err = new Error('falha ao carregar o trecho');
      err.status = response.status;
      throw err;
    }
    return await response.json();
  },

  markProgress: async (phaseId, segmentNumber) => {
    const response = await fetch(`${API_BASE_URL}/progress/mark-read`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...authHeader()
      },
      body: JSON.stringify({ phaseId, segmentNumber }),
    });
    if (!response.ok) {
      const err = new Error('falha ao salvar o progresso');
      err.status = response.status;
      throw err;
    }
    return await response.json();
  }
};
