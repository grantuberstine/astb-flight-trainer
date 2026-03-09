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
    <div className="rounded-lg bg-navy-800 p-4">
      <div className="flex items-center gap-2">
        <Award className="h-5 w-5 text-gold-400" />
        <h3 className="font-bold text-white">Badges</h3>
        <span className="ml-auto text-xs text-navy-400">
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
              className={`relative rounded-lg border p-3 text-center transition-colors ${
                earned
                  ? 'border-gold-500/30 bg-navy-700'
                  : 'border-navy-700 bg-navy-800 opacity-40 grayscale'
              }`}
            >
              {!earned && (
                <Lock className="absolute right-1.5 top-1.5 h-3 w-3 text-navy-500" />
              )}
              <Icon className={`mx-auto h-7 w-7 ${earned ? 'text-gold-400' : 'text-navy-500'}`} />
              <p className="mt-1.5 text-xs font-semibold text-white">{def.name}</p>
              <p className="mt-0.5 text-[10px] leading-tight text-navy-400">
                {def.description}
              </p>
              {earnedDate && (
                <p className="mt-1 text-[10px] text-gold-500">{earnedDate}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
