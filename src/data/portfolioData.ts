import {
  Project,
  SkillCategory,
  ExperienceItem,
  EducationItem,
  DeveloperStat,
  CertificateItem,
} from '@/types';

export const personalInfo = {
  name: 'Pranav Singh',
  shortName: 'Pranav',
  role: 'Full Stack Developer',
  positioningStatement:
    'Full Stack Developer building modern web applications and AI-powered products.',
  detailedDescription:
    'I build high-performance web applications and real-time AI platforms using React, Next.js, Node.js, Python, Flask, FastAPI, MySQL, Firebase, and LLM APIs.',
  location: 'India',
  status: '🟢 Available for full-time roles, internships & projects',
  email: 'pranasinghind@gmail.com',
  phone: '8077004381',
  github: 'https://github.com/PRANAV-SINGH-CSE',
  githubUsername: 'PRANAV-SINGH-CSE',
  linkedin: 'https://www.linkedin.com/in/pranav-signh',
  cvUrl: '/CV.pdf',
  bio: 'Full Stack Developer with hands-on experience building real-time collaborative workspaces, low-latency speech AI engines, full-stack conversational platforms, and AI sentiment intelligence systems. Focused on high concurrency, sub-millisecond optimistic UI, and scalable backend architectures.',
  currentLearning: [
    'Next.js 16 App Router & Server Actions',
    'Real-Time WebSocket & Audio DSP Pipelines',
    'Faster-Whisper CUDA Speech Recognition',
    'Firestore Real-Time Sync & Offline IndexedDB Caches',
  ],
  problemsToSolve:
    'I solve performance bottlenecks across real-time multi-user synchronization, audio-to-LLM speech pipelines, structured JSON LLM outputs, and modular class-based frontend architectures.',
};

export const developerStats: DeveloperStat[] = [
  {
    icon: 'GraduationCap',
    label: 'Education',
    value: 'B.Tech — CSE',
    detail: 'Lovely Professional University (LPU) • TGPA: 8.4',
    color: 'from-blue-500/20 to-cyan-500/20',
  },
  {
    icon: 'Laptop',
    label: 'Focus',
    value: 'Full Stack Development',
    detail: 'Next.js, React, Node.js, Python, FastAPI',
    color: 'from-indigo-500/20 to-purple-500/20',
  },
  {
    icon: 'Bot',
    label: 'AI & Speech',
    value: 'LLM & Voice Engines',
    detail: 'Faster-Whisper, Gemini, Claude, OpenAI',
    color: 'from-violet-500/20 to-fuchsia-500/20',
  },
  {
    icon: 'Wrench',
    label: 'Flagship Projects',
    value: '4 Core Platforms',
    detail: 'Sprinto, Review Radar, LiveVoice AI, ZentiqAI',
    color: 'from-emerald-500/20 to-teal-500/20',
  },
  {
    icon: 'MapPin',
    label: 'Based In',
    value: 'India',
    detail: 'Open to Remote & On-Site Roles',
    color: 'from-amber-500/20 to-orange-500/20',
  },
  {
    icon: 'Flame',
    label: 'Performance',
    value: '<1ms UI Optimistic Sync',
    detail: 'Sub-700ms voice loop, 0.28x real-time factor',
    color: 'from-rose-500/20 to-pink-500/20',
  },
];

export const skillCategories: SkillCategory[] = [
  {
    name: 'Languages',
    icon: 'Code',
    description: 'Core programming and scripting languages for systems and web development',
    skills: [
      { name: 'JavaScript', level: 95, highlight: true },
      { name: 'TypeScript', level: 92, highlight: true },
      { name: 'Python', level: 94, highlight: true },
      { name: 'Java', level: 86, highlight: true },
      { name: 'C++', level: 85 },
      { name: 'C', level: 82 },
      { name: 'SQL', level: 88, highlight: true },
    ],
  },
  {
    name: 'Frontend',
    icon: 'Layout',
    description: 'Modern, responsive, component-driven user interfaces',
    skills: [
      { name: 'HTML5', level: 96, highlight: true },
      { name: 'CSS3', level: 94, highlight: true },
      { name: 'React.js', level: 95, highlight: true },
      { name: 'Next.js', level: 94, highlight: true },
      { name: 'Tailwind CSS', level: 95, highlight: true },
      { name: '@dnd-kit', level: 90, highlight: true, experience: 'Drag & Drop' },
      { name: 'Framer Motion', level: 88, experience: 'Spring & Transitions' },
      { name: 'IndexedDB', level: 88, experience: 'Local Cache' },
    ],
  },
  {
    name: 'Backend & Databases',
    icon: 'Server',
    description: 'Scalable APIs, real-time database synchronizations, and microservices',
    skills: [
      { name: 'Node.js', level: 90, highlight: true },
      { name: 'Flask', level: 92, highlight: true },
      { name: 'FastAPI', level: 90, highlight: true },
      { name: 'REST APIs', level: 94, highlight: true },
      { name: 'WebSockets', level: 90, highlight: true },
      { name: 'MySQL', level: 86, highlight: true },
      { name: 'Firebase', level: 95, highlight: true },
      { name: 'Firestore', level: 95, highlight: true },
      { name: 'Realtime Database', level: 92, highlight: true },
    ],
  },
  {
    name: 'AI & Tooling',
    icon: 'Sparkles',
    description: 'LLM integrations, speech models, version control, and CI/CD pipelines',
    skills: [
      { name: 'OpenAI API', level: 92, highlight: true },
      { name: 'Anthropic API', level: 90, highlight: true },
      { name: 'Gemini API', level: 94, highlight: true },
      { name: 'LLM Integration', level: 94, highlight: true },
      { name: 'Prompt Engineering', level: 92, highlight: true },
      { name: 'Faster-Whisper', level: 90, highlight: true },
      { name: 'Git & GitHub', level: 94, highlight: true },
      { name: 'GitHub Actions (CI/CD)', level: 88 },
      { name: 'Vercel', level: 92 },
    ],
  },
];

