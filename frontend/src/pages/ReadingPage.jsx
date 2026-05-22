import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ReadingService } from '../services/ReadingService';
import { applyTheme } from '../utils/readingThemes';
import './ReadingPage.css';
import mascote from '../assets/librum-mascote-principal.png';
import XpBadge from '../components/XpBadge';
import '../components/XpBadge.css';

export default function ReadingPage() {
  const { phaseId, segmentNumber } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  const [theme, setTheme] = useState('padrao');
  const [fontSize, setFontSize] = useState(17);
  const [lineSpacing, setLineSpacing] = useState(1.9);
  const [contentStyle, setContentStyle] = useState(() => applyTheme('padrao', 17, 1.9));

  useEffect(() => {
    const savedTheme = localStorage.getItem('librum_theme') || 'padrao';
    const savedFontSize = Number(localStorage.getItem('librum_fontSize')) || 17;
    const savedLineSpacing = Number(localStorage.getItem('librum_lineSpacing')) || 1.9;

    setTheme(savedTheme);
    setFontSize(savedFontSize);
    setLineSpacing(savedLineSpacing);
    setContentStyle(applyTheme(savedTheme, savedFontSize, savedLineSpacing));
  }, []);

  useEffect(() => {
    const loadContent = async () => {
      setLoading(true);
      const data = await ReadingService.getSegmentContent(phaseId, segmentNumber);
      setContent(data);
      setLoading(false);
    };
    loadContent();
  }, [phaseId, segmentNumber]);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('librum_theme', newTheme);
    setContentStyle(applyTheme(newTheme, fontSize, lineSpacing));
  };

  const handleFontSizeChange = (e) => {
    const size = Number(e.target.value);
    setFontSize(size);
    localStorage.setItem('librum_fontSize', size);
    setContentStyle(applyTheme(theme, size, lineSpacing));
  };

  const handleLineSpacingChange = (e) => {
    const spacing = Number(e.target.value);
    setLineSpacing(spacing);
    localStorage.setItem('librum_lineSpacing', spacing);
    setContentStyle(applyTheme(theme, fontSize, spacing));
  };

  const handleNext = async () => {
    await ReadingService.markProgress(phaseId, segmentNumber);

    if (Number(segmentNumber) >= content.totalSegments) {
      navigate(`/quiz/${phaseId}`);
    } else {
      navigate(`/reading/${phaseId}/${Number(segmentNumber) + 1}`);
    }
  };

  if (loading || !content) return <div>Carregando trecho...</div>;

  const paragraphs = content.content.split('\n').filter(p => p.trim() !== '');

  return (
    <div className="reading-container">
      <header className="reading-header">
        <div className="header-left">
          <button onClick={() => navigate('/genres/aventura')} className="btn-icon">L</button>
          <span className="breadcrumb">← <span className="highlight">A Ilha do Tesouro</span> · Fase {phaseId}</span>
        </div>
        <div className="header-center">
          Trecho {segmentNumber} de {content.totalSegments}
        </div>
        <div className="header-right">
          <div className="progress-bar-small">
            <div className="progress-fill" style={{ width: `${(segmentNumber / content.totalSegments) * 100}%` }}></div>          
          </div>
          <span className="progress-text">{Math.round((segmentNumber / content.totalSegments) * 100)}%</span>
          <XpBadge />        
        </div>
      </header>

      <div className="reading-body">
        <aside className="sidebar-left">
          <div className="sidebar-section">
            <div className="label">FASE</div>
            <div className="value">{phaseId} · Trecho {segmentNumber} de {content.totalSegments}</div>
          </div>
          <div className="sidebar-section">
            <div className="label">GÊNERO</div>
            <div className="value highlight">⛵ {content.genreName}</div>
          </div>
          <div className="sidebar-section">
            <div className="label">TEMPO ESTIMADO</div>
            <div className="value">~{content.estimatedMinutes} min</div>
          </div>

          <div className="mascot-container">
            <img src={mascote} alt="Mascote" className="reading-mascot" />
            <p className="mascot-quote">"Prove que entendeu este trecho!"</p>
          </div>
        </aside>

        <main className="reading-content" style={contentStyle}>
          <div className="content-meta">
            TEXTO LITERÁRIO · DOMÍNIO PÚBLICO · {content.title.toUpperCase()}
          </div>

          <div className="text-body">
            {paragraphs.map((p, index) => {
              if (index === 0) {
                const firstLetter = p.charAt(0);
                const restOfParagraph = p.slice(1);
                return (
                  <p key={index} className="dropcap-paragraph">
                    <span className="dropcap">{firstLetter}</span>
                    {restOfParagraph}
                  </p>
                );
              }
              return <p key={index}>{p}</p>;
            })}
          </div>

          <div className="content-footer">
            <span>~{content.estimatedMinutes} min · Trecho {segmentNumber}/{content.totalSegments}</span>
            <button className="btn-next" onClick={handleNext}>Ir ao quiz →</button>
          </div>
        </main>

        <aside className="sidebar-right">
          <div className="visual-controls">
            <div className="label">VISUAL</div>

            <button className={`theme-btn ${theme === 'padrao' ? 'active' : ''}`} onClick={() => handleThemeChange('padrao')}>Padrão</button>
            <button className={`theme-btn ${theme === 'noturno' ? 'active' : ''}`} onClick={() => handleThemeChange('noturno')}>Noturno</button>
            <button className={`theme-btn ${theme === 'ampliado' ? 'active' : ''}`} onClick={() => handleThemeChange('ampliado')}>Ampliado</button>

            <div className="slider-group">
              <label>
                Fonte <input type="range" min="12" max="24" value={fontSize} onChange={handleFontSizeChange} /> {fontSize}
              </label>
            </div>

            <div className="slider-group">
              <label>
                Espaço <input type="range" min="1.0" max="3.0" step="0.1" value={lineSpacing} onChange={handleLineSpacingChange} /> {lineSpacing}
              </label>
            </div>

            <p className="save-status">✓ preferências salvas no perfil</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
