import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import GenreBadge from './GenreBadge';

describe('GenreBadge', () => {
  it('mostra o nome do genero e marca o slug no data-genre', () => {
    render(<GenreBadge slug="terror">Terror</GenreBadge>);
    const badge = screen.getByText('Terror');
    expect(badge).toHaveAttribute('data-genre', 'terror');
  });

  it('usa o slug padrao aventura quando nenhum slug for informado', () => {
    render(<GenreBadge>Aventura</GenreBadge>);
    expect(screen.getByText('Aventura')).toHaveAttribute('data-genre', 'aventura');
  });

  it('aplica a classe genre-badge ao elemento', () => {
    render(<GenreBadge slug="fantasia">Fantasia</GenreBadge>);
    expect(screen.getByText('Fantasia')).toHaveClass('genre-badge');
  });
});