export const featuredProjects: Project[] = [
  {
    id: 'sprinto',
    title: 'Sprinto',
    tagline: 'Real-Time Collaborative Workspace & Kanban Platform',
    category: 'Web Apps & UI',
    featured: true,
    description:
      'A real-time collaborative Kanban platform that lets multiple users edit the same board simultaneously without conflicts, replacing manual refreshes with live Firestore-backed sync.',
    tags: [
      'Next.js',
      'TypeScript',
      'Firebase',
      'Tailwind CSS',
      '@dnd-kit',
      'IndexedDB',
    ],
    liveUrl: 'https://sprinto-move.vercel.app/',
    githubUrl: 'https://github.com/PRANAV-SINGH-CSE/Sprinto',
    highlights: [
      'Developed a real-time collaborative Kanban platform using Next.js, TypeScript, and Firebase, enabling simultaneous multi-user board editing with live synchronization.',
      'Optimized real-time synchronization to achieve <1ms local UI updates and ~4.5ms median cross-client propagation, decoupled from the ~350ms average cloud write commit.',
      'Cut repeat-visit board load time from ~400ms (Firestore query) to ~5ms using an IndexedDB local cache layer.',
    ],
    stats: [
      { label: 'Local Render', value: '<1ms' },
      { label: 'Sync Propagation', value: '~4.5ms' },
      { label: 'Cache Load Time', value: '~5ms' },
    ],
    caseStudy: {
      problem:
        'Traditional project management boards require constant manual page refreshes, suffer from multi-user write collisions, and experience sluggish 400ms+ cloud query load times on spotty connections.',
      solution:
        'Engineered Sprinto with an optimistic UI state machine powered by @dnd-kit that renders drag actions in <1ms locally. Integrated a Firestore WebSocket sync channel propagating updates in ~4.5ms, decoupled from cloud commits, and implemented an IndexedDB local cache reducing repeat board loads to ~5ms.',
      architectureSteps: [
        {
          layer: 'Client UI',
          title: 'Optimistic Drag-and-Drop (<1ms)',
          desc: 'Sensory pointer tracking with @dnd-kit executing local state reordering in under 1ms without blocking on network round-trips.',
          tech: 'Next.js, TypeScript, @dnd-kit, Tailwind CSS',
        },
        {
          layer: 'Sync Layer',
          title: 'Firestore WebSocket Channel (~4.5ms)',
          desc: 'Live multi-client propagation over Firestore WebSocket channel in ~4.5ms median, completely decoupled from 350ms cloud write commits.',
          tech: 'Cloud Firestore onSnapshot, writeBatch',
        },
        {
          layer: 'Local Cache',
          title: 'IndexedDB Offline Cache (~5ms)',
          desc: 'Persistent local storage layer cutting repeat board load times from ~400ms to ~5ms, ensuring instant availability offline.',
          tech: 'IndexedDB, Persistent Tab Manager',
        },
        {
          layer: 'Auth & Security',
          title: 'Firebase Authentication & Rules',
          desc: 'Secured user identity and board permissions with granular Firestore security rules preventing unauthorized data manipulation.',
          tech: 'Firebase Auth, Security Rules',
        },
      ],
      challenges: [
        {
          title: 'Decoupling Cloud Commit Latency from UI Responsiveness',
          solution:
            'Implemented an optimistic UI pipeline where drag actions render locally in <1ms, pushing changes to peers in ~4.5ms over WebSockets without waiting for the ~350ms cloud write commit.',
        },
        {
          title: 'High Latency on Repeat Board Visits',
          solution:
            'Engineered an IndexedDB local caching layer that serves board data in ~5ms instead of waiting for ~400ms Firestore network queries.',
        },
      ],
      results: [
        'Sub-1ms local optimistic UI rendering.',
        '~4.5ms median sync propagation across connected peers.',
        '98.7% reduction in repeat board load time (~400ms to ~5ms).',
      ],
      metrics: [
        { label: 'Local Render', value: '< 1ms', trend: 'Instant' },
        { label: 'Peer Sync', value: '4.5ms', trend: 'WebSocket' },
        { label: 'Cached Load', value: '5ms', trend: '-98.7%' },
      ],
    },
  },
  {
    id: 'livevoice-ai',
    title: 'LiveVoice AI',
    tagline: 'Real-Time Speech Intelligence & Desktop HUD Platform',
    category: 'AI & Full-Stack',
    featured: true,
    description:
      'A real-time voice assistant that transcribes speech and streams AI responses live, achieving sub-700ms latency from end of speech to first spoken token with a transparent desktop overlay.',
    tags: [
      'Python',
      'FastAPI',
      'WebSockets',
      'AsyncIO',
      'PyQt5',
      'Win32 API',
      'JavaScript (ES6+)',
      'HTML5',
      'CSS3',
      'OpenAI API',
      'Anthropic API',
      'Faster-Whisper',
    ],
    liveUrl: '',
    githubUrl: '',
    highlights: [
      'Engineered a real-time voice assistant that transcribes speech and streams AI responses live, achieving sub-700ms latency from end of speech to first spoken token and a sub-1-second full response loop, measured via P50/P90 profiling across the audio-to-LLM pipeline.',
      'Tuned the speech-to-text stage to run at a 0.28x real-time factor (3.5x faster than speech) with Faster-Whisper, while the LLM streamed responses at ~197 tokens/sec.',
      'Designed a transparent, always-on-top desktop overlay controlled by global hotkeys for use during screen shares and calls.',
      'Implemented an async FastAPI backend that extracts key questions from streamed transcripts in real time, with full session history exportable to Markdown/JSON.',
    ],
    stats: [
      { label: 'Latency to Token', value: '<700ms' },
      { label: 'Real-Time Factor', value: '0.28x' },
      { label: 'Streaming Speed', value: '~197 tok/s' },
    ],
    caseStudy: {
      problem:
        'Standard voice assistant pipelines suffer from high latency (3-5s), lack transparent desktop overlay capabilities during screen-shared calls, and fail to transcribe and extract questions in real time.',
      solution:
        'Engineered an async Python/FastAPI WebSocket backend paired with Faster-Whisper tuned to 0.28x real-time factor and an LLM streaming engine emitting ~197 tokens/sec to an always-on-top transparent PyQt5 overlay.',
      architectureSteps: [
        {
          layer: 'Audio Capture',
          title: 'Real-Time Audio Ingestion',
          desc: 'Low-latency PCM audio stream processing with Voice Activity Detection (VAD) segmenting speech chunks.',
          tech: 'Python, AsyncIO, WebSockets',
        },
        {
          layer: 'Speech Recognition',
          title: 'Faster-Whisper ASR (0.28x RTF)',
          desc: 'Transcribes spoken audio 3.5x faster than real-time speech, passing text directly to question extraction.',
          tech: 'Faster-Whisper, CTranslate2',
        },
        {
          layer: 'LLM Streaming',
          title: 'Multi-API Streaming (~197 tok/sec)',
          desc: 'Streams answers token-by-token using OpenAI and Anthropic APIs, reaching first token in <700ms.',
          tech: 'FastAPI, OpenAI API, Anthropic API',
        },
        {
          layer: 'Desktop HUD',
          title: 'Transparent PyQt5 Overlay',
          desc: 'Always-on-top, click-through desktop overlay controlled by global hotkeys for seamless use during calls.',
          tech: 'PyQt5, Win32 API, JavaScript ES6+',
        },
      ],
      challenges: [
        {
          title: 'Achieving Sub-Second Voice-to-Response Loop',
          solution:
            'Tuned Faster-Whisper ASR to 0.28x real-time factor and piped token buffers asynchronously via WebSockets, reaching <700ms first-token latency.',
        },
        {
          title: 'Transparent Desktop Integration During Screen Shares',
          solution:
            'Leveraged Win32 API and PyQt5 frameless window flags to build an always-on-top overlay that stays usable without disrupting background tasks.',
        },
      ],
      results: [
        'Sub-700ms latency from end of speech to first spoken token.',
        'Speech recognition running 3.5x faster than real-time speech.',
        'Full session history exportable directly to Markdown and JSON.',
      ],
      metrics: [
        { label: 'Time to 1st Token', value: '<700ms', trend: 'Sub-second' },
        { label: 'Whisper RTF', value: '0.28x', trend: '3.5x faster' },
        { label: 'Token Stream', value: '197 tok/s', trend: 'Ultra-fast' },
      ],
    },
  },
  {
    id: 'zentiq-ai',
    title: 'ZentiqAI',
    tagline: 'AI Chat Web Application',
    category: 'AI & Full-Stack',
    featured: true,
    description:
      'A full stack AI chat application with persistent multi-session conversations and image upload, engineered with concurrent session handling and a modular class-based architecture.',
    tags: [
      'Python (Flask)',
      'JavaScript',
      'Firebase',
      'HTML',
      'CSS',
    ],
    liveUrl: 'https://zentiqai.vercel.app/',
    githubUrl: 'https://github.com/PRANAV-SINGH-CSE/ZentiqAI_Chat_Bot',
    highlights: [
      'Created a full stack AI chat app with persistent, multi-session conversations and image upload, letting users pick up a conversation from any device.',
      'Engineered concurrent session handling on the backend so multiple users can chat at the same time without their session data colliding.',
      'Restructured the frontend into a modular, class-based JavaScript architecture for easier feature extension.',
    ],
    stats: [
      { label: 'Session Handling', value: 'Zero Collision' },
      { label: 'Device Sync', value: 'Multi-Device' },
      { label: 'Architecture', value: 'Class-Based' },
    ],
    caseStudy: {
      problem:
        'Basic AI chat apps suffer from session loss across devices, database collisions during simultaneous concurrent user queries, and monolithic frontend code that makes scaling features difficult.',
      solution:
        'Architected a Flask backend with thread-safe session concurrency and Firebase Firestore persistence, paired with a class-based modular frontend supporting image uploads and cross-device resumption.',
      architectureSteps: [
        {
          layer: 'Frontend',
          title: 'Class-Based JavaScript Architecture',
          desc: 'Modular frontend classes handling message rendering, image attachment pipelines, and event dispatchers.',
          tech: 'JavaScript (ES6+), HTML, CSS',
        },
        {
          layer: 'Backend API',
          title: 'Python Flask Concurrent Gateway',
          desc: 'Thread-safe REST API endpoints routing prompts, image payloads, and multi-user sessions concurrently.',
          tech: 'Python, Flask, REST APIs',
        },
        {
          layer: 'Data & Sync',
          title: 'Firebase (Firestore, Realtime DB)',
          desc: 'Persists user conversations and image metadata for seamless multi-device continuity.',
          tech: 'Cloud Firestore, Realtime Database',
        },
      ],
      challenges: [
        {
          title: 'Concurrent Session Collisions Under Multi-User Load',
          solution:
            'Engineered isolated session state handling in Flask ensuring concurrent user requests cannot leak or overwrite neighboring session data.',
        },
        {
          title: 'Frontend Code Scalability',
          solution:
            'Refactored the client codebase into modular, object-oriented JavaScript classes, decoupling message rendering from networking logic.',
        },
      ],
      results: [
        'Multi-session conversations available across any device.',
        'Zero session collisions across concurrent chat streams.',
        'Modular, maintainable class-based codebase.',
      ],
      metrics: [
        { label: 'Session Integrity', value: '100%', trend: 'No collisions' },
        { label: 'Cross-Device Sync', value: 'Instant', trend: 'Firestore' },
      ],
    },
  },
  {
    id: 'review-radar',
    title: 'Review Radar',
    tagline: 'AI-Powered Review Intelligence & Sentiment Analysis Engine',
    category: 'AI & Full-Stack',
    featured: true,
    description:
      'An end-to-end sentiment intelligence platform that analyzes product URLs, extracts customer sentiment via Google Gemini 2.5 Flash, and generates structured pros/cons breakdowns.',
    tags: [
      'Next.js 16',
      'React 19',
      'TypeScript',
      'Gemini 2.5 Flash',
      'Prisma ORM',
      'MongoDB Atlas',
      'Tailwind CSS',
      'JWT (jose)',
    ],
    liveUrl: 'https://review-radar-virid.vercel.app/',
    githubUrl: 'https://github.com/PRANAV-SINGH-CSE/Review-Radar',
    highlights: [
      'Engineered an end-to-end sentiment intelligence tool using Next.js 16 (App Router), React 19, and TypeScript to analyze product URLs and extract customer feedback.',
      'Integrated Google Gemini 2.5 Flash API using strict JSON schema enforcement and zero-shot prompt engineering to generate review syntheses, pros/cons breakdowns, and percentage-based sentiment distributions.',
      'Designed normalized data models in MongoDB Atlas via Prisma ORM, ensuring user data isolation, sub-second query performance via indexed relational fields, and automated cache invalidation.',
      'Implemented custom session auth with JWT (jose) and Bcrypt.js, augmented with an AES-256-CBC reversible encryption engine and edge-based Next.js Middleware for route protection.',
    ],
    stats: [
      { label: 'Schema Precision', value: '100% JSON' },
      { label: 'Latency', value: 'Sub-second' },
      { label: 'Auth & Security', value: 'AES-256' },
    ],
    caseStudy: {
      problem:
        'Consumers and sellers spend hours reading hundreds of scattered e-commerce reviews with no unified breakdown of recurring product defects, feature highlights, or authentic sentiment percentages.',
      solution:
        'Built an AI pipeline with Next.js 16 and Google Gemini 2.5 Flash that processes product URLs, extracts unstructured customer sentiment into structured JSON schemas, and stores indexed analytics in MongoDB Atlas via Prisma ORM with AES-256 session security.',
      architectureSteps: [
        {
          layer: 'Frontend & UI',
          title: 'Next.js 16 App Router & React 19',
          desc: 'High-speed sentiment visualization dashboards with reactive metric gauges and breakdown filters.',
          tech: 'Next.js 16, React 19, Tailwind CSS, TypeScript',
        },
        {
          layer: 'AI Intelligence',
          title: 'Gemini 2.5 Flash Structured JSON',
          desc: 'Zero-shot prompt pipelines enforcing strict JSON schemas to output pros/cons distributions and sentiment breakdown.',
          tech: 'Google Gemini 2.5 Flash API, JSON Schema',
        },
        {
          layer: 'Database & ORM',
          title: 'Prisma ORM & MongoDB Atlas',
          desc: 'Indexed query performance, automated cache invalidation, and secure user data isolation.',
          tech: 'Prisma ORM v6, MongoDB Atlas',
        },
        {
          layer: 'Auth & Security',
          title: 'JWT (jose) & AES-256-CBC Encryption',
          desc: 'Reversible encryption engine paired with edge-based Next.js Middleware for secure route authorization.',
          tech: 'JWT (jose), Bcrypt.js, AES-256-CBC, Next.js Middleware',
        },
      ],
      challenges: [
        {
          title: 'Enforcing Deterministic JSON Outputs from LLMs',
          solution:
            'Implemented Gemini structured outputs with strict schema definitions, ensuring 100% parseable JSON without hallucinated response structures.',
        },
        {
          title: 'Sub-Second Sentiment Queries Under Load',
          solution:
            'Structured relational indices in MongoDB via Prisma ORM, enabling sub-second lookup of previously analyzed product summaries.',
        },
      ],
      results: [
        'Instant synthesis of hundreds of product reviews into clear pros/cons.',
        '100% reliable structured JSON schema extraction with Gemini 2.5 Flash.',
        'Enterprise-grade security with AES-256 encryption and JWT session middleware.',
      ],
      metrics: [
        { label: 'JSON Reliability', value: '100%', trend: 'Zero-shot' },
        { label: 'Query Speed', value: '<500ms', trend: 'Indexed' },
        { label: 'Security', value: 'AES-256', trend: 'Encrypted' },
      ],
    },
  },
];

