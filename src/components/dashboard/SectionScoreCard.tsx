import { Calculator, BookOpen, Wrench, Plane, Compass } from 'lucide-react';
import type { ASTBSection } from '../../lib/constants';
import type { SectionScore } from '../../types/progress';
import { ProgressRing } from './ProgressRing';

const SECTION_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Calculator,
  BookOpen,
  Wrench,
  Plane,
  Compass,
};

interface SectionScoreCardProps {
  section: ASTBSection;
  score: SectionScore;
}

export function SectionScoreCard({ section, score }: SectionScoreCardProps) {
  const percentage = score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0;
  const Icon = SECTION_ICONS[section.icon] ?? Calculator;

  return (
    <div className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm border border-slate-100">
      <ProgressRing percentage={percentage} size={64} strokeWidth={5} label={`${percentage}%`} />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 shrink-0 text-pink-400" />
          <h3 className="truncate text-sm font-semibold text-slate-800">{section.name}</h3>
        </div>
        <p className="mt-1 text-xs text-slate-500">
          {score.correct}/{score.total} correct
        </p>
      </div>
    </div>
  );
}
