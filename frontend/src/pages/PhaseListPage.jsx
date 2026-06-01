import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ReadingService } from '../services/ReadingService';
import ProgressBar from '../components/ui/ProgressBar';
import Button from '../components/ui/Button';
import LoadingState from '../components/ui/LoadingState';
import ErrorState from '../components/ui/ErrorState';
import './PhaseListPage.css';

export default function PhaseListPage() {
  const { genreId } = useParams();
  const navigate = useNavigate();
  const [phases, setPhases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(false);

  const [retry, setRetry] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const carregar = async () => {
      setLoading(true);
      setErro(false);
      try {
        const data = await ReadingService.getPhases(genreId);
        if (!cancelled) setPhases(data);
      } catch (e) {
        console.error(e);
        if (!cancelled) setErro(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    carregar();
    return () => { cancelled = true; };
  }, [genreId, retry]);

  if (loading) return <LoadingState message="Carregando fases..." />;
  if (erro) return <ErrorState message="Não foi possível carregar as fases." onRetry={() => setRetry(r => r + 1)} />;
  if (phases.length === 0) return <LoadingState message="Nenhuma fase disponível." />;

  const completedCount = phases.filter(p => p.isCompleted).length;
  const totalCount = phases.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);
  const nextPhase = phases.find(p => p.isUnlocked && !p.isCompleted) || phases[0];

  const irParaFase = (phase) => {
    if (phase.isUnlocked) navigate(`/reading/${phase.id}/1`);
  };

  return (
    <div className="trilha-page">
      <header className="trilha-header">
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

      <ol className="trilha-lista">
        {phases.map((phase) => {
          const estado = phase.isCompleted ? 'concluida' : phase.isUnlocked ? 'ativa' : 'bloqueada';
          return (
            <li key={phase.id} className={`trilha-no trilha-no--${estado}`}>
              <button
                className="trilha-no__circulo"
                onClick={() => irParaFase(phase)}
                disabled={!phase.isUnlocked}
              >
                {phase.isCompleted ? '✓' : phase.isUnlocked ? phase.phaseNumber : '🔒'}
              </button>
              <span className="trilha-no__titulo">{phase.title}</span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
