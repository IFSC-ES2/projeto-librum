import './ui.css';

export default function MascotBubble({ src, alt = 'Mascote Librum', message }) {
  return (
    <div className="mascot-bubble">
      <img src={src} alt={alt} className="mascot-bubble__img" />
      {message && <p className="mascot-bubble__text">{message}</p>}
    </div>
  );
}
