import { StarterProject } from '@/data/portfolioData';
import { PokeBallType } from '@/components/PokeBallSprite';

export interface RawPortfolioItem {
  cover: string;
  title: string;
  description: string;
  url: string;
  repoUrl?: string;
  category?: string;
  boxCategory?: 'Production' | 'Open Source' | 'Lab Experiments';
}

export interface RawPortfolioResponse {
  portfolio: RawPortfolioItem[];
}

/**
 * Parses technology keywords from a description string
 */
export function parseTechStack(description: string, title: string): string[] {
  const normalized = `${description} ${title}`.toLowerCase();
  const foundTech: string[] = [];

  const techRules: { [name: string]: RegExp } = {
    'Python': /\bpython\b/i,
    'JavaScript': /\b(javascript|js|jsx)\b/i,
    'TypeScript': /\b(typescript|ts|tsx)\b/i,
    'React': /\breact\b/i,
    'Next.js': /\bnext(\.js)?\b/i,
    'Node.js': /\bnode(\.js)?\b/i,
    'Express.js': /\bexpress(\.js)?\b/i,
    'Pug': /\bpug\b/i,
    'Jest': /\bjest\b/i,
    'Stripe': /\bstripe\b/i,
    'Commerce.js': /\bcommerce(\.js)?\b/i,
    'Solidity': /\bsolidity\b/i,
    'Firebase': /\bfirebase\b/i,
    'Material UI': /\b(material[\s-]?ui|mui)\b/i,
    'AI / Face-API': /\b(ai|face-api|neural|vision)\b/i,
    'Computer Vision': /\b(mood|face|recognition|vision)\b/i,
    'HTML5': /\bhtml(5)?\b/i,
    'CSS3': /\bcss(3)?\b/i,
    'TailwindCSS': /\btailwind(css)?\b/i,
    'Web Audio API': /\b(audio|spotify|player|music)\b/i,
    'Lexer & AST Parser': /\b(language|compiler|lexer|ast|parser|programing)\b/i,
    'Unit Testing': /\b(test|testing|framework|assert)\b/i,
  };

  for (const [techName, regex] of Object.entries(techRules)) {
    if (regex.test(normalized)) {
      foundTech.push(techName);
    }
  }

  // Fallback if description is comma-separated string
  if (foundTech.length === 0 && description) {
    return description.split(',').map((s) => s.trim()).filter(Boolean);
  }

  // If user included custom comma-separated items, combine them
  const rawParts = description.split(',').map((s) => s.trim()).filter(Boolean);
  rawParts.forEach((part) => {
    if (!foundTech.some((t) => t.toLowerCase() === part.toLowerCase()) && part.length > 1) {
      foundTech.push(part);
    }
  });

  return foundTech.length > 0 ? foundTech : ['JavaScript', 'Modern Web'];
}

/**
 * Intelligently maps an item to an elemental Pokémon type badge
 */
export function determineElementalType(
  title: string,
  description: string
): 'Electric' | 'Water' | 'Grass' | 'Fire' | 'Psychic' {
  const text = `${title} ${description}`.toLowerCase();

  if (text.includes('python') || text.includes('compiler') || text.includes('language') || text.includes('dance') || text.includes('netflix') || text.includes('ethflix')) {
    return 'Fire';
  }
  if (text.includes('commerce') || text.includes('e-commerse') || text.includes('stripe') || text.includes('database') || text.includes('node')) {
    return 'Water';
  }
  if (text.includes('spotify') || text.includes('music') || text.includes('design') || text.includes('ui') || text.includes('css')) {
    return 'Grass';
  }
  if (text.includes('test') || text.includes('framework') || text.includes('jest') || text.includes('cli') || text.includes('fast')) {
    return 'Electric';
  }
  if (text.includes('ai') || text.includes('face') || text.includes('mood') || text.includes('recognition') || text.includes('solidity') || text.includes('web3')) {
    return 'Psychic';
  }

  return 'Electric';
}

/**
 * Assigns an authentic Pokéball style based on elemental typing and category
 */
export function determineBallType(
  typeBadge: 'Electric' | 'Water' | 'Grass' | 'Fire' | 'Psychic',
  index: number
): PokeBallType {
  const ballMap: { [key: string]: PokeBallType[] } = {
    Electric: ['ultraball', 'quickball', 'safariball'],
    Water: ['diveball', 'greatball', 'netball'],
    Grass: ['pokeball', 'cherishball', 'healball'],
    Fire: ['luxuryball', 'premierball', 'cherishball'],
    Psychic: ['masterball', 'duskball', 'heavyball'],
  };

  const options = ballMap[typeBadge] || ['pokeball'];
  return options[index % options.length];
}

