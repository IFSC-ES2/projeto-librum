import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ErrorState from './ErrorState';

describe('ErrorState', () => {
  it('renderiza a mensagem de erro fornecida', () => {
    render(<ErrorState message="Uma mensagem customizada de erro" />);
    expect(screen.getByText('Uma mensagem customizada de erro')).toBeInTheDocument();
  });

  it('chama onRetry quando o botao é clicado', () => {
    const handleRetry = vi.fn();
    render(<ErrorState message="Erro ao carregar" onRetry={handleRetry} />);
    
    const retryButton = screen.getByRole('button', { name: /tentar de novo/i });
    fireEvent.click(retryButton);
    
    expect(handleRetry).toHaveBeenCalledTimes(1);
  });
});
