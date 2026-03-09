import { Flame, Shield } from 'lucide-react';
import { useGamificationStore } from '../../stores/gamification-store';

function isToday(dateStr: string | null): boolean {
  if (!dateStr) return false;
  return dateStr === new Date().toLocaleDateString('en-CA');
}

export function StreakTracker() {
  const currentStreak = useGamificationStore((s) => s.currentStreak);
  const longestStreak = useGamificationStore((s) => s.longestStreak);
  const streakFreezeAvailable = useGamificationStore((s) => s.streakFreezeAvailable);
  const lastActiveDate = useGamificationStore((s) => s.lastActiveDate);
  const studiedToday = isToday(lastActiveDate);

  return (
    <div className="rounded-lg bg-navy-800 p-4">
      <div className="flex items-center gap-2">
        <Flame className="h-5 w-5 text-gold-400" />
        <h3 className="font-bold text-white">Streak</h3>
      </div>

      <div className="mt-3 flex gap-6">
        <div>
          <p className="text-2xl font-bold text-white">{currentStreak}</p>
          <p className="text-xs text-navy-400">Current</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-white">{longestStreak}</p>
          <p className="text-xs text-navy-400">Longest</p>
        </div>
        <div className="flex items-center gap-1.5">
          <Shield className={`h-5 w-5 ${streakFreezeAvailable ? 'text-success' : 'text-navy-600'}`} />
          <div>
            <p className="text-sm font-medium text-white">
              {streakFreezeAvailable ? 'Available' : 'None'}
            </p>
            <p className="text-xs text-navy-400">Streak Freeze</p>
          </div>
        </div>
      </div>

      {!studiedToday && (
        <p className="mt-3 text-xs text-gold-400">
          Study today to keep your streak!
        </p>
      )}
    </div>
  );
}
