import './ui.css';

export default function ProgressBar({ value = 0 }) {
  const width = Math.max(0, Math.min(100, value));
  return (
    <div className="progress-bar">
      <div className="progress-bar__fill" style={{ width: `${width}%` }} />
    </div>
  );
}
