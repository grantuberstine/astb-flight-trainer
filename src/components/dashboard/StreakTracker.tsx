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
    <div className="rounded-2xl bg-white p-4 shadow-sm border border-slate-100">
      <div className="flex items-center gap-2">
        <Flame className="h-5 w-5 text-pink-400" />
        <h3 className="font-bold text-slate-800">Streak</h3>
      </div>

      <div className="mt-3 flex gap-6">
        <div>
          <p className="text-2xl font-bold text-slate-800">{currentStreak}</p>
          <p className="text-xs text-slate-500">Current</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-slate-800">{longestStreak}</p>
          <p className="text-xs text-slate-500">Longest</p>
        </div>
        <div className="flex items-center gap-1.5">
          <Shield className={`h-5 w-5 ${streakFreezeAvailable ? 'text-emerald-500' : 'text-slate-400'}`} />
          <div>
            <p className="text-sm font-medium text-slate-800">
              {streakFreezeAvailable ? 'Available' : 'None'}
            </p>
            <p className="text-xs text-slate-500">Streak Freeze</p>
          </div>
        </div>
      </div>

      {!studiedToday && (
        <p className="mt-3 text-xs text-pink-500">
          Study today to keep your streak!
        </p>
      )}
    </div>
  );
}
