import './ui.css';
import Button from './Button';

export default function ErrorState({ message = 'Algo deu errado.', onRetry }) {
  return (
    <div className="ui-state ui-state--error">
      <p>{message}</p>
      {onRetry && <Button variant="secondary" onClick={onRetry}>Tentar de novo</Button>}
    </div>
  );
}
