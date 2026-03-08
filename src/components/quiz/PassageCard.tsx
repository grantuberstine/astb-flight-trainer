import type { PassageQuestion } from '../../types/question';

const LABELS = ['A', 'B', 'C', 'D'] as const;

interface PassageCardProps {
  question: PassageQuestion;
  subIndex: number;
  onAnswer: (selected: number) => void;
  disabled: boolean;
  selectedAnswer?: number;
  showResult?: boolean;
}

export function PassageCard({
  question,
  subIndex,
  onAnswer,
  disabled,
  selectedAnswer,
  showResult,
}: PassageCardProps) {
  const subQ = question.questions[subIndex];

  return (
    <div className="space-y-4">
      <div className="max-h-48 overflow-y-auto rounded-lg bg-navy-700/50 p-4">
        <p className="text-sm leading-relaxed text-navy-200">
          {question.passage}
        </p>
      </div>

      <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">
        Question {subIndex + 1} of {question.questions.length}
      </p>

      <p className="text-lg font-medium text-white">{subQ.text}</p>

      <div className="space-y-2">
        {subQ.options.map((option, idx) => {
          let classes =
            'flex w-full items-center gap-3 rounded-lg border-2 p-4 text-left transition-colors';

          if (showResult) {
            if (idx === subQ.correctAnswer) {
              classes += ' border-green-500 bg-green-500/10 text-green-300';
            } else if (idx === selectedAnswer) {
              classes += ' border-red-500 bg-red-500/10 text-red-300';
            } else {
              classes += ' border-navy-600 bg-navy-700/50 text-navy-400';
            }
          } else if (idx === selectedAnswer) {
            classes += ' border-gold-400 bg-gold-400/10 text-white';
          } else {
            classes +=
              ' border-navy-600 bg-navy-700/50 text-navy-200 hover:border-navy-400 hover:bg-navy-700';
          }

          return (
            <button
              key={idx}
              className={classes}
              onClick={() => onAnswer(idx)}
              disabled={disabled}
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-navy-600 text-sm font-bold">
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
