import { Lightbulb } from 'lucide-react';
import type { ConceptCard as ConceptCardType } from '../../types/lesson';

interface ConceptCardProps {
  card: ConceptCardType;
  index: number;
  total: number;
}

export function ConceptCard({ card, index, total }: ConceptCardProps) {
  const DiagramComponent = card.svgDiagram;

  return (
    <div className="rounded-2xl bg-white shadow-sm border border-slate-100 p-6 space-y-4">
      <h3 className="text-xl font-bold text-pink-500">{card.heading}</h3>

      <p className="leading-relaxed text-slate-600">{card.content}</p>

      {DiagramComponent && (
        <div className="rounded-lg bg-slate-50 p-4">
          <DiagramComponent />
        </div>
      )}

      {card.keyTakeaway && (
        <div className="flex items-start gap-2 rounded-lg bg-pink-50 border border-pink-200 p-3">
          <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-pink-500" />
          <p className="text-sm font-medium text-pink-400">
            {card.keyTakeaway}
          </p>
        </div>
      )}

      <p className="text-center text-xs text-slate-500">
        Card {index + 1} of {total}
      </p>
    </div>
  );
}
