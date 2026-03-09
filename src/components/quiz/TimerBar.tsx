import { Clock } from 'lucide-react';

interface TimerBarProps {
  remaining: number;
  totalSeconds: number;
  isPaused: boolean;
}

export function TimerBar({ remaining, totalSeconds, isPaused }: TimerBarProps) {
  const fraction = totalSeconds > 0 ? remaining / totalSeconds : 0;
  const isLow = fraction < 0.2;

  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;
  const formatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className={`h-4 w-4 ${isLow ? 'text-red-500' : 'text-pink-400'}`} />
          <span
            className={`font-mono text-lg font-bold ${isLow ? 'text-red-500' : 'text-pink-500'}`}
          >
            {formatted}
          </span>
        </div>
        {isPaused && (
          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold uppercase text-slate-500">
            Paused
          </span>
        )}
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
        <div
          className={`h-full rounded-full transition-all duration-1000 ${
            isLow ? 'bg-red-500' : 'bg-pink-300'
          }`}
          style={{ width: `${fraction * 100}%` }}
        />
      </div>
    </div>
  );
}
