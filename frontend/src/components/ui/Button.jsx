import './ui.css';

export default function Button({ variant = 'primary', type = 'button', onClick, disabled = false, full = false, children }) {
  const classes = `btn btn--${variant}${full ? ' btn--full' : ''}`;
  return (
    <button type={type} className={classes} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
