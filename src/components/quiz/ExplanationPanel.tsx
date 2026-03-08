import { CheckCircle, XCircle } from 'lucide-react';
import type { Question } from '../../types/question';

interface ExplanationPanelProps {
  question: Question;
  selectedAnswer: number;
  subIndex?: number;
}

export function ExplanationPanel({
  question,
  selectedAnswer,
  subIndex,
}: ExplanationPanelProps) {
  let explanation: string;
  let optionExplanations: [string, string, string, string] | undefined;
  let options: string[];
  let correctAnswer: number;

  if (question.type === 'passage' && subIndex !== undefined) {
    const subQ = question.questions[subIndex];
    explanation = subQ.explanation;
    optionExplanations = subQ.optionExplanations;
    options = [...subQ.options];
    correctAnswer = subQ.correctAnswer;
  } else if (question.type === 'multiple-choice') {
    explanation = question.explanation;
    optionExplanations = question.optionExplanations;
    options = [...question.options];
    correctAnswer = question.correctAnswer;
  } else {
    explanation = question.explanation;
    optionExplanations = undefined;
    options = [];
    correctAnswer = question.correctAnswer;
  }

  const isCorrect = selectedAnswer === correctAnswer;

  return (
    <div className="rounded-lg border border-navy-600 bg-navy-700 p-4 space-y-3">
      <div className="flex items-center gap-2">
        {isCorrect ? (
          <CheckCircle className="h-5 w-5 text-green-400" />
        ) : (
          <XCircle className="h-5 w-5 text-red-400" />
        )}
        <span
          className={`font-semibold ${isCorrect ? 'text-green-400' : 'text-red-400'}`}
        >
          {isCorrect ? 'Correct!' : 'Incorrect'}
        </span>
      </div>

      <p className="text-sm text-navy-200">{explanation}</p>

      {optionExplanations && options.length > 0 && (
        <div className="space-y-2 border-t border-navy-600 pt-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">
            Option Breakdown
          </p>
          {options.map((opt, idx) => {
            const isCorrectOpt = idx === correctAnswer;
            return (
              <div
                key={idx}
                className={`rounded-md p-2 text-sm ${
                  isCorrectOpt
                    ? 'bg-green-500/10 text-green-300'
                    : 'bg-navy-800/50 text-navy-400'
                }`}
              >
                <div className="flex items-start gap-2">
                  {isCorrectOpt ? (
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-400" />
                  ) : (
                    <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-navy-500" />
                  )}
                  <div>
                    <span className="font-medium">{opt}</span>
                    <p className="mt-0.5 text-xs opacity-80">
                      {optionExplanations[idx]}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
