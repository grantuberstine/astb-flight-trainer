import { TrendingUp } from 'lucide-react';

export function ProgressPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <TrendingUp className="h-8 w-8 text-gold-400" />
        <h1 className="text-3xl font-bold">Flight Log</h1>
      </div>

      <div className="rounded-lg bg-navy-800 p-8 text-center">
        <p className="text-lg text-navy-300">
          Track your training progress -- coming soon
        </p>
      </div>
    </div>
  );
}
