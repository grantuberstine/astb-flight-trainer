import { Shield } from 'lucide-react';
import { useGamificationStore } from '../../stores/gamification-store';
import { getRankProgress } from '../../lib/xp';

export function RankProgress() {
  const xp = useGamificationStore((s) => s.xp);
  const rank = useGamificationStore((s) => s.rank);
  const { progress, nextRank, nextThreshold } = getRankProgress(xp, rank);

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm border border-slate-100">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-pink-400" />
          <span className="font-bold text-slate-800">{rank}</span>
        </div>
        <span className="text-sm text-slate-500">{xp.toLocaleString()} XP</span>
      </div>

      {/* Progress bar */}
      <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-pink-400 transition-all duration-500"
          style={{ width: `${Math.round(progress * 100)}%` }}
        />
      </div>

      <p className="mt-2 text-xs text-slate-500">
        {nextRank
          ? `Next: ${nextRank} at ${nextThreshold.toLocaleString()} XP`
          : 'Max Rank Achieved'}
      </p>
    </div>
  );
}
