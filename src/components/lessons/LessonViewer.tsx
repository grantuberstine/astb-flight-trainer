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
        <p className="text-lg font-medium text-navy-300">
          No lesson content available yet.
        </p>
        <p className="mt-1 text-sm text-navy-400">Lessons are coming soon!</p>
        <button
          onClick={onComplete}
          className="mt-6 rounded-lg bg-gold-500 px-6 py-2.5 font-semibold text-navy-900 hover:bg-gold-400"
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
      <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">
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
          className="flex flex-1 items-center justify-center gap-1 rounded-lg border border-navy-600 py-2.5 font-medium text-navy-300 transition-colors hover:bg-navy-700 disabled:opacity-30 disabled:hover:bg-transparent"
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
          className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-gold-500 py-2.5 font-semibold text-navy-900 transition-colors hover:bg-gold-400"
        >
          {isLast ? 'Start Practice' : 'Next'}
          {!isLast && <ChevronRight className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}
