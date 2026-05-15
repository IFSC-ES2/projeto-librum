import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function QuizPlaceholder() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'Inter, sans-serif' }}>
      <h1>Ir para o Quiz</h1>
      <p>Você concluiu o último trecho desta fase!</p>
      <p>A tela de Quiz será implementada na Sprint 3 (US06/US07).</p>
      
      <div style={{ marginTop: '30px' }}>
        <button 
          onClick={() => navigate('/genres/aventura')}
          style={{
            background: '#F97316',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '8px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Voltar para Lista de Fases
        </button>
      </div>
    </div>
  );
}
