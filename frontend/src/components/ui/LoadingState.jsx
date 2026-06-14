import './ui.css';
import mascote from '../../assets/mascots/librum-mascote-principal.svg';

export default function LoadingState({ message = 'Carregando...', comMascote = false }) {
  return (
    <div className="ui-state ui-state--loading">
      {comMascote && <img src={mascote} alt="" className="ui-state__mascote" />}
      <span className="ui-spinner" aria-hidden="true" />
      <p>{message}</p>
    </div>
  );
}
