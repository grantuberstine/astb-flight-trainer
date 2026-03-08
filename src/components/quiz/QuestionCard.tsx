import type { Question } from '../../types/question';
import { MultipleChoiceCard } from './MultipleChoiceCard';
import { PassageCard } from './PassageCard';
import { SpatialCard } from './SpatialCard';

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
        <SpatialCard
          question={question}
          onAnswer={onAnswer}
          disabled={disabled}
          selectedAnswer={selectedAnswer}
          showResult={showResult}
        />
      );
    default:
      return null;
  }
}
