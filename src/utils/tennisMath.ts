/**
 * Pure mathematical and helper functions for 3D Tennis Stadium Portfolio
 */

export interface Vector3D {
  x: number;
  y: number;
  z: number;
}

export interface SectionTarget {
  id: string;
  name: string;
  subtitle: string;
  ballPos: Vector3D;
  camPos: Vector3D;
  camLookAt: Vector3D;
  courtLocation: string;
}

export interface ScoreboardState {
  sectionTerm: string;
  sectionSubtitle: string;
  player1Sets: number[];
  player2Sets: number[];
  currentPointsPlayer1: string;
  currentPointsPlayer2: string;
  gameStatus: string;
  serveNumber: number;
}

export const COURT_SECTIONS: SectionTarget[] = [
  {
    id: 'serve',
    name: 'Serve & Welcome',
    subtitle: 'Santiago Zaidan · Creative Full Stack & 3D Engineer',
    ballPos: { x: 0, y: 1.1, z: 12 },
    camPos: { x: 0, y: 2.2, z: 16.5 },
    camLookAt: { x: 0, y: 1.2, z: 0 },
    courtLocation: 'Línea de Saque',
  },
  {
    id: 'about',
    name: 'Playstyle & Bio',
    subtitle: 'Filosofía, disciplina táctica y visión tecnológica',
    ballPos: { x: -2.5, y: 0.15, z: 6.4 },
    camPos: { x: -4.5, y: 2.0, z: 9.5 },
    camLookAt: { x: -1.5, y: 0.6, z: 4.0 },
    courtLocation: 'La T de Saque',
  },
  {
    id: 'projects',
    name: 'Grand Slam Projects',
    subtitle: 'Desarrollos destacados de alto impacto y precisión',
    ballPos: { x: 0, y: 1.2, z: 0.2 },
    camPos: { x: 4.8, y: 2.5, z: 3.2 },
    camLookAt: { x: 0, y: 1.0, z: 0 },
    courtLocation: 'La Red',
  },
  {
    id: 'skills',
    name: 'Toolkit & Arsenal',
    subtitle: 'Frontend 3D, Backend Cloud, Rendimiento y Arquitectura',
    ballPos: { x: 3.5, y: 0.15, z: -10 },
    camPos: { x: 5.5, y: 2.4, z: -7.0 },
    camLookAt: { x: 2.0, y: 0.8, z: -11.0 },
    courtLocation: 'Línea de Fondo Cruzada',
  },
  {
    id: 'experience',
    name: 'Tournament Record',
    subtitle: 'Trayectoria profesional, roles clave y triunfos',
    ballPos: { x: -8.0, y: 4.0, z: 0 },
    camPos: { x: -11.0, y: 6.5, z: 6.0 },
    camLookAt: { x: -6.0, y: 3.5, z: -1.0 },
    courtLocation: 'Tribuna & Marcador Principal',
  },
  {
    id: 'gallery',
    name: 'Trophy Hall',
    subtitle: 'Galería de Trofeos, Souvenirs de Torneo y Obras Maestras',
    ballPos: { x: 0, y: 0.8, z: 0 },
    camPos: { x: 10.4, y: 2.2, z: -3.8 },
    camLookAt: { x: 7.2, y: 1.1, z: -7.5 },
    courtLocation: 'Galería de Trofeos',
  },
  {
    id: 'contact',
    name: 'Match Point',
    subtitle: 'Iniciemos un nuevo match juntos para tu próximo proyecto',
    ballPos: { x: 7.8, y: 0.95, z: -6.2 },
    camPos: { x: 0, y: 3.2, z: 5.0 },
    camLookAt: { x: 0, y: 0.8, z: 0 },
    courtLocation: 'Podio Central de Campeón',
  },
];

/**
 * Gets the tennis score & terminology for any portfolio section
 */
