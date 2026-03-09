import { CheckCircle, XCircle, Clock } from 'lucide-react';
import type { AnswerRecord } from '../../types/progress';

interface RecentActivityProps {
  history: AnswerRecord[];
}

function timeAgo(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export function RecentActivity({ history }: RecentActivityProps) {
  const recent = history.slice(-10).reverse();

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm border border-slate-100">
      <div className="flex items-center gap-2">
        <Clock className="h-5 w-5 text-pink-400" />
        <h3 className="font-bold text-slate-800">Recent Activity</h3>
      </div>

      {recent.length === 0 ? (
        <p className="mt-4 text-center text-sm text-slate-500">
          No activity yet -- start practicing!
        </p>
      ) : (
        <ul className="mt-3 space-y-1.5">
          {recent.map((record, i) => (
            <li
              key={`${record.questionId}-${i}`}
              className="flex items-center gap-2 text-sm"
            >
              <span className="w-10 shrink-0 rounded bg-slate-100 px-1.5 py-0.5 text-center text-xs font-medium text-slate-500">
                {record.section}
              </span>
              <span className="min-w-0 flex-1 truncate text-slate-500">
                {record.questionId}
              </span>
              {record.correct ? (
                <CheckCircle className="h-4 w-4 shrink-0 text-emerald-500" />
              ) : (
                <XCircle className="h-4 w-4 shrink-0 text-red-500" />
              )}
              <span className="shrink-0 text-xs text-slate-500">
                {timeAgo(record.timestamp)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
