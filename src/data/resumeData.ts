import { PokeBallType } from '@/components/PokeBallSprite';

export interface DeveloperProfile {
  name: string;
  title: string;
  trainerClass: string;
  location: string;
  status: string;
  phone: string;
  email: string;
  githubUrl: string;
  linkedinUrl: string;
  resumePdfUrl: string;
  badgesEarned: number;
  totalBadges: number;
  summary: string;
  dialogueIntro: string;
  stats: {
    backendArchitecture: number;
    distributedSystems: number;
    databaseOptimization: number;
    apiIntegrations: number;
    devopsAndCloud: number;
  };
}

export interface TechnicalSkills {
  languages: string[];
  databasesAndCaching: string[];
  toolsAndFrameworks: string[];
}

export interface WorkExperienceItem {
  id: string;
  company: string;
  role: string;
  location: string;
  period: string;
  badgeName: string;
  badgeColor: string;
  techStack: string[];
  highlights: string[];
}

export interface EducationItem {
  institution: string;
  degree: string;
  cgpa: string;
  period: string;
  location: string;
  honors: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  date: string;
  location: string;
  sponsors: string;
  description: string;
}

export interface PartyMember {
  id: string;
  name: string;
  role: string;
  type: 'Electric' | 'Water' | 'Grass' | 'Fire' | 'Psychic' | 'Steel';
  level: number;
  ballType: PokeBallType;
  hp: string;
  moves: string[];
}

export interface GymBadge {
  id: string;
  name: string;
  region: string;
  skill: string;
  description: string;
  color: string;
  earnedDate: string;
}

export interface FullResumeData {
  profile: DeveloperProfile;
  technicalSkills: TechnicalSkills;
  workExperience: WorkExperienceItem[];
  education: EducationItem[];
  achievements: AchievementItem[];
  partyMembers: PartyMember[];
  gymBadges: GymBadge[];
}

/**
 * Bundled default resume data representing Aryan Gupta's complete resume
 */
