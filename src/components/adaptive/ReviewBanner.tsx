import { RefreshCw } from 'lucide-react';
import { Link } from 'react-router';
import { useReviewQueue } from '../../hooks/useReviewQueue';

export function ReviewBanner() {
  const { dueCount, hasDueCards } = useReviewQueue();

  if (!hasDueCards) return null;

  return (
    <div className="flex items-center justify-between rounded-xl border border-pink-200 bg-white shadow-sm px-4 py-3">
      <div className="flex items-center gap-3">
        <RefreshCw className="h-5 w-5 text-pink-500" />
        <p className="text-sm font-medium text-slate-800">
          You have{' '}
          <span className="font-bold text-pink-500">{dueCount}</span>{' '}
          {dueCount === 1 ? 'question' : 'questions'} to review
        </p>
      </div>
      <Link
        to="/practice"
        className="rounded-xl bg-pink-400 px-4 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-pink-500"
      >
        Review Now
      </Link>
    </div>
  );
}
