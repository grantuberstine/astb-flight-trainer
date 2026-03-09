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
    <div className="rounded-lg bg-navy-800 p-4">
      <div className="flex items-center gap-2">
        <Clock className="h-5 w-5 text-gold-400" />
        <h3 className="font-bold text-white">Recent Activity</h3>
      </div>

      {recent.length === 0 ? (
        <p className="mt-4 text-center text-sm text-navy-400">
          No activity yet -- start practicing!
        </p>
      ) : (
        <ul className="mt-3 space-y-1.5">
          {recent.map((record, i) => (
            <li
              key={`${record.questionId}-${i}`}
              className="flex items-center gap-2 text-sm"
            >
              <span className="w-10 shrink-0 rounded bg-navy-700 px-1.5 py-0.5 text-center text-xs font-medium text-navy-300">
                {record.section}
              </span>
              <span className="min-w-0 flex-1 truncate text-navy-300">
                {record.questionId}
              </span>
              {record.correct ? (
                <CheckCircle className="h-4 w-4 shrink-0 text-success" />
              ) : (
                <XCircle className="h-4 w-4 shrink-0 text-danger" />
              )}
              <span className="shrink-0 text-xs text-navy-500">
                {timeAgo(record.timestamp)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
