import { TrendingUp } from 'lucide-react';
import { Link } from 'react-router';
import { useProgressStore } from '../stores/progress-store';
import { ASTB_SECTIONS } from '../lib/constants';
import { SectionScoreCard } from '../components/dashboard/SectionScoreCard';

export function ProgressPage() {
  const sectionScores = useProgressStore((s) => s.sectionScores);
  const questionHistory = useProgressStore((s) => s.questionHistory);

  const totalAnswered = questionHistory.length;
  const totalCorrect = questionHistory.filter((r) => r.correct).length;
  const overallPct = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;
  const totalTimeMs = questionHistory.reduce((sum, r) => sum + r.timeSpentMs, 0);
  const totalMinutes = Math.round(totalTimeMs / 60000);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <TrendingUp className="h-8 w-8 text-gold-400" />
        <h1 className="text-3xl font-bold">Flight Log</h1>
      </div>

      {/* Overall stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-lg bg-navy-800 p-4 text-center">
          <p className="text-2xl font-bold text-white">{totalAnswered}</p>
          <p className="text-xs text-navy-400">Questions Answered</p>
        </div>
        <div className="rounded-lg bg-navy-800 p-4 text-center">
          <p className="text-2xl font-bold text-white">{overallPct}%</p>
          <p className="text-xs text-navy-400">Overall Accuracy</p>
        </div>
        <div className="rounded-lg bg-navy-800 p-4 text-center">
          <p className="text-2xl font-bold text-white">{totalMinutes}</p>
          <p className="text-xs text-navy-400">Minutes Studied</p>
        </div>
      </div>

      {/* Section breakdown */}
      <div>
        <h2 className="mb-3 text-lg font-semibold text-white">Section Breakdown</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {ASTB_SECTIONS.map((section) => (
            <SectionScoreCard
              key={section.id}
              section={section}
              score={sectionScores[section.id]}
            />
          ))}
        </div>
      </div>

      <Link
        to="/"
        className="inline-flex items-center gap-2 rounded-lg bg-gold-500 px-4 py-2.5 font-semibold text-navy-900 hover:bg-gold-400"
      >
        View Dashboard
      </Link>
    </div>
  );
}
