import { Star, Shield, Flame, Target } from 'lucide-react';
import type { Rank } from '../../types/gamification';

interface DashboardStatsProps {
  xp: number;
  rank: Rank;
  streak: number;
  questionsAnswered: number;
}

const stats = [
  { key: 'xp', icon: Star, label: 'Total XP' },
  { key: 'rank', icon: Shield, label: 'Rank' },
  { key: 'streak', icon: Flame, label: 'Day Streak' },
  { key: 'questions', icon: Target, label: 'Questions' },
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
            className="flex items-center gap-3 rounded-lg bg-navy-800 p-4"
          >
            <Icon className="h-6 w-6 shrink-0 text-gold-400" />
            <div className="min-w-0">
              <p className="truncate text-lg font-bold text-white">
                {values[s.key]}
              </p>
              <p className="text-xs text-navy-400">{s.label}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
