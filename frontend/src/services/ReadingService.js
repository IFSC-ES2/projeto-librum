const API_BASE_URL = 'http://localhost:8080';

const authHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

export const ReadingService = {
  getPhases: async (genreId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/genres/${genreId}/phases`, {
        headers: { ...authHeader() }
      });
      if (!response.ok) throw new Error('Failed to fetch phases');
      return await response.json();
    } catch (error) {
      console.error(error);
      return [
        { id: 1, name: 'Fase 1', isUnlocked: true, isCompleted: true },
        { id: 2, name: 'Fase 2', isUnlocked: true, isCompleted: true },
        { id: 3, name: 'Fase 3', isUnlocked: true, isCompleted: false },
        { id: 4, name: 'Fase 4', isUnlocked: false, isCompleted: false },
        { id: 5, name: 'Fase 5', isUnlocked: false, isCompleted: false },
        { id: 6, name: 'Fase 6', isUnlocked: false, isCompleted: false },
        { id: 7, name: 'Fase 7', isUnlocked: false, isCompleted: false },
        { id: 8, name: 'Fase 8', isUnlocked: false, isCompleted: false },
      ];
    }
  },

  getSegmentContent: async (phaseId, segmentNumber) => {
    try {
      const response = await fetch(`${API_BASE_URL}/reading/${phaseId}/${segmentNumber}`, {
        headers: { ...authHeader() }
      });
      if (!response.ok) throw new Error('Failed to fetch segment content');
      return await response.json();
    } catch (error) {
      console.error(error);
      return {
        phaseId,
        segmentNumber,
        totalSegments: 4,
        title: 'A Ilha do Tesouro, Cap. III',
        genreName: 'Aventura',
        estimatedMinutes: 3,
        content: `O sol havia mergulhado além do horizonte quando Jim avistou, pela primeira vez, a silhueta recortada das montanhas da ilha. Uma névoa fina cobria o ancoradouro, e o cheiro de maresia misturava-se ao carvão da fumaça que saía da chaminé do Hispaniola.

— Esta é a ilha? — perguntou ele ao capitão Smollett, tentando disfarçar o tremor na voz. O capitão assentiu sem tirar os olhos da bússola, e Jim sentiu o coração bater mais forte dentro do peito.

Havia segredos escondidos naquela terra. Segredos enterrados fundo, marcados com uma cruz vermelha num mapa manchado de sal e sangue. Jim apertou o papel dentro do casaco e respirou fundo, tentando se lembrar por que havia embarcado nessa aventura.

Ao longe, entre as palmeiras, algo se movia. Uma sombra que não deveria estar ali — rápida demais para ser um animal, silenciosa demais para ser inocente.`
      };
    }
  },

  markProgress: async (phaseId, segmentNumber) => {
    try {
      const response = await fetch(`${API_BASE_URL}/progress/mark-read`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...authHeader()
        },
        body: JSON.stringify({ phaseId, segmentNumber }),
      });
      if (!response.ok) throw new Error('Failed to mark progress');
      return await response.json();
    } catch (error) {
      console.error(error);
      return { success: true };
    }
  }
};
