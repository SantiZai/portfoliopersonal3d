import React from 'react';
import {
  X,
  Trophy,
  ExternalLink,
  Github,
  Award,
  CheckCircle,
  Layers,
  Cpu,
  Sparkles,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { TrophyShopItem } from '../data/portfolioData';

interface TrophyDetailDrawerProps {
  item: TrophyShopItem | null;
  onClose: () => void;
}

export const TrophyDetailDrawer: React.FC<TrophyDetailDrawerProps> = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-end bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg h-full bg-slate-950 border-l border-slate-800 p-6 sm:p-7 shadow-2xl overflow-y-auto text-white flex flex-col justify-between"
        onClick={e => e.stopPropagation()}
      >
        <div>
          {/* Top Bar with Badge & Close */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <span
              className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border"
              style={{
                color: item.accentColor,
                borderColor: `${item.accentColor}40`,
                backgroundColor: `${item.accentColor}15`,
              }}
            >
              {item.rarity} · {item.souvenirType}
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar panel de trofeo"
              className="p-1.5 text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Hero Header */}
          <div className="mt-5 flex items-start gap-3.5">
            <div
              className="p-3.5 rounded-2xl border flex items-center justify-center shrink-0"
              style={{
                borderColor: `${item.accentColor}50`,
                backgroundColor: `${item.accentColor}10`,
              }}
            >
              <Trophy className="w-7 h-7" style={{ color: item.accentColor }} />
            </div>
            <div>
              <div className="text-[11px] font-mono text-slate-400 uppercase">
                {item.category}
              </div>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white mt-0.5">
                {item.name}
              </h2>
            </div>
          </div>

          {/* Impact Banner */}
          <div
            className="mt-5 p-3.5 rounded-xl border flex items-center gap-3"
            style={{
              borderColor: `${item.accentColor}40`,
              backgroundColor: `${item.accentColor}08`,
            }}
          >
            <Zap className="w-5 h-5 shrink-0" style={{ color: item.accentColor }} />
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                Métrica de Rendimiento en Torneo
              </div>
              <div className="text-sm font-bold text-white">
                {item.metrics}
              </div>
            </div>
          </div>

          {/* Full Narrative Description */}
          <div className="mt-5">
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1.5">
              Historia & Especificaciones Técnicas
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              {item.description}
            </p>
          </div>

          {/* Technical Specs Breakdown */}
          <div className="mt-5 space-y-2">
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
              Ficha Técnica de Fabricación
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {item.specs.map(sp => (
                <div key={sp.label} className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl">
                  <div className="text-[10px] font-mono text-slate-400">{sp.label}</div>
                  <div className="text-xs font-bold text-white mt-0.5">{sp.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack Tags */}
          <div className="mt-5">
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
              Stack de Tecnologías
            </div>
            <div className="flex flex-wrap gap-1.5">
              {item.projectRef.tags.map(t => (
                <span
                  key={t}
                  className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-900 border border-slate-800 text-slate-200"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Action CTAs at bottom */}
        <div className="mt-8 pt-5 border-t border-slate-800 flex items-center gap-3">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs border border-slate-700 transition"
          >
            <Github className="w-4 h-4" />
            <span>Ver Repositorio</span>
          </a>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 cursor-pointer bg-lime-400 hover:bg-lime-300 text-slate-950 font-black text-xs px-4 py-2.5 rounded-xl transition shadow-lg shadow-lime-400/20 flex items-center justify-center gap-1.5"
          >
            <CheckCircle className="w-4 h-4" />
            <span>Volver a la Cancha</span>
          </button>
        </div>
      </div>
    </div>
  );
};
