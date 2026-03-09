import { Star, Shield, Flame, Target } from 'lucide-react';
import type { Rank } from '../../types/gamification';

interface DashboardStatsProps {
  xp: number;
  rank: Rank;
  streak: number;
  questionsAnswered: number;
}

const stats = [
  { key: 'xp', icon: Star, label: 'Total XP', iconColor: 'text-pink-400' },
  { key: 'rank', icon: Shield, label: 'Rank', iconColor: 'text-sky-400' },
  { key: 'streak', icon: Flame, label: 'Day Streak', iconColor: 'text-violet-400' },
  { key: 'questions', icon: Target, label: 'Questions', iconColor: 'text-pink-400' },
] as const;

export function DashboardStats({ xp, rank, streak, questionsAnswered }: DashboardStatsProps) {
  const values: Record<string, string | number> = {
    xp: xp.toLocaleString(),
    rank,
    streak,
    questions: questionsAnswered.toLocaleString(),
  };

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {stats.map((s) => {
        const Icon = s.icon;
        return (
          <div
            key={s.key}
            className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm border border-slate-100"
          >
            <Icon className={`h-6 w-6 shrink-0 ${s.iconColor}`} />
            <div className="min-w-0">
              <p className="truncate text-lg font-bold text-slate-800">
                {values[s.key]}
              </p>
              <p className="text-xs text-slate-500">{s.label}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
