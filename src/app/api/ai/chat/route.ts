import { NextRequest, NextResponse } from 'next/server';
import {
  getPortfolioSystemContext,
  processPortfolioLocalQuery,
} from '@/lib/aiPortfolioEngine';
import { AIActionPayload, AIMessage } from '@/types';

// Extract keys list from environment
function getGeminiApiKeys(): string[] {
  const keysStr =
    process.env.GEMINI_API_KEYS ||
    process.env.GEMINI_API_KEY ||
    process.env.GOOGLE_API_KEY ||
    '';
  return keysStr
    .split(',')
    .map((k) => k.trim())
    .filter(Boolean);
}

// Available Gemini models in priority order
const GEMINI_MODELS = [
  'gemini-2.5-flash',
  'gemini-2.0-flash',
  'gemini-2.0-flash-lite',
  'gemini-1.5-flash',
];

interface ChatRequestBody {
  message: string;
  history?: AIMessage[];
}

export async function POST(req: NextRequest) {
  let message = '';
  let history: AIMessage[] = [];

  try {
    const body = (await req.json()) as ChatRequestBody;
    message = body.message?.trim() || '';
    history = body.history || [];
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }

  if (!message) {
    return NextResponse.json(
      { error: 'Message cannot be empty' },
      { status: 400 }
    );
  }

  const apiKeys = getGeminiApiKeys();

  // If no Gemini API keys configured, immediately use local engine
  if (apiKeys.length === 0) {
    const localResult = processPortfolioLocalQuery(message, history);
    return NextResponse.json({
      reply: localResult.reply,
      actions: localResult.actions,
      source: 'local_engine',
    });
  }

  const systemContext = getPortfolioSystemContext();

  const systemPrompt = `You are Pranav Singh (a Full Stack Developer & AI Systems Engineer), answering visitors directly from your personal portfolio.

### CRITICAL PERSONA & TONE DIRECTIVES:
1. FIRST-PERSON ONLY ("I", "my", "me"): Always speak as Pranav himself. Never refer to yourself in the third person as "Pranav" or "he" or "his". (e.g. say "I worked as a frontend intern at Hackiware", "Here are my certificates", "I built Sprinto using Next.js and Firebase", "Feel free to reach out to me at my email").
2. NATURAL & GROUNDED (NO OVER-EXAGGERATION): Do NOT use overly fancy buzzwords or excessive hype. Answer normally, cleanly, and honestly in a friendly, professional, and confident tone.
3. STRICTLY POSITIVE: Always be courteous, helpful, and highlight your real strengths, skills, and projects without dwelling on negative weaknesses or being repulsive.
4. ACCREDITED CERTIFICATES & WORKSHOPS (8 Credentials):
   - "nextjs-cipherschools": Full Stack Development Using Nextjs (CipherSchools & LPU)
   - "react-techveda": 15+ Hours MOOC on React.js & Proctored Examination (Tech Veda)
   - "workshop-genai-iiita": 5th International Workshop on Generative AI & Human Robot Interactions (Center for Intelligent Robotics, IIIT Allahabad)
   - "dsa-iamneo": Data Structure and Algorithm (iamneo - NIIT)
   - "dbms-infosys": Database Management System Part - 1 (Infosys Springboard)
   - "java-iamneo": Programming in JAVA (iamneo - NIIT)
   - "cpp-infosys": Programming Using C++ (Infosys Springboard)
   - "c-iamneo": Computer Programming in C (iamneo - 72 Hours)
5. CORE PROJECTS:
   - "sprinto": Real-time Kanban board with optimistic UI and live sync (Next.js, TypeScript, Firebase)
   - "livevoice-ai": Real-time voice transcription and AI HUD overlay (Python, FastAPI, Faster-Whisper, WebSockets)
   - "review-radar": AI product review sentiment analysis app (Next.js 16, Gemini API, Prisma ORM, MongoDB)
   - "zentiq-ai": Multi-session conversational AI chatbot (Flask, Firebase)
6. WEBPAGE SECTIONS:
   "hero", "about", "skills", "projects", "experience", "education", "certificates", "github", "contact".
7. DESIGN & AESTHETICS (GLASSMORPHISM):
   I actively use and champion **modern glassmorphism and liquid glass aesthetics** across my work.
   - **Sprinto** is built with a pure dark glass theme, featuring translucent frosted Kanban columns, \`backdrop-filter\` blur, and glowing borders.
   - **ZentiqAI** features a sleek dark frosted glass aesthetic with multi-device chat persistence.
   - **My Portfolio** uses liquid glass cards (\`backdrop-blur-2xl\`), gradient glow pills, and responsive cyber themes.
   - **LiveVoice AI** features a transparent, always-on-top desktop HUD overlay.

### JSON RESPONSE FORMAT:
Respond with a clean JSON object:
{
  "reply": "Your normal, clear markdown response in first-person ('I', 'my', 'me')",
  "actions": [
    {
      "type": "navigate" | "open_certificate" | "open_project" | "open_resume" | "filter_certificates" | "copy_email" | "trigger_confetti",
      "target": "section_id_or_certificate_id_or_project_id",
      "label": "Button Label"
    }
  ]
}

Examples:
- If user asks to see your certificates:
  { "reply": "Sure! I'll take you down to my certificates section.", "actions": [{ "type": "navigate", "target": "certificates", "label": "📜 View My Certificates" }] }
- If user asks about Next.js cert:
  { "reply": "I completed a certification in Full Stack Development with Next.js from CipherSchools covering React Server Components, SSR, and API routes.", "actions": [{ "type": "open_certificate", "target": "nextjs-cipherschools", "label": "🔍 Preview Next.js Certificate" }] }
- If user asks about your experience:
  { "reply": "I worked as a Lead Frontend Developer Intern at Hackiware, where I built their official web platform from scratch using Next.js, React, and Tailwind CSS.", "actions": [{ "type": "navigate", "target": "experience", "label": "💼 View Experience" }] }

### PORTFOLIO KNOWLEDGE BASE:
${systemContext}
`;

  // Build the conversation payload for Gemini
  const conversationContents: Array<{
    role: 'user' | 'model';
    parts: Array<{ text: string }>;
  }> = [];

  // Add recent history for context
  const recentHistory = history.slice(-6);
  for (const h of recentHistory) {
    conversationContents.push({
      role: h.sender === 'user' ? 'user' : 'model',
      parts: [{ text: h.text }],
    });
  }

  // Add current query
  conversationContents.push({
    role: 'user',
    parts: [{ text: message }],
  });

  // Try API keys and models with fallback
  for (const apiKey of apiKeys) {
    for (const model of GEMINI_MODELS) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

        const payload = {
          system_instruction: {
            parts: [{ text: systemPrompt }],
          },
          contents: conversationContents,
          generationConfig: {
            temperature: 0.35,
            topP: 0.9,
            maxOutputTokens: 2048,
            responseMimeType: 'application/json',
          },
        };

        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          continue; // Try next model or key
        }

        const data = await response.json();
        const rawOutput =
          data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

        if (rawOutput) {
          try {
            // Clean markdown fences if Gemini added any
            let cleaned = rawOutput
              .replace(/^```json\s*/i, '')
              .replace(/^```\s*/i, '')
              .replace(/```\s*$/i, '')
              .trim();

            let parsed = JSON.parse(cleaned);

            // Handle double-encoded JSON if present
            if (typeof parsed === 'string') {
              try {
                parsed = JSON.parse(parsed);
              } catch {
                // keep parsed as string
              }
            }

            if (parsed && typeof parsed === 'object' && typeof parsed.reply === 'string') {
              // Ensure parsed.reply doesn't itself contain raw JSON
              let finalReply = parsed.reply;
              if (finalReply.trim().startsWith('{') && finalReply.trim().endsWith('}')) {
                try {
                  const nested = JSON.parse(finalReply);
                  if (nested && typeof nested.reply === 'string') {
                    finalReply = nested.reply;
                  }
                } catch {
                  // Keep finalReply as is
                }
              }

              return NextResponse.json({
                reply: finalReply,
                actions: Array.isArray(parsed.actions) ? parsed.actions : [],
                source: `gemini_${model}`,
              });
            }
          } catch {
            // If JSON parsing failed, try extracting reply regex or use local engine
            const replyMatch = /"reply"\s*:\s*"((?:[^"\\]|\\.)*)"/.exec(rawOutput);
            if (replyMatch && replyMatch[1]) {
              const unescaped = replyMatch[1].replace(/\\n/g, '\n').replace(/\\"/g, '"');
              return NextResponse.json({
                reply: unescaped,
                actions: [
                  {
                    type: 'navigate',
                    target: 'certificates',
                    label: '📜 View Certificates Section',
                  },
                ],
                source: `gemini_${model}_extracted`,
              });
            }
          }
        }
      } catch {
        // Continue to next key/model
        continue;
      }
    }
  }

  // Graceful fallback to local engine if all API attempts exhausted
  const fallback = processPortfolioLocalQuery(message, history);
  return NextResponse.json({
    reply: fallback.reply,
    actions: fallback.actions,
    source: 'local_engine_fallback',
  });
}
