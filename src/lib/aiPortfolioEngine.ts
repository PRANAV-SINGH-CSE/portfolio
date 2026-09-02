import {
  personalInfo,
  developerStats,
  skillCategories,
  projectsData,
  experienceItems,
  educationData,
  githubActivityData,
  resumeData,
  certificatesData,
} from '@/data/portfolioData';
import { AIActionPayload, AIMessage } from '@/types';

/**
 * Generates the rich, comprehensive portfolio context document for system prompt grounding.
 * Gives Gemini the full 200k-capable in-depth knowledge of all projects, architectures,
 * case studies, design aesthetics (including glassmorphism on Sprinto & ZentiqAI),
 * certificates, and skills.
 */
export function getPortfolioSystemContext(): string {
  const certsSummary = certificatesData
    .map(
      (c, i) =>
        `### ${i + 1}. [ID: ${c.id}] ${c.title}
- Issuer: ${c.issuer}${c.collaborator ? ` (Collaborator: ${c.collaborator})` : ''}
- Category: ${c.category} | Type: ${c.type || 'Certification'}
- Issue Date: ${c.issueDate} ${c.period ? `(Period: ${c.period})` : ''}
- Credential ID: ${c.credentialId || 'Verified Accreditation'}
- Verification URL: ${c.verificationUrl || 'Verified on Official Platform'}
- Skills Mastered: ${c.skills.join(', ')}
- Description: ${c.description}
${c.hours ? `- Hours: ${c.hours}` : ''}
${c.signatory ? `- Signatories: ${c.signatory}` : ''}`
    )
    .join('\n\n');

  const detailedProjects = projectsData
    .map(
      (p, i) =>
        `### ${i + 1}. [ID: ${p.id}] ${p.title}
- Tagline: ${p.tagline}
- Category: ${p.category}
- Tech Stack: ${p.tags.join(', ')}
- Live URL: ${p.liveUrl || 'Available in codebase / private deployment'}
- GitHub URL: ${p.githubUrl || 'N/A'}
- Overview: ${p.description}
- Key Highlights:
${p.highlights.map((h) => `  * ${h}`).join('\n')}
${p.stats ? `- Key Stats: ${p.stats.map((s) => `${s.label}: ${s.value}`).join(' | ')}` : ''}
- Case Study Problem: ${p.caseStudy.problem}
- Case Study Solution: ${p.caseStudy.solution}
- Architecture Layers:
${p.caseStudy.architectureSteps.map((step) => `  * [${step.layer}] ${step.title}: ${step.desc} (Tech: ${step.tech})`).join('\n')}
- Challenges Solved:
${p.caseStudy.challenges.map((c) => `  * ${c.title}: ${c.solution}`).join('\n')}
- Measurable Results:
${p.caseStudy.results.map((r) => `  * ${r}`).join('\n')}
- Metrics: ${p.caseStudy.metrics.map((m) => `${m.label}: ${m.value}${m.trend ? ` (${m.trend})` : ''}`).join(' | ')}`
    )
    .join('\n\n');

  const detailedSkills = skillCategories
    .map(
      (cat) =>
        `* **${cat.name}** (${cat.description}): ${cat.skills.map((s) => `${s.name} (${s.level}% proficiency)`).join(', ')}`
    )
    .join('\n');

  const detailedExp = experienceItems
    .map(
      (e) =>
        `### ${e.role} @ ${e.organization}
- Period: ${e.period} | Location: ${e.location} | Type: ${e.type}
- Badge: ${e.badge}
- Responsibilities & Impact:
${e.description.map((d) => `  * ${d}`).join('\n')}
- Skills Used: ${e.skills.join(', ')}
${e.links ? `- Official Links: ${e.links.map((l) => `${l.label} (${l.url})`).join(', ')}` : ''}`
    )
    .join('\n\n');

  return `
=== PRANAV SINGH PORTFOLIO KNOWLEDGE BASE ===

## 1. PERSONAL INFORMATION & BIO
- Name: ${personalInfo.name} (${personalInfo.shortName})
- Title: ${personalInfo.role}
- Positioning Statement: ${personalInfo.positioningStatement}
- Detailed Summary: ${personalInfo.detailedDescription}
- Bio: ${personalInfo.bio}
- Location: ${personalInfo.location}
- Availability Status: ${personalInfo.status}
- Contact Email: ${personalInfo.email}
- Contact Phone: +91 ${personalInfo.phone}
- GitHub: ${personalInfo.github} (${personalInfo.githubUsername})
- LinkedIn: ${personalInfo.linkedin}
- CV / Resume PDF: ${personalInfo.cvUrl}

## 2. DESIGN & UI/UX PHILOSOPHY (GLASSMORPHISM & CYBER AESTHETICS)
- **Glassmorphism & Liquid Glass**: I heavily use modern glassmorphism and liquid glass aesthetics across my projects!
  * **Sprinto**: Designed with a pure glass theme featuring translucent frosted glass Kanban columns, sleek cards with backdrop blur (\`backdrop-filter: blur(20px)\`), glowing cyan/purple borders, and optimistic sub-1ms state transitions.
  * **ZentiqAI**: Features a dark frosted glass aesthetic with multi-device chat persistence and translucent glass panels.
  * **Personal Portfolio**: Built with pure liquid glass cards (\`liquid-glass-card\`), ambient liquid mesh background, and glowing cyan/violet accents.
  * **LiveVoice AI**: Features a transparent, always-on-top desktop HUD overlay with clean glassmorphism for seamless screen sharing and meetings.

## 3. CORE FLAGSHIP PROJECTS (FULL ARCHITECTURE & CASE STUDIES)
${detailedProjects}

## 4. VERIFIED CERTIFICATES & WORKSHOPS (${certificatesData.length} CREDENTIALS)
${certsSummary}

## 5. TECHNICAL SKILLS & PROFICIENCY
${detailedSkills}

## 6. PROFESSIONAL WORK EXPERIENCE & INTERNSHIP
${detailedExp}

## 7. EDUCATION & ACADEMIC BACKGROUND
- Institution: ${educationData.institution}
- Degree: ${educationData.degree} in ${educationData.field}
- Academic Performance: ${educationData.grade}
- Timeline: ${educationData.period} | Location: ${educationData.location}
- Highlights: ${educationData.highlights.join(' | ')}
- Coursework: ${educationData.coursework.join(', ')}

## 8. GITHUB & OPEN SOURCE METRICS
- Profile: ${githubActivityData.profileUrl}
- Total Contributions: ${githubActivityData.stats.totalContributions}
- Current Streak: ${githubActivityData.stats.currentStreak}
- Repositories: ${githubActivityData.stats.repositories}
- Languages: ${githubActivityData.languages.map((l) => `${l.name} (${l.percentage}%)`).join(', ')}
=============================================
`;
}

