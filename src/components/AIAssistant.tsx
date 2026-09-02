'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Bot,
  Send,
  X,
  RotateCcw,
  ExternalLink,
  Check,
  ArrowRight,
  Zap,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { AIMessage, AIActionPayload, CertificateItem, Project } from '@/types';
import { certificatesData, projectsData, personalInfo } from '@/data/portfolioData';

interface AIAssistantProps {
  onNavigateSection: (sectionId: string) => void;
  onSelectCertificate: (cert: CertificateItem) => void;
  onSelectProject: (project: Project) => void;
  onOpenResume: () => void;
}

const quickPrompts = [
  { icon: '📜', label: 'My Certificates', prompt: 'Tell me what are your certificates and summarize them' },
  { icon: '🎯', label: 'Go to Certificates', prompt: 'Direct me to your certificates section' },
  { icon: '⚡', label: 'Next.js Cert', prompt: 'Tell me about your Next.js certification' },
  { icon: '🤖', label: 'IIIT-A GenAI', prompt: 'Tell me about the Generative AI & Robotics workshop at IIIT Allahabad' },
  { icon: '🚀', label: 'My Projects', prompt: 'What are the main projects you have built?' },
  { icon: '🛠️', label: 'My Skills', prompt: 'What is your primary technical stack and skill level?' },
  { icon: '💼', label: 'Hackiware Experience', prompt: 'Tell me about your frontend internship experience at Hackiware' },
  { icon: '📄', label: 'My Resume', prompt: 'Show me your resume' },
  { icon: '📬', label: 'Contact Me', prompt: 'How can I get in touch with you?' },
];

const INITIAL_MESSAGE: AIMessage = {
  id: 'init-1',
  sender: 'assistant',
  text: `👋 **Hi! I'm Pranav.**

Welcome to my portfolio! You can ask me anything about:
* 📜 **My certificates & workshops** (Next.js, React, IIIT-A GenAI, DSA, DBMS, Java, C++, C)
* 🚀 **Projects I've built** (*Sprinto*, *LiveVoice AI*, *Review Radar*, *ZentiqAI*)
* 🛠️ **My skills & tech stack**
* 💼 **My work experience at Hackiware**

How can I help you today?`,
  timestamp: Date.now(),
  actions: [
    { type: 'navigate', target: 'certificates', label: '📜 View My Certificates' },
    { type: 'open_certificate', target: 'nextjs-cipherschools', label: '⚡ Next.js Certificate' },
    { type: 'open_project', target: 'sprinto', label: '🚀 Sprinto Project' },
    { type: 'open_resume', label: '📄 My Resume' },
  ],
};

// Subtle Web Audio synthesized futuristic sound effect
function playAITone(type: 'open' | 'send' | 'receive' | 'action') {
  if (typeof window === 'undefined') return;
  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;

    if (type === 'open') {
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.12);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.start(now);
      osc.stop(now + 0.15);
    } else if (type === 'send') {
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(680, now + 0.08);
      gain.gain.setValueAtTime(0.03, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
      osc.start(now);
      osc.stop(now + 0.09);
    } else if (type === 'receive') {
      osc.frequency.setValueAtTime(680, now);
      osc.frequency.exponentialRampToValueAtTime(920, now + 0.14);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
      osc.start(now);
      osc.stop(now + 0.16);
    } else if (type === 'action') {
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(1050, now + 0.1);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc.start(now);
      osc.stop(now + 0.12);
    }
  } catch {
    // Ignore audio context autoplay restrictions
  }
}