export const experienceItems: ExperienceItem[] = [
  {
    id: 'hackiware-internship',
    role: 'Frontend Developer Intern',
    organization: 'Hackiware',
    period: 'Sep 2025 – Mar 2026',
    location: 'Remote, India',
    type: 'Internship',
    badge: 'Startup Internship',
    description: [
      'Developed the startup’s official web platform from scratch as Lead Frontend Developer, engineering modern component-driven architectures, responsive UI, and interactive features.',
      'Shipped the official production platform (hackiware.com) alongside iterative staging release pipelines (hacki-green.vercel.app) using Next.js, React, and Tailwind CSS.',
      'Collaborated closely with founding leadership to translate cyber product specifications into high-performance, SEO-optimized web experiences.',
    ],
    skills: [
      'Next.js',
      'React.js',
      'TypeScript',
      'Tailwind CSS',
      'JavaScript',
      'HTML5/CSS3',
      'Vercel',
      'Responsive Design',
    ],
    links: [
      {
        label: 'Official Site (hackiware.com)',
        url: 'https://www.hackiware.com/',
        type: 'live',
      },
      {
        label: 'Dev Staging (hacki-green.vercel.app)',
        url: 'https://hacki-green.vercel.app/',
        type: 'dev',
      },
    ],
  },
  {
    id: 'full-stack-eng',
    role: 'Full Stack Developer',
    organization: 'Project & Open-Source Engineering',
    period: '2025 – Present',
    location: 'India',
    type: 'Freelance',
    badge: 'Core Focus',
    description: [
      'Engineered Sprinto, a real-time collaborative Kanban platform with sub-1ms optimistic UI updates, ~4.5ms WebSocket sync propagation, and ~5ms IndexedDB local cache load times.',
      'Developed LiveVoice AI, achieving sub-700ms voice-to-token response loops with Faster-Whisper running at 0.28x real-time factor and a transparent PyQt5 desktop HUD overlay.',
      'Architected ZentiqAI with Flask backend concurrency, multi-device Firebase persistence, image uploads, and modular class-based frontend architecture.',
    ],
    skills: ['Next.js', 'React', 'Node.js', 'Python', 'Flask', 'FastAPI', 'Firebase', 'TypeScript', 'Tailwind CSS', 'Java', 'C++'],
  },
  {
    id: 'academic-eng',
    role: 'B.Tech — Computer Science & Engineering',
    organization: 'Lovely Professional University (LPU)',
    period: '2024 – 2028',
    location: 'India',
    type: 'Community',
    badge: 'Academic',
    description: [
      'Pursuing B.Tech in Computer Science and Engineering at Lovely Professional University (LPU) (TGPA: 8.4).',
      'Active developer on GitHub (github.com/PRANAV-SINGH-CSE) publishing open-source projects and developer tools.',
    ],
    skills: ['Java', 'C', 'C++', 'JavaScript', 'TypeScript', 'Python', 'SQL', 'Git/GitHub', 'CI/CD'],
  },
];

