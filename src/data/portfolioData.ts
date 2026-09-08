import { PokeBallType } from '@/components/PokeBallSprite';

export interface StarterProject {
  id: string;
  title: string;
  ballType: PokeBallType;
  typeBadge: 'Electric' | 'Water' | 'Grass' | 'Fire' | 'Psychic';
  summary: string;
  techStack: string[];
  demoUrl: string;
  repoUrl: string;
  stats: {
    hp: number; // Reliability / Uptime
    attack: number; // Performance / Speed
    defense: number; // Security / Tests
    speed: number; // DX / Latency
  };
  level: number;
  category: string;
  boxCategory: 'Production' | 'Open Source' | 'Lab Experiments';
  flavorText: string;
  keyFeatures: string[];
}

export const STARTER_PROJECTS: StarterProject[] = [
  {
    id: 'voltsync-ai',
    title: 'VoltSync AI Engine',
    ballType: 'ultraball',
    typeBadge: 'Electric',
    summary: 'High-throughput LLM streaming gateway with sub-50ms token routing and real-time agent orchestration.',
    techStack: ['Next.js 15', 'TypeScript', 'Rust', 'WebSockets', 'TailwindCSS'],
    demoUrl: 'https://github.com',
    repoUrl: 'https://github.com',
    stats: {
      hp: 98,
      attack: 95,
      defense: 90,
      speed: 99,
    },
    level: 75,
    category: 'AI / Streaming',
    boxCategory: 'Production',
    flavorText: 'Harnesses high-voltage token streaming to charge agentic workflows with lightning response times.',
    keyFeatures: [
      'Sub-50ms real-time semantic caching layer',
      'Multi-model fallback & intelligent load balancing',
      'Wasm-accelerated token streaming parser',
    ],
  },
  {
    id: 'hydroflow-db',
    title: 'HydroFlow Cache & DB',
    ballType: 'diveball',
    typeBadge: 'Water',
    summary: 'Distributed fluid state sync engine enabling multi-region edge hydration and optimistic offline replication.',
    techStack: ['TypeScript', 'Node.js', 'PostgreSQL', 'Redis', 'Docker'],
    demoUrl: 'https://github.com',
    repoUrl: 'https://github.com',
    stats: {
      hp: 94,
      attack: 88,
      defense: 96,
      speed: 85,
    },
    level: 68,
    category: 'Database / Cache',
    boxCategory: 'Production',
    flavorText: 'Flows like water through serverless edges, keeping distributed databases in immaculate harmony.',
    keyFeatures: [
      'CRDT-backed conflict-free optimistic mutations',
      'Global geo-distributed edge replication',
      'Zero-downtime automated schema migrations',
    ],
  },
  {
    id: 'chlorophyll-ui',
    title: 'Chlorophyll Design System',
    ballType: 'pokeball',
    typeBadge: 'Grass',
    summary: 'Accessible, component-first headless UI library with solar-adaptive theming and micro-interaction primitives.',
    techStack: ['React 19', 'Radix UI', 'CSS Modules', 'Storybook', 'Framer Motion'],
    demoUrl: 'https://github.com',
    repoUrl: 'https://github.com',
    stats: {
      hp: 92,
      attack: 84,
      defense: 94,
      speed: 91,
    },
    level: 60,
    category: 'Design System',
    boxCategory: 'Open Source',
    flavorText: 'Sprouts pixel-perfect, accessible component trees with lush aesthetic polish and effortless theme roots.',
    keyFeatures: [
      '100% WCAG AAA accessible keyboard navigation',
      'Polymorphic component props with zero runtime bloat',
      'Built-in retro 8-bit and modern glassmorphism presets',
    ],
  },
  {
    id: 'pyreclaw-auth',
    title: 'PyreClaw Zero-Trust Auth',
    ballType: 'luxuryball',
    typeBadge: 'Fire',
    summary: 'Blazing fast biometric WebAuthn & passkey authentication service with automated threat anomaly detection.',
    techStack: ['Go', 'Next.js', 'WebAuthn', 'JWT', 'Postgres'],
    demoUrl: 'https://github.com',
    repoUrl: 'https://github.com',
    stats: {
      hp: 90,
      attack: 96,
      defense: 95,
      speed: 93,
    },
    level: 64,
    category: 'Security / Auth',
    boxCategory: 'Open Source',
    flavorText: 'Burns through security vulnerabilities with relentless passkey encryption and biometric shields.',
    keyFeatures: [
      'Passwordless FIDO2 / WebAuthn standard compliance',
      'ML-driven brute force and credential stuffing firewall',
      'Instant OAuth2 / OIDC token issuance in under 12ms',
    ],
  },
  {
    id: 'mindsync-protocol',
    title: 'MindSync Web3 State Mesh',
    ballType: 'masterball',
    typeBadge: 'Psychic',
    summary: 'Decentralized peer-to-peer cognitive knowledge mesh enabling private local-first agent memory exchange.',
    techStack: ['Solidity', 'TypeScript', 'IPFS', 'Next.js', 'Ethers.js'],
    demoUrl: 'https://github.com',
    repoUrl: 'https://github.com',
    stats: {
      hp: 99,
      attack: 98,
      defense: 92,
      speed: 97,
    },
    level: 88,
    category: 'Web3 / P2P',
    boxCategory: 'Lab Experiments',
    flavorText: 'Telepathically networks decentralized memories into an immutable, verifiable knowledge crystal.',
    keyFeatures: [
      'Zero-knowledge proof validation of agent memory logs',
      'Encrypted decentralized IPFS storage layer',
      'Smart contract governed collective intelligence mesh',
    ],
  },
];

