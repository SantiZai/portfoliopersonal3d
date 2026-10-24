import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { COURT_SECTIONS } from '../utils/tennisMath';

interface BottomDockProps {
  currentSectionIndex: number;
  onSelectSection: (index: number) => void;
  onQuickHit: () => void;
}

export const BottomDock: React.FC<BottomDockProps> = ({
  currentSectionIndex,
  onSelectSection,
  onQuickHit,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const sectionLabels = [
    { num: '01', label: 'Saque' },
    { num: '02', label: 'Resto' },
    { num: '03', label: 'Volea' },
    { num: '04', label: 'Smash' },
    { num: '05', label: 'Tie-Break' },
    { num: '06', label: 'Trofeos' },
    { num: '07', label: 'Match Point' },
  ];

  return (
    <div
      className={`fixed bottom-4 left-1/2 -translate-x-1/2 z-30 transition-transform duration-300 ease-out select-none ${
        isCollapsed ? 'translate-y-[calc(100%-24px)]' : 'translate-y-0'
      }`}
      style={{ maxWidth: 'min(760px, 94vw)' }}
    >
      {/* Discreet Minimal Collapse Tab */}
      <div className="flex justify-center -mb-px">
        <button
          type="button"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="cursor-pointer bg-slate-950/80 hover:bg-slate-900 text-slate-400 hover:text-slate-200 border-t border-x border-slate-800/80 px-3 py-0.5 rounded-t-lg text-[10px] font-mono tracking-widest flex items-center gap-1 backdrop-blur-md transition"
          aria-label={isCollapsed ? 'Mostrar menú de navegación' : 'Ocultar menú'}
        >
          {isCollapsed ? (
            <>
              <ChevronUp className="w-3 h-3 text-lime-400" />
              <span>NAV</span>
            </>
          ) : (
            <ChevronDown className="w-3 h-3 text-slate-500" />
          )}
        </button>
      </div>

      {/* Ultra-Minimalist Floating Track */}
      <nav
        aria-label="Navegación de secciones del estadio"
        className="bg-slate-950/80 border border-slate-800/70 rounded-full px-2 py-1.5 shadow-2xl shadow-black/80 backdrop-blur-xl flex items-center gap-1"
      >
        <div className="flex items-center gap-0.5 sm:gap-1">
          {sectionLabels.map((sec, idx) => {
            const isActive = currentSectionIndex === idx;
            return (
              <button
                key={sec.num}
                type="button"
                onClick={() => onSelectSection(idx)}
                className={`cursor-pointer transition-all duration-200 rounded-full text-xs font-mono flex items-center gap-1.5 py-1 px-2.5 ${
                  isActive
                    ? 'bg-lime-400 text-slate-950 font-bold shadow-md shadow-lime-400/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
                title={sec.label}
              >
                <span>{sec.num}</span>
                {isActive && <span className="font-sans text-[11px] font-semibold">{sec.label}</span>}
              </button>
            );
          })}
        </div>

        <div className="w-px h-4 bg-slate-800 mx-1" />

        {/* Minimal shot action */}
        <button
          type="button"
          onClick={onQuickHit}
          className="cursor-pointer p-1.5 text-slate-400 hover:text-amber-300 hover:bg-slate-800/60 rounded-full transition"
          title="Golpear Pelota (Tiro Rápido)"
          aria-label="Golpear pelota"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
        </button>
      </nav>
    </div>
  );
};
