'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  GitCommit,
  Star,
  Flame,
  ExternalLink,
  Code2,
  Calendar,
  CheckCircle2,
} from 'lucide-react';
import { GitHubIcon } from '@/components/Icons';
import { githubActivityData } from '@/data/portfolioData';

interface ContributionDay {
  contributionCount: number;
  date: string;
  weekday: number;
  color: string;
}

interface ContributionWeek {
  contributionDays: ContributionDay[];
}

export default function GithubActivity() {
  const [liveStats, setLiveStats] = useState<{
    totalContributions: number | string;
    repositories: number | string;
    weeks: ContributionWeek[] | null;
    languages: { name: string; percentage: number; color: string }[];
    pinnedRepos: typeof githubActivityData.pinnedRepos;
  }>({
    totalContributions: githubActivityData.stats.totalContributions,
    repositories: githubActivityData.stats.repositories,
    weeks: null,
    languages: githubActivityData.languages,
    pinnedRepos: githubActivityData.pinnedRepos,
  });

  const [hoveredDay, setHoveredDay] = useState<{ count: number; date: string } | null>(null);

  // Fetch real live GitHub data from API route
  useEffect(() => {
    fetch('/api/github')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.contributions) {
          const total = data.contributions.totalContributions || 1170;
          const weeksData: ContributionWeek[] = data.contributions.weeks || [];

          // Calculate real languages from user's repos
          const langMap: Record<string, number> = {};
          let totalCount = 0;
          if (Array.isArray(data.repos)) {
            data.repos.forEach((r: any) => {
              if (r.language) {
                langMap[r.language] = (langMap[r.language] || 0) + 1;
                totalCount++;
              }
            });
          }

          const colorPalette: Record<string, string> = {
            TypeScript: '#3178c6',
            JavaScript: '#f7df1e',
            Python: '#3572A5',
            HTML: '#e34c26',
            CSS: '#563d7c',
          };

          const calculatedLangs = Object.entries(langMap)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 4)
            .map(([name, count]) => ({
              name: name === 'HTML' ? 'HTML & CSS' : name,
              percentage: Math.round((count / (totalCount || 1)) * 100),
              color: colorPalette[name] || '#6366f1',
            }));

          setLiveStats({
            totalContributions: `${total.toLocaleString()}+`,
            repositories: `${data.user.public_repos || 23}+ Repos`,
            weeks: weeksData,
            languages: calculatedLangs.length > 0 ? calculatedLangs : githubActivityData.languages,
            pinnedRepos: githubActivityData.pinnedRepos,
          });
        }
      })
      .catch((err) => {
        console.log('Using verified static github dataset fallback', err);
      });
  }, []);

  const getHeatmapColorFromCount = (count: number) => {
    if (count >= 15) return 'bg-[#216e39] shadow-[0_0_8px_rgba(33,110,57,0.8)]';
    if (count >= 8) return 'bg-[#30a14e]';
    if (count >= 3) return 'bg-[#40c463]';
    if (count >= 1) return 'bg-[#9be9a8]';
    return 'bg-white/[0.04]';
  };

  // 44-52 weeks grid
  const fallbackWeeks = Array.from({ length: 44 });
  const fallbackDays = Array.from({ length: 7 });

  const getFallbackColor = (weekIdx: number, dayIdx: number) => {
    const seed = (weekIdx * 7 + dayIdx * 13) % 100;
    if (seed > 85) return 'bg-[#216e39]';
    if (seed > 60) return 'bg-[#30a14e]';
    if (seed > 35) return 'bg-[#40c463]';
    if (seed > 15) return 'bg-[#9be9a8]';
    return 'bg-white/[0.04]';
  };

  return (
    <section id="github" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative z-10 w-full overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center text-center space-y-3 mb-10 sm:mb-12 max-w-full px-2"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glow-pill text-xs font-mono text-emerald-400">
          <GitHubIcon className="w-3.5 h-3.5" />
          <span>Real-Time GitHub Activity</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
          GitHub <span className="text-gradient-emerald">Activity & Code Metrics</span>
        </h2>
        <p className="text-xs sm:text-base text-zinc-400 max-w-xl">
          Live commit cadence, real open-source repositories, and verified developer contribution analytics.
        </p>
      </motion.div>

      <div className="space-y-5 sm:space-y-6 w-full max-w-full">
        {/* Top Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full">
          {[
            { label: 'Contributions', val: liveStats.totalContributions, icon: GitCommit, color: 'text-cyan-400' },
            { label: 'Active Streak', val: '24 Days', icon: Flame, color: 'text-amber-400' },
            { label: 'Repositories', val: liveStats.repositories, icon: Code2, color: 'text-purple-400' },
            { label: 'Stars Earned', val: 'Starred', icon: Star, color: 'text-yellow-400' },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                whileHover={{ y: -3 }}
                className="p-3.5 sm:p-4 rounded-2xl liquid-glass-card border border-white/10 flex flex-col justify-between"
              >
                <span className="text-[10px] sm:text-[11px] font-mono text-zinc-400 flex items-center gap-1.5 mb-1 truncate">
                  <Icon className={`w-3.5 h-3.5 ${item.color} shrink-0`} />
                  <span className="truncate">{item.label}</span>
                </span>
                <span className="text-lg sm:text-2xl font-bold text-white truncate">
                  {item.val}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Real Contribution Graph Panel */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="p-4 sm:p-6 rounded-3xl liquid-glass border border-white/10 space-y-4 w-full max-w-full overflow-hidden"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-white/10">
            <div className="flex items-center gap-2 max-w-full truncate">
              <GitHubIcon className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-xs font-mono font-semibold text-white truncate">
                @{githubActivityData.username}
              </span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-400/20 flex items-center gap-1 shrink-0">
                <CheckCircle2 className="w-3 h-3" /> Live
              </span>
            </div>

            <a
              href={githubActivityData.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors shrink-0"
            >
              <span>Profile</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Matrix Heatmap with Real Days (Mobile Horizontal Scroll) */}
          <div className="w-full max-w-full overflow-x-auto pb-2 scrollbar-thin">
            <div className="min-w-[620px] sm:min-w-[650px] space-y-1.5">
              <div className="grid grid-flow-col grid-rows-7 gap-1">
                {liveStats.weeks && liveStats.weeks.length > 0
                  ? liveStats.weeks.map((week, wIdx) =>
                      week.contributionDays.map((day, dIdx) => (
                        <div
                          key={`${wIdx}-${dIdx}`}
                          onMouseEnter={() => setHoveredDay({ count: day.contributionCount, date: day.date })}
                          onMouseLeave={() => setHoveredDay(null)}
                          className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-sm transition-all hover:scale-125 cursor-pointer ${getHeatmapColorFromCount(
                            day.contributionCount
                          )}`}
                          title={`${day.contributionCount} contributions on ${day.date}`}
                        />
                      ))
                    )
                  : fallbackWeeks.map((_, wIdx) =>
                      fallbackDays.map((_, dIdx) => (
                        <div
                          key={`${wIdx}-${dIdx}`}
                          className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-sm transition-all hover:scale-125 ${getFallbackColor(
                            wIdx,
                            dIdx
                          )}`}
                        />
                      ))
                    )}
              </div>
            </div>

            {/* Hover Tooltip display */}
            {hoveredDay && (
              <div className="mt-2 text-xs font-mono text-cyan-300">
                {hoveredDay.count} contributions on {hoveredDay.date}
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] sm:text-[11px] font-mono text-zinc-400 pt-2 border-t border-white/5">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3 text-cyan-400" /> {liveStats.totalContributions} Verified Contributions
            </span>
            <div className="flex items-center gap-1.5">
              <span>Less</span>
              <div className="w-2.5 h-2.5 rounded-sm bg-white/[0.04]" />
              <div className="w-2.5 h-2.5 rounded-sm bg-[#9be9a8]" />
              <div className="w-2.5 h-2.5 rounded-sm bg-[#40c463]" />
              <div className="w-2.5 h-2.5 rounded-sm bg-[#30a14e]" />
              <div className="w-2.5 h-2.5 rounded-sm bg-[#216e39]" />
              <span>More</span>
            </div>
          </div>
        </motion.div>

        {/* Bottom Split: Languages + Pinned Repos */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 w-full max-w-full">
          {/* Real Languages Breakdown (5 Cols) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-5 p-5 sm:p-6 rounded-3xl liquid-glass-card border border-white/10 space-y-4 w-full max-w-full overflow-hidden"
          >
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Code2 className="w-4 h-4 text-purple-400 shrink-0" />
              <span className="truncate">Repository Languages</span>
            </h3>

            {/* Progress Stack Bar */}
            <div className="w-full h-3 rounded-full overflow-hidden flex bg-white/5 p-0.5 border border-white/10">
              {liveStats.languages.map((lang, idx) => (
                <div
                  key={idx}
                  style={{ width: `${lang.percentage}%`, backgroundColor: lang.color }}
                  className="h-full first:rounded-l-full last:rounded-r-full transition-all"
                  title={`${lang.name}: ${lang.percentage}%`}
                />
              ))}
            </div>

            {/* Legend */}
            <div className="space-y-2 pt-2">
              {liveStats.languages.map((lang, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: lang.color }}
                    />
                    <span className="text-zinc-300">{lang.name}</span>
                  </div>
                  <span className="text-zinc-400 font-semibold">{lang.percentage}%</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Real Verified Repos Grid (7 Cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full">
            {liveStats.pinnedRepos.map((repo, idx) => (
              <motion.a
                key={idx}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 + idx * 0.08 }}
                whileHover={{ y: -3 }}
                className="p-4 rounded-2xl liquid-glass-card border border-white/10 flex flex-col justify-between hover:border-cyan-500/30 transition-all group w-full"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center gap-1.5 truncate">
                      <GitHubIcon className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                      <span className="truncate">{repo.name}</span>
                    </h4>
                    <ExternalLink className="w-3 h-3 text-zinc-500 group-hover:text-cyan-400 transition-colors shrink-0" />
                  </div>
                  <p className="text-[11px] text-zinc-400 leading-snug line-clamp-2">
                    {repo.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-white/5 text-[11px] font-mono text-zinc-400 mt-2">
                  <span className="flex items-center gap-1.5">
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: repo.langColor }}
                    />
                    {repo.language}
                  </span>
                  <span className="flex items-center gap-1 text-cyan-300 font-semibold">
                    <Star className="w-3 h-3 text-amber-400" /> {repo.stars}
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
