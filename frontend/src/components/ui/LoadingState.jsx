import './ui.css';

export default function LoadingState({ message = 'Carregando...' }) {
  return <div className="ui-state">{message}</div>;
}
