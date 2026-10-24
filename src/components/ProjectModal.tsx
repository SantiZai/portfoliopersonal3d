import React from 'react';
import { X, ExternalLink, Github, Trophy, Activity, Server, Crosshair, Award, CheckCircle } from 'lucide-react';
import { ProjectItem } from '../data/portfolioData';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  const renderIcon = (name: string) => {
    switch (name) {
      case 'Trophy':
        return <Trophy className="w-6 h-6 text-yellow-400" />;
      case 'Activity':
        return <Activity className="w-6 h-6 text-sky-400" />;
      case 'Server':
        return <Server className="w-6 h-6 text-emerald-400" />;
      case 'Crosshair':
        return <Crosshair className="w-6 h-6 text-purple-400" />;
      default:
        return <Award className="w-6 h-6 text-amber-400" />;
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl bg-slate-900 border border-slate-700/80 rounded-2xl p-6 sm:p-7 shadow-2xl shadow-black/80 text-white"
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar modal"
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 rounded-xl transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-start gap-4">
          <div className="p-3 bg-slate-800 border border-slate-700 rounded-2xl">
            {renderIcon(project.iconName)}
          </div>
          <div>
            <div className="text-xs font-mono text-lime-400 tracking-wider uppercase font-semibold">
              {project.category}
            </div>
            <h2 className="text-2xl font-black tracking-tight text-white mt-1">
              {project.title}
            </h2>
          </div>
        </div>

        {/* Description */}
        <p className="mt-4 text-slate-300 text-sm leading-relaxed">
          {project.description}
        </p>

        {/* Metrics Box */}
        <div className="mt-5 p-4 bg-gradient-to-r from-lime-950/40 to-emerald-950/40 border border-lime-500/30 rounded-xl flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-lime-400 shrink-0" />
          <div>
            <div className="text-[11px] font-mono text-lime-400 uppercase font-bold">
              Impacto & Rendimiento Medido
            </div>
            <div className="text-white text-sm font-semibold">
              {project.metrics}
            </div>
          </div>
        </div>

        {/* Tech Stack Tags */}
        <div className="mt-5">
          <div className="text-xs font-mono text-slate-400 uppercase mb-2">Tecnologías Clave</div>
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map(tag => (
              <span
                key={tag}
                className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-800 border border-slate-700 text-slate-200"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Links CTAs */}
        <div className="mt-6 pt-5 border-t border-slate-800 flex items-center justify-between gap-3">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs border border-slate-700 transition"
          >
            <Github className="w-4 h-4" />
            <span>Código en GitHub</span>
          </a>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-lime-400 hover:bg-lime-300 text-slate-950 font-bold text-xs shadow-md transition cursor-pointer"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Continuar en Cancha</span>
          </button>
        </div>
      </div>
    </div>
  );
};