export const educationData: EducationItem = {
  degree: 'Bachelor of Technology (B.Tech)',
  field: 'Computer Science and Engineering',
  institution: 'Lovely Professional University (LPU)',
  period: '2024 – 2028',
  location: 'India',
  grade: 'TGPA: 8.4',
  highlights: [
    'B.Tech in Computer Science and Engineering at Lovely Professional University (LPU) • TGPA: 8.4',
    'Core focus on Full Stack Development, Real-Time Distributed Systems, and AI & Speech Engines',
    'Active Open-Source Builder on GitHub: github.com/PRANAV-SINGH-CSE',
  ],
  coursework: [
    'Data Structures & Algorithms',
    'Object-Oriented Programming (Java / C++ / Python)',
    'Database Management Systems (SQL, MySQL & Firebase)',
    'Web Development (React, Next.js, Flask, Node.js)',
    'AI & Speech Recognition (LLMs, Faster-Whisper, Gemini APIs)',
    'Software Engineering & CI/CD (GitHub Actions)',
  ],
};

export const githubActivityData = {
  username: 'PRANAV-SINGH-CSE',
  profileUrl: 'https://github.com/PRANAV-SINGH-CSE',
  stats: {
    totalContributions: '1,170+',
    currentStreak: 'Active',
    repositories: '23+ Repos',
    starsEarned: 'Starred',
  },
  languages: [
    { name: 'TypeScript', percentage: 42, color: '#3178c6' },
    { name: 'JavaScript', percentage: 26, color: '#f7df1e' },
    { name: 'Python (FastAPI & Whisper)', percentage: 18, color: '#3572A5' },
    { name: 'HTML & Tailwind CSS', percentage: 14, color: '#e34c26' },
  ],
  pinnedRepos: [
    {
      name: 'Sprinto',
      description: 'Real-Time Collaborative Workspace & Kanban Platform with <1ms optimistic UI & ~4.5ms WebSocket sync.',
      stars: 'Live',
      forks: 'Live Demo',
      language: 'TypeScript',
      langColor: '#3178c6',
      url: 'https://github.com/PRANAV-SINGH-CSE/Sprinto',
    },
    {
      name: 'Review-Radar',
      description: 'AI-powered product review intelligence & sentiment analysis engine with Gemini 2.5 & Prisma ORM.',
      stars: 'Live',
      forks: 'Next.js 16',
      language: 'TypeScript',
      langColor: '#3178c6',
      url: 'https://github.com/PRANAV-SINGH-CSE/Review-Radar',
    },
    {
      name: 'ZentiqAI_Chat_Bot',
      description: 'Full stack AI chat app with persistent multi-session conversations, image upload & concurrency.',
      stars: 'Live',
      forks: 'Flask',
      language: 'JavaScript',
      langColor: '#f7df1e',
      url: 'https://github.com/PRANAV-SINGH-CSE/ZentiqAI_Chat_Bot',
    },
    {
      name: 'portfolio',
      description: 'Modern developer portfolio and architecture showcase built with Next.js 16 & Framer Motion.',
      stars: 'Live',
      forks: 'React 19',
      language: 'TypeScript',
      langColor: '#3178c6',
      url: 'https://github.com/PRANAV-SINGH-CSE/portfolio',
    },
  ],
};

