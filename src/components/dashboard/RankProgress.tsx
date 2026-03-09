import { Shield } from 'lucide-react';
import { useGamificationStore } from '../../stores/gamification-store';
import { getRankProgress } from '../../lib/xp';

export function RankProgress() {
  const xp = useGamificationStore((s) => s.xp);
  const rank = useGamificationStore((s) => s.rank);
  const { progress, nextRank, nextThreshold } = getRankProgress(xp, rank);

  return (
    <div className="rounded-lg bg-navy-800 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-gold-400" />
          <span className="font-bold text-white">{rank}</span>
        </div>
        <span className="text-sm text-navy-400">{xp.toLocaleString()} XP</span>
      </div>

      {/* Progress bar */}
      <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-navy-700">
        <div
          className="h-full rounded-full bg-gold-500 transition-all duration-500"
          style={{ width: `${Math.round(progress * 100)}%` }}
        />
      </div>

      <p className="mt-2 text-xs text-navy-400">
        {nextRank
          ? `Next: ${nextRank} at ${nextThreshold.toLocaleString()} XP`
          : 'Max Rank Achieved'}
      </p>
    </div>
  );
}