export default function AIAssistant({
  onNavigateSection,
  onSelectCertificate,
  onSelectProject,
  onOpenResume,
}: AIAssistantProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputQuery, setInputQuery] = useState<string>('');
  const [messages, setMessages] = useState<AIMessage[]>([INITIAL_MESSAGE]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [copiedNotification, setCopiedNotification] = useState<string | null>(null);

  const chatScrollContainerRef = useRef<HTMLDivElement>(null);
  const promptScrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Smooth Auto-scroll to bottom of chat messages container without layout thrashing
  const scrollToBottom = (smooth = true) => {
    if (chatScrollContainerRef.current) {
      const container = chatScrollContainerRef.current;
      container.scrollTo({
        top: container.scrollHeight,
        behavior: smooth ? 'smooth' : 'instant',
      });
    }
  };

  const handlePromptWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (promptScrollRef.current && e.deltaY !== 0) {
      promptScrollRef.current.scrollLeft += e.deltaY * 0.85;
    }
  };

  useEffect(() => {
    if (isOpen) {
      // Scroll to bottom once on initial drawer open
      scrollToBottom(false);
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Global Keyboard Shortcut: Ctrl+K / Cmd+K to toggle AI Chat
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => {
          if (!prev && soundEnabled) playAITone('open');
          return !prev;
        });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [soundEnabled]);

  // Execute Action Payload (Navigation, Modals, Confetti, Copy)
  const executeAction = (action: AIActionPayload) => {
    if (soundEnabled) playAITone('action');

    switch (action.type) {
      case 'navigate': {
        const targetId = action.target || 'certificates';
        onNavigateSection(targetId);
        break;
      }
      case 'open_certificate': {
        if (action.target) {
          const cert = certificatesData.find((c) => c.id === action.target);
          if (cert) {
            onSelectCertificate(cert);
          } else {
            onNavigateSection('certificates');
          }
        } else {
          onNavigateSection('certificates');
        }
        break;
      }
      case 'open_project': {
        if (action.target) {
          const proj = projectsData.find((p) => p.id === action.target);
          if (proj) {
            onSelectProject(proj);
          } else {
            onNavigateSection('projects');
          }
        } else {
          onNavigateSection('projects');
        }
        break;
      }
      case 'open_resume': {
        onOpenResume();
        break;
      }
      case 'copy_email': {
        if (typeof navigator !== 'undefined') {
          navigator.clipboard.writeText(personalInfo.email);
          setCopiedNotification('Email copied to clipboard!');
          setTimeout(() => setCopiedNotification(null), 3000);
        }
        break;
      }
      case 'trigger_confetti': {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.7 },
          colors: ['#a855f7', '#06b6d4', '#10b981', '#f59e0b'],
        });
        break;
      }
      default:
        break;
    }
  };

  // Scroll directly to the beginning/top of a specific message inside the container
  const scrollToMessageTop = (messageId: string) => {
    requestAnimationFrame(() => {
      const container = chatScrollContainerRef.current;
      const el = document.getElementById(`msg-${messageId}`);
      if (container && el) {
        const targetTop = el.offsetTop - 8;
        container.scrollTo({
          top: Math.max(0, targetTop),
          behavior: 'smooth',
        });
      }
    });
  };

  // Smooth typing effect that streams text and stays focused on the top of the answer
  const typeOutMessage = async (
    assistantMsgId: string,
    fullText: string,
    actions: AIActionPayload[]
  ) => {
    // Add initial placeholder message
    const placeholderMsg: AIMessage = {
      id: assistantMsgId,
      sender: 'assistant',
      text: '',
      timestamp: Date.now(),
      actions: [],
      isStreaming: true,
    };

    setMessages((prev) => [...prev, placeholderMsg]);
    setIsLoading(false);

    // Give DOM a frame to mount the element, then smoothly scroll to its top
    setTimeout(() => {
      scrollToMessageTop(assistantMsgId);
    }, 40);

    // Stream by tokens/words for ultra-smooth fluid typing
    const tokens = fullText.split(/(\s+)/);
    let currentText = '';

    for (let i = 0; i < tokens.length; i++) {
      currentText += tokens[i];
      const snapshot = currentText;

      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantMsgId
            ? { ...m, text: snapshot, isStreaming: true }
            : m
        )
      );

      // Typing speed (12-16ms per token)
      await new Promise((resolve) => setTimeout(resolve, 14));
    }

    // Complete streaming
    setMessages((prev) =>
      prev.map((m) =>
        m.id === assistantMsgId
          ? { ...m, text: fullText, actions: actions, isStreaming: false }
          : m
      )
    );

    if (soundEnabled) playAITone('receive');
  };

  const handleSendMessage = async (customText?: string) => {
    const query = (customText || inputQuery).trim();
    if (!query || isLoading) return;

    if (soundEnabled) playAITone('send');
    setInputQuery('');

    const userMessageId = `user-${Date.now()}`;
    const userMessage: AIMessage = {
      id: userMessageId,
      sender: 'user',
      text: query,
      timestamp: Date.now(),
    };

    const updatedHistory = [...messages, userMessage];
    setMessages(updatedHistory);
    setIsLoading(true);

    // Scroll to user message
    setTimeout(() => {
      scrollToMessageTop(userMessageId);
    }, 50);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          history: updatedHistory,
        }),
      });

      if (!response.ok) {
        throw new Error('API response not ok');
      }

      const data = await response.json();
      const replyText = data.reply || "I'm here to help you explore my portfolio!";
      const actions: AIActionPayload[] = data.actions || [];
      const assistantId = `assistant-${Date.now()}`;

      await typeOutMessage(assistantId, replyText, actions);

      // Auto-trigger navigation if the user asked to direct to certificates or section
      if (
        query.toLowerCase().includes('direct') ||
        query.toLowerCase().includes('navigate') ||
        query.toLowerCase().includes('take me to')
      ) {
        const navAction = actions.find((a) => a.type === 'navigate');
        if (navAction?.target) {
          executeAction(navAction);
        }
      }
    } catch {
      // Fallback
      const assistantId = `assistant-${Date.now()}`;
      const fallbackText = `### 📜 My Verified Certificates & Highlights\nI hold **8 officially verified certifications & workshops** across Next.js, React, IIIT Allahabad GenAI, DSA, DBMS, and Languages!\n\nClick below to inspect credentials or explore my projects:`;
      const fallbackActions: AIActionPayload[] = [
        { type: 'navigate', target: 'certificates', label: '📜 View My Certificates' },
        { type: 'open_certificate', target: 'nextjs-cipherschools', label: '⚡ Next.js Certificate' },
        { type: 'open_resume', label: '📄 My Resume' },
      ];

      await typeOutMessage(assistantId, fallbackText, fallbackActions);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    setMessages([INITIAL_MESSAGE]);
  };

  // Helper function to render markdown-like formatting cleanly
  const renderFormattedText = (text: string) => {
    const lines = text.split('\n');

    return (
      <div className="space-y-1.5 text-xs sm:text-[13px] leading-relaxed text-zinc-200">
        {lines.map((line, idx) => {
          if (!line.trim()) return <div key={idx} className="h-1" />;

          // Heading 3
          if (line.startsWith('### ')) {
            return (
              <h4 key={idx} className="text-sm font-bold text-cyan-300 pt-1 flex items-center gap-1.5">
                {line.replace('### ', '')}
              </h4>
            );
          }
          // Heading 2
          if (line.startsWith('## ')) {
            return (
              <h3 key={idx} className="text-sm sm:text-base font-extrabold text-white pt-1.5 pb-0.5 border-b border-white/10 flex items-center gap-1.5">
                {line.replace('## ', '')}
              </h3>
            );
          }
          // Bullet point
          if (line.trim().startsWith('* ') || line.trim().startsWith('- ')) {
            const content = line.trim().substring(2);
            return (
              <div key={idx} className="flex items-start gap-1.5 pl-1">
                <span className="text-cyan-400 font-bold shrink-0 mt-0.5">•</span>
                <span className="flex-1">{formatInline(content)}</span>
              </div>
            );
          }
          // Numbered item
          if (/^\d+\.\s/.test(line.trim())) {
            return (
              <div key={idx} className="pl-1 text-zinc-100 font-medium">
                {formatInline(line)}
              </div>
            );
          }

          return <p key={idx}>{formatInline(line)}</p>;
        })}
      </div>
    );
  };

  // Inline formatting for bold, code, links
  const formatInline = (str: string) => {
    const parts: React.ReactNode[] = [];
    // Regex matching **bold**, `code`, [text](url)
    const regex = /(\*\*.*?\*\*|`.*?`|\[.*?\]\(.*?\))/g;
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(str)) !== null) {
      if (match.index > lastIndex) {
        parts.push(str.substring(lastIndex, match.index));
      }
      const token = match[0];
      if (token.startsWith('**') && token.endsWith('**')) {
        parts.push(
          <strong key={match.index} className="font-bold text-white">
            {token.slice(2, -2)}
          </strong>
        );
      } else if (token.startsWith('`') && token.endsWith('`')) {
        parts.push(
          <code
            key={match.index}
            className="px-1 py-0.5 rounded bg-white/[0.08] text-cyan-300 font-mono text-[11px] border border-white/10"
          >
            {token.slice(1, -1)}
          </code>
        );
      } else if (token.startsWith('[') && token.includes('](')) {
        const text = token.substring(1, token.indexOf(']('));
        const url = token.substring(token.indexOf('](') + 2, token.length - 1);
        parts.push(
          <a
            key={match.index}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:text-cyan-300 underline font-semibold inline-flex items-center gap-0.5"
          >
            {text}
            <ExternalLink className="w-2.5 h-2.5 inline" />
          </a>
        );
      }
      lastIndex = regex.lastIndex;
    }

    if (lastIndex < str.length) {
      parts.push(str.substring(lastIndex));
    }

    return parts.length > 0 ? parts : str;
  };

  return (
    <>
      {/* Toast notification for clipboard copy */}
      <AnimatePresence>
        {copiedNotification && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-[60] px-4 py-2 rounded-xl bg-emerald-500/90 text-white text-xs font-bold shadow-lg flex items-center gap-2 backdrop-blur-md"
          >
            <Check className="w-3.5 h-3.5" />
            <span>{copiedNotification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Small Circular Trigger Icon in Bottom-Right with Profile Picture */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center">
        <motion.button
          id="ai-assistant-toggle"
          onClick={() => {
            if (!isOpen && soundEnabled) playAITone('open');
            setIsOpen(!isOpen);
          }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          className="relative w-14 h-14 rounded-full p-[2px] bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-500 shadow-[0_0_25px_rgba(6,182,212,0.45),0_10px_30px_rgba(0,0,0,0.6)] cursor-pointer group flex items-center justify-center"
          aria-label="Toggle AI Assistant Copilot"
        >
          {/* Animated pulse ring */}
          <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 opacity-40 blur-sm group-hover:opacity-75 transition duration-500 animate-pulse" />

          <div className="relative w-full h-full rounded-full bg-[#060b18] flex items-center justify-center overflow-hidden border border-white/20">
            {/* Liquid aura inside button */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-transparent" />

            {isOpen ? (
              <X className="w-6 h-6 text-white z-10 transition-transform duration-300 rotate-0 group-hover:rotate-90" />
            ) : (
              <div className="relative z-10 flex items-center justify-center">
                <Bot className="w-6 h-6 text-cyan-300 group-hover:text-white transition-colors" />
                <Sparkles className="w-3.5 h-3.5 text-purple-400 absolute -top-1 -right-1.5 animate-spin" style={{ animationDuration: '6s' }} />
              </div>
            )}
          </div>

          {/* Active Status Live Badge */}
          {!isOpen && (
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-cyan-500 border-2 border-[#060b18]" />
            </span>
          )}
        </motion.button>
      </div>

      {/* Small Chat Window in Bottom Right Corner (NOT full page) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 25, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 25 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-22 right-4 sm:right-6 z-50 w-[94vw] max-w-[400px] h-[540px] max-h-[82vh] rounded-3xl bg-[#070d1e]/95 backdrop-blur-2xl border border-white/12 shadow-[0_25px_60px_rgba(0,0,0,0.85),0_0_35px_rgba(99,102,241,0.2)] flex flex-col overflow-hidden text-zinc-100 font-sans select-text"
          >
            {/* Header */}
            <div className="px-4 py-3.5 bg-white/[0.03] border-b border-white/10 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="relative w-9 h-9 rounded-full overflow-hidden border border-cyan-400/40 shadow-[0_0_12px_rgba(6,182,212,0.3)] shrink-0">
                  <Image
                    src="/profile.jpg"
                    alt="Pranav Singh"
                    fill
                    sizes="36px"
                    className="object-cover"
                  />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-[#070d1e]" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-white tracking-tight">Pranav Singh</h3>
                  <p className="text-[10px] text-zinc-400 font-mono">Portfolio Assistant • Ask me anything</p>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-1">
                {/* Sound effect toggle */}
                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${soundEnabled ? 'text-zinc-300 hover:text-white' : 'text-zinc-600'
                    }`}
                  title={soundEnabled ? 'Disable UI Chimes' : 'Enable UI Chimes'}
                  aria-label="Toggle UI chimes"
                >
                  <Zap className={`w-3.5 h-3.5 ${soundEnabled ? 'text-amber-400' : 'text-zinc-600'}`} />
                </button>

                {/* Reset History */}
                <button
                  onClick={handleClearHistory}
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                  title="Clear chat history"
                  aria-label="Clear chat"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>

                {/* Close Button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer ml-0.5"
                  aria-label="Close Assistant"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Suggestion Chips Bar with Smooth Scrolling */}
            <div
              ref={promptScrollRef}
              onWheel={handlePromptWheel}
              className="px-3 py-2 bg-black/20 border-b border-white/5 overflow-x-auto flex items-center gap-1.5 ai-chips-scroll shrink-0 text-nowrap select-none scroll-smooth"
            >
              {quickPrompts.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(item.prompt)}
                  disabled={isLoading}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-white/[0.04] hover:bg-cyan-500/15 text-zinc-300 hover:text-cyan-200 border border-white/8 hover:border-cyan-400/30 transition-all cursor-pointer whitespace-nowrap shrink-0 disabled:opacity-50 active:scale-95"
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>

            {/* Messages Scroll Area with GPU-Accelerated Smooth Scrolling */}
            <div
              ref={chatScrollContainerRef}
              className="flex-1 overflow-y-auto px-4 py-3 space-y-3.5 text-xs sm:text-sm ai-chat-scroll transform-gpu will-change-scroll"
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  id={`msg-${msg.id}`}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[88%] rounded-2xl p-3 sm:p-3.5 shadow-sm transform-gpu ${msg.sender === 'user'
                      ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white rounded-tr-xs'
                      : 'bg-white/[0.05] border border-white/10 text-zinc-200 rounded-tl-xs backdrop-blur-md'
                      }`}
                  >
                    {msg.sender === 'assistant' ? (
                      <div>
                        {renderFormattedText(msg.text)}
                        {msg.isStreaming && (
                          <span className="inline-block w-2 h-3.5 ml-1 bg-cyan-400 animate-pulse align-middle rounded-xs shadow-[0_0_8px_#22d3ee]" />
                        )}
                      </div>
                    ) : (
                      <p className="text-xs sm:text-[13px] leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                    )}

                    {/* Interactive Action Chips inside Assistant Bubble */}
                    {msg.sender === 'assistant' && !msg.isStreaming && msg.actions && msg.actions.length > 0 && (
                      <div className="mt-3 pt-2.5 border-t border-white/10 flex flex-wrap gap-1.5">
                        {msg.actions.map((act, actIdx) => (
                          <button
                            key={actIdx}
                            onClick={() => executeAction(act)}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-[11px] font-bold text-white bg-gradient-to-r from-cyan-500/30 to-purple-500/30 hover:from-cyan-500/50 hover:to-purple-500/50 border border-cyan-400/30 shadow-[0_0_15px_rgba(6,182,212,0.15)] hover:shadow-[0_0_20px_rgba(6,182,212,0.35)] transition-all cursor-pointer group active:scale-95"
                          >
                            <ArrowRight className="w-3 h-3 text-cyan-300 group-hover:translate-x-0.5 transition-transform" />
                            <span>{act.label || 'Execute Action'}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <span className="text-[9px] font-mono text-zinc-500 px-1 pt-1">
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              ))}

              {/* Loading indicator */}
              {isLoading && (
                <div className="flex items-start gap-2">
                  <div className="rounded-2xl p-3 bg-white/[0.05] border border-white/10 rounded-tl-xs flex items-center gap-2 text-xs text-zinc-400">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
                    <span>Thinking...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Input Bar */}
            <div className="p-3 bg-white/[0.02] border-t border-white/10 shrink-0">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="relative flex items-center gap-2"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  placeholder="Ask about certificates, projects, skills..."
                  disabled={isLoading}
                  className="flex-1 bg-white/[0.04] hover:bg-white/[0.07] focus:bg-white/[0.09] text-xs text-white placeholder-zinc-500 px-4 py-2.5 rounded-2xl border border-white/10 focus:border-cyan-400/50 focus:outline-none transition-colors"
                />

                {/* Send Button */}
                <button
                  type="submit"
                  disabled={!inputQuery.trim() || isLoading}
                  className="p-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-white disabled:opacity-30 disabled:cursor-not-allowed shadow-md hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all cursor-pointer shrink-0"
                  aria-label="Send query"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>

              <div className="flex items-center justify-between pt-1.5 px-1 text-[10px] text-zinc-500 font-mono">
                <span>Press Enter ↵ to send</span>
                <span>Ctrl + K to toggle</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