// Additional projects for Bill's PC box storage system
export const PC_BOX_PROJECTS: StarterProject[] = [
  ...STARTER_PROJECTS,
  {
    id: 'pixeldex-cli',
    title: 'PixelDex Terminal CLI',
    ballType: 'quickball',
    typeBadge: 'Electric',
    summary: 'Command-line Pokédex with ASCII art animations, move lookup, and developer stat comparison.',
    techStack: ['Node.js', 'Ink', 'Chalk', 'TypeScript'],
    demoUrl: 'https://github.com',
    repoUrl: 'https://github.com',
    stats: { hp: 80, attack: 85, defense: 80, speed: 90 },
    level: 45,
    category: 'CLI Tool',
    boxCategory: 'Lab Experiments',
    flavorText: 'A snappy terminal companion for inspecting dev tools in raw pixel ASCII.',
    keyFeatures: ['Interactive arrow-key navigation', 'Offline caching of 1000+ entries', 'Custom color theme exports'],
  },
  {
    id: 'kanto-cloud-monitor',
    title: 'Kanto Cloud Sentry',
    ballType: 'duskball',
    typeBadge: 'Water',
    summary: 'Real-time infrastructure health monitoring dashboard with live uptime metrics and webhook alerts.',
    techStack: ['React', 'Go', 'Prometheus', 'Grafana', 'TailwindCSS'],
    demoUrl: 'https://github.com',
    repoUrl: 'https://github.com',
    stats: { hp: 95, attack: 80, defense: 95, speed: 82 },
    level: 58,
    category: 'DevOps / SRE',
    boxCategory: 'Production',
    flavorText: 'Surveys cloud clusters like a Gyarados guarding the sea, warning of traffic spikes.',
    keyFeatures: ['Sub-second latency alerting', 'Interactive node topology maps', 'Slack and Discord webhook dispatches'],
  },
  {
    id: 'amber-compiler',
    title: 'Amber Bytecode VM',
    ballType: 'premierball',
    typeBadge: 'Fire',
    summary: 'Toy stack-based virtual machine and AST parser written to explore low-level compiler optimization.',
    techStack: ['C++', 'LLVM', 'CMake', 'Assembly'],
    demoUrl: 'https://github.com',
    repoUrl: 'https://github.com',
    stats: { hp: 86, attack: 92, defense: 88, speed: 94 },
    level: 52,
    category: 'Compilers',
    boxCategory: 'Lab Experiments',
    flavorText: 'A high-heat experimental JIT bytecode runtime engineered from raw silicon up.',
    keyFeatures: ['Custom register allocator', 'Garbage collection mark-and-sweep', 'Direct C++ FFI interop'],
  },
];

export interface DeveloperProfile {
  name: string;
  title: string;
  trainerClass: string;
  location: string;
  status: string;
  badgesEarned: number;
  totalBadges: number;
  dialogueIntro: string;
  dialogueHoverDefault: string;
  resumeUrl: string;
  githubUrl: string;
  linkedinUrl: string;
  email: string;
  stats: {
    frontend: number;
    backend: number;
    systemDesign: number;
    devops: number;
    uiux: number;
  };
}

export const DEVELOPER_PROFILE: DeveloperProfile = {
  name: 'ARYAN GUPTA',
  title: 'Lead Full-Stack & Systems Engineer',
  trainerClass: 'POKÉMON RESEARCH ENGINEER',
  location: 'PALLET TOWN / REMOTE',
  status: 'READY FOR NEW BATTLES & ROLES',
  badgesEarned: 8,
  totalBadges: 8,
  dialogueIntro: 'WELCOME TO MY RESEARCH LAB! Hover over any Pokéball on the Starter Machine to inspect my battle-tested projects, or click to open the Pokédex Inspector.',
  dialogueHoverDefault: 'Choose a Starter Pokéball to examine its technical specifications and codebase!',
  resumeUrl: '#',
  githubUrl: 'https://github.com',
  linkedinUrl: 'https://linkedin.com',
  email: 'trainer@oaklab.dev',
  stats: {
    frontend: 96,
    backend: 94,
    systemDesign: 90,
    devops: 86,
    uiux: 92,
  },
};
