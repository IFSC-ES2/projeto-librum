import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
  it('renderiza o texto e dispara o onClick', () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Continuar</Button>);
    fireEvent.click(screen.getByText('Continuar'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('fica desabilitado quando disabled', () => {
    render(<Button disabled>Salvar</Button>);
    expect(screen.getByText('Salvar')).toBeDisabled();
  });

  it('aplica a classe da variante informada', () => {
    render(<Button variant="secondary">Cancelar</Button>);
    expect(screen.getByText('Cancelar')).toHaveClass('btn--secondary');
  });

  it('aplica a classe btn--full quando full for verdadeiro', () => {
    render(<Button full>Entrar</Button>);
    expect(screen.getByText('Entrar')).toHaveClass('btn--full');
  });
});
