import {
  Project,
  SkillCategory,
  ExperienceItem,
  EducationItem,
  DeveloperStat,
} from '@/types';

export const personalInfo = {
  name: 'Pranav Singh',
  shortName: 'Pranav',
  role: 'Full Stack Developer',
  positioningStatement:
    'Full Stack Developer building modern web applications and AI-powered products.',
  detailedDescription:
    'I build high-performance web applications and real-time AI platforms using React, Next.js, Python, Flask, FastAPI, Firebase, MongoDB, and LLM APIs.',
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
    detail: 'Lovely Professional University (LPU)',
    color: 'from-blue-500/20 to-cyan-500/20',
  },
  {
    icon: 'Laptop',
    label: 'Focus',
    value: 'Full Stack Development',
    detail: 'Next.js, React, Python, Flask, FastAPI',
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
    value: '4 Core Systems',
    detail: 'Sprinto, LiveVoice AI, ZentiqAI, Review Radar',
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
      { name: 'SQL', level: 88, highlight: true },
      { name: 'C++', level: 82 },
    ],
  },
  {
    name: 'Frontend',
    icon: 'Layout',
    description: 'Modern, responsive, component-driven user interfaces',
    skills: [
      { name: 'React', level: 95, highlight: true },
      { name: 'Next.js', level: 94, highlight: true },
      { name: 'Tailwind CSS', level: 95, highlight: true },
      { name: 'HTML', level: 96 },
      { name: 'CSS', level: 94 },
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
      { name: 'Firebase (Firestore)', level: 95, highlight: true },
      { name: 'Realtime Database', level: 92, highlight: true },
      { name: 'MongoDB Atlas', level: 88, highlight: true },
      { name: 'Prisma ORM', level: 90, highlight: true },
      { name: 'MySQL', level: 86 },
      { name: 'WebSockets & AsyncIO', level: 90 },
    ],
  },
  {
    name: 'AI & Tooling',
    icon: 'Sparkles',
    description: 'LLM integrations, speech models, version control, and CI/CD pipelines',
    skills: [
      { name: 'Gemini API (2.5 Flash)', level: 94, highlight: true },
      { name: 'Claude API', level: 90, highlight: true },
      { name: 'OpenAI API', level: 92 },
      { name: 'Faster-Whisper', level: 90, highlight: true },
      { name: 'Prompt Engineering', level: 92 },
      { name: 'JWT (jose) & AES-256', level: 90 },
      { name: 'Git & GitHub', level: 94, highlight: true },
      { name: 'CI/CD (GitHub Actions)', level: 88 },
      { name: 'PyQt5 & Win32 API', level: 85 },
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
      'Firebase (Firestore, Auth)',
      'Tailwind CSS',
      '@dnd-kit',
      'IndexedDB',
    ],
    liveUrl: 'https://sprinto-move.vercel.app/',
    githubUrl: 'https://github.com/PRANAV-SINGH-CSE/Sprinto',
    highlights: [
      'Built a real-time collaborative Kanban platform that lets multiple users edit the same board simultaneously without conflicts, replacing manual refreshes with live Firestore-backed sync.',
      'Profiled the full sync pipeline: optimistic UI updates render in under 1ms locally, while changes propagate to other clients in ~4.5ms median over Firestore\'s WebSocket channel, decoupled from the ~350ms average cloud write commit.',
      'Cut repeat-visit board load time from ~400ms (Firestore query) to ~5ms using an IndexedDB local cache layer, keeping the board responsive even on unstable connections.',
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
      'Faster-Whisper',
      'OpenAI API',
      'Anthropic API',
      'JavaScript (ES6+)',
      'HTML5',
      'CSS3',
    ],
    liveUrl: '',
    githubUrl: '',
    highlights: [
      'Built a real-time voice assistant that transcribes speech and streams AI responses live, achieving sub-700ms latency from end of speech to first spoken token and a sub-1-second full response loop, measured via P50/P90 profiling across the audio-to-LLM pipeline.',
      'Tuned the speech-to-text stage to run at a 0.28x real-time factor (3.5x faster than speech) with Faster-Whisper, while the LLM streamed responses at ~197 tokens/sec.',
      'Designed a transparent, always-on-top desktop overlay controlled by global hotkeys, usable during screen shares and calls without disrupting other applications.',
      'Built an async FastAPI backend that extracts key questions from streamed transcripts in real time, with full session history exportable to Markdown/JSON.',
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
    tagline: 'AI Chat Web Application with Persistent Multi-Session Concurrency',
    category: 'AI & Full-Stack',
    featured: true,
    description:
      'A full stack AI chat application with persistent multi-session conversations and image upload, engineered with concurrent session handling and a modular class-based architecture.',
    tags: [
      'Python (Flask)',
      'JavaScript',
      'Firebase (Firestore, Realtime Database)',
      'HTML',
      'CSS',
    ],
    liveUrl: 'https://zentiqai.vercel.app/',
    githubUrl: 'https://github.com/PRANAV-SINGH-CSE/ZentiqAI_Chat_Bot',
    highlights: [
      'Built a full stack AI chat app with persistent, multi-session conversations and image upload, letting users pick up a conversation from any device.',
      'Engineered concurrent session handling on the backend so multiple users can chat at the same time without their session data colliding.',
      'Rebuilt the frontend into a modular, class-based JavaScript architecture, making it straightforward to add new chat features without touching unrelated code.',
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
          tech: 'JavaScript (ES6+), HTML5, CSS3 Glassmorphism',
        },
        {
          layer: 'Backend API',
          title: 'Python Flask Concurrent Gateway',
          desc: 'Thread-safe REST API endpoints routing prompts, image payloads, and multi-user sessions concurrently.',
          tech: 'Python, Flask, REST APIs',
        },
        {
          layer: 'Data & Sync',
          title: 'Firebase Firestore & Realtime DB',
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
    tagline: 'AI-Powered E-Commerce Review Intelligence & Sentiment Analysis Engine',
    category: 'Systems & APIs',
    featured: true,
    description:
      'A full-stack product intelligence web application that leverages Google Gemini 2.5 Flash to transform unstructured e-commerce product reviews into structured sentiment metrics, executive summaries, and pros & cons breakdowns within an interactive multi-tenant dashboard.',
    tags: [
      'Next.js 16',
      'React 19',
      'TypeScript',
      'Google Gemini 2.5',
      'Prisma ORM v6',
      'MongoDB Atlas',
      'Tailwind CSS v4',
      'Framer Motion',
      'JWT (jose)',
      'Bcrypt & AES-256',
    ],
    liveUrl: 'https://review-radar-virid.vercel.app/',
    githubUrl: 'https://github.com/PRANAV-SINGH-CSE',
    highlights: [
      'Engineered an end-to-end sentiment intelligence tool using Next.js 16 (App Router), React 19, and TypeScript to analyze product URLs and extract customer feedback.',
      'Integrated Google Gemini 2.5 Flash API using strict JSON schema enforcement and zero-shot prompt engineering to generate review syntheses, pros/cons breakdowns, and percentage-based sentiment distributions.',
      'Designed normalized data models in MongoDB Atlas via Prisma ORM, ensuring user data isolation, sub-second query performance via indexed relational fields, and automated cache invalidation.',
      'Implemented custom session auth with JWT (jose) and Bcrypt.js, augmented with an AES-256-CBC reversible encryption engine and edge-based Next.js Middleware for route protection.',
      'Built a dynamic glassmorphic interface with Tailwind CSS v4 and Framer Motion, featuring multi-step loading indicators, paginated card grids, category filtering, search, and responsive inspector modals.',
    ],
    stats: [
      { label: 'AI Output Mode', value: 'Strict JSON' },
      { label: 'Database ORM', value: 'Prisma v6' },
      { label: 'Auth Runtime', value: 'Edge (jose)' },
    ],
    caseStudy: {
      problem:
        'Online shoppers and product managers waste hours reading through hundreds of mixed, unstructured product reviews across e-commerce platforms, suffering from review fatigue and biased opinions.',
      solution:
        'Engineered Review Radar: an automated sentiment synthesis platform. The user inputs any product URL, Next.js server route handlers invoke Google Gemini 2.5 Flash in structured JSON mode, and normalized summaries, pros/cons, and sentiment percentages are persisted in MongoDB Atlas via Prisma ORM for instant interactive inspection.',
      architectureSteps: [
        {
          layer: 'Client Portal',
          title: 'Next.js 16 & Framer Motion Dashboard',
          desc: 'Interactive liquid glass dashboard featuring paginated grid views, category filters, and multi-step animated loading states.',
          tech: 'Next.js 16, React 19, Framer Motion v12',
        },
        {
          layer: 'Route Handler & Auth',
          title: 'Edge Middleware & JWT Verification',
          desc: 'Edge-compatible route guards verifying signed tokens with jose, passing sanitized requests to backend handlers.',
          tech: 'Next.js Edge Middleware, jose, AES-256',
        },
        {
          layer: 'AI Sentiment Engine',
          title: 'Google Gemini 2.5 Flash Pipeline',
          desc: 'Executes structured prompt engineering with responseMimeType: "application/json" to synthesize pros, cons, and sentiment ratios.',
          tech: 'Google Gemini 2.5 Flash, JSON Schema',
        },
        {
          layer: 'Database Layer',
          title: 'MongoDB Atlas & Prisma ORM',
          desc: 'ACID transactions persisting User, Product, Review, and Analysis documents with indexed foreign keys.',
          tech: 'MongoDB Atlas, Prisma ORM v6',
        },
      ],
      challenges: [
        {
          title: 'LLM Output Determinism & Markdown Artifacts',
          solution:
            'Configured Gemini API with strict responseMimeType: "application/json" and created a pre-parse sanitization pipeline that strips rogue markdown backticks before runtime evaluation.',
        },
        {
          title: 'Edge-Compatible JWT Verification in Next.js Middleware',
          solution:
            'Replaced standard Node.js jsonwebtoken with jose, leveraging native Web Crypto APIs for signature validation across both Edge and Node runtimes.',
        },
      ],
      results: [
        'Transformed thousands of messy review paragraphs into instant executive verdicts with 100% structured reliability.',
        'Sub-second query performance across indexed MongoDB collections.',
      ],
      metrics: [
        { label: 'Parse Accuracy', value: '100%', trend: 'Structured JSON' },
        { label: 'Query Execution', value: '<20ms', trend: 'Prisma indexes' },
        { label: 'Auth Verification', value: '<5ms', trend: 'Edge runtime' },
      ],
    },
  },
];

export const experienceItems: ExperienceItem[] = [
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
      'Built Review Radar, an AI sentiment intelligence platform using Next.js 16 App Router, Gemini 2.5 Flash in structured JSON mode, Prisma ORM, MongoDB Atlas, and JWT edge auth.',
    ],
    skills: ['Next.js', 'React', 'Python', 'Flask', 'FastAPI', 'Firebase', 'MongoDB', 'Prisma', 'TypeScript', 'Tailwind CSS'],
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
      'Pursuing B.Tech in Computer Science and Engineering with core focus on Data Structures, Algorithms, Software Engineering, and Real-Time Systems.',
      'Active developer on GitHub (github.com/PRANAV-SINGH-CSE) publishing open-source projects and developer tools.',
    ],
    skills: ['JavaScript', 'TypeScript', 'Python', 'SQL', 'C++', 'Git/GitHub', 'CI/CD'],
  },
];