/**
 * Generates an SEO & display friendly project ID
 */
export function generateProjectId(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Cleans up and capitalizes project titles nicely
 */
export function cleanProjectTitle(title: string): string {
  const titleMap: { [key: string]: string } = {
    'gpzer my own programing language': 'GPZer Programming Language',
    'aryan test framework': 'Aryan Test Framework',
    'e-commerse': 'E-Commerce Platform',
    'dance website': 'Dance Studio Academy',
    'face mood recognition': 'Face Mood Recognition AI',
    'spotify clone': 'Spotify Music Player Clone',
    'ethflix clone': 'Ethflix Web3 Streaming Clone',
  };

  const key = title.trim().toLowerCase();
  if (titleMap[key]) return titleMap[key];

  return title
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

/**
 * Generates rich flavor text in the classic Pokédex style
 */
export function generateFlavorText(title: string, description: string, typeBadge: string): string {
  const text = `${title} ${description}`.toLowerCase();

  if (text.includes('gpzer') || text.includes('programing language')) {
    return 'Forges custom language syntax in raw Python, compiling bespoke statements, AST nodes, and runtime environments with high precision.';
  }
  if (text.includes('test framework') || text.includes('jest')) {
    return 'Zaps through JavaScript test suites with lightning-fast assertions, providing automated unit test execution and colored terminal diagnostics.';
  }
  if (text.includes('e-commerse') || text.includes('commerce') || text.includes('stripe')) {
    return 'Flows frictionless transactions through modern Stripe payment gateways and headless Commerce.js architecture with instant cart state sync.';
  }
  if (text.includes('dance')) {
    return 'Ignites user engagement with vibrant choreography showcases, class schedules, and dynamic server-rendered Pug templates powered by Express.';
  }
  if (text.includes('face') || text.includes('mood') || text.includes('ai')) {
    return 'Telepathically analyzes emotional expressions in real time through the browser webcam using neural network face landmark tracking.';
  }
  if (text.includes('spotify')) {
    return 'Harmonizes pixel-perfect Spotify UI aesthetics with seamless audio playback, track scrubbers, and responsive playlist navigation.';
  }
  if (text.includes('ethflix') || text.includes('netflix') || text.includes('solidity')) {
    return 'Streams blockbuster cinema trailers with Firebase authentication, TMDB movie catalog APIs, and Solidity smart contract memberships.';
  }

  return `A high-performance ${typeBadge}-type production architecture engineered with modern web standards and battle-tested reliability.`;
}

/**
 * Generates 3 key bullet points for the Pokédex summary
 */
export function generateKeyFeatures(title: string, description: string): string[] {
  const text = `${title} ${description}`.toLowerCase();

  if (text.includes('gpzer') || text.includes('programing language')) {
    return [
      'Custom recursive-descent lexer and AST parser in Python',
      'Dynamic variable scoping, conditional branches & loop execution',
      'Custom error reporting and interactive runtime CLI REPL',
    ];
  }
  if (text.includes('test framework') || text.includes('jest')) {
    return [
      'Lightweight assertion matcher library and test runner CLI',
      'Detailed color-coded diff output for failed assertions',
      'Zero-configuration execution lifecycle with test suite summary',
    ];
  }
  if (text.includes('e-commerse') || text.includes('commerce')) {
    return [
      'Headless product catalog integration via Commerce.js API',
      'Secure end-to-end Stripe payment processing & checkout',
      'Interactive cart drawer with optimistic quantity updates',
    ];
  }
  if (text.includes('dance')) {
    return [
      'Server-side rendered dynamic layouts with Pug and Express.js',
      'Interactive dance class schedules and booking inquiry forms',
      'Responsive gallery with custom typography and CSS animations',
    ];
  }
  if (text.includes('face') || text.includes('mood') || text.includes('ai')) {
    return [
      'Real-time webcam stream face tracking & landmark detection',
      'Live emotion classification (Happy, Surprised, Neutral, etc.)',
      'Client-side neural model inference with zero backend latency',
    ];
  }
  if (text.includes('spotify')) {
    return [
      'Custom Web Audio player with play, pause, seek & volume controls',
      'Dynamic playlist management and track metadata rendering',
      'Sleek dark-mode glassmorphic interface with fluid responsiveness',
    ];
  }
  if (text.includes('ethflix') || text.includes('netflix')) {
    return [
      'Dynamic movie catalog feeds powered by the TMDB REST API',
      'Firebase user authentication and persistent user watchlists',
      'Decentralized Web3 smart contract integration with Solidity',
    ];
  }

  return [
    'Clean, modular component architecture with modern standards',
    'Responsive design optimized for both mobile and desktop',
    'Optimized performance with sub-second response times',
  ];
}

/**
 * Normalizes a single raw portfolio item into a complete StarterProject
 */
export function normalizePortfolioItem(
  raw: RawPortfolioItem,
  index: number
): StarterProject {
  const title = cleanProjectTitle(raw.title);
  const id = generateProjectId(raw.title);
  const typeBadge = determineElementalType(raw.title, raw.description);
  const ballType = determineBallType(typeBadge, index);
  const techStack = parseTechStack(raw.description, raw.title);
  const flavorText = generateFlavorText(raw.title, raw.description, typeBadge);
  const keyFeatures = generateKeyFeatures(raw.title, raw.description);

  // Category determination
  let category = raw.category;
  if (!category) {
    const text = `${raw.title} ${raw.description}`.toLowerCase();
    if (text.includes('language') || text.includes('compiler')) category = 'Compilers / Languages';
    else if (text.includes('test')) category = 'Dev Tools / Testing';
    else if (text.includes('commerce') || text.includes('e-commerse')) category = 'E-Commerce / Full-Stack';
    else if (text.includes('dance')) category = 'Full-Stack Web';
    else if (text.includes('ai') || text.includes('face') || text.includes('mood')) category = 'AI / Computer Vision';
    else if (text.includes('spotify')) category = 'Frontend / Media';
    else if (text.includes('ethflix') || text.includes('netflix') || text.includes('solidity')) category = 'Web3 / Full-Stack';
    else category = 'Web Application';
  }

  // Box Category
  let boxCategory = raw.boxCategory;
  if (!boxCategory) {
    const text = `${raw.title} ${raw.description}`.toLowerCase();
    if (text.includes('ai') || text.includes('language')) boxCategory = 'Lab Experiments';
    else if (text.includes('test') || text.includes('solidity')) boxCategory = 'Open Source';
    else boxCategory = 'Production';
  }

  // Base level and stats
  const level = 60 + ((index * 5) % 30);
  const hp = 90 + ((index * 2) % 10);
  const attack = 88 + ((index * 3) % 12);
  const defense = 91 + ((index * 2) % 8);
  const speed = 89 + ((index * 4) % 11);

  // URLs
  const demoUrl = raw.url || 'https://github.com/Aryangp';
  const repoUrl = raw.repoUrl || (raw.url.includes('github.com') ? raw.url : 'https://github.com/Aryangp');

  // Summary
  let summary = '';
  const descLower = raw.description.toLowerCase();
  if (descLower.includes('python')) {
    summary = `A custom interpreted programming language engineered from scratch in Python, featuring a bespoke lexer, AST parser, and dynamic runtime execution engine.`;
  } else if (descLower.includes('jest')) {
    summary = `A lightweight, high-performance automated JavaScript testing framework and assertion runner inspired by Jest for streamlined unit testing.`;
  } else if (descLower.includes('stripe') || descLower.includes('commerse')) {
    summary = `Full-featured modern e-commerce web application with real-time product catalog browsing, cart state management, and Stripe checkout integration.`;
  } else if (descLower.includes('pug') || descLower.includes('dance')) {
    summary = `Dynamic web application and studio booking platform featuring server-side template rendering with Pug and an Express.js backend.`;
  } else if (descLower.includes('ai') || descLower.includes('face')) {
    summary = `Real-time computer vision and facial emotion recognition web application detecting facial landmarks and classifying live user expressions.`;
  } else if (descLower.includes('spotify')) {
    summary = `Interactive web music streaming player clone recreating Spotify's sleek dark UI, custom audio playback controls, playlists, and responsive navigation.`;
  } else if (descLower.includes('solidity') || descLower.includes('netflix')) {
    summary = `Web3-enabled Netflix clone combining movie trailer streaming with Firebase backend authentication, TMDB movie catalog API, and Solidity smart contracts.`;
  } else {
    summary = `A modern ${techStack.join(', ')} application with high performance, interactive UI, and robust architecture.`;
  }

  return {
    id,
    title,
    ballType,
    typeBadge,
    summary,
    techStack,
    demoUrl,
    repoUrl,
    coverImage: raw.cover,
    stats: {
      hp: Math.min(hp, 99),
      attack: Math.min(attack, 99),
      defense: Math.min(defense, 99),
      speed: Math.min(speed, 99),
    },
    level,
    category,
    boxCategory,
    flavorText,
    keyFeatures,
  };
}

/**
 * Normalizes an array of raw items into an array of StarterProjects
 */
export function normalizePortfolioData(rawList: RawPortfolioItem[]): StarterProject[] {
  return rawList.map((item, idx) => normalizePortfolioItem(item, idx));
}
