import { Target, AlertTriangle } from 'lucide-react';
import type { DiagnosticResult } from '../../types/adaptive';
import type { SectionId } from '../../types/question';
import { ASTB_SECTIONS } from '../../lib/constants';

interface DiagnosticResultsProps {
  result: DiagnosticResult;
}

function getAccuracyColor(accuracy: number): string {
  if (accuracy < 0.4) return 'bg-danger';
  if (accuracy < 0.7) return 'bg-warning';
  return 'bg-success';
}

function getAccuracyLabel(accuracy: number): string {
  if (accuracy < 0.4) return 'Needs Work';
  if (accuracy < 0.7) return 'Developing';
  return 'Strong';
}

function getSectionName(id: SectionId): string {
  return ASTB_SECTIONS.find((s) => s.id === id)?.name ?? id;
}

export function DiagnosticResults({ result }: DiagnosticResultsProps) {
  const overallPct = Math.round(result.overallAccuracy * 100);

  return (
    <div className="space-y-6">
      {/* Overall accuracy */}
      <div className="flex flex-col items-center rounded-xl bg-navy-800 p-6">
        <p className="mb-1 text-sm text-navy-300">Overall Accuracy</p>
        <p className="text-5xl font-bold text-gold-400">{overallPct}%</p>
        <p className="mt-1 text-sm text-navy-400">
          {result.weakestSections.length > 0
            ? `Weakest: ${result.weakestSections.map(getSectionName).join(', ')}`
            : 'Great job across all sections!'}
        </p>
      </div>

      {/* Per-section bars */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-white">Section Breakdown</h3>
        {(Object.entries(result.sectionResults) as [SectionId, typeof result.sectionResults[SectionId]][]).map(
          ([sectionId, sectionResult]) => {
            const pct = Math.round(sectionResult.accuracy * 100);
            return (
              <div
                key={sectionId}
                className="rounded-lg border border-navy-700 bg-cockpit-gray p-4"
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-white">
                    {getSectionName(sectionId)}
                  </span>
                  <span className="text-xs text-navy-300">
                    {sectionResult.correct}/{sectionResult.total} correct
                    {' '}&middot;{' '}
                    {getAccuracyLabel(sectionResult.accuracy)}
                  </span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-navy-700">
                  <div
                    className={`h-full rounded-full transition-all ${getAccuracyColor(sectionResult.accuracy)}`}
                    style={{ width: `${Math.max(pct, 2)}%` }}
                  />
                </div>
                {sectionResult.weakTags.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {sectionResult.weakTags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded bg-navy-700 px-2 py-0.5 text-xs text-navy-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          },
        )}
      </div>

      {/* Recommended focus */}
      {result.recommendedFocus.length > 0 && (
        <div className="rounded-xl border border-warning/30 bg-navy-800 p-4">
          <div className="mb-2 flex items-center gap-2">
            <Target className="h-5 w-5 text-warning" />
            <h3 className="font-semibold text-white">Focus on These</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {result.recommendedFocus.map((sectionId) => (
              <span
                key={sectionId}
                className="flex items-center gap-1 rounded-lg bg-warning/20 px-3 py-1 text-sm font-medium text-warning"
              >
                <AlertTriangle className="h-3 w-3" />
                {getSectionName(sectionId)}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
