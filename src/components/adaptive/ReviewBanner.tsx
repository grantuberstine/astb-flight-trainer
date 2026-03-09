import { RefreshCw } from 'lucide-react';
import { Link } from 'react-router';
import { useReviewQueue } from '../../hooks/useReviewQueue';

export function ReviewBanner() {
  const { dueCount, hasDueCards } = useReviewQueue();

  if (!hasDueCards) return null;

  return (
    <div className="flex items-center justify-between rounded-xl border border-gold-400/30 bg-navy-800 px-4 py-3">
      <div className="flex items-center gap-3">
        <RefreshCw className="h-5 w-5 text-gold-400" />
        <p className="text-sm font-medium text-white">
          You have{' '}
          <span className="font-bold text-gold-400">{dueCount}</span>{' '}
          {dueCount === 1 ? 'question' : 'questions'} to review
        </p>
      </div>
      <Link
        to="/practice"
        className="rounded-lg bg-gold-500 px-4 py-1.5 text-sm font-semibold text-navy-900 transition-colors hover:bg-gold-400"
      >
        Review Now
      </Link>
    </div>
  );
}