export const resumeData = {
  name: 'PRANAV SINGH',
  title: 'Full Stack Developer | React.js | Next.js | Node.js | TypeScript',
  contact: {
    email: 'pranasinghind@gmail.com',
    phone: '8077004381',
    linkedin: 'linkedin.com/in/pranav-signh',
    github: 'github.com/PRANAV-SINGH-CSE',
  },
  summary:
    'Full Stack Developer building real-time collaborative systems, low-latency speech AI engines, and full-stack web applications with Next.js, React, Node.js, Python, Flask, FastAPI, MySQL, and Firebase.',
  technicalSkills: {
    languages: 'Java, C, C++, JavaScript, TypeScript, Python, SQL',
    frontend: 'HTML5, CSS3, React.js, Next.js, Tailwind CSS',
    backendDatabases: 'Node.js, Flask, FastAPI, REST APIs, WebSockets, MySQL, Firebase, Firestore, Realtime Database',
    aiTooling: 'OpenAI API, Anthropic API, Gemini API, LLM Integration, Prompt Engineering, Git, GitHub, GitHub Actions, CI/CD, Vercel',
  },
  experience: [
    {
      role: 'Frontend Developer Intern',
      company: 'Hackiware',
      period: 'Sep 2025 – Mar 2026',
      location: 'Remote',
      officialUrl: 'https://www.hackiware.com/',
      devUrl: 'https://hacki-green.vercel.app/',
      bullets: [
        'Developed the startup’s official web platform from scratch as Lead Frontend Developer using Next.js, React, and Tailwind CSS.',
        'Shipped both production platform (hackiware.com) and staging release pipeline (hacki-green.vercel.app) with high-performance responsive UI and cybersecurity showcases.',
        'Collaborated directly with core leadership to transform cyber product specifications into modern, fast, SEO-optimized web experiences.',
      ],
    },
  ],
  projects: [
    {
      name: 'Sprinto — Real-Time Collaborative Workspace & Kanban Platform',
      period: 'Jul 2026 – Aug 2026',
      tech: 'Next.js, TypeScript, Firebase, Tailwind CSS, @dnd-kit, IndexedDB',
      liveDemo: 'https://sprinto-move.vercel.app/',
      github: 'https://github.com/PRANAV-SINGH-CSE/Sprinto',
      bullets: [
        'Developed a real-time collaborative Kanban platform using Next.js, TypeScript, and Firebase, enabling simultaneous multi-user board editing with live synchronization.',
        'Optimized real-time synchronization to achieve <1ms local UI updates and ~4.5ms median cross-client propagation, decoupled from the ~350ms average cloud write commit.',
        'Cut repeat-visit board load time from ~400ms (Firestore query) to ~5ms using an IndexedDB local cache layer.',
      ],
    },
    {
      name: 'LiveVoice AI — Real-Time Speech Intelligence & Desktop HUD Platform',
      period: 'Jun 2026 – Jul 2026',
      tech: 'Python, FastAPI, WebSockets, AsyncIO, PyQt5, Win32 API, JavaScript (ES6+), HTML5, CSS3, OpenAI API, Anthropic API, Faster-Whisper',
      liveDemo: '',
      github: '',
      bullets: [
        'Engineered a real-time voice assistant that transcribes speech and streams AI responses live, achieving sub-700ms latency from end of speech to first spoken token and a sub-1-second full response loop, measured via P50/P90 profiling across the audio-to-LLM pipeline.',
        'Tuned the speech-to-text stage to run at a 0.28x real-time factor (3.5x faster than speech) with Faster-Whisper, while the LLM streamed responses at ~197 tokens/sec.',
        'Designed a transparent, always-on-top desktop overlay controlled by global hotkeys for use during screen shares and calls.',
        'Implemented an async FastAPI backend that extracts key questions from streamed transcripts in real time, with full session history exportable to Markdown/JSON.',
      ],
    },
    {
      name: 'Review Radar — AI-Powered Review Intelligence & Sentiment Analysis Engine',
      period: 'Feb 2026 – Mar 2026',
      tech: 'Next.js 16, React 19, TypeScript, Google Gemini 2.5 Flash, Prisma ORM, MongoDB Atlas, Tailwind CSS, JWT',
      liveDemo: 'https://review-radar-virid.vercel.app/',
      github: 'https://github.com/PRANAV-SINGH-CSE/Review-Radar',
      bullets: [
        'Engineered an end-to-end sentiment intelligence tool using Next.js 16 (App Router), React 19, and TypeScript to analyze product URLs and extract customer feedback.',
        'Integrated Google Gemini 2.5 Flash API using strict JSON schema enforcement and zero-shot prompt engineering to generate review syntheses, pros/cons breakdowns, and percentage-based sentiment distributions.',
        'Designed normalized data models in MongoDB Atlas via Prisma ORM, ensuring user data isolation, sub-second query performance via indexed relational fields, and automated cache invalidation.',
        'Implemented custom session auth with JWT (jose) and Bcrypt.js, augmented with an AES-256-CBC reversible encryption engine and edge-based Next.js Middleware for route protection.',
      ],
    },
    {
      name: 'ZentiqAI — AI Chat Web Application',
      period: 'Feb 2026 – Apr 2026',
      tech: 'Python (Flask), JavaScript, Firebase, HTML, CSS',
      liveDemo: 'https://zentiqai.vercel.app/',
      github: 'https://github.com/PRANAV-SINGH-CSE/ZentiqAI_Chat_Bot',
      bullets: [
        'Created a full stack AI chat app with persistent, multi-session conversations and image upload, letting users pick up a conversation from any device.',
        'Engineered concurrent session handling on the backend so multiple users can chat at the same time without their session data colliding.',
        'Restructured the frontend into a modular, class-based JavaScript architecture for easier feature extension.',
      ],
    },
  ],
  education: {
    institution: 'Lovely Professional University (LPU)',
    degree: 'B.Tech, Computer Science and Engineering; TGPA:8.4',
  },
};

