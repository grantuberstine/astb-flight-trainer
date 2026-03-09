import { Trophy, RotateCcw, ArrowLeft, Search, Star, Award } from 'lucide-react';
import type { Question } from '../../types/question';
import type { AnswerEntry } from '../../hooks/useQuizSession';
import { BADGE_DEFINITIONS } from '../../data/badges';

interface SessionSummaryProps {
  answers: AnswerEntry[];
  sectionName: string;
  questions: Question[];
  sessionXP?: number;
  newBadgeIds?: string[];
  onPracticeAgain: () => void;
  onBackToSections: () => void;
  onReviewMistakes: () => void;
}

export function SessionSummary({
  answers,
  sectionName,
  questions: _questions,
  sessionXP = 0,
  newBadgeIds = [],
  onPracticeAgain,
  onBackToSections,
  onReviewMistakes,
}: SessionSummaryProps) {
  const correct = answers.filter((a) => a.correct).length;
  const total = answers.length;
  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
  const totalTimeMs = answers.reduce((sum, a) => sum + a.timeMs, 0);
  const totalTimeSec = Math.round(totalTimeMs / 1000);
  const minutes = Math.floor(totalTimeSec / 60);
  const seconds = totalTimeSec % 60;
  const hasMistakes = correct < total;

  const earnedBadgeDefs = newBadgeIds
    .map((id) => BADGE_DEFINITIONS.find((d) => d.id === id))
    .filter(Boolean);

  return (
    <div className="mx-auto max-w-md space-y-6">
      <div className="rounded-2xl bg-white p-6 text-center shadow-sm border border-slate-100">
        <Trophy
          className={`mx-auto h-12 w-12 ${percentage >= 80 ? 'text-pink-400' : 'text-slate-500'}`}
        />
        <h2 className="mt-3 text-2xl font-bold text-slate-800">
          Session Complete
        </h2>
        <p className="text-sm text-slate-500">{sectionName}</p>

        <div className="mt-6 flex justify-center gap-8">
          <div>
            <p className="text-3xl font-bold text-pink-500">
              {correct}/{total}
            </p>
            <p className="text-xs text-slate-500">Correct</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-slate-800">{percentage}%</p>
            <p className="text-xs text-slate-500">Score</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-slate-800">
              {minutes}:{String(seconds).padStart(2, '0')}
            </p>
            <p className="text-xs text-slate-500">Time</p>
          </div>
        </div>
      </div>

      {/* Gamification summary */}
      {sessionXP > 0 && (
        <div className="rounded-2xl bg-white p-4 shadow-sm border border-slate-100">
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 text-pink-400" />
            <span className="font-bold text-pink-500">+{sessionXP} XP</span>
            <span className="text-sm text-slate-500">earned this session</span>
          </div>

          {percentage === 100 && (
            <p className="mt-1 text-xs text-pink-400">
              Perfect session bonus included!
            </p>
          )}
        </div>
      )}

      {/* New badges */}
      {earnedBadgeDefs.length > 0 && (
        <div className="rounded-2xl bg-white p-4 shadow-sm border border-slate-100">
          <div className="mb-2 flex items-center gap-2">
            <Award className="h-5 w-5 text-pink-400" />
            <span className="font-bold text-slate-800">New Badges Earned!</span>
          </div>
          <div className="space-y-2">
            {earnedBadgeDefs.map((def) =>
              def ? (
                <div key={def.id} className="flex items-center gap-2 text-sm">
                  <span className="font-semibold text-pink-500">{def.name}</span>
                  <span className="text-slate-500">-- {def.description}</span>
                </div>
              ) : null,
            )}
          </div>
        </div>
      )}

      <div className="space-y-2">
        <button
          onClick={onPracticeAgain}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-pink-400 px-4 py-3 font-semibold text-white transition-colors hover:bg-pink-500"
        >
          <RotateCcw className="h-4 w-4" />
          Practice Again
        </button>

        {hasMistakes && (
          <button
            onClick={onReviewMistakes}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 font-semibold text-slate-600 transition-colors hover:bg-slate-50"
          >
            <Search className="h-4 w-4" />
            Review Mistakes
          </button>
        )}

        <button
          onClick={onBackToSections}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 font-medium text-slate-500 transition-colors hover:bg-slate-50"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Sections
        </button>
      </div>
    </div>
  );
}
