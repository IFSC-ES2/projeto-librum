import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function PhaseListPage() {
  const { genreSlug } = useParams();
  const navigate = useNavigate();

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <button onClick={() => navigate('/genres')} style={{ marginBottom: '1rem', cursor: 'pointer' }}>
        ← Voltar
      </button>
      <h2>Fases — {genreSlug}</h2>
      <p>Em breve</p>
    </div>
  );
}
