import React, { useEffect, useRef, useState, useCallback } from 'react';
import { TennisScene } from './3d/TennisScene';
import { COURT_SECTIONS } from './utils/tennisMath';
import { HeaderBar } from './components/HeaderBar';
import { BottomDock } from './components/BottomDock';
import { SectionCard } from './components/SectionCard';
import { ProjectModal } from './components/ProjectModal';
import { InteractiveScoreboard } from './components/InteractiveScoreboard';
import { TrophyDetailDrawer } from './components/TrophyDetailDrawer';
import { tennisAudio } from './utils/tennisAudio';
import { ProjectItem, TrophyShopItem } from './data/portfolioData';

export default function App() {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<TennisScene | null>(null);

  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [serveSpeed, setServeSpeed] = useState(218);
  const [isMuted, setIsMuted] = useState(false);
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const [selectedTrophy, setSelectedTrophy] = useState<TrophyShopItem | null>(null);
  const [isScoreboardOpen, setIsScoreboardOpen] = useState(false);

  // Scroll throttling state
  const lastScrollTime = useRef<number>(0);
  const touchStartY = useRef<number>(0);

  // Initialize Three.js scene once
  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new TennisScene(mountRef.current, {
      onSectionChanged: (newIdx: number) => {
        setCurrentSectionIndex(newIdx);
      },
      onBallHit: (speedKmh: number) => {
        setServeSpeed(speedKmh);
      },
    });

    sceneRef.current = scene;

    return () => {
      scene.dispose();
      sceneRef.current = null;
    };
  }, []);

  // Safe navigation function
  const navigateToSection = useCallback((index: number) => {
    const clampedIndex = Math.max(0, Math.min(COURT_SECTIONS.length - 1, index));
    setCurrentSectionIndex(clampedIndex);
    if (sceneRef.current) {
      sceneRef.current.goToSection(clampedIndex);
    }
  }, []);

  // Next / Previous section helpers
  const nextSection = useCallback(() => {
    navigateToSection((currentSectionIndex + 1) % COURT_SECTIONS.length);
  }, [currentSectionIndex, navigateToSection]);

  const prevSection = useCallback(() => {
    navigateToSection((currentSectionIndex - 1 + COURT_SECTIONS.length) % COURT_SECTIONS.length);
  }, [currentSectionIndex, navigateToSection]);

  // Quick shot trigger
  const handleQuickHit = useCallback(() => {
    if (sceneRef.current) {
      sceneRef.current.hitBallRandomCourtShot();
    }
  }, []);

  // Toggle Mute
  const handleToggleMute = useCallback(() => {
    const muted = tennisAudio.toggleMute();
    setIsMuted(muted);
  }, []);

  // Wheel scroll navigation listener
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      if (now - lastScrollTime.current < 650) return; // Debounce threshold

      if (Math.abs(e.deltaY) > 25) {
        lastScrollTime.current = now;
        if (e.deltaY > 0) {
          nextSection();
        } else {
          prevSection();
        }
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const now = Date.now();
      if (now - lastScrollTime.current < 650) return;

      const touchEndY = e.changedTouches[0].clientY;
      const diffY = touchStartY.current - touchEndY;

      if (Math.abs(diffY) > 40) {
        lastScrollTime.current = now;
        if (diffY > 0) {
          nextSection();
        } else {
          prevSection();
        }
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === 'PageDown') {
        e.preventDefault();
        nextSection();
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        prevSection();
      } else if (e.key === ' ' || e.key === 'Enter') {
        // Spacebar hits ball
        if (document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
          e.preventDefault();
          handleQuickHit();
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [nextSection, prevSection, handleQuickHit]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-slate-950 font-sans text-slate-100">
      {/* 3D WebGL Canvas Mount Container */}
      <div
        ref={mountRef}
        data-testid="three-tennis-canvas"
        className="absolute inset-0 z-0 cursor-crosshair select-none"
      />

      {/* Top Header Bar */}
      <HeaderBar
        currentSectionIndex={currentSectionIndex}
        serveSpeed={serveSpeed}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        onQuickHit={handleQuickHit}
        isScoreboardOpen={isScoreboardOpen}
        onToggleScoreboard={() => setIsScoreboardOpen(prev => !prev)}
      />

      {/* Interactive Tennis Scoreboard Widget */}
      {isScoreboardOpen && (
        <InteractiveScoreboard
          currentSectionIndex={currentSectionIndex}
          serveSpeed={serveSpeed}
          onSelectSection={navigateToSection}
          onHitBall={handleQuickHit}
          onClose={() => setIsScoreboardOpen(false)}
        />
      )}

      {/* Active Section Info Card */}
      <SectionCard
        currentSectionIndex={currentSectionIndex}
        onNextSection={nextSection}
        onOpenProject={setActiveProject}
        onOpenTrophy={setSelectedTrophy}
      />

      {/* Bottom Unified Control Dock */}
      <BottomDock
        currentSectionIndex={currentSectionIndex}
        onSelectSection={navigateToSection}
        onQuickHit={handleQuickHit}
      />

      {/* Modal for Project Inspection */}
      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />

      {/* Drawer for Trophy & Souvenir Inspection */}
      <TrophyDetailDrawer item={selectedTrophy} onClose={() => setSelectedTrophy(null)} />
    </div>
  );
}
