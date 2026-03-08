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
    <div className="rounded-xl bg-navy-800 p-6 space-y-4">
      <h3 className="text-xl font-bold text-gold-400">{card.heading}</h3>

      <p className="leading-relaxed text-navy-200">{card.content}</p>

      {DiagramComponent ? (
        <div className="rounded-lg bg-navy-700/50 p-4">
          <DiagramComponent />
        </div>
      ) : (
        <div className="flex h-32 items-center justify-center rounded-lg border-2 border-dashed border-navy-600">
          <p className="text-sm text-navy-500">Diagram placeholder</p>
        </div>
      )}

      {card.keyTakeaway && (
        <div className="flex items-start gap-2 rounded-lg bg-gold-500/10 border border-gold-500/20 p-3">
          <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
          <p className="text-sm font-medium text-gold-300">
            {card.keyTakeaway}
          </p>
        </div>
      )}

      <p className="text-center text-xs text-navy-500">
        Card {index + 1} of {total}
      </p>
    </div>
  );
}