export const educationData: EducationItem = {
  degree: 'Bachelor of Technology (B.Tech)',
  field: 'Computer Science and Engineering',
  institution: 'Lovely Professional University (LPU)',
  period: '2024 – 2028',
  location: 'India',
  highlights: [
    'B.Tech in Computer Science and Engineering at Lovely Professional University (LPU)',
    'Core focus on Full Stack Development, Real-Time Distributed Systems, and AI & Speech Engines',
    'Active Open-Source Builder on GitHub: github.com/PRANAV-SINGH-CSE',
  ],
  coursework: [
    'Data Structures & Algorithms',
    'Object-Oriented Programming (C++ / Python)',
    'Database Management Systems (SQL, MongoDB & Firebase)',
    'Web Development (React, Next.js, Flask, Node.js)',
    'AI & Speech Recognition (LLMs, Whisper, Gemini APIs)',
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
  title: 'Full Stack Developer',
  contact: {
    email: 'pranasinghind@gmail.com',
    phone: '8077004381',
    linkedin: 'linkedin.com/in/pranav-signh',
    github: 'github.com/PRANAV-SINGH-CSE',
  },
  summary:
    'Full Stack Developer building real-time collaborative systems, low-latency speech AI engines, and full-stack web applications with Next.js, React, Python, Flask, FastAPI, Firebase, and MongoDB.',
  technicalSkills: {
    languages: 'JavaScript, TypeScript, Python, SQL, C++',
    frontend: 'HTML, CSS, React, Next.js, Tailwind CSS, @dnd-kit, Framer Motion, IndexedDB',
    backendDatabases: 'Node.js, Flask, FastAPI, REST APIs, MySQL, Firebase (Firestore, Realtime Database, Auth), MongoDB Atlas, Prisma ORM',
    aiTooling: 'LLM/AI API integration (Gemini, Claude, OpenAI), prompt engineering, Faster-Whisper, JWT (jose), AES-256, Git/GitHub, CI/CD (GitHub Actions)',
  },
  projects: [
    {
      name: 'Sprinto — Real-Time Collaborative Workspace & Kanban Platform',
      tech: 'Next.js, TypeScript, Firebase (Firestore, Auth), Tailwind CSS, @dnd-kit, IndexedDB',
      liveDemo: 'https://sprinto-move.vercel.app/',
      github: 'https://github.com/PRANAV-SINGH-CSE/Sprinto',
      bullets: [
        'Built a real-time collaborative Kanban platform that lets multiple users edit the same board simultaneously without conflicts, replacing manual refreshes with live Firestore-backed sync.',
        'Profiled the full sync pipeline: optimistic UI updates render in under 1ms locally, while changes propagate to other clients in ~4.5ms median over Firestore\'s WebSocket channel, decoupled from the ~350ms average cloud write commit.',
        'Cut repeat-visit board load time from ~400ms (Firestore query) to ~5ms using an IndexedDB local cache layer, keeping the board responsive even on unstable connections.',
      ],
    },
    {
      name: 'LiveVoice AI — Real-Time Speech Intelligence & Desktop HUD Platform',
      tech: 'Python, FastAPI, WebSockets, AsyncIO, PyQt5, Win32 API, JavaScript (ES6+), HTML5, CSS3, OpenAI API, Anthropic API, Faster-Whisper',
      liveDemo: '',
      github: '',
      bullets: [
        'Built a real-time voice assistant that transcribes speech and streams AI responses live, achieving sub-700ms latency from end of speech to first spoken token and a sub-1-second full response loop, measured via P50/P90 profiling across the audio-to-LLM pipeline.',
        'Tuned the speech-to-text stage to run at a 0.28x real-time factor (3.5x faster than speech) with Faster-Whisper, while the LLM streamed responses at ~197 tokens/sec.',
        'Designed a transparent, always-on-top desktop overlay controlled by global hotkeys, usable during screen shares and calls without disrupting other applications.',
        'Built an async FastAPI backend that extracts key questions from streamed transcripts in real time, with full session history exportable to Markdown/JSON.',
      ],
    },
    {
      name: 'ZentiqAI — AI Chat Web Application',
      tech: 'Python (Flask), JavaScript, Firebase (Firestore, Realtime Database), HTML, CSS',
      liveDemo: 'https://zentiqai.vercel.app/',
      github: 'https://github.com/PRANAV-SINGH-CSE/ZentiqAI_Chat_Bot',
      bullets: [
        'Built a full stack AI chat app with persistent, multi-session conversations and image upload, letting users pick up a conversation from any device.',
        'Engineered concurrent session handling on the backend so multiple users can chat at the same time without their session data colliding.',
        'Rebuilt the frontend into a modular, class-based JavaScript architecture, making it straightforward to add new chat features without touching unrelated code.',
      ],
    },
    {
      name: 'Review Radar — AI-Powered Review Intelligence & Sentiment Analysis Engine',
      tech: 'Next.js 16, React 19, TypeScript, Google Gemini 2.5 Flash, Prisma ORM v6, MongoDB Atlas, Tailwind CSS v4, Framer Motion, JWT (jose), Bcrypt, AES-256',
      liveDemo: 'https://review-radar-virid.vercel.app/',
      github: 'https://github.com/PRANAV-SINGH-CSE',
      bullets: [
        'Engineered an end-to-end sentiment intelligence tool using Next.js 16 (App Router), React 19, and TypeScript to analyze product URLs and extract customer feedback.',
        'Integrated Google Gemini 2.5 Flash API using strict JSON schema enforcement and zero-shot prompt engineering to generate review syntheses, pros/cons breakdowns, and percentage-based sentiment distributions.',
        'Designed normalized data models in MongoDB Atlas via Prisma ORM, ensuring user data isolation, sub-second query performance via indexed relational fields, and automated cache invalidation.',
        'Implemented custom session auth with JWT (jose) and Bcrypt.js, augmented with an AES-256-CBC reversible encryption engine and edge-based Next.js Middleware for route protection.',
      ],
    },
  ],
  education: {
    institution: 'Lovely Professional University (LPU)',
    degree: 'B.Tech, Computer Science and Engineering',
  },
};
