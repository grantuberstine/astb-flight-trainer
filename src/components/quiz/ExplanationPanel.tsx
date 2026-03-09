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
  } else if (question.type === 'spatial') {
    explanation = question.explanation;
    optionExplanations = undefined;
    options = [];
    correctAnswer = question.correctAnswer;
  } else {
    explanation = question.explanation;
    optionExplanations = undefined;
    options = [];
    correctAnswer = 0;
  }

  const isCorrect = selectedAnswer === correctAnswer;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 space-y-3 shadow-sm">
      <div className="flex items-center gap-2">
        {isCorrect ? (
          <CheckCircle className="h-5 w-5 text-emerald-500" />
        ) : (
          <XCircle className="h-5 w-5 text-red-500" />
        )}
        <span
          className={`font-semibold ${isCorrect ? 'text-emerald-500' : 'text-red-500'}`}
        >
          {isCorrect ? 'Correct!' : 'Incorrect'}
        </span>
      </div>

      <p className="text-sm text-slate-600">{explanation}</p>

      {optionExplanations && options.length > 0 && (
        <div className="space-y-2 border-t border-slate-200 pt-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Option Breakdown
          </p>
          {options.map((opt, idx) => {
            const isCorrectOpt = idx === correctAnswer;
            return (
              <div
                key={idx}
                className={`rounded-md p-2 text-sm ${
                  isCorrectOpt
                    ? 'bg-emerald-50 text-emerald-600'
                    : 'bg-slate-50 text-slate-500'
                }`}
              >
                <div className="flex items-start gap-2">
                  {isCorrectOpt ? (
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  ) : (
                    <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />
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
