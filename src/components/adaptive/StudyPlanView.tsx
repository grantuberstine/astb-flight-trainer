import { Calendar, Target, BookOpen } from 'lucide-react';
import type { StudyWeek } from '../../types/adaptive';
import type { SectionId } from '../../types/question';
import { ASTB_SECTIONS } from '../../lib/constants';

interface StudyPlanViewProps {
  plan: StudyWeek[];
  testDate: string;
}

function getSectionName(id: SectionId): string {
  return ASTB_SECTIONS.find((s) => s.id === id)?.name ?? id;
}

function getSectionAbbr(id: SectionId): string {
  return id;
}

function daysUntil(dateStr: string): number {
  const now = new Date();
  const target = new Date(dateStr);
  return Math.max(0, Math.ceil((target.getTime() - now.getTime()) / 86400000));
}

function isCurrentWeek(startDate: string, endDate: string): boolean {
  const now = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);
  end.setHours(23, 59, 59, 999);
  return now >= start && now <= end;
}

export function StudyPlanView({ plan, testDate }: StudyPlanViewProps) {
  const daysLeft = daysUntil(testDate);

  return (
    <div className="space-y-6">
      {/* Countdown */}
      <div className="flex flex-col items-center rounded-2xl bg-white shadow-sm border border-slate-100 p-6">
        <Calendar className="mb-2 h-8 w-8 text-pink-500" />
        <p className="text-4xl font-bold text-pink-500">{daysLeft}</p>
        <p className="text-sm text-slate-500">
          {daysLeft === 1 ? 'day' : 'days'} until test day
        </p>
        <p className="mt-1 text-xs text-slate-500">{testDate}</p>
      </div>

      {/* Weekly plan */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-slate-800">Weekly Plan</h3>
        {plan.map((week) => {
          const current = isCurrentWeek(week.startDate, week.endDate);
          return (
            <div
              key={week.weekNumber}
              className={`rounded-xl border p-4 ${
                current
                  ? 'border-pink-300 bg-white shadow-sm ring-1 ring-pink-300/30'
                  : 'border-slate-200 bg-slate-50'
              }`}
            >
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-slate-800">
                    Week {week.weekNumber}
                  </span>
                  {current && (
                    <span className="rounded bg-pink-400 px-2 py-0.5 text-xs font-semibold text-white">
                      Current
                    </span>
                  )}
                </div>
                <span className="text-xs text-slate-500">
                  {week.startDate} &mdash; {week.endDate}
                </span>
              </div>

              {/* Focus sections */}
              <div className="mb-2 flex items-start gap-2">
                <Target className="mt-0.5 h-4 w-4 shrink-0 text-pink-500" />
                <div className="flex flex-wrap gap-1.5">
                  {week.focusSections.map((id) => (
                    <span
                      key={id}
                      className="rounded bg-pink-50 px-2 py-0.5 text-xs font-medium text-pink-500"
                      title={getSectionName(id)}
                    >
                      {getSectionAbbr(id)}
                    </span>
                  ))}
                </div>
              </div>

              {/* Review sections */}
              {week.reviewSections.length > 0 && (
                <div className="mb-2 flex items-start gap-2">
                  <BookOpen className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />
                  <div className="flex flex-wrap gap-1.5">
                    {week.reviewSections.map((id) => (
                      <span
                        key={id}
                        className="rounded bg-slate-100 px-2 py-0.5 text-xs text-slate-500"
                        title={getSectionName(id)}
                      >
                        {getSectionAbbr(id)}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Daily goal */}
              <p className="mt-2 text-xs text-slate-500">
                Daily goal: {week.dailyGoal} questions/day
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
