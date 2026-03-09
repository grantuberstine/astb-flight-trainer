import {
  Plane, LayoutGrid, Star, Award, Calculator, BookOpen, Wrench,
  Compass, Eye, Flame, Shield, Zap, Timer, TrendingUp, Trophy, Lock,
} from 'lucide-react';
import { useGamificationStore } from '../../stores/gamification-store';
import { BADGE_DEFINITIONS } from '../../data/badges';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Plane, LayoutGrid, Star, Award, Calculator, BookOpen, Wrench,
  Compass, Eye, Flame, Shield, Zap, Timer, TrendingUp, Trophy,
};

export function BadgeGrid() {
  const badges = useGamificationStore((s) => s.badges);
  const earnedIds = new Set(badges.map((b) => b.id));

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm border border-slate-100">
      <div className="flex items-center gap-2">
        <Award className="h-5 w-5 text-pink-400" />
        <h3 className="font-bold text-slate-800">Badges</h3>
        <span className="ml-auto text-xs text-slate-500">
          {badges.length}/{BADGE_DEFINITIONS.length} earned
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {BADGE_DEFINITIONS.map((def) => {
          const earned = earnedIds.has(def.id);
          const Icon = ICON_MAP[def.icon] ?? Award;
          const earnedBadge = badges.find((b) => b.id === def.id);
          const earnedDate = earnedBadge?.earnedAt
            ? new Date(earnedBadge.earnedAt).toLocaleDateString()
            : null;

          return (
            <div
              key={def.id}
              className={`relative rounded-xl border p-3 text-center transition-all ${
                earned
                  ? 'border-pink-200 bg-pink-50'
                  : 'border-slate-200 bg-white'
              }`}
            >
              {!earned && (
                <Lock className="absolute right-1.5 top-1.5 h-3 w-3 text-slate-500" />
              )}
              <Icon className={`mx-auto h-7 w-7 ${earned ? 'text-pink-400' : 'text-slate-400'}`} />
              <p className={`mt-1.5 text-xs font-semibold ${earned ? 'text-slate-800' : 'text-slate-500'}`}>{def.name}</p>
              <p className={`mt-0.5 text-[10px] leading-tight ${earned ? 'text-slate-500' : 'text-slate-500'}`}>
                {def.description}
              </p>
              {earnedDate && (
                <p className="mt-1 text-[10px] text-pink-500">{earnedDate}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
