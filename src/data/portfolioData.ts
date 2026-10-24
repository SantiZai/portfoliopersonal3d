export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  metrics: string;
  liveUrl?: string;
  githubUrl?: string;
  iconName: string;
}

export interface TrophyShopItem {
  id: string;
  name: string;
  category: string;
  rarity: 'LEGENDARY CHAMPION' | 'GRAND SLAM MASTER' | 'INNOVATION MVP' | 'HALL OF FAME';
  souvenirType: 'Copa de Oro' | 'Raqueta Edición Especial' | 'Prisma de Cristal' | 'Servidor de Titanio' | 'Pelota Dorada';
  badge: string;
  priceTag: string;
  metrics: string;
  description: string;
  projectRef: ProjectItem;
  specs: { label: string; value: string }[];
  accentColor: string;
}

export interface SkillCategory {
  title: string;
  role: string;
  skills: { name: string; level: number; note: string }[];
}

export interface ExperienceItem {
  year: string;
  role: string;
  tournament: string;
  highlight: string;
  deliverables: string[];
}

export const PORTFOLIO_DATA = {
  personal: {
    name: 'Santiago Zaidan',
    title: 'Creative Full Stack & 3D Web Engineer',
    motto: 'Convirtiendo ideas complejas en experiencias web 3D de precisión milimétrica.',
    location: 'Buenos Aires, Argentina (Disponible Remoto Mundial)',
    email: 'santyagozaidan@gmail.com',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    status: 'Disponible para Proyectos & Desafíos de Alto Rendimiento',
    matchStats: {
      projectsShipped: 48,
      unforcedErrors: '< 0.01%',
      firstServeSpeed: '218 km/h',
      winRate: '99.4%',
      ralliesCompleted: '1,200+ commits',
    },
  },

  about: {
    headline: 'Estrategia, Precisión y Rendimiento en Cada Línea de Código',
    paragraph1:
      'Al igual que en el tenis profesional de alto rendimiento, el desarrollo de software moderno requiere anticipación, juego de pies limpio, lectura rápida del contexto y una ejecución impecable bajo presión.',
    paragraph2:
      'Especializado en interfaces interactivas 3D con Three.js, WebGL y shaders GLSL, combinados con arquitecturas de backend sólidas en Node.js, Express y bases de datos escalables. Enfocado en experiencias hiper-fluidas a 60fps con cero jank y accesibilidad.',
    values: [
      {
        title: 'Precisión Milimétrica',
        desc: 'Atención fanática a los detalles visuales, física fluida y microinteracciones de alto impacto.',
      },
      {
        title: 'Velocidad & Rendimiento',
        desc: 'Optimización exhaustiva de draw calls, shaders, carga diferida y Web Workers.',
      },
      {
        title: 'Mentalidad de Torneo',
        desc: 'Constancia, resiliencia y entrega puntual de software probado en producción.',
      },
    ],
  },

  projects: [
    {
      id: 'proj-1',
      title: 'Grand Slam 3D Experience',
      category: 'WebGL & Creative Frontend',
      description:
        'Showroom espacial inmersivo para marcas deportivas con simulación física de tela, iluminación dinámica por estudio y renderizado PBR en tiempo real a 60 FPS.',
      tags: ['Three.js', 'React', 'TypeScript', 'GLSL', 'Tailwind'],
      metrics: '+185% Tiempo de retención de usuario',
      iconName: 'Trophy',
    },
    {
      id: 'proj-2',
      title: 'AceMetrics Real-Time Dashboard',
      category: 'Sports Analytics & Data Viz',
      description:
        'Plataforma analítica con streaming en tiempo real vía WebSockets, gráficos interactivos con aceleración por GPU y visualización de mapas de calor tácticos.',
      tags: ['React 19', 'WebSockets', 'Canvas API', 'Node.js', 'PostgreSQL'],
      metrics: 'Procesamiento de >50.000 eventos/seg a <16ms',
      iconName: 'Activity',
    },
    {
      id: 'proj-3',
      title: 'MatchPoint Distributed Engine',
      category: 'Cloud Architecture & Backend',
      description:
        'Arquitectura de microservicios resiliente en la nube con balanceo de carga automático, cachés distribuidas Redis y sincronización multi-región.',
      tags: ['Node.js', 'Docker', 'Express', 'Redis', 'Cloud Run'],
      metrics: '99.99% Uptime garantizado en eventos masivos',
      iconName: 'Server',
    },
    {
      id: 'proj-4',
      title: 'HawkEye Web Ball Tracking',
      category: 'Physics & Computer Vision',
      description:
        'Motor de simulación balística en el navegador que reconstruye trayectorias 3D con detección de impacto milimétrico en líneas de fondo.',
      tags: ['Three.js', 'Web Workers', 'Math3D', 'Vite'],
      metrics: 'Error medio de predicción < 2.3 mm',
      iconName: 'Crosshair',
    },
  ] as ProjectItem[],

  trophyShop: [
    {
      id: 'trophy-1',
      name: 'Copa Grand Slam 3D (Gold Edition)',
      category: 'Inmersión WebGL & PBR',
      rarity: 'LEGENDARY CHAMPION',
      souvenirType: 'Copa de Oro',
      badge: '★ TROFEO DE ORO',
      priceTag: 'Showroom 3D en Vivo',
      metrics: '+185% Engagement de Usuarios',
      description:
        'Máximo galardón del estadio. Simulación de showroom espacial interactivo con iluminación multicapa tipo estudio, física de telas en tiempo real y shaders GLSL personalizados.',
      projectRef: {
        id: 'proj-1',
        title: 'Grand Slam 3D Experience',
        category: 'WebGL & Creative Frontend',
        description:
          'Showroom espacial inmersivo para marcas deportivas con simulación física de tela, iluminación dinámica por estudio y renderizado PBR en tiempo real a 60 FPS.',
        tags: ['Three.js', 'React', 'TypeScript', 'GLSL', 'Tailwind'],
        metrics: '+185% Tiempo de retención de usuario',
        iconName: 'Trophy',
      },
      specs: [
        { label: 'Render Target', value: 'WebGL2 / 60 FPS' },
        { label: 'Iluminación', value: 'PMREM RoomEnvironment' },
        { label: 'Draw Calls', value: '< 24 optimizados' },
      ],
      accentColor: '#f59e0b',
    },
    {
      id: 'trophy-2',
      name: 'Raqueta de Grafito HawkEye Tracking',
      category: 'Física Matemática & Web Workers',
      rarity: 'GRAND SLAM MASTER',
      souvenirType: 'Raqueta Edición Especial',
      badge: 'PRECISIÓN < 2.3 MM',
      priceTag: 'Motor Balístico Web',
      metrics: 'Error < 2.3mm en Línea de Fondo',
      description:
        'Raqueta de torneo forjada en fibra de carbono. Integra motor matemático desacoplado de trayectorias con predicción en Web Worker y detección de botes con precisión milimétrica.',
      projectRef: {
        id: 'proj-4',
        title: 'HawkEye Web Ball Tracking',
        category: 'Physics & Computer Vision',
        description:
          'Motor de simulación balística en el navegador que reconstruye trayectorias 3D con detección de impacto milimétrico en líneas de fondo.',
        tags: ['Three.js', 'Web Workers', 'Math3D', 'Vite'],
        metrics: 'Error medio de predicción < 2.3 mm',
        iconName: 'Crosshair',
      },
      specs: [
        { label: 'Frecuencia de Muestreo', value: '120 Hz interpolados' },
        { label: 'Worker Threading', value: 'OffscreenCanvas' },
        { label: 'Test Coverage', value: '100% Determinista' },
      ],
      accentColor: '#a855f7',
    },
    {
      id: 'trophy-3',
      name: 'Prisma de Cristal AceMetrics Analytics',
      category: 'Real-Time Streaming & WebSockets',
      rarity: 'INNOVATION MVP',
      souvenirType: 'Prisma de Cristal',
      badge: '>50.000 EVT/SEG',
      priceTag: 'Dashboard Analítico',
      metrics: 'Latencia de Frame < 16ms',
      description:
        'Elegante prisma de cristal óptico. Plataforma analítica deportiva con ingesta de telemetría a alta velocidad, visualizaciones de dispersión táctica y mapas de calor acelerados por GPU.',
      projectRef: {
        id: 'proj-2',
        title: 'AceMetrics Real-Time Dashboard',
        category: 'Sports Analytics & Data Viz',
        description:
          'Plataforma analítica con streaming en tiempo real vía WebSockets, gráficos interactivos con aceleración por GPU y visualización de mapas de calor tácticos.',
        tags: ['React 19', 'WebSockets', 'Canvas API', 'Node.js', 'PostgreSQL'],
        metrics: 'Procesamiento de >50.000 eventos/seg a <16ms',
        iconName: 'Activity',
      },
      specs: [
        { label: 'Conexión en Vivo', value: 'WebSockets Bidireccionales' },
        { label: 'Throughput', value: '50k eventos/segundo' },
        { label: 'Base de Datos', value: 'PostgreSQL Relacional' },
      ],
      accentColor: '#38bdf8',
    },
    {
      id: 'trophy-4',
      name: 'Servidor Titanio MatchPoint Cloud',
      category: 'Infraestructura & Microservicios',
      rarity: 'HALL OF FAME',
      souvenirType: 'Servidor de Titanio',
      badge: '99.99% UPTIME',
      priceTag: 'Cloud Engine Resiliente',
      metrics: 'Zero Downtime en Eventos Pico',
      description:
        'Módulo conmemorativo de servidor en titanio pulido. Representa la arquitectura distribuida con balanceo elástico en Google Cloud Run, clúster Redis distribuido y microservicios Express.',
      projectRef: {
        id: 'proj-3',
        title: 'MatchPoint Distributed Engine',
        category: 'Cloud Architecture & Backend',
        description:
          'Arquitectura de microservicios resiliente en la nube con balanceo de carga automático, cachés distribuidas Redis y sincronización multi-región.',
        tags: ['Node.js', 'Docker', 'Express', 'Redis', 'Cloud Run'],
        metrics: '99.99% Uptime garantizado en eventos masivos',
        iconName: 'Server',
      },
      specs: [
        { label: 'Disponibilidad', value: '99.99% SLA' },
        { label: 'Caché Global', value: 'Redis In-Memory' },
        { label: 'Contenedores', value: 'Docker en Cloud Run' },
      ],
      accentColor: '#10b981',
    },
  ] as TrophyShopItem[],

  skillCategories: [
    {
      title: 'Forehand (Frontend 3D & UI)',
      role: 'Impacto visual, shaders e interacción',
      skills: [
        { name: 'Three.js / WebGL / Shaders', level: 95, note: 'PBR, Buffers, PMREM' },
        { name: 'React 19 & TypeScript', level: 98, note: 'Arquitectura modular, Hooks' },
        { name: 'Tailwind CSS v4 & Motion', level: 94, note: 'Diseño responsive de precisión' },
        { name: 'Astro & Vite Tooling', level: 92, note: 'Bundling optimizado, SSG/SSR' },
      ],
    },
    {
      title: 'Backhand (Backend & Cloud)',
      role: 'Solidez, APIs y persistencia',
      skills: [
        { name: 'Node.js & Express', level: 94, note: 'Microservicios de alto throughput' },
        { name: 'PostgreSQL & Cloud SQL', level: 90, note: 'Modelado relacional y queries' },
        { name: 'REST & WebSockets en Vivo', level: 92, note: 'Baja latencia en tiempo real' },
        { name: 'Docker & Google Cloud Run', level: 88, note: 'Contenedores y despliegues' },
      ],
    },
    {
      title: 'Footwork & Tactics (Quality & Speed)',
      role: 'Rendimiento, testing y colaboración',
      skills: [
        { name: 'Optimizaciones de GPU & FPS', level: 96, note: 'InstancedMesh, zero GC loops' },
        { name: 'Testing Automatizado (Node Test)', level: 90, note: 'TDD, lógica pura desacoplada' },
        { name: 'Web Audio API Síntesis', level: 89, note: 'Audio procedimental dinámico' },
        { name: 'Git & Agile Sprint Delivery', level: 95, note: 'CI/CD, code reviews y ritmo' },
      ],
    },
  ] as SkillCategory[],

  experience: [
    {
      year: '2023 - Presente',
      role: 'Senior 3D & Creative Full Stack Engineer',
      tournament: 'Grand Slam Digital Tech Lab',
      highlight:
        'Liderando la arquitectura de interfaces 3D WebGL inmersivas y microservicios escalables para marcas internacionales.',
      deliverables: [
        'Desarrollo de shaders procedurales y sistemas de cámara cinemática a 60fps.',
        'Reducción del 45% en tiempos de renderizado inicial mediante optimizaciones de WebGL.',
        'Mentoreo técnico y estandarización de pipelines en TypeScript y React.',
      ],
    },
    {
      year: '2021 - 2023',
      role: 'Full Stack Web Developer',
      tournament: 'CourtTech Solutions',
      highlight:
        'Diseño y construcción de plataformas analíticas en tiempo real con WebSockets, dashboards y visualizaciones complejas.',
      deliverables: [
        'Construcción de APIs distribuidas de alta concurrencia en Node.js.',
        'Implementación de autenticación segura, control de roles y pipelines de CI/CD.',
        'Integración de interfaces accesibles e interactivas con Tailwind y Canvas.',
      ],
    },
    {
      year: '2019 - 2021',
      role: 'Frontend & Interactive Specialist',
      tournament: 'Volley Creative Studio',
      highlight:
        'Creación de landing pages galardonadas, micro-sitios interactivos y prototipos rápidos de alto impacto visual.',
      deliverables: [
        'Animaciones fluidas con SVG, Canvas y bibliotecas de física livianas.',
        'Desarrollo responsive mobile-first y optimización Core Web Vitals.',
      ],
    },
  ] as ExperienceItem[],
};