export const DEFAULT_RESUME_DATA: FullResumeData = {
  profile: {
    name: 'Aryan Gupta',
    title: 'Software Development Engineer (Backend & Systems)',
    trainerClass: 'SDE 1 BACKEND & SYSTEMS ARCHITECT',
    location: 'Ambala City, Haryana, India',
    status: 'ENGINEERING HIGH-THROUGHPUT SYSTEMS @ POLICYBAZAAR',
    phone: '9306716859',
    email: 'aryangp05@gmail.com',
    githubUrl: 'https://github.com/Aryangp',
    linkedinUrl: 'https://linkedin.com/in/aryan-gupta-4a345422b',
    resumePdfUrl: '#',
    badgesEarned: 8,
    totalBadges: 8,
    summary:
      'Result-oriented Software Development Engineer specializing in high-performance backend architecture, third-party enterprise integrations, and database optimization. Adept at handling asynchronous processing systems, migrating legacy infrastructure, and building scalable business tools within high-traffic corporate ecosystems.',
    dialogueIntro:
      "WELCOME TO PROF. ARYAN'S LAB! I engineer high-performance backend architectures, async processing pipelines, and scalable enterprise systems at Policybazaar. Inspect my battle-tested projects and career journey!",
    stats: {
      backendArchitecture: 96,
      distributedSystems: 94,
      databaseOptimization: 95,
      apiIntegrations: 98,
      devopsAndCloud: 90,
    },
  },
  technicalSkills: {
    languages: [
      'C#',
      '.NET Core',
      '.NET 8',
      'Go',
      'Python',
      'Java',
      'C++',
      'SQL',
      'JavaScript',
      'TypeScript',
    ],
    databasesAndCaching: [
      'MongoDB',
      'MSSQL',
      'MySQL',
      'Redis',
      'VectorDB (Weaviate)',
      'PostgreSQL',
    ],
    toolsAndFrameworks: [
      'Docker',
      'Azure Service Bus',
      'Kafka',
      'FastAPI',
      'Node.js',
      'Express',
      'React',
      'Linux',
      'Git',
    ],
  },
  workExperience: [
    {
      id: 'exp-policybazaar',
      company: 'Policybazaar',
      role: 'Software Development Engineer I (SDE 1) - Backend',
      location: 'Gurugram, India',
      period: 'Jan. 2025 – Present',
      badgeName: 'ENTERPRISE CORE BADGE',
      badgeColor: '#10B981',
      techStack: ['.NET 8', 'C#', 'MSSQL', 'MongoDB', 'MySQL', 'Redis', 'React'],
      highlights: [
        'Orchestrated core end-to-end third-party API integrations, quote workflows, and complex validation rules for enterprise insurers (including TATA, ICICI, Bajaj, and Oriental) utilizing .NET 8 / Core and C#.',
        'Re-engineered the Oriental insurance integration logic using asynchronous parallel processing pipelines, mitigating API blockages and accelerating frontend quote rendering times for customers.',
        'Spearheaded legacy migration of business-critical service workflows from .NET 4.5 to modernized .NET 8 architectures, significantly upgrading code scalability, runtime optimization, and testability.',
        'Optimized high-throughput relational and NoSQL data structures across MongoDB, MSSQL, and MySQL; deployed in-memory caching layers for heavy add-on lookup tables to minimize database latency and load.',
        'Automated heavy internal operations—such as bulk uploads, automatic vehicle lead updates, and third-party call partner systems—by deploying back-office micro-panels built with backend workers and a light React frontend.',
        'Integrated a seamless e-KYC flow into the existing system, ensuring reliable handling of customer verification within the broader insurance lifecycle.',
      ],
    },
    {
      id: 'exp-settyl',
      company: 'Settyl Corporation',
      role: 'Full Stack Developer Intern',
      location: 'New York, US (Remote)',
      period: 'March 2023 – June 2023',
      badgeName: 'MICRO-FRONTEND BADGE',
      badgeColor: '#3B82F6',
      techStack: ['React.js', 'Node.js', 'Express', 'MongoDB', 'Azure Service Bus', 'Kafka'],
      highlights: [
        'Led the implementation of micro frontends using React.js, enhancing frontend modularity and scalability.',
        'Improved API performance by implementing strategic pagination techniques in Node Express Backend, resulting in a 20% reduction in data retrieval time and a 10% increase in user engagement.',
        'Developed robust MongoDB queries for efficient data retrieval, updates, and deletions, utilizing triggers for automated document creation based on specific queries.',
        'Deployed Azure Service Bus and Function along with Kafka for notification functionality, establishing various topics and corresponding consumers for seamless notification management.',
      ],
    },
    {
      id: 'exp-milda',
      company: 'Milda India',
      role: 'Backend Developer Intern',
      location: 'Gurugram, India',
      period: 'January 2022 – March 2022',
      badgeName: 'AUTH & SECURITY BADGE',
      badgeColor: '#F59E0B',
      techStack: ['Node.js', 'Express', 'JWT', 'Firestore', 'Multer'],
      highlights: [
        'Led Node.js Express backend development, including API creation, error handling, and the implementation of MVC architecture for streamlined debugging.',
        'Strengthened authentication protocols by integrating JWT tokens, resulting in a 25% decrease in unauthorized access attempts and a 12% improvement in system security.',
        'Enhanced backend efficiency by utilizing multer for file transfer, storing files in Firestore, and storing URLs in the database to reduce database overhead and optimize file retrieval speed.',
      ],
    },
  ],
  education: [
    {
      institution: 'UIET, Panjab University, Chandigarh',
      degree: 'BE, Information Technology',
      cgpa: '9.00 / 10.0',
      period: 'Nov. 2021 – July 2025',
      location: 'Chandigarh, India',
      honors: 'Distinction Academic Excellence (CGPA 9.00)',
    },
  ],
  achievements: [
    {
      id: 'ach-ondc',
      title: 'Finalist in ONDC Hackathon at Google Office',
      date: 'May 2024',
      location: 'Bangalore, India',
      sponsors: 'Sponsored by Google Cloud, Paytm, and Antler',
      description:
        'Selected among top teams nationwide and invited to the Google Office in Bangalore for the final round to build high-scale open commerce solutions.',
    },
  ],
  partyMembers: [
    {
      id: 'p-dotnet',
      name: '.NET 8 CORE SENTRY',
      role: 'High-Throughput Enterprise Backend',
      type: 'Steel',
      level: 92,
      ballType: 'masterball',
      hp: '390 / 390',
      moves: ['Async Parallel Pipeline', 'C# 12 Memory Span', 'Enterprise Insurer Routing', 'e-KYC Validator'],
    },
    {
      id: 'p-kafka',
      name: 'KAFKA & AZURE BUS',
      role: 'Distributed Message Streaming',
      type: 'Electric',
      level: 88,
      ballType: 'ultraball',
      hp: '340 / 340',
      moves: ['Topic Partitioning', 'Consumer Group Sync', 'Azure Function Trigger', 'Event Bus Fanout'],
    },
    {
      id: 'p-db',
      name: 'MSSQL / MONGO / REDIS',
      role: 'Hybrid Relational & Cache Vault',
      type: 'Water',
      level: 90,
      ballType: 'diveball',
      hp: '365 / 365',
      moves: ['B-Tree Indexing', 'In-Memory Add-on Cache', 'Document Trigger', 'Connection Pool'],
    },
    {
      id: 'p-python',
      name: 'PYTHON & FASTAPI',
      role: 'Async Indexing & Compiler Core',
      type: 'Fire',
      level: 86,
      ballType: 'luxuryball',
      hp: '320 / 320',
      moves: ['FastAPI Async Loop', 'AST Lexer Parser', 'Vector Embedder', 'Dynamic CSV Mapper'],
    },
    {
      id: 'p-weaviate',
      name: 'WEAVIATE VECTOR ENGINE',
      role: 'Semantic & Hybrid Search',
      type: 'Psychic',
      level: 87,
      ballType: 'duskball',
      hp: '330 / 330',
      moves: ['t2v-transformer', 'Hybrid Vector Query', 'Multilingual Search', 'Image KNN Search'],
    },
    {
      id: 'p-react',
      name: 'REACT & MICRO-FRONTENDS',
      role: 'Modular UI Architecture',
      type: 'Grass',
      level: 85,
      ballType: 'cherishball',
      hp: '310 / 310',
      moves: ['Micro Frontend Host', 'Back-Office Panels', 'Optimistic State', 'Component Modularity'],
    },
  ],
  gymBadges: [
    {
      id: 'badge-pb',
      name: 'ENTERPRISE CORE BADGE',
      region: 'Policybazaar Gym',
      skill: '.NET 8 & Enterprise Insurer APIs',
      description:
        'Orchestrating mission-critical quote workflows, asynchronous parallel pipelines, and .NET 8 modernizations.',
      color: '#10B981',
      earnedDate: '2025',
    },
    {
      id: 'badge-ondc',
      name: 'GOOGLE ONDC MEDAL',
      region: 'Bangalore Google Office',
      skill: 'ONDC Hackathon Finalist',
      description:
        'Nationwide finalist sponsored by Google Cloud, Paytm & Antler building open commerce innovation.',
      color: '#FACC15',
      earnedDate: '2024',
    },
    {
      id: 'badge-async',
      name: 'PARALLEL PIPELINE BADGE',
      region: 'High-Throughput Gym',
      skill: 'Async Parallel Processing',
      description:
        'Mitigating API blockages and sub-second quote rendering across distributed insurance partners.',
      color: '#38BDF8',
      earnedDate: '2025',
    },
    {
      id: 'badge-db-cache',
      name: 'DB & CACHE CITADEL',
      region: 'Data Fortress',
      skill: 'MongoDB, MSSQL, Redis Caching',
      description:
        'High-throughput data structuring and low-latency in-memory lookup caching.',
      color: '#8B5CF6',
      earnedDate: '2025',
    },
    {
      id: 'badge-events',
      name: 'STREAMING BUS BADGE',
      region: 'Distributed Messaging Gym',
      skill: 'Kafka & Azure Service Bus',
      description:
        'Multi-topic pub/sub messaging architectures and serverless function consumers.',
      color: '#FB923C',
      earnedDate: '2023',
    },
    {
      id: 'badge-vector',
      name: 'VECTOR SEARCH BADGE',
      region: 'AI & Vector Lab',
      skill: 'Weaviate & Semantic AI',
      description:
        'Multilingual and image-based hybrid vector search with transformer embeddings.',
      color: '#C084FC',
      earnedDate: '2024',
    },
    {
      id: 'badge-compiler',
      name: 'COMPILER FORGE BADGE',
      region: 'Language Lab',
      skill: 'AST Parser & Interpreter Design',
      description:
        'Building custom interpreted languages with lexical analysis, scoping, and execution engines.',
      color: '#EF4444',
      earnedDate: '2023',
    },
    {
      id: 'badge-academic',
      name: 'PANJAB ACADEMIC MEDAL',
      region: 'UIET Panjab University',
      skill: 'BE Information Tech (CGPA 9.00)',
      description:
        'Top-tier academic excellence in core computer science, systems, and information technology.',
      color: '#A3E635',
      earnedDate: '2021-2025',
    },
  ],
};