/**
 * Local AI Query Processor with first-person natural responses and action generation.
 * Speaks directly as Pranav ("I", "my", "me") in a grounded, clean, unexaggerated tone.
 */
export function processPortfolioLocalQuery(
  rawQuery: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  history: AIMessage[] = []
): { reply: string; actions: AIActionPayload[] } {
  const query = rawQuery.trim().toLowerCase();

  // 1. Direct Navigation / Section scroll requests
  if (
    query.includes('direct to cert') ||
    query.includes('navigate to cert') ||
    query.includes('scroll to cert') ||
    query.includes('go to cert') ||
    query.includes('show cert section') ||
    query.includes('take me to cert')
  ) {
    return {
      reply: `Sure! I'll direct you to my **Certificates & Workshops** section.\n\nI have **${certificatesData.length} verified credentials** across Full-Stack Next.js, React, IIIT Allahabad GenAI, DSA, DBMS, Java, C++, and C.\n\nYou can click any certificate below to view it directly:`,
      actions: [
        { type: 'navigate', target: 'certificates', label: '📜 View Certificates Section' },
        { type: 'open_certificate', target: 'nextjs-cipherschools', label: '⚡ Next.js Certificate' },
        { type: 'open_certificate', target: 'workshop-genai-iiita', label: '🤖 IIIT-A GenAI Workshop' },
      ],
    };
  }

  // 2. Design & Glassmorphism Questions
  if (
    query.includes('glass') ||
    query.includes('glassmorphism') ||
    query.includes('ui design') ||
    query.includes('design system') ||
    query.includes('theme') ||
    query.includes('aesthetic')
  ) {
    return {
      reply: `Yes, I actively design with **glassmorphism and liquid glass aesthetics** across my projects:\n\n* **Sprinto**: Built with a pure dark glass theme, featuring translucent frosted Kanban columns, \`backdrop-filter\` blur effects, glowing border strokes, and sub-1ms optimistic updates.\n* **ZentiqAI**: Built with a sleek frosted glass interface with multi-session chat persistence.\n* **LiveVoice AI**: Features a transparent, always-on-top desktop HUD overlay designed for screen sharing.\n* **My Portfolio**: Uses custom liquid glass cards (\`backdrop-blur-2xl\`), gradient glow pills, and responsive mesh backgrounds.\n\nI focus on pairing modern glass visual design with sub-millisecond responsiveness.`,
      actions: [
        { type: 'open_project', target: 'sprinto', label: '🚀 View Sprinto (Glass Theme)' },
        { type: 'open_project', target: 'livevoice-ai', label: '🎙️ View LiveVoice AI HUD' },
        { type: 'navigate', target: 'projects', label: '🚀 Explore All Projects' },
      ],
    };
  }

  // 3. Specific Certificate Queries
  if (
    query.includes('next.js cert') ||
    query.includes('nextjs cert') ||
    (query.includes('next') && query.includes('cert'))
  ) {
    const cert = certificatesData.find((c) => c.id === 'nextjs-cipherschools')!;
    return {
      reply: `### 📜 ${cert.title}\n* **Issued by**: ${cert.issuer} (in collaboration with ${cert.collaborator})\n* **Date & Credential ID**: ${cert.issueDate} • \`${cert.credentialId}\`\n* **Topics covered**: ${cert.skills.join(', ')}\n\n${cert.description}`,
      actions: [
        { type: 'open_certificate', target: cert.id, label: '🔍 Open Next.js Certificate' },
        { type: 'navigate', target: 'certificates', label: '📜 View All Certificates' },
      ],
    };
  }

  if (query.includes('react cert') || (query.includes('react') && query.includes('cert'))) {
    const cert = certificatesData.find((c) => c.id === 'react-techveda')!;
    return {
      reply: `### 📜 ${cert.title}\n* **Issued by**: ${cert.issuer}\n* **Date & Credential ID**: ${cert.issueDate} • \`${cert.credentialId}\` (${cert.hours})\n* **Topics covered**: ${cert.skills.join(', ')}\n\n${cert.description}`,
      actions: [
        { type: 'open_certificate', target: cert.id, label: '🔍 Open React Certificate' },
        { type: 'navigate', target: 'certificates', label: '📜 View All Certificates' },
      ],
    };
  }

  if (
    query.includes('genai') ||
    query.includes('iiit') ||
    query.includes('robotics') ||
    query.includes('workshop')
  ) {
    const cert = certificatesData.find((c) => c.id === 'workshop-genai-iiita')!;
    return {
      reply: `### 🤖 ${cert.title}\n* **Organized by**: Center for Intelligent Robotics, **IIIT Allahabad**\n* **Date**: ${cert.issueDate}\n* **Topics**: ${cert.skills.join(', ')}\n\n${cert.description}`,
      actions: [
        { type: 'open_certificate', target: cert.id, label: '🔍 Open IIIT Allahabad Workshop' },
        { type: 'navigate', target: 'certificates', label: '📜 View Certificates' },
      ],
    };
  }

  if (query.includes('dsa') || query.includes('algorithm') || query.includes('data structure')) {
    const cert = certificatesData.find((c) => c.id === 'dsa-iamneo')!;
    return {
      reply: `### 🧠 ${cert.title}\n* **Issued by**: ${cert.issuer} (An NIIT Venture)\n* **Date & Credential ID**: ${cert.issueDate} • \`${cert.credentialId}\`\n* **Topics covered**: ${cert.skills.join(', ')}\n\n${cert.description}`,
      actions: [
        { type: 'open_certificate', target: cert.id, label: '🔍 Open DSA Certificate' },
        { type: 'navigate', target: 'certificates', label: '📜 View Certificates' },
      ],
    };
  }

  if (query.includes('dbms') || query.includes('database') || query.includes('sql cert')) {
    const cert = certificatesData.find((c) => c.id === 'dbms-infosys')!;
    return {
      reply: `### 🗄️ ${cert.title}\n* **Issued by**: ${cert.issuer}\n* **Date**: ${cert.issueDate}\n* **Topics covered**: ${cert.skills.join(', ')}\n\n${cert.description}`,
      actions: [
        { type: 'open_certificate', target: cert.id, label: '🔍 Open DBMS Certificate' },
        { type: 'navigate', target: 'certificates', label: '📜 View Certificates' },
      ],
    };
  }

  if (query.includes('java cert') || (query.includes('java') && query.includes('cert'))) {
    const cert = certificatesData.find((c) => c.id === 'java-iamneo')!;
    return {
      reply: `### ☕ ${cert.title}\n* **Issued by**: ${cert.issuer} (An NIIT Venture)\n* **Date & Credential ID**: ${cert.issueDate} • \`${cert.credentialId}\`\n* **Topics covered**: ${cert.skills.join(', ')}\n\n${cert.description}`,
      actions: [
        { type: 'open_certificate', target: cert.id, label: '🔍 Open Java Certificate' },
        { type: 'navigate', target: 'certificates', label: '📜 View Certificates' },
      ],
    };
  }

  if (query.includes('c++') || query.includes('cpp')) {
    const cert = certificatesData.find((c) => c.id === 'cpp-infosys')!;
    return {
      reply: `### ⚡ ${cert.title}\n* **Issued by**: ${cert.issuer}\n* **Date**: ${cert.issueDate}\n* **Topics covered**: ${cert.skills.join(', ')}\n\n${cert.description}`,
      actions: [
        { type: 'open_certificate', target: cert.id, label: '🔍 Open C++ Certificate' },
        { type: 'navigate', target: 'certificates', label: '📜 View Certificates' },
      ],
    };
  }

  // 4. Comprehensive Certificate Summary Request
  if (
    query.includes('certificate') ||
    query.includes('certification') ||
    query.includes('credentials') ||
    query.includes('workshop') ||
    query.includes('cirtificate') ||
    query.includes('certif')
  ) {
    const certListMarkdown = certificatesData
      .map(
        (c, idx) =>
          `**${idx + 1}. ${c.title}**\n   * **Issuer**: ${c.issuer}${c.collaborator ? ` (${c.collaborator})` : ''} | 📅 ${c.issueDate}\n   * **Skills**: ${c.skills.slice(0, 4).join(', ')}`
      )
      .join('\n\n');

    return {
      reply: `## 📜 My Verified Certificates & Workshops

Here is a summary of my **${certificatesData.length} verified certifications and workshops**:

${certListMarkdown}

All credentials have verified IDs and official PDFs. You can jump down to the certificates section or click any button below:`,
      actions: [
        { type: 'navigate', target: 'certificates', label: '📜 View Certificates Section' },
        { type: 'open_certificate', target: 'nextjs-cipherschools', label: '⚡ Next.js Cert' },
        { type: 'open_certificate', target: 'workshop-genai-iiita', label: '🤖 IIIT-A GenAI' },
        { type: 'open_certificate', target: 'dsa-iamneo', label: '🧠 DSA Cert' },
      ],
    };
  }

  // 5. Projects Queries
  if (
    query.includes('project') ||
    query.includes('sprinto') ||
    query.includes('livevoice') ||
    query.includes('review radar') ||
    query.includes('zentiq') ||
    query.includes('built') ||
    query.includes('work')
  ) {
    if (query.includes('sprinto')) {
      const p = projectsData.find((proj) => proj.id === 'sprinto')!;
      return {
        reply: `### 🚀 ${p.title}\n${p.tagline}\n\n* **Tech Stack**: ${p.tags.join(', ')}\n* **UI/UX Design**: Pure glassmorphism theme with translucent frosted Kanban columns, \`backdrop-filter\` blur, and glowing border strokes.\n* **Architecture**: Optimistic UI with <1ms local updates, ~4.5ms WebSocket sync over Firestore, and ~5ms cached loads using IndexedDB.\n* **Live Demo**: [sprinto-move.vercel.app](${p.liveUrl})\n* **GitHub**: [github.com/PRANAV-SINGH-CSE/Sprinto](${p.githubUrl})`,
        actions: [
          { type: 'open_project', target: 'sprinto', label: '📂 Open Sprinto Case Study' },
          { type: 'navigate', target: 'projects', label: '🚀 View Projects' },
        ],
      };
    }

    if (query.includes('livevoice') || query.includes('voice') || query.includes('speech')) {
      const p = projectsData.find((proj) => proj.id === 'livevoice-ai')!;
      return {
        reply: `### 🎙️ ${p.title}\n${p.tagline}\n\n* **Tech Stack**: ${p.tags.join(', ')}\n* **Overview**: I built a real-time voice assistant with a transparent desktop HUD overlay using Faster-Whisper, FastAPI, and PyQt5.`,
        actions: [
          { type: 'open_project', target: 'livevoice-ai', label: '📂 Open LiveVoice AI Case Study' },
          { type: 'navigate', target: 'projects', label: '🚀 View Projects' },
        ],
      };
    }

    if (query.includes('review') || query.includes('radar') || query.includes('sentiment')) {
      const p = projectsData.find((proj) => proj.id === 'review-radar')!;
      return {
        reply: `### 🔍 ${p.title}\n${p.tagline}\n\n* **Tech Stack**: ${p.tags.join(', ')}\n* **Overview**: An AI review intelligence app using Gemini 2.5 Flash for structured pros/cons analysis, Prisma ORM, and MongoDB Atlas.\n* **Live Demo**: [review-radar-virid.vercel.app](${p.liveUrl})`,
        actions: [
          { type: 'open_project', target: 'review-radar', label: '📂 Open Review Radar Case Study' },
          { type: 'navigate', target: 'projects', label: '🚀 View Projects' },
        ],
      };
    }

    const projectsList = projectsData
      .map(
        (p, idx) =>
          `**${idx + 1}. ${p.title}** (${p.category})\n   * ${p.tagline}\n   * **Tech**: ${p.tags.slice(0, 4).join(', ')}`
      )
      .join('\n\n');

    return {
      reply: `## 🚀 My Core Projects

Here are the main projects I've built:

${projectsList}

Feel free to click any project to view its full architectural case study and details:`,
      actions: [
        { type: 'navigate', target: 'projects', label: '🚀 Go to Projects' },
        { type: 'open_project', target: 'sprinto', label: '⚡ Sprinto (Glass Theme)' },
        { type: 'open_project', target: 'livevoice-ai', label: '🎙️ LiveVoice AI' },
        { type: 'open_project', target: 'review-radar', label: '🔍 Review Radar' },
      ],
    };
  }

  // 6. Skills & Tech Stack Queries
  if (
    query.includes('skill') ||
    query.includes('stack') ||
    query.includes('technolog') ||
    query.includes('language') ||
    query.includes('framework') ||
    query.includes('tool')
  ) {
    return {
      reply: `## 🛠️ My Technical Skills

* **Languages**: JavaScript, TypeScript, Python, Java, C++, C, SQL.
* **Frontend & UI**: React 19, Next.js 16 (App Router, SSR), Tailwind CSS, Glassmorphism, Framer Motion.
* **Backend & APIs**: Node.js, Python (FastAPI, Flask), REST APIs, WebSockets.
* **Databases**: PostgreSQL, MySQL, MongoDB Atlas, Prisma ORM, Firebase Firestore, IndexedDB.
* **AI Tooling**: Google Gemini API, OpenAI API, Anthropic API, Faster-Whisper.
* **DevOps**: Git, GitHub Actions, Vercel.`,
      actions: [
        { type: 'navigate', target: 'skills', label: '🛠️ View Skills Section' },
        { type: 'open_resume', label: '📄 Open Resume' },
      ],
    };
  }

  // 7. Experience & Internship Queries
  if (
    query.includes('experience') ||
    query.includes('intern') ||
    query.includes('hackiware') ||
    query.includes('work history') ||
    query.includes('company')
  ) {
    const hackiware = experienceItems[0];
    return {
      reply: `## 💼 My Experience

### 🌟 Lead Frontend Developer Intern @ **${hackiware.organization}** (${hackiware.period})
* I built Hackiware's official web platform from scratch using Next.js, React, TypeScript, and Tailwind CSS.
* Shipped both the production site ([hackiware.com](${hackiware.links?.[0].url})) and dev staging pipelines.

### 🚀 Full Stack & Systems Builder (2025 – Present)
* Built **Sprinto** (real-time Kanban platform with glassmorphism theme), **LiveVoice AI** (speech AI HUD overlay), and **Review Radar** (sentiment intelligence).`,
      actions: [
        { type: 'navigate', target: 'experience', label: '💼 View Experience Section' },
        { type: 'open_resume', label: '📄 Open Resume' },
      ],
    };
  }

  // 8. Education Queries
  if (
    query.includes('education') ||
    query.includes('university') ||
    query.includes('college') ||
    query.includes('degree') ||
    query.includes('lpu') ||
    query.includes('cgpa') ||
    query.includes('gpa') ||
    query.includes('tgpa')
  ) {
    return {
      reply: `## 🎓 My Education

* **Degree**: ${educationData.degree} in **${educationData.field}**
* **Institution**: ${educationData.institution}
* **Grade**: **${educationData.grade}**
* **Period**: ${educationData.period}
* **Coursework**: ${educationData.coursework.join(', ')}`,
      actions: [
        { type: 'navigate', target: 'education', label: '🎓 View Education Section' },
        { type: 'navigate', target: 'certificates', label: '📜 View Certificates' },
      ],
    };
  }

  // 9. Contact & Hiring Queries
  if (
    query.includes('contact') ||
    query.includes('email') ||
    query.includes('hire') ||
    query.includes('reach') ||
    query.includes('phone') ||
    query.includes('touch') ||
    query.includes('linkedin')
  ) {
    return {
      reply: `## 📬 Get in Touch with Me

I am currently open to full-time roles, internships, and freelance projects!

* 📧 **Email**: \`${personalInfo.email}\`
* 📱 **Phone**: \`+91 ${personalInfo.phone}\`
* 💼 **LinkedIn**: [linkedin.com/in/pranav-signh](${personalInfo.linkedin})
* 🐙 **GitHub**: [github.com/PRANAV-SINGH-CSE](${personalInfo.github})

You can copy my email or fill out the contact form below:`,
      actions: [
        { type: 'copy_email', label: '📋 Copy My Email' },
        { type: 'navigate', target: 'contact', label: '📬 Open Contact Form' },
        { type: 'open_resume', label: '📄 View Resume' },
      ],
    };
  }

  // 10. Resume & CV Queries
  if (query.includes('resume') || query.includes('cv') || query.includes('download')) {
    return {
      reply: `## 📄 My Resume

You can view my interactive resume directly on this site or download the PDF version:`,
      actions: [
        { type: 'open_resume', label: '📄 Open Resume Modal' },
        { type: 'trigger_confetti', label: '🎉 Celebrate' },
      ],
    };
  }

  // 11. Greetings & General Inquiries
  return {
    reply: `👋 **Hi! I'm Pranav.**

Feel free to ask me anything about my work:
* 📜 **My Certificates & Workshops** (Next.js, React, IIIT-A GenAI, DSA, DBMS, Java, C++, C)
* 🚀 **Projects I've built** (Sprinto, LiveVoice AI, Review Radar, ZentiqAI)
* 🎨 **UI/UX Design & Glassmorphism themes**
* 🛠️ **My Tech Stack & Skills**
* 💼 **My Experience at Hackiware**
* 🧭 **Or ask me to direct you anywhere on the portfolio!**`,
    actions: [
      { type: 'navigate', target: 'certificates', label: '📜 Direct to Certificates' },
      { type: 'open_certificate', target: 'nextjs-cipherschools', label: '⚡ Next.js Certificate' },
      { type: 'open_project', target: 'sprinto', label: '🚀 Sprinto Project' },
      { type: 'open_resume', label: '📄 View Resume' },
    ],
  };
}