export function getScoreboardStateForSection(sectionIndex: number): ScoreboardState {
  switch (sectionIndex) {
    case 0:
      return {
        sectionTerm: 'SAQUE',
        sectionSubtitle: 'Primer Saque · Potencia & Precisión',
        player1Sets: [0, 0, 0],
        player2Sets: [0, 0, 0],
        currentPointsPlayer1: '0',
        currentPointsPlayer2: '0',
        gameStatus: 'INICIO DEL PARTIDO',
        serveNumber: 1,
      };
    case 1:
      return {
        sectionTerm: 'RESTO',
        sectionSubtitle: 'Drive & Estrategia de Fondo',
        player1Sets: [6, 0, 0],
        player2Sets: [4, 0, 0],
        currentPointsPlayer1: '15',
        currentPointsPlayer2: '15',
        gameStatus: 'JUEGO EN CURSO',
        serveNumber: 1,
      };
    case 2:
      return {
        sectionTerm: 'VOLEA',
        sectionSubtitle: 'Ataque en la Red & Proyectos',
        player1Sets: [6, 4, 0],
        player2Sets: [4, 3, 0],
        currentPointsPlayer1: '15',
        currentPointsPlayer2: '30',
        gameStatus: 'JUEGO EN CURSO',
        serveNumber: 1,
      };
    case 3:
      return {
        sectionTerm: 'SMASH',
        sectionSubtitle: 'Definición & Arsenal Técnico',
        player1Sets: [6, 5, 0],
        player2Sets: [4, 6, 0],
        currentPointsPlayer1: '30',
        currentPointsPlayer2: '40',
        gameStatus: 'SET POINT VISITANTE',
        serveNumber: 2,
      };
    case 4:
      return {
        sectionTerm: 'TIE-BREAK',
        sectionSubtitle: 'Historial Bajo Presión Máxima',
        player1Sets: [6, 5, 6],
        player2Sets: [4, 7, 6],
        currentPointsPlayer1: '6',
        currentPointsPlayer2: '5',
        gameStatus: 'TIE-BREAK DECISIVO',
        serveNumber: 1,
      };
    case 5:
      return {
        sectionTerm: 'MATCH POINT',
        sectionSubtitle: 'Galería de Obras Maestras',
        player1Sets: [6, 5, 5],
        player2Sets: [4, 7, 4],
        currentPointsPlayer1: '40',
        currentPointsPlayer2: 'AD',
        gameStatus: 'VENTAJA VISITANTE',
        serveNumber: 1,
      };
    case 6:
    default:
      return {
        sectionTerm: 'GAME, SET and MATCH',
        sectionSubtitle: 'Punto de Campeonato · Contratación',
        player1Sets: [6, 7, 7],
        player2Sets: [4, 6, 6],
        currentPointsPlayer1: '0',
        currentPointsPlayer2: '0',
        gameStatus: '¡GAME, SET AND MATCH!',
        serveNumber: 1,
      };
  }
}

/**
 * Calculates a parabolic arc with smooth ease-in-out between two 3D positions
 */
export function calculateBallTrajectory(
  start: Vector3D,
  end: Vector3D,
  t: number,
  arcHeight: number = 2.5
): Vector3D {
  const clampedT = Math.max(0, Math.min(1, t));

  // Smooth Hermite interpolation for X and Z
  const smoothT = clampedT * clampedT * (3 - 2 * clampedT);
  const x = start.x + (end.x - start.x) * smoothT;
  const z = start.z + (end.z - start.z) * smoothT;

  // Parabolic vertical arc + linear interpolation
  const baseY = start.y + (end.y - start.y) * clampedT;
  const parabolicArc = 4 * arcHeight * clampedT * (1 - clampedT);
  const y = baseY + parabolicArc;

  return { x, y, z };
}

/**
 * Calculates decayed bounce physics for landing
 */
export function calculateTennisBounce(t: number, maxBounceHeight: number = 0.4): number {
  if (t < 0) return 0;
  if (t >= 1) return 0;
  // Simulates 2 decayed damping bounces
  const bounceFreq = 12;
  const decay = Math.exp(-4 * t);
  return Math.abs(Math.sin(t * bounceFreq)) * maxBounceHeight * decay;
}

/**
 * Tennis point scoring notation (0, 15, 30, 40, AD, GAME)
 */
export function formatTennisScore(points: number): string {
  switch (points) {
    case 0:
      return '0';
    case 1:
      return '15';
    case 2:
      return '30';
    case 3:
      return '40';
    case 4:
      return 'AD';
    default:
      return 'GAME';
  }
}

/**
 * Clamp helper
 */
export function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val));
}

/**
 * Speed conversion helper for serve radar
 */
export function kmhToMph(kmh: number): number {
  return Math.round(kmh * 0.621371);
}
