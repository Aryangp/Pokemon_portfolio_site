import { PokeBallType } from '@/components/PokeBallSprite';
import { normalizePortfolioData, RawPortfolioItem } from '@/lib/portfolioAdapter';

export interface StarterProject {
  id: string;
  title: string;
  ballType: PokeBallType;
  typeBadge: 'Electric' | 'Water' | 'Grass' | 'Fire' | 'Psychic';
  summary: string;
  techStack: string[];
  demoUrl: string;
  repoUrl: string;
  coverImage?: string;
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

/**
 * Raw Portfolio JSON from Aryan's Portfolio Database / API
 * Plug-and-play format: replace or fetch this array from any external API endpoint!
 */
export const RAW_PORTFOLIO_DATA: RawPortfolioItem[] = [
  {
    cover: '/portfolio/img/vgm4esdw.bmp',
    title: 'gpzer my own programing language',
    description: 'Python, OOPs, Interpreter Design, Lexer, AST Parser',
    url: 'https://github.com/Aryangp/Aryan-test-framework',
    repoUrl: 'https://github.com/Aryangp/Aryan-test-framework',
    category: 'Compilers / Languages',
    boxCategory: 'Lab Experiments',
  },
  {
    cover: '/portfolio/img/ai-project.png',
    title: 'NLP Catalog Indexing Engine',
    description: 'Python, FastAPI, Postgres, Weaviate, VectorDB, ML, Next.js',
    url: 'https://github.com/Aryangp',
    repoUrl: 'https://github.com/Aryangp',
    category: 'AI / Vector Search',
    boxCategory: 'Production',
  },
  {
    cover: '/portfolio/img/u2skgisz.bmp',
    title: 'aryan test framework',
    description: 'Javascript, Jest ',
    url: 'https://github.com/Aryangp/gpzer_my_own_programing_language',
    repoUrl: 'https://github.com/Aryangp/gpzer_my_own_programing_language',
    category: 'Developer Tools / Testing',
    boxCategory: 'Open Source',
  },
  {
    cover: '/portfolio/img/img2.png',
    title: 'E-commerse',
    description: 'React,commerse.js,Stripe,Jsx',
    url: 'http://aryan-gupta-ecommerce.netlify.app/',
    repoUrl: 'https://github.com/Aryangp',
    category: 'E-Commerce / Full-Stack',
    boxCategory: 'Production',
  },
  {
    cover: '/portfolio/img/img1.png',
    title: 'Dance website',
    description: 'Nodejs ,pug ,expressjs ,javascript',
    url: 'http://aryan-gupta-ecommerce.netlify.app/',
    repoUrl: 'https://github.com/Aryangp',
    category: 'Full-Stack Web',
    boxCategory: 'Production',
  },
  {
    cover: '/portfolio/img/ai-project.png',
    title: 'Face mood Recognition',
    description: 'AI library,javascript',
    url: 'https://chic-salmiakki-c9d800.netlify.app/',
    repoUrl: 'https://github.com/Aryangp',
    category: 'AI / Computer Vision',
    boxCategory: 'Lab Experiments',
  },
  {
    cover: '/portfolio/img/spotify-clone2.png',
    title: 'spotify Clone',
    description: 'Html,css,javascript',
    url: 'https://laughing-williams-f7e70f.netlify.app/',
    repoUrl: 'https://github.com/Aryangp',
    category: 'Frontend / Media',
    boxCategory: 'Production',
  },
  {
    cover: '/portfolio/img/netflix-clone.png',
    title: 'Ethflix Clone',
    description: 'React ,firebase, api,Material ui ,javascript,solidity',
    url: 'https://github.com/Aryangp/netflix-clone-aryan',
    repoUrl: 'https://github.com/Aryangp/netflix-clone-aryan',
    category: 'Web3 / Full-Stack',
    boxCategory: 'Production',
  },
];

/**
 * Normalized Starter Projects mapped with Pokémon typing, stats, and Pokédex data
 */
export const STARTER_PROJECTS: StarterProject[] = normalizePortfolioData(RAW_PORTFOLIO_DATA);

/**
 * Bill's PC Box Storage (organizes all projects across boxes)
 */
export const PC_BOX_PROJECTS: StarterProject[] = [...STARTER_PROJECTS];

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
  name: 'PROF. ARYAN GUPTA',
  title: 'Lead Full-Stack & Systems Engineer',
  trainerClass: 'POKÉMON RESEARCH ENGINEER & PROFESSOR',
  location: 'PALLET TOWN / REMOTE',
  status: 'READY FOR NEW BATTLES & ROLES',
  badgesEarned: 8,
  totalBadges: 8,
  dialogueIntro: 'WELCOME TO PROF. ARYAN LABS! Hover over any Pokéball on the Starter Machine to inspect my battle-tested projects, or click to open the Pokédex Inspector.',
  dialogueHoverDefault: 'Choose a Starter Pokéball to examine its technical specifications and codebase!',
  resumeUrl: '#',
  githubUrl: 'https://github.com/Aryangp',
  linkedinUrl: 'https://linkedin.com',
  email: 'aryan@aryanlabs.dev',
  stats: {
    frontend: 96,
    backend: 94,
    systemDesign: 90,
    devops: 86,
    uiux: 92,
  },
};
