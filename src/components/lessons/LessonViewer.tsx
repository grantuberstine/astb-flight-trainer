import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { SectionLesson, ConceptCard as ConceptCardType } from '../../types/lesson';
import { ConceptCard } from './ConceptCard';

interface LessonViewerProps {
  lesson: SectionLesson;
  onComplete: () => void;
}

interface FlatCard {
  topicName: string;
  card: ConceptCardType;
}

export function LessonViewer({ lesson, onComplete }: LessonViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const flatCards: FlatCard[] = useMemo(() => {
    const cards: FlatCard[] = [];
    for (const topic of lesson.topics) {
      for (const card of topic.cards) {
        cards.push({ topicName: topic.name, card });
      }
    }
    return cards;
  }, [lesson]);

  if (flatCards.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-lg font-medium text-slate-500">
          No lesson content available yet.
        </p>
        <p className="mt-1 text-sm text-slate-500">Lessons are coming soon!</p>
        <button
          onClick={onComplete}
          className="mt-6 rounded-xl bg-pink-400 px-6 py-2.5 font-semibold text-white hover:bg-pink-500"
        >
          Start Practice
        </button>
      </div>
    );
  }

  const current = flatCards[currentIndex];
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === flatCards.length - 1;

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
        {current.topicName}
      </p>

      <div
        className="transition-transform duration-300"
        key={currentIndex}
      >
        <ConceptCard
          card={current.card}
          index={currentIndex}
          total={flatCards.length}
        />
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => setCurrentIndex((i) => i - 1)}
          disabled={isFirst}
          className="flex flex-1 items-center justify-center gap-1 rounded-xl border border-slate-200 py-2.5 font-medium text-slate-500 transition-colors hover:bg-slate-50 disabled:opacity-30 disabled:hover:bg-transparent"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </button>
        <button
          onClick={() => {
            if (isLast) {
              onComplete();
            } else {
              setCurrentIndex((i) => i + 1);
            }
          }}
          className="flex flex-1 items-center justify-center gap-1 rounded-xl bg-pink-400 py-2.5 font-semibold text-white transition-colors hover:bg-pink-500"
        >
          {isLast ? 'Start Practice' : 'Next'}
          {!isLast && <ChevronRight className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}
