import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ReadingService } from '../services/ReadingService';
import { mensagemDoTinta } from '../utils/tintaMessages';
import ProgressBar from '../components/ui/ProgressBar';
import Button from '../components/ui/Button';
import LoadingState from '../components/ui/LoadingState';
import ErrorState from '../components/ui/ErrorState';
import ilhaDoTesouro from '../assets/books/ilha-do-tesouro.png';
import './PhaseListPage.css';

const bookCovers = {
  'A Ilha do Tesouro': ilhaDoTesouro,
};

export default function PhaseListPage() {
  const { genreId } = useParams();
  const navigate = useNavigate();
  const [phases, setPhases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  const [retry, setRetry] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const carregar = async () => {
      setLoading(true);
      setErro(null);
      try {
        const data = await ReadingService.getPhases(genreId);
        if (!cancelled) setPhases(data);
      } catch (e) {
        console.error(e);
        if (!cancelled) setErro(mensagemDoTinta(e));
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    carregar();
    return () => { cancelled = true; };
  }, [genreId, retry]);

  if (loading) return <LoadingState message="Carregando fases..." />;
  if (erro) return <ErrorState message={erro} onRetry={() => setRetry(r => r + 1)} />;
  if (phases.length === 0) return <LoadingState message="Nenhuma fase disponível." />;

  const completedCount = phases.filter(p => p.isCompleted).length;
  const totalCount = phases.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);
  const nextPhase = phases.find(p => p.isUnlocked && !p.isCompleted) || phases[0];

  const irParaFase = (phase) => {
    if (phase.isUnlocked) navigate(`/reading/${phase.id}/1`);
  };

  const larguraTrilha = 300;
  const alturaLinha = 112;
  const raioCirculo = 28;
  const margemTopo = 16;
  const faixaX = [88, 212];
  const centroX = (i) => faixaX[i % 2];
  const topoNo = (i) => margemTopo + i * alturaLinha;
  const centroY = (i) => topoNo(i) + raioCirculo;
  const alturaTrilha = margemTopo + phases.length * alturaLinha + 48;
  const pontos = phases.map((_, i) => `${centroX(i)},${centroY(i)}`).join(' ');

  return (
    <div className="trilha-page">
      <header className="trilha-header">
        {bookCovers[phases[0]?.bookTitle] && (
          <img src={bookCovers[phases[0]?.bookTitle]} alt={phases[0]?.bookTitle} className="trilha-capa" />
        )}
        <h1>{phases[0]?.bookTitle}</h1>
        <p className="trilha-autor">{phases[0]?.bookAuthor} - domínio público</p>
        <div className="trilha-progresso">
          <ProgressBar value={progressPercent} />
          <span>{completedCount} de {totalCount} fases concluídas</span>
        </div>
        <Button variant="secondary" onClick={() => irParaFase(nextPhase)}>
          Continuar na Fase {nextPhase?.phaseNumber}
        </Button>
      </header>

      <div className="trilha-mapa" style={{ width: larguraTrilha, height: alturaTrilha }}>
        <svg
          className="trilha-conector"
          viewBox={`0 0 ${larguraTrilha} ${alturaTrilha}`}
          width={larguraTrilha}
          height={alturaTrilha}
          aria-hidden="true"
        >
          <polyline points={pontos} />
        </svg>
        {phases.map((phase, i) => {
          const estado = phase.isCompleted ? 'concluida' : phase.isUnlocked ? 'ativa' : 'bloqueada';
          return (
            <div
              key={phase.id}
              className={`trilha-no trilha-no--${estado}`}
              style={{ left: centroX(i), top: topoNo(i) }}
            >
              <button
                className="trilha-no__circulo"
                onClick={() => irParaFase(phase)}
                disabled={!phase.isUnlocked}
              >
                {phase.isCompleted ? '✓' : phase.isUnlocked ? phase.phaseNumber : '🔒'}
              </button>
              <span className="trilha-no__titulo">{phase.title}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
