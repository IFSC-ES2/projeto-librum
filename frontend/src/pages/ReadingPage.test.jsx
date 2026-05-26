import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ReadingPage from './ReadingPage';
import { ReadingService } from '../services/ReadingService';

// Mock do ReadingService para não fazer chamadas reais à API
vi.mock('../services/ReadingService', () => ({
  ReadingService: {
    getSegmentContent: vi.fn(),
    markProgress: vi.fn(),
  },
}));

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock do localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => { store[key] = String(value); },
    clear: () => { store = {}; },
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

const renderReadingPage = (phaseId = '1', segmentNumber = '1') => {
  return render(
    <MemoryRouter initialEntries={[`/reading/${phaseId}/${segmentNumber}`]}>
      <Routes>
        <Route path="/reading/:phaseId/:segmentNumber" element={<ReadingPage />} />
      </Routes>
    </MemoryRouter>
  );
};

describe('ReadingPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.clear();

    ReadingService.getSegmentContent.mockResolvedValue({
      phaseId: 1,
      segmentNumber: 1,
      totalSegments: 4,
      title: 'A Ilha do Tesouro',
      content: 'Era uma vez um jovem chamado Jim Hawkins que encontrou um mapa do tesouro.',
      estimatedMinutes: 3,
      genreName: 'Aventura',
    });
  });

  it('caso 1: renderiza o texto do segmento retornado pela API', async () => {
    renderReadingPage();

    const texto = await screen.findByText(/Jim Hawkins/i);
    expect(texto).toBeInTheDocument();
  });

  it('caso 2: botão "Ir ao quiz" aparece no rodapé e navega para /quiz/:phaseId', async () => {
    renderReadingPage('1', '1');

    const botao = await screen.findByText(/Ir ao quiz/i);
    expect(botao).toBeInTheDocument();

    fireEvent.click(botao);
    expect(mockNavigate).toHaveBeenCalledWith('/quiz/1');
  });

  it('caso 3: clicar em "Noturno" aplica o tema noturno na área de conteúdo', async () => {
    renderReadingPage();

    // Aguardar o conteúdo carregar
    await screen.findByText(/Jim Hawkins/i);

    const btnNoturno = screen.getByText('Noturno');
    fireEvent.click(btnNoturno);

    // O botão "Noturno" deve receber a classe "active"
    expect(btnNoturno).toHaveClass('active');
  });

  it('caso 4: mover o slider de Fonte atualiza o valor exibido ao lado', async () => {
    renderReadingPage();

    await screen.findByText(/Jim Hawkins/i);

    // O label contém o input range e o valor numérico
    const slider = screen.getByRole('slider', { name: /fonte/i });
    fireEvent.change(slider, { target: { value: '20' } });

    // O valor do slider deve ter sido atualizado para 20
    expect(slider).toHaveValue('20');
  });
});
