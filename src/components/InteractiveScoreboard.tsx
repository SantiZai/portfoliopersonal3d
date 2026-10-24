import React from 'react';
import { X, Flame } from 'lucide-react';
import { COURT_SECTIONS, getScoreboardStateForSection } from '../utils/tennisMath';
import { tennisAudio } from '../utils/tennisAudio';

interface InteractiveScoreboardProps {
  currentSectionIndex: number;
  serveSpeed: number;
  onSelectSection: (index: number) => void;
  onHitBall: () => void;
  onClose?: () => void;
}

export const InteractiveScoreboard: React.FC<InteractiveScoreboardProps> = ({
  currentSectionIndex,
  serveSpeed,
  onSelectSection,
  onHitBall,
  onClose,
}) => {
  const scoreboardState = getScoreboardStateForSection(currentSectionIndex);

  const handleWinPoint = () => {
    tennisAudio.playRacketHit(1.2);
    const nextIdx = (currentSectionIndex + 1) % COURT_SECTIONS.length;
    onSelectSection(nextIdx);
  };

  return (
    <aside
      aria-label="Marcador interactivo de tenis"
      data-testid="interactive-scoreboard"
      className="fixed top-14 right-4 sm:right-6 z-20 pointer-events-none select-none transition-all duration-300"
      style={{ width: 'min(310px, 92vw)' }}
    >
      <div className="pointer-events-auto bg-slate-950/80 border border-slate-800/80 rounded-2xl p-3 shadow-2xl shadow-black/80 backdrop-blur-xl space-y-2.5">
        {/* Header Strip */}
        <div className="flex items-center justify-between text-[10px] font-mono border-b border-slate-800/70 pb-1.5">
          <div className="flex items-center gap-1.5 text-emerald-400 font-bold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>MARCADOR</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-lime-400 font-semibold">{scoreboardState.sectionTerm}</span>
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                aria-label="Cerrar marcador"
                className="p-1 text-slate-500 hover:text-white rounded transition cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* Minimalist Score Table */}
        <div className="space-y-1 font-mono text-xs">
          <div className="grid grid-cols-12 text-[9px] text-slate-500 pb-0.5">
            <span className="col-span-4">JUGADOR</span>
            <span className="col-span-2 text-center">S1</span>
            <span className="col-span-2 text-center">S2</span>
            <span className="col-span-2 text-center">S3</span>
            <span className="col-span-2 text-right">PTS</span>
          </div>

          {/* S. Zaidan */}
          <div className="grid grid-cols-12 items-center text-[11px] py-0.5">
            <div className="col-span-4 flex items-center gap-1 truncate text-white font-semibold">
              <span className="text-amber-400 text-[10px]">●</span>
              <span className="truncate">S. ZAIDAN</span>
            </div>
            <div className="col-span-2 text-center text-sky-400 font-bold">
              {scoreboardState.player1Sets[0]}
            </div>
            <div className="col-span-2 text-center text-sky-400 font-bold">
              {scoreboardState.player1Sets[1]}
            </div>
            <div className="col-span-2 text-center text-sky-400 font-bold">
              {scoreboardState.player1Sets[2]}
            </div>
            <div className="col-span-2 text-right">
              <span className="px-1.5 py-0.5 rounded bg-lime-400/20 text-lime-400 font-bold text-[10px]">
                {scoreboardState.currentPointsPlayer1}
              </span>
            </div>
          </div>

          {/* Visitor */}
          <div className="grid grid-cols-12 items-center text-[11px] py-0.5">
            <div className="col-span-4 flex items-center gap-1 truncate text-white font-semibold">
              <span className="truncate">VISITANTE</span>
            </div>
            <div className="col-span-2 text-center text-sky-400 font-bold">
              {scoreboardState.player2Sets[0]}
            </div>
            <div className="col-span-2 text-center text-sky-400 font-bold">
              {scoreboardState.player2Sets[1]}
            </div>
            <div className="col-span-2 text-center text-sky-400 font-bold">
              {scoreboardState.player2Sets[2]}
            </div>
            <div className="col-span-2 text-right">
              <span className="px-1.5 py-0.5 rounded bg-lime-400/20 text-lime-400 font-bold text-[10px]">
                {scoreboardState.currentPointsPlayer2}
              </span>
            </div>
          </div>
        </div>

        {/* Tactical Shot Action Footer */}
        <div className="pt-1.5 border-t border-slate-800/70 flex items-center gap-1.5 text-[10px] font-mono">
          <button
            type="button"
            onClick={handleWinPoint}
            className="flex-1 cursor-pointer bg-slate-900 hover:bg-slate-800 active:scale-95 text-lime-400 py-1 px-2 rounded-lg border border-slate-800 transition text-center font-bold"
          >
            + Siguiente Punto
          </button>
          <button
            type="button"
            onClick={onHitBall}
            className="cursor-pointer bg-amber-400/10 hover:bg-amber-400/20 text-amber-300 border border-amber-400/30 py-1 px-2 rounded-lg transition font-medium"
            title="Tiro a la cancha"
          >
            {serveSpeed} km/h
          </button>
        </div>
      </div>
    </aside>
  );
};
