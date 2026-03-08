import type { Question } from '../../types/question';
import { MultipleChoiceCard } from './MultipleChoiceCard';
import { PassageCard } from './PassageCard';

interface QuestionCardProps {
  question: Question;
  subIndex?: number;
  onAnswer: (selected: number) => void;
  disabled: boolean;
  selectedAnswer?: number;
  showResult?: boolean;
}

export function QuestionCard({
  question,
  subIndex = 0,
  onAnswer,
  disabled,
  selectedAnswer,
  showResult,
}: QuestionCardProps) {
  switch (question.type) {
    case 'multiple-choice':
      return (
        <MultipleChoiceCard
          question={question}
          onAnswer={onAnswer}
          disabled={disabled}
          selectedAnswer={selectedAnswer}
          showResult={showResult}
        />
      );
    case 'passage':
      return (
        <PassageCard
          question={question}
          subIndex={subIndex}
          onAnswer={onAnswer}
          disabled={disabled}
          selectedAnswer={selectedAnswer}
          showResult={showResult}
        />
      );
    case 'spatial':
      return (
        <div className="rounded-lg border-2 border-dashed border-navy-600 p-8 text-center">
          <p className="text-lg font-medium text-navy-400">
            SAT Spatial Renderer (Plan 04)
          </p>
          <p className="mt-1 text-sm text-navy-500">
            Spatial question visualization will be implemented in a later plan.
          </p>
        </div>
      );
    default:
      return null;
  }
}
