import './ui.css';

export default function GenreBadge({ slug = 'aventura', children }) {
  return <span className="genre-badge" data-genre={slug}>{children}</span>;
}
