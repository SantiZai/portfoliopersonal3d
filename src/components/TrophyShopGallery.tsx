import React, { useState } from 'react';
import { ChevronRight, ArrowRight, Zap } from 'lucide-react';
import { PORTFOLIO_DATA, TrophyShopItem } from '../data/portfolioData';
import { tennisAudio } from '../utils/tennisAudio';

interface TrophyShopGalleryProps {
  onSelectTrophy: (item: TrophyShopItem) => void;
  onNextSection: () => void;
}

export const TrophyShopGallery: React.FC<TrophyShopGalleryProps> = ({
  onSelectTrophy,
  onNextSection,
}) => {
  const [filter, setFilter] = useState<string>('all');

  const filteredItems = filter === 'all'
    ? PORTFOLIO_DATA.trophyShop
    : PORTFOLIO_DATA.trophyShop.filter(i =>
        filter === '3d'
          ? i.category.toLowerCase().includes('webgl') || i.category.toLowerCase().includes('3d')
          : filter === 'cloud'
          ? i.category.toLowerCase().includes('cloud') || i.category.toLowerCase().includes('microservicios')
          : true
      );

  const handleCardClick = (item: TrophyShopItem) => {
    tennisAudio.playBounce(1.2);
    onSelectTrophy(item);
  };

  return (
    <div className="space-y-3 select-none" data-testid="trophy-shop-gallery">
      {/* Minimal Header */}
      <div className="flex items-center justify-between text-[10px] font-mono border-b border-slate-800 pb-1.5">
        <span className="text-amber-400 font-bold uppercase tracking-wider">
          Trofeos & Pro Shop
        </span>
        <span className="text-slate-500">Colección de Torneo</span>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-1 p-0.5 bg-slate-900/60 border border-slate-800 rounded-lg text-[10px] font-mono">
        <button
          type="button"
          onClick={() => setFilter('all')}
          className={`flex-1 py-1 rounded transition cursor-pointer font-semibold ${
            filter === 'all' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'
          }`}
        >
          Todos
        </button>
        <button
          type="button"
          onClick={() => setFilter('3d')}
          className={`flex-1 py-1 rounded transition cursor-pointer font-semibold ${
            filter === '3d' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'
          }`}
        >
          3D / WebGL
        </button>
        <button
          type="button"
          onClick={() => setFilter('cloud')}
          className={`flex-1 py-1 rounded transition cursor-pointer font-semibold ${
            filter === 'cloud' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'
          }`}
        >
          Cloud
        </button>
      </div>

      {/* Cards List */}
      <div className="space-y-2">
        {filteredItems.map(item => (
          <div
            key={item.id}
            onClick={() => handleCardClick(item)}
            className="cursor-pointer p-2.5 bg-slate-900/60 hover:bg-slate-850 border border-slate-800/80 hover:border-slate-700 rounded-xl transition duration-150 group"
          >
            <div className="flex items-center justify-between text-[9px] font-mono text-slate-400 mb-1">
              <span className="font-semibold text-amber-300">{item.rarity}</span>
              <span>{item.souvenirType}</span>
            </div>

            <div className="flex items-center justify-between gap-2">
              <div className="truncate">
                <h4 className="text-xs font-bold text-white group-hover:text-amber-300 transition truncate">
                  {item.name}
                </h4>
                <div className="text-[10px] text-slate-400 truncate mt-0.5">{item.metrics}</div>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-amber-400 transition shrink-0" />
            </div>
          </div>
        ))}
      </div>

      {/* Next button */}
      <button
        type="button"
        onClick={onNextSection}
        className="w-full mt-1 cursor-pointer bg-lime-400 hover:bg-lime-300 text-slate-950 font-bold text-xs py-2 px-3 rounded-xl transition flex items-center justify-center gap-1.5"
      >
        <span>Avanzar a Match Point</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
