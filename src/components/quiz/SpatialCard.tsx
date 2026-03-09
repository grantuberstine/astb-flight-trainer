import type { SpatialQuestion } from '../../types/question';
import { CockpitView } from '../spatial/CockpitView';
import { AircraftSilhouette } from '../spatial/AircraftSilhouette';
import { AnnotatedCockpit } from '../spatial/AnnotatedCockpit';
import { HeadingIndicator } from '../spatial/HeadingIndicator';

const LABELS = ['A', 'B', 'C', 'D', 'E'] as const;

interface SpatialCardProps {
  question: SpatialQuestion;
  onAnswer: (selected: number) => void;
  disabled: boolean;
  selectedAnswer?: number;
  showResult?: boolean;
}

export function SpatialCard({
  question,
  onAnswer,
  disabled,
  selectedAnswer,
  showResult,
}: SpatialCardProps) {
  return (
    <div className="space-y-5">
      {/* Cockpit view + heading indicator */}
      <div className="flex flex-col items-center gap-2">
        <CockpitView
          pitch={question.scenarioParams.pitch}
          bank={question.scenarioParams.bank}
          heading={question.scenarioParams.heading}
          coastline={question.scenarioParams.coastline}
        />
        <HeadingIndicator heading={question.scenarioParams.heading} width={300} />
      </div>

      {/* Prompt */}
      <p className="text-center text-base font-medium text-slate-600">
        Which aircraft orientation matches this cockpit view?
      </p>

      {/* Answer options - 5 silhouettes */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {question.answerOptions.map((option, idx) => {
          const isCorrect = showResult && idx === question.correctAnswer;
          const isIncorrect =
            showResult && idx === selectedAnswer && idx !== question.correctAnswer;
          const isSelected = !showResult && idx === selectedAnswer;

          return (
            <div key={idx} className="flex flex-col items-center gap-1">
              <span className="text-xs font-bold text-slate-500">{LABELS[idx]}</span>
              <AircraftSilhouette
                pitch={option.pitch}
                bank={option.bank}
                heading={option.heading}
                selected={isSelected}
                correct={isCorrect}
                incorrect={isIncorrect}
                onClick={() => onAnswer(idx)}
                disabled={disabled}
                size={120}
              />
            </div>
          );
        })}
      </div>

      {/* Explanation with annotated cockpit */}
      {showResult && (
        <div className="space-y-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex justify-center">
            <AnnotatedCockpit scenarioParams={question.scenarioParams} />
          </div>
          <p className="text-sm leading-relaxed text-slate-600">
            {question.explanation}
          </p>
        </div>
      )}
    </div>
  );
}