export const certificatesData: CertificateItem[] = [
  {
    id: 'nextjs-cipherschools',
    title: 'Full Stack Development Using Nextjs',
    issuer: 'CipherSchools',
    collaborator: 'Lovely Professional University',
    issuerCategory: 'CipherSchools',
    issueDate: 'August 2026',
    credentialId: 'CSW2026-18294',
    pdfUrl: '/certificates/Next.js certification.pdf',
    previewImage: '/certificates/previews/nextjs.png',
    category: 'Full-Stack & Web',
    type: 'Certification',
    skills: [
      'Next.js',
      'React.js',
      'Full Stack Web Development',
      'Server-Side Rendering (SSR)',
      'API Routes & App Router',
      'TypeScript',
    ],
    description:
      'Comprehensive certification in enterprise Next.js full stack engineering covering React Server Components, hybrid SSR/SSG rendering pipelines, dynamic routing, full-stack API architectures, and scalable web deployments.',
    signatory: 'CipherSchools Technical Directorate',
  },
  {
    id: 'react-techveda',
    title: '15+ Hours MOOC on React.js & Proctored Examination',
    issuer: 'Tech Veda',
    issuerCategory: 'Tech Veda',
    issueDate: 'March 22, 2025',
    credentialId: 'TV/MAR25/RJ/360',
    hours: '15+ Hours',
    pdfUrl: '/certificates/React.pdf',
    previewImage: '/certificates/previews/react.png',
    category: 'Full-Stack & Web',
    type: 'MOOC',
    skills: [
      'React.js',
      'Component Lifecycle',
      'Hooks & State',
      'Virtual DOM',
      'Frontend Architecture',
      'Proctored Examination',
    ],
    description:
      'Certificate of Appreciation awarded for demonstrating excellence in completing 15+ hours of comprehensive MOOC on React.js, including passing an official proctored examination covering modern React architecture, reusable component workflows, and reactive state management.',
    signatory: 'Tech Veda Assessment Directorate',
  },
  {
    id: 'workshop-genai-iiita',
    title: '5th International Workshop on Generative AI & Human Robot Interactions',
    issuer: 'Center for Intelligent Robotics, IIIT Allahabad',
    collaborator: 'IHFC & I-RAS HUB',
    issuerCategory: 'IIIT Allahabad',
    issueDate: 'February 14–16, 2025',
    period: '14 to 16 February 2025',
    pdfUrl: '/certificates/CIR Online Certificate - Pranav Singh.pdf',
    previewImage: '/certificates/previews/workshop-cir.png',
    category: 'Workshops & AI',
    type: 'Workshop',
    skills: [
      'Generative AI',
      'Human-Robot Interaction (HRI)',
      'Intelligent Robotics',
      'Multimodal AI',
      'Computer Vision & Perception',
      'AI Research & Systems',
    ],
    description:
      'Official Certificate of Participation for completing the Fifth International Workshop on Generative AI and Human Robot Interactions held at the Center for Intelligent Robotics (CIR), Indian Institute of Information Technology, Allahabad (IIIT Allahabad), exploring generative models, robotic perception, multimodal frameworks, and human-robot collaborative intelligence.',
    signatory: 'Prof. G. C. Nandi (Program Chairperson) & Prof. Vrijendra Singh (Program Co-Chairperson)',
  },
  {
    id: 'dsa-iamneo',
    title: 'Data Structure and Algorithm',
    issuer: 'iamneo (An NIIT Venture)',
    collaborator: 'Lovely Professional University',
    issuerCategory: 'iamneo',
    issueDate: 'June 16, 2026',
    period: '25-Jul-2025 to 15-Jan-2026',
    credentialId: '290m8C22c76bN5dO7BP1',
    pdfUrl: '/certificates/dsa.pdf',
    previewImage: '/certificates/previews/dsa.png',
    category: 'Data Structures & Algorithms',
    type: 'Certification',
    skills: [
      'Data Structures',
      'Algorithms',
      'Trees & Graphs',
      'Dynamic Programming',
      'Complexity Analysis',
      'Recursion',
    ],
    description:
      'Demonstrated strong commitment, consistency, and problem-solving excellence across core algorithmic design, asymptotic complexity, linear & non-linear data structures, and optimal time-space tradeoffs.',
    signatory: 'Senthikumar TP (Co-Founder & CEO, iamneo)',
  },
  {
    id: 'dbms-infosys',
    title: 'Database Management System Part - 1',
    issuer: 'Infosys | Springboard',
    issuerCategory: 'Infosys',
    issueDate: 'July 20, 2026',
    verificationUrl: 'https://verify.onwingspan.com',
    pdfUrl: '/certificates/dbms.pdf',
    previewImage: '/certificates/previews/dbms.png',
    category: 'Databases & Systems',
    type: 'Certification',
    skills: [
      'DBMS',
      'Relational Models',
      'SQL Queries',
      'Schema Normalization',
      'ACID Transactions',
      'Indexing',
    ],
    description:
      'Mastered relational database concepts, ER modeling, SQL querying, transactional integrity, data normalization (1NF to 3NF/BCNF), and performance optimization.',
    signatory: 'Satheesha B. Nanjappa (Senior Vice President, Infosys Limited)',
  },
  {
    id: 'java-iamneo',
    title: 'Programming in JAVA',
    issuer: 'iamneo (An NIIT Venture)',
    collaborator: 'Lovely Professional University',
    issuerCategory: 'iamneo',
    issueDate: 'May 21, 2026',
    period: '18-Jan-2026 to 20-May-2026',
    credentialId: '240L8cM6Aj0ck6Dl3Bm1',
    pdfUrl: '/certificates/java.pdf',
    previewImage: '/certificates/previews/java.png',
    category: 'Languages & OOP',
    type: 'Certification',
    skills: [
      'Java',
      'OOP Design',
      'Multithreading',
      'Collections Framework',
      'Exception Handling',
      'JVM Internals',
    ],
    description:
      'Comprehensive certification in Java enterprise programming covering object-oriented architecture, thread concurrency, memory models, stream APIs, and robust application structure.',
    signatory: 'Senthikumar TP (Co-Founder & CEO, iamneo)',
  },
  {
    id: 'cpp-infosys',
    title: 'Programming Using C++',
    issuer: 'Infosys | Springboard',
    issuerCategory: 'Infosys',
    issueDate: 'August 12, 2025',
    verificationUrl: 'https://verify.onwingspan.com',
    pdfUrl: '/certificates/c++.pdf',
    previewImage: '/certificates/previews/c++.png',
    category: 'Languages & OOP',
    type: 'Certification',
    skills: [
      'C++',
      'Object-Oriented Programming',
      'STL',
      'Pointers & References',
      'Memory Management',
      'Polymorphism',
    ],
    description:
      'Certified by Infosys in high-performance C++ systems development, standard template library (STL), RAII memory patterns, virtual dispatch, and low-level resource management.',
    signatory: 'Thirumala Arohi (Executive Vice President, Infosys Limited)',
  },
  {
    id: 'c-iamneo',
    title: 'Computer Programming (C Language)',
    issuer: 'iamneo',
    collaborator: 'Lovely Professional University',
    issuerCategory: 'iamneo',
    issueDate: 'May 05, 2025',
    period: 'January 2025 to May 2025',
    hours: '72 Hours',
    credentialId: '22DJ30K8bL5bM5Aj0Bk1',
    pdfUrl: '/certificates/C.pdf',
    previewImage: '/certificates/previews/c.png',
    category: 'Languages & OOP',
    type: 'Certification',
    skills: [
      'C Programming',
      'Pointers & Dynamic Memory',
      'Data Structures in C',
      'Low-Level Systems',
      'File I/O',
    ],
    description:
      '72-hour comprehensive hands-on program on the iamneo platform mastering procedural programming, pointer arithmetic, memory management with malloc/free, and modular architecture.',
    signatory: 'Senthil Kumar TP (Co-Founder & CEO, iamneo)',
  },
];
