import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  ArrowRight,
  Send,
  Mail,
  Github,
  Linkedin,
  CheckCircle,
  Eye,
  Minimize2,
  Maximize2,
  Sparkles,
} from 'lucide-react';
import { PORTFOLIO_DATA, ProjectItem, TrophyShopItem } from '../data/portfolioData';
import { COURT_SECTIONS } from '../utils/tennisMath';
import { tennisAudio } from '../utils/tennisAudio';
import { TrophyShopGallery } from './TrophyShopGallery';

interface SectionCardProps {
  currentSectionIndex: number;
  onNextSection: () => void;
  onOpenProject: (project: ProjectItem) => void;
  onOpenTrophy?: (item: TrophyShopItem) => void;
}

export const SectionCard: React.FC<SectionCardProps> = ({
  currentSectionIndex,
  onNextSection,
  onOpenProject,
  onOpenTrophy,
}) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [selectedSkillTab, setSelectedSkillTab] = useState(0);

  // Contact form state
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const section = COURT_SECTIONS[currentSectionIndex];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formEmail.trim() || !formMessage.trim()) return;

    setFormSubmitted(true);
    tennisAudio.playCrowdCheer();

    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#a3e635', '#38bdf8', '#f59e0b', '#ffffff'],
      });
    } catch {
      // Ignore
    }
  };

  return (
    <aside
      aria-label="Información de la sección activa"
      className="fixed top-14 left-4 sm:left-6 z-20 max-w-sm w-[calc(100vw-32px)] sm:w-[360px] pointer-events-none select-none"
    >
      <div className="pointer-events-auto bg-slate-950/75 backdrop-blur-xl border border-slate-800/70 rounded-2xl shadow-2xl shadow-black/80 text-white overflow-hidden transition-all duration-300">
        {/* Minimal Header Strip */}
        <div className="px-3.5 py-2 bg-slate-900/40 border-b border-slate-800/60 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-lime-400" />
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
              {section.courtLocation}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setIsMinimized(!isMinimized)}
            aria-label={isMinimized ? 'Expandir información' : 'Minimizar información'}
            className="p-1 text-slate-500 hover:text-white rounded transition cursor-pointer"
          >
            {isMinimized ? <Maximize2 className="w-3 h-3" /> : <Minimize2 className="w-3 h-3" />}
          </button>
        </div>

        {/* Card Content Body */}
        {!isMinimized && (
          <div className="p-4 max-h-[calc(100vh-190px)] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-800">
            {/* ================= SECTION 0: SAQUE / INTRO ================= */}
            {currentSectionIndex === 0 && (
              <div className="space-y-3.5">
                <div>
                  <h1 className="text-xl font-bold tracking-tight text-white">
                    Santiago Zaidan
                  </h1>
                  <p className="text-xs text-lime-400 font-mono mt-0.5">
                    Creative Full Stack & 3D Engineer
                  </p>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {PORTFOLIO_DATA.personal.motto}
                </p>

                {/* Minimalist Stats Grid */}
                <div className="grid grid-cols-2 gap-2 pt-0.5">
                  <div className="p-2 bg-slate-900/60 border border-slate-800/60 rounded-xl">
                    <div className="text-[9px] font-mono text-slate-400">PROYECTOS</div>
                    <div className="text-base font-bold text-white">
                      {PORTFOLIO_DATA.personal.matchStats.projectsShipped}+
                    </div>
                  </div>
                  <div className="p-2 bg-slate-900/60 border border-slate-800/60 rounded-xl">
                    <div className="text-[9px] font-mono text-slate-400">1ST SERVE</div>
                    <div className="text-base font-bold text-amber-300">
                      {PORTFOLIO_DATA.personal.matchStats.firstServeSpeed}
                    </div>
                  </div>
                  <div className="p-2 bg-slate-900/60 border border-slate-800/60 rounded-xl">
                    <div className="text-[9px] font-mono text-slate-400">WIN RATE</div>
                    <div className="text-base font-bold text-sky-400">
                      {PORTFOLIO_DATA.personal.matchStats.winRate}
                    </div>
                  </div>
                  <div className="p-2 bg-slate-900/60 border border-slate-800/60 rounded-xl">
                    <div className="text-[9px] font-mono text-slate-400">COMMITS</div>
                    <div className="text-base font-bold text-emerald-400">
                      {PORTFOLIO_DATA.personal.matchStats.ralliesCompleted}
                    </div>
                  </div>
                </div>

                <div className="pt-1 flex gap-2">
                  <button
                    type="button"
                    onClick={onNextSection}
                    className="flex-1 cursor-pointer bg-lime-400 hover:bg-lime-300 text-slate-950 font-bold text-xs py-2 px-3 rounded-xl transition flex items-center justify-center gap-1.5"
                  >
                    <span>Explorar Cancha</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <a
                    href="mailto:santyagozaidan@gmail.com"
                    className="cursor-pointer bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs py-2 px-3 rounded-xl border border-slate-800 transition flex items-center justify-center"
                    title="Enviar Email"
                  >
                    <Mail className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            )}

            {/* ================= SECTION 1: RESTO / BIO ================= */}
            {currentSectionIndex === 1 && (
              <div className="space-y-3">
                <div className="text-[10px] font-mono text-sky-400 uppercase font-semibold">
                  Estrategia & Perfil
                </div>
                <h2 className="text-base font-bold text-white">
                  {PORTFOLIO_DATA.about.headline}
                </h2>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {PORTFOLIO_DATA.about.paragraph1}
                </p>

                {/* Bullets */}
                <div className="space-y-1.5 pt-1">
                  {PORTFOLIO_DATA.about.values.map(v => (
                    <div key={v.title} className="text-xs text-slate-300 flex items-start gap-1.5">
                      <span className="text-lime-400 font-bold">•</span>
                      <span>
                        <strong className="text-white">{v.title}:</strong> {v.desc}
                      </span>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={onNextSection}
                  className="w-full mt-1 cursor-pointer bg-slate-900 hover:bg-slate-800 text-lime-400 font-semibold text-xs py-2 px-3 rounded-xl border border-slate-800 transition flex items-center justify-center gap-1.5"
                >
                  <span>Ver Proyectos en la Red</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* ================= SECTION 2: VOLEA / PROYECTOS ================= */}
            {currentSectionIndex === 2 && (
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="text-yellow-400 uppercase font-semibold">Proyectos Destacados</span>
                  <span className="text-slate-500">4 Trabajos</span>
                </div>

                <div className="space-y-1.5">
                  {PORTFOLIO_DATA.projects.map(proj => (
                    <div
                      key={proj.id}
                      onClick={() => onOpenProject(proj)}
                      className="cursor-pointer p-2.5 bg-slate-900/60 hover:bg-slate-850 border border-slate-800/80 hover:border-slate-700 rounded-xl transition group"
                    >
                      <div className="flex items-center justify-between">
                        <div className="text-xs font-bold text-white group-hover:text-lime-300 transition truncate">
                          {proj.title}
                        </div>
                        <Eye className="w-3.5 h-3.5 text-slate-500 group-hover:text-lime-400 transition shrink-0 ml-1" />
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5 truncate">
                        {proj.metrics}
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={onNextSection}
                  className="w-full mt-1 cursor-pointer bg-lime-400 hover:bg-lime-300 text-slate-950 font-bold text-xs py-2 px-3 rounded-xl transition flex items-center justify-center gap-1.5"
                >
                  <span>Ver Arsenal Técnico</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* ================= SECTION 3: SMASH / SKILLS ================= */}
            {currentSectionIndex === 3 && (
              <div className="space-y-3">
                <div className="text-[10px] font-mono text-amber-400 uppercase font-semibold">
                  Arsenal Técnico
                </div>

                {/* Minimal tab buttons */}
                <div className="flex gap-1 p-0.5 bg-slate-900/60 border border-slate-800 rounded-lg text-[10px] font-mono">
                  {PORTFOLIO_DATA.skillCategories.map((cat, idx) => (
                    <button
                      key={cat.title}
                      type="button"
                      onClick={() => setSelectedSkillTab(idx)}
                      className={`flex-1 py-1 rounded transition cursor-pointer font-semibold ${
                        selectedSkillTab === idx
                          ? 'bg-lime-400 text-slate-950'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {idx === 0 ? 'Frontend' : idx === 1 ? 'Backend' : 'Tooling'}
                    </button>
                  ))}
                </div>

                {/* Skills list */}
                <div className="space-y-2 pt-0.5">
                  {PORTFOLIO_DATA.skillCategories[selectedSkillTab].skills.map(sk => (
                    <div key={sk.name} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-200">{sk.name}</span>
                        <span className="font-mono text-lime-400 text-[11px]">{sk.level}%</span>
                      </div>
                      <div className="w-full bg-slate-800/80 h-1 rounded-full overflow-hidden">
                        <div
                          className="bg-lime-400 h-full rounded-full transition-all duration-300"
                          style={{ width: `${sk.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={onNextSection}
                  className="w-full mt-1 cursor-pointer bg-slate-900 hover:bg-slate-800 text-lime-400 font-semibold text-xs py-2 px-3 rounded-xl border border-slate-800 transition flex items-center justify-center gap-1.5"
                >
                  <span>Ver Historial de Torneos</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* ================= SECTION 4: TIE-BREAK / HISTORIAL ================= */}
            {currentSectionIndex === 4 && (
              <div className="space-y-2.5">
                <div className="text-[10px] font-mono text-purple-400 uppercase font-semibold">
                  Historial de Torneos
                </div>

                <div className="space-y-2">
                  {PORTFOLIO_DATA.experience.map(exp => (
                    <div
                      key={exp.year}
                      className="p-2.5 bg-slate-900/60 border border-slate-800/80 rounded-xl space-y-1 text-xs"
                    >
                      <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                        <span className="text-purple-300">{exp.year}</span>
                        <span>{exp.tournament}</span>
                      </div>
                      <div className="font-bold text-white">{exp.role}</div>
                      <p className="text-[11px] text-slate-300 leading-normal">{exp.highlight}</p>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={onNextSection}
                  className="w-full mt-1 cursor-pointer bg-lime-400 hover:bg-lime-300 text-slate-950 font-bold text-xs py-2 px-3 rounded-xl transition flex items-center justify-center gap-1.5"
                >
                  <span>Ir a Galería de Trofeos</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* ================= SECTION 5: TROFEOS & PRO SHOP ================= */}
            {currentSectionIndex === 5 && (
              <TrophyShopGallery
                onSelectTrophy={onOpenTrophy || (() => {})}
                onNextSection={onNextSection}
              />
            )}

            {/* ================= SECTION 6: MATCH POINT / CONTACTO ================= */}
            {currentSectionIndex === 6 && (
              <div className="space-y-3">
                <div>
                  <div className="text-[10px] font-mono text-amber-300 uppercase font-semibold">
                    Match Point · Contacto
                  </div>
                  <h3 className="text-base font-bold text-white mt-0.5">
                    ¿Comenzamos un nuevo match?
                  </h3>
                </div>

                {formSubmitted ? (
                  <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 rounded-xl text-center space-y-1.5 text-xs">
                    <CheckCircle className="w-5 h-5 text-emerald-400 mx-auto" />
                    <div className="font-bold text-white">¡Mensaje Enviado!</div>
                    <p className="text-slate-300 text-[11px]">
                      Te responderé a la brevedad.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-2">
                    <input
                      type="text"
                      required
                      value={formName}
                      onChange={e => setFormName(e.target.value)}
                      placeholder="Tu Nombre / Empresa"
                      className="w-full bg-slate-900/80 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-lime-400"
                    />
                    <input
                      type="email"
                      required
                      value={formEmail}
                      onChange={e => setFormEmail(e.target.value)}
                      placeholder="tu@email.com"
                      className="w-full bg-slate-900/80 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-lime-400"
                    />
                    <textarea
                      rows={2}
                      required
                      value={formMessage}
                      onChange={e => setFormMessage(e.target.value)}
                      placeholder="Breve mensaje o desafío..."
                      className="w-full bg-slate-900/80 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-lime-400 resize-none"
                    />
                    <button
                      type="submit"
                      className="w-full cursor-pointer bg-lime-400 hover:bg-lime-300 active:scale-95 text-slate-950 font-bold text-xs py-2 px-3 rounded-xl transition flex items-center justify-center gap-1.5"
                    >
                      <Send className="w-3 h-3" />
                      <span>Enviar Mensaje</span>
                    </button>
                  </form>
                )}

                {/* Social icons */}
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <a
                    href="mailto:santyagozaidan@gmail.com"
                    className="hover:text-lime-400 font-mono text-[11px]"
                  >
                    santyagozaidan@gmail.com
                  </a>
                  <div className="flex gap-2">
                    <a
                      href={PORTFOLIO_DATA.personal.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white"
                      aria-label="GitHub"
                    >
                      <Github className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href={PORTFOLIO_DATA.personal.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </aside>
  );
};
