const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const targetDir = path.join(__dirname, '../public/portfolio/img');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const projects = [
  {
    filename: 'vgm4esdw.bmp',
    title: 'GPZER LANG',
    subtitle: 'Python Lexer and AST Parser VM',
    color1: '#EF4444',
    color2: '#991B1B',
    badge: 'PYTHON / COMPILER',
    iconText: 'PY_LANG',
  },
  {
    filename: 'u2skgisz.bmp',
    title: 'TEST FRAMEWORK',
    subtitle: 'JavaScript and Jest Assertion Engine',
    color1: '#F59E0B',
    color2: '#B45309',
    badge: 'JS / JEST RUNNER',
    iconText: 'PASS_TEST',
  },
  {
    filename: 'img2.png',
    title: 'E-COMMERCE',
    subtitle: 'React + Commerce.js + Stripe Store',
    color1: '#06B6D4',
    color2: '#0E7490',
    badge: 'REACT / STRIPE',
    iconText: 'STORE_UI',
  },
  {
    filename: 'img1.png',
    title: 'DANCE ACADEMY',
    subtitle: 'Node.js + Pug + Express Studio Site',
    color1: '#EC4899',
    color2: '#BE185D',
    badge: 'NODE / EXPRESS',
    iconText: 'DANCE_HUB',
  },
  {
    filename: 'ai-project.png',
    title: 'FACE MOOD AI',
    subtitle: 'Neural Landmark Emotion Recognition',
    color1: '#8B5CF6',
    color2: '#5B21B6',
    badge: 'AI / VISION',
    iconText: 'NEURAL_AI',
  },
  {
    filename: 'spotify-clone2.png',
    title: 'SPOTIFY CLONE',
    subtitle: 'Web Audio Player and Dark UI',
    color1: '#10B981',
    color2: '#047857',
    badge: 'HTML / CSS / JS',
    iconText: 'AUDIO_SYS',
  },
  {
    filename: 'netflix-clone.png',
    title: 'ETHFLIX CLONE',
    subtitle: 'Web3 React + Firebase + Solidity',
    color1: '#E11D48',
    color2: '#881337',
    badge: 'REACT / SOLIDITY',
    iconText: 'WEB3_FLIX',
  },
];

async function generateCoverSvg(proj) {
  const width = 640;
  const height = 360;

  const svg = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="grad_${proj.iconText}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${proj.color1}" />
        <stop offset="100%" stop-color="${proj.color2}" />
      </linearGradient>
    </defs>

    <!-- Background -->
    <rect width="100%" height="100%" fill="url(#grad_${proj.iconText})"/>

    <!-- Retro Terminal Window Border -->
    <rect x="16" y="16" width="${width - 32}" height="${height - 32}" fill="none" stroke="#FFFFFF" stroke-width="4" />
    <rect x="24" y="24" width="${width - 48}" height="40" fill="#1A202C" />

    <!-- Window Dots -->
    <circle cx="44" cy="44" r="6" fill="#EF4444" />
    <circle cx="62" cy="44" r="6" fill="#F59E0B" />
    <circle cx="80" cy="44" r="6" fill="#10B981" />

    <!-- Window Title -->
    <text x="110" y="49" font-family="monospace, sans-serif" font-size="14" font-weight="bold" fill="#FFFFFF" letter-spacing="2">
      PROF_ARYAN_LABS // ${proj.badge}
    </text>

    <!-- Center Icon Box -->
    <rect x="220" y="90" width="200" height="64" fill="#1A202C" stroke="#FFFFFF" stroke-width="3" />
    <text x="320" y="132" font-family="monospace, sans-serif" font-size="22" font-weight="bold" fill="#34D399" text-anchor="middle" letter-spacing="2">
      ${proj.iconText}
    </text>

    <!-- Main Title -->
    <text x="320" y="205" font-family="monospace, sans-serif" font-size="28" font-weight="900" fill="#FFFFFF" text-anchor="middle" letter-spacing="2">
      ${proj.title}
    </text>

    <!-- Subtitle -->
    <text x="320" y="240" font-family="monospace, sans-serif" font-size="15" font-weight="600" fill="#E2E8F0" text-anchor="middle">
      ${proj.subtitle}
    </text>

    <!-- Status Bar Bottom -->
    <rect x="24" y="${height - 64}" width="${width - 48}" height="32" fill="#1A202C" />
    <text x="40" y="${height - 43}" font-family="monospace, sans-serif" font-size="12" fill="#10B981" font-weight="bold">
      PRODUCTION STATUS: READY
    </text>
    <text x="${width - 40}" y="${height - 43}" font-family="monospace, sans-serif" font-size="12" fill="#FCD34D" text-anchor="end" font-weight="bold">
      LV.75 COMPLETE
    </text>
  </svg>`;

  return Buffer.from(svg);
}

async function run() {
  for (const proj of projects) {
    const svgBuffer = await generateCoverSvg(proj);
    const destPath = path.join(targetDir, proj.filename);
    await sharp(svgBuffer).png().toFile(destPath);
    console.log(`Generated: ${destPath}`);
  }
  console.log('All 7 project covers successfully created!');
}

run().catch(console.error);
