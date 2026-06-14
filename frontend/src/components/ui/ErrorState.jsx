import './ui.css';
import Button from './Button';
import mascotePensativo from '../../assets/mascots/librum-pensativo.svg';

export default function ErrorState({
  message = 'Ops, algo nao saiu como esperado. O Tinta pede so mais uma tentativa.',
  onRetry,
  comMascote = true,
}) {
  return (
    <div className="ui-state ui-state--error">
      {comMascote && <img src={mascotePensativo} alt="" className="ui-state__mascote" />}
      <p>{message}</p>
      {onRetry && <Button variant="secondary" onClick={onRetry}>Tentar de novo</Button>}
    </div>
  );
}
