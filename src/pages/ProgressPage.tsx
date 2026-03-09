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
        <TrendingUp className="h-8 w-8 text-pink-500" />
        <h1 className="text-3xl font-bold text-slate-800">Flight Log</h1>
      </div>

      {/* Overall stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-2xl bg-white p-4 text-center shadow-sm border border-slate-100">
          <p className="text-2xl font-bold text-slate-800">{totalAnswered}</p>
          <p className="text-xs text-slate-500">Questions Answered</p>
        </div>
        <div className="rounded-2xl bg-white p-4 text-center shadow-sm border border-slate-100">
          <p className="text-2xl font-bold text-slate-800">{overallPct}%</p>
          <p className="text-xs text-slate-500">Overall Accuracy</p>
        </div>
        <div className="rounded-2xl bg-white p-4 text-center shadow-sm border border-slate-100">
          <p className="text-2xl font-bold text-slate-800">{totalMinutes}</p>
          <p className="text-xs text-slate-500">Minutes Studied</p>
        </div>
      </div>

      {/* Section breakdown */}
      <div>
        <h2 className="mb-3 text-lg font-semibold text-slate-800">Section Breakdown</h2>
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
        className="inline-flex items-center gap-2 rounded-xl bg-pink-400 px-4 py-2.5 font-semibold text-white hover:bg-pink-500 shadow-sm"
      >
        View Dashboard
      </Link>
    </div>
  );
}
