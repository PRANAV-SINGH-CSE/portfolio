import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#030712] text-zinc-100 flex flex-col items-center justify-center p-6 text-center selection:bg-purple-500/30 selection:text-white">
      <div className="max-w-md w-full p-8 rounded-3xl liquid-glass border border-white/15 shadow-2xl space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glow-pill text-xs font-mono text-purple-400">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Error 404</span>
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold text-white">Page Not Found</h1>
          <p className="text-sm text-zinc-400">
            The page or case study you are looking for does not exist or has been moved.
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-[0_0_20px_rgba(168,85,247,0.35)] hover:scale-[1.02] transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Portfolio</span>
        </Link>
      </div>
    </div>
  );
}
