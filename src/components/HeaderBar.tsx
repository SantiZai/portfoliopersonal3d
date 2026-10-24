import React from 'react';
import { Volume2, VolumeX, Zap, Activity } from 'lucide-react';
import { getScoreboardStateForSection, COURT_SECTIONS } from '../utils/tennisMath';

interface HeaderBarProps {
  currentSectionIndex: number;
  serveSpeed: number;
  isMuted: boolean;
  onToggleMute: () => void;
  onQuickHit: () => void;
  isScoreboardOpen: boolean;
  onToggleScoreboard: () => void;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  currentSectionIndex,
  serveSpeed,
  isMuted,
  onToggleMute,
  onQuickHit,
  isScoreboardOpen,
  onToggleScoreboard,
}) => {
  const currentSection = COURT_SECTIONS[currentSectionIndex] || COURT_SECTIONS[0];
  const scoreState = getScoreboardStateForSection(currentSectionIndex);

  return (
    <header className="fixed top-0 left-0 right-0 z-30 px-4 py-2.5 pointer-events-none select-none">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Minimal Brand Identifier */}
        <div className="pointer-events-auto flex items-center gap-2 bg-slate-950/60 backdrop-blur-md border border-slate-800/60 rounded-full px-3 py-1.5 shadow-lg">
          <span className="w-2 h-2 rounded-full bg-lime-400" />
          <span className="text-white font-bold text-xs tracking-tight">
            Santiago Zaidan
          </span>
          <span className="text-slate-500 text-xs hidden sm:inline">/</span>
          <span className="text-[11px] text-slate-400 font-mono hidden sm:inline">
            3D Web & Full Stack
          </span>
        </div>

        {/* Minimalist Court & Tennis Phase Indicator */}
        <button
          type="button"
          onClick={onToggleScoreboard}
          aria-label={isScoreboardOpen ? 'Cerrar marcador' : 'Abrir marcador'}
          className="pointer-events-auto bg-slate-950/60 hover:bg-slate-900/80 backdrop-blur-md border border-slate-800/60 hover:border-slate-700 rounded-full px-3.5 py-1.5 flex items-center gap-2 shadow-lg cursor-pointer transition text-xs font-mono"
        >
          <span className="text-slate-400">FASE:</span>
          <span className="text-lime-300 font-bold">{scoreState.sectionTerm}</span>
          <span className="text-slate-600 hidden xs:inline">·</span>
        </button>

        {/* Right Minimal Icons (Radar, Scoreboard toggle & Audio) */}
        <div className="pointer-events-auto flex items-center gap-1.5 bg-slate-950/60 backdrop-blur-md border border-slate-800/60 rounded-full px-2 py-1 shadow-lg">
          {/* Minimal radar speed pill */}
          <div
            className="flex items-center gap-1 px-2 py-0.5 text-[11px] font-mono text-slate-300"
            title="Velocidad de Saque"
          >
            <Zap className="w-3 h-3 text-amber-400" />
            <span className="text-amber-300 font-bold">{serveSpeed}</span>
            <span className="text-slate-500 text-[9px]">KM/H</span>
          </div>

          <div className="w-px h-3.5 bg-slate-800" />

          {/* Quick hit button */}
          <button
            type="button"
            onClick={onQuickHit}
            className="p-1 text-slate-400 hover:text-lime-400 rounded-full transition cursor-pointer text-xs"
            title="Golpear Pelota"
            aria-label="Golpear pelota"
          >
            🎾
          </button>

          {/* Scoreboard toggle icon */}
          <button
            type="button"
            onClick={onToggleScoreboard}
            aria-label={isScoreboardOpen ? 'Ocultar marcador' : 'Ver marcador'}
            className={`p-1 rounded-full transition cursor-pointer ${
              isScoreboardOpen ? 'text-emerald-400' : 'text-slate-400 hover:text-white'
            }`}
            title="Marcador de Tenis"
          >
            <Activity className="w-3.5 h-3.5" />
          </button>

          {/* Sound mute toggle icon */}
          <button
            type="button"
            onClick={onToggleMute}
            aria-label={isMuted ? 'Activar sonido' : 'Silenciar'}
            className="p-1 text-slate-400 hover:text-white rounded-full transition cursor-pointer"
            title={isMuted ? 'Activar sonido' : 'Silenciar'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-lime-400" />}
          </button>
        </div>
      </div>
    </header>
  );
};
