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
        <CalendarDays className="h-8 w-8 text-gold-400" />
        <h1 className="text-3xl font-bold">Study Plan</h1>
      </div>

      {/* No diagnostic taken hint */}
      {!lastDiagnosticAt && (
        <div className="flex items-start gap-3 rounded-xl border border-warning/30 bg-navy-800 p-4">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-warning" />
          <div>
            <p className="text-sm font-medium text-white">
              Take a diagnostic first for better accuracy
            </p>
            <p className="mt-1 text-xs text-navy-300">
              The study plan uses your performance data to prioritize sections.
              A diagnostic assessment will give more accurate results.
            </p>
            <Link
              to="/diagnostic"
              className="mt-2 inline-block text-sm font-medium text-gold-400 hover:text-gold-300"
            >
              Take Diagnostic &rarr;
            </Link>
          </div>
        </div>
      )}

      {/* Test date input */}
      {!testDate && (
        <div className="rounded-xl bg-navy-800 p-6">
          <h2 className="mb-2 text-lg font-semibold text-white">
            Set Your Test Date
          </h2>
          <p className="mb-4 text-sm text-navy-300">
            Enter your ASTB test date to generate a personalized study plan.
          </p>
          <div className="flex gap-3">
            <input
              type="date"
              value={dateInput}
              onChange={(e) => setDateInput(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="rounded-lg border border-navy-600 bg-navy-900 px-4 py-2 text-white focus:border-gold-400 focus:outline-none"
            />
            <button
              onClick={handleSetDate}
              disabled={!dateInput}
              className="rounded-lg bg-gold-500 px-6 py-2 font-semibold text-navy-900 transition-colors hover:bg-gold-400 disabled:opacity-50"
            >
              Set Date
            </button>
          </div>
        </div>
      )}

      {/* Generate plan button */}
      {testDate && !studyPlan && (
        <div className="rounded-xl bg-navy-800 p-6">
          <h2 className="mb-2 text-lg font-semibold text-white">
            Generate Your Plan
          </h2>
          <p className="mb-4 text-sm text-navy-300">
            Test date: <span className="font-medium text-white">{testDate}</span>
          </p>
          <button
            onClick={handleGeneratePlan}
            className="rounded-lg bg-gold-500 px-6 py-3 font-semibold text-navy-900 transition-colors hover:bg-gold-400"
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
            className="inline-flex items-center gap-2 rounded-lg border border-navy-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-navy-700"
          >
            <RefreshCw className="h-4 w-4" />
            Regenerate Plan
          </button>
        </>
      )}
    </div>
  );
}
