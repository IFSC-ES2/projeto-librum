import './ui.css';

export default function EmptyState({ title = 'Nada por aqui', message = '' }) {
  return (
    <div className="ui-state">
      <strong>{title}</strong>
      {message && <p>{message}</p>}
    </div>
  );
}
