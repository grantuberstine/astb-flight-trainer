import { useState } from 'react';
import { CalendarDays, RefreshCw, AlertCircle } from 'lucide-react';
import { Link } from 'react-router';
import { useAdaptiveStore } from '../stores/adaptive-store';
import { useSettingsStore } from '../stores/settings-store';
import { useProgressStore } from '../stores/progress-store';
import { computeSectionWeights } from '../lib/adaptive';
import { generateStudyPlan } from '../lib/study-plan';
import { StudyPlanView } from '../components/adaptive/StudyPlanView';

export function StudyPlanPage() {
  const studyPlan = useAdaptiveStore((s) => s.studyPlan);
  const setStudyPlan = useAdaptiveStore((s) => s.setStudyPlan);
  const lastDiagnosticAt = useAdaptiveStore((s) => s.lastDiagnosticAt);
  const testDate = useSettingsStore((s) => s.testDate);
  const setTestDate = useSettingsStore((s) => s.setTestDate);
  const sectionScores = useProgressStore((s) => s.sectionScores);

  const [dateInput, setDateInput] = useState(testDate ?? '');

  function handleSetDate() {
    if (!dateInput) return;
    setTestDate(dateInput);
  }

  function handleGeneratePlan() {
    if (!testDate) return;
    const weights = computeSectionWeights(sectionScores);
    const plan = generateStudyPlan(testDate, weights);
    setStudyPlan(plan);
  }

  function handleRegeneratePlan() {
    handleGeneratePlan();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <CalendarDays className="h-8 w-8 text-pink-500" />
        <h1 className="text-3xl font-bold text-slate-800">Study Plan</h1>
      </div>

      {/* No diagnostic taken hint */}
      {!lastDiagnosticAt && (
        <div className="flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
          <div>
            <p className="text-sm font-medium text-slate-800">
              Take a diagnostic first for better accuracy
            </p>
            <p className="mt-1 text-xs text-slate-500">
              The study plan uses your performance data to prioritize sections.
              A diagnostic assessment will give more accurate results.
            </p>
            <Link
              to="/diagnostic"
              className="mt-2 inline-block text-sm font-medium text-pink-500 hover:text-pink-400"
            >
              Take Diagnostic &rarr;
            </Link>
          </div>
        </div>
      )}

      {/* Test date input */}
      {!testDate && (
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
          <h2 className="mb-2 text-lg font-semibold text-slate-800">
            Set Your Test Date
          </h2>
          <p className="mb-4 text-sm text-slate-500">
            Enter your ASTB test date to generate a personalized study plan.
          </p>
          <div className="flex gap-3">
            <input
              type="date"
              value={dateInput}
              onChange={(e) => setDateInput(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-slate-800 focus:border-pink-400 focus:outline-none"
            />
            <button
              onClick={handleSetDate}
              disabled={!dateInput}
              className="rounded-xl bg-pink-400 px-6 py-2 font-semibold text-white transition-colors hover:bg-pink-500 shadow-sm disabled:opacity-50"
            >
              Set Date
            </button>
          </div>
        </div>
      )}

      {/* Generate plan button */}
      {testDate && !studyPlan && (
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
          <h2 className="mb-2 text-lg font-semibold text-slate-800">
            Generate Your Plan
          </h2>
          <p className="mb-4 text-sm text-slate-500">
            Test date: <span className="font-medium text-slate-800">{testDate}</span>
          </p>
          <button
            onClick={handleGeneratePlan}
            className="rounded-xl bg-pink-400 px-6 py-3 font-semibold text-white transition-colors hover:bg-pink-500 shadow-sm"
          >
            Generate Study Plan
          </button>
        </div>
      )}

      {/* Show plan */}
      {testDate && studyPlan && (
        <>
          <StudyPlanView plan={studyPlan} testDate={testDate} />
          <button
            onClick={handleRegeneratePlan}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50"
          >
            <RefreshCw className="h-4 w-4" />
            Regenerate Plan
          </button>
        </>
      )}
    </div>
  );
}
