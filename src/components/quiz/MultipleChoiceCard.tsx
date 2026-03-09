import type { MultipleChoiceQuestion } from '../../types/question';

const LABELS = ['A', 'B', 'C', 'D'] as const;

interface MultipleChoiceCardProps {
  question: MultipleChoiceQuestion;
  onAnswer: (selected: number) => void;
  disabled: boolean;
  selectedAnswer?: number;
  showResult?: boolean;
}

export function MultipleChoiceCard({
  question,
  onAnswer,
  disabled,
  selectedAnswer,
  showResult,
}: MultipleChoiceCardProps) {
  return (
    <div className="space-y-4">
      <p className="text-lg font-medium text-slate-800">{question.text}</p>
      <div className="space-y-2">
        {question.options.map((option, idx) => {
          let classes =
            'flex w-full items-center gap-3 rounded-xl border-2 p-4 text-left transition-colors';

          if (showResult) {
            if (idx === question.correctAnswer) {
              classes += ' border-emerald-400 bg-emerald-50 text-emerald-700';
            } else if (idx === selectedAnswer) {
              classes += ' border-red-400 bg-red-50 text-red-700';
            } else {
              classes += ' border-slate-200 bg-slate-50 text-slate-500 opacity-60';
            }
          } else if (idx === selectedAnswer) {
            classes += ' border-pink-400 bg-pink-50 text-slate-800';
          } else {
            classes +=
              ' border-slate-200 bg-white text-slate-600 hover:border-pink-300 hover:bg-slate-50';
          }

          return (
            <button
              key={idx}
              className={classes}
              onClick={() => onAnswer(idx)}
              disabled={disabled}
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-slate-100 text-sm font-bold text-slate-600">
                {LABELS[idx]}
              </span>
              <span>{option}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
