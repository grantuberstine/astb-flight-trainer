import { useState, useCallback } from 'react';
import { RotateCcw } from 'lucide-react';
import { PBMExerciseCard } from './PBMExerciseCard';

const TURN_AMOUNTS = [30, 45, 60, 90, 120, 135, 180] as const;
const HEADING_STEP = 10;

function normalizeHeading(h: number): number {
  return ((h % 360) + 360) % 360;
}

function headingLabel(h: number): string {
  const n = normalizeHeading(h);
  if (n === 0) return '360 (N)';
  if (n === 90) return '090 (E)';
  if (n === 180) return '180 (S)';
  if (n === 270) return '270 (W)';
  return String(n).padStart(3, '0');
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickRandom<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

interface Problem {
  startHeading: number;
  turnAmount: number;
  direction: 'left' | 'right';
  correctAnswer: number;
  choices: number[];
}

function generateProblem(): Problem {
  const startHeading = randomInt(0, 35) * HEADING_STEP;
  const turnAmount = pickRandom(TURN_AMOUNTS);
  const direction = Math.random() < 0.5 ? 'left' : 'right';

  const delta = direction === 'right' ? turnAmount : -turnAmount;
  const correctAnswer = normalizeHeading(startHeading + delta);

  // Generate distractors
  const wrongDirection = normalizeHeading(startHeading + (direction === 'right' ? -turnAmount : turnAmount));
  const noWrap = (startHeading + (direction === 'right' ? turnAmount : -turnAmount));
  const noWrapDistractor = noWrap < 0 ? Math.abs(noWrap) : noWrap > 360 ? noWrap - 360 === correctAnswer ? noWrap : noWrap - 360 : noWrap;
  // If noWrap gives same as correct, use an offset
  const offsetDistractor = normalizeHeading(correctAnswer + (Math.random() < 0.5 ? 30 : -30));

  const distractorSet = new Set<number>();
  distractorSet.add(correctAnswer);

  // Add wrong direction
  if (wrongDirection !== correctAnswer) distractorSet.add(wrongDirection);
  // Add no-wrap error
  if (!distractorSet.has(noWrapDistractor) && noWrapDistractor !== correctAnswer) {
    distractorSet.add(noWrapDistractor);
  }
  // Add offset
  if (!distractorSet.has(offsetDistractor)) {
    distractorSet.add(offsetDistractor);
  }

  // Fill to 4 if needed
  while (distractorSet.size < 4) {
    const rand = normalizeHeading(randomInt(0, 35) * HEADING_STEP);
    distractorSet.add(rand);
  }

  // Take correct + 3 distractors
  const allChoices = Array.from(distractorSet);
  const choices = [correctAnswer, ...allChoices.filter((c) => c !== correctAnswer).slice(0, 3)];

  // Shuffle
  for (let i = choices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [choices[i], choices[j]] = [choices[j], choices[i]];
  }

  return { startHeading, turnAmount, direction, correctAnswer, choices };
}

function CompassRose({ heading }: { heading: number }) {
  const rotation = -heading;
  return (
    <svg viewBox="0 0 120 120" className="mx-auto h-28 w-28" aria-label={`Compass showing heading ${heading}`}>
      <circle cx="60" cy="60" r="55" fill="none" stroke="currentColor" className="text-navy-600" strokeWidth="2" />
      {/* Cardinal labels */}
      <text x="60" y="16" textAnchor="middle" className="fill-navy-300 text-[10px] font-bold">N</text>
      <text x="108" y="64" textAnchor="middle" className="fill-navy-300 text-[10px] font-bold">E</text>
      <text x="60" y="114" textAnchor="middle" className="fill-navy-300 text-[10px] font-bold">S</text>
      <text x="12" y="64" textAnchor="middle" className="fill-navy-300 text-[10px] font-bold">W</text>
      {/* Heading arrow */}
      <g transform={`rotate(${rotation} 60 60)`}>
        <line x1="60" y1="60" x2="60" y2="22" stroke="currentColor" className="text-gold-400" strokeWidth="3" strokeLinecap="round" />
        <polygon points="60,18 55,28 65,28" className="fill-gold-400" />
      </g>
      {/* Center dot */}
      <circle cx="60" cy="60" r="3" className="fill-white" />
    </svg>
  );
}

export function DirectionalReasoning() {
  const [problem, setProblem] = useState<Problem>(generateProblem);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const handleAnswer = useCallback(
    (choice: number) => {
      if (selectedAnswer !== null) return;
      setSelectedAnswer(choice);
      setScore((prev) => ({
        correct: prev.correct + (choice === problem.correctAnswer ? 1 : 0),
        total: prev.total + 1,
      }));
    },
    [selectedAnswer, problem.correctAnswer],
  );

  const nextQuestion = useCallback(() => {
    setProblem(generateProblem());
    setSelectedAnswer(null);
  }, []);

  const resetSession = useCallback(() => {
    setProblem(generateProblem());
    setSelectedAnswer(null);
    setScore({ correct: 0, total: 0 });
  }, []);

  const answered = selectedAnswer !== null;
  const wasCorrect = selectedAnswer === problem.correctAnswer;

  const explanationParts: string[] = [];
  if (answered) {
    const sign = problem.direction === 'right' ? '+' : '-';
    const raw = problem.startHeading + (problem.direction === 'right' ? problem.turnAmount : -problem.turnAmount);
    explanationParts.push(`${problem.startHeading} ${sign} ${problem.turnAmount} = ${raw}`);
    if (raw !== problem.correctAnswer) {
      if (raw >= 360) explanationParts.push(`${raw} - 360 = ${problem.correctAnswer}`);
      else if (raw < 0) explanationParts.push(`${raw} + 360 = ${problem.correctAnswer}`);
      else if (raw === 0) explanationParts.push('0 = 360 (North)');
    }
  }

  return (
    <PBMExerciseCard
      title="Directional Reasoning"
      description="The PBM tests your ability to quickly determine headings and directions. Practice thinking in terms of compass headings."
    >
      <div className="space-y-4">
        {/* Score */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-navy-300">
            Score: <span className="font-semibold text-white">{score.correct}/{score.total}</span>
          </span>
          <button
            onClick={resetSession}
            className="flex items-center gap-1 text-navy-400 hover:text-white transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset
          </button>
        </div>

        {/* Compass */}
        <CompassRose heading={problem.startHeading} />

        {/* Problem */}
        <p className="text-center text-white">
          You are flying heading{' '}
          <span className="font-bold text-gold-400">{headingLabel(problem.startHeading)}</span>.
          {' '}Turn{' '}
          <span className="font-bold text-gold-400">{problem.direction}</span>
          {' '}<span className="font-bold text-gold-400">{problem.turnAmount}&deg;</span>.
          {' '}What is your new heading?
        </p>

        {/* Answer choices */}
        <div className="grid grid-cols-2 gap-2">
          {problem.choices.map((choice) => {
            let btnClass = 'rounded-lg border px-4 py-3 text-center font-mono font-semibold transition-colors ';
            if (!answered) {
              btnClass += 'border-navy-600 bg-navy-800 text-white hover:border-gold-400 hover:bg-navy-700 cursor-pointer';
            } else if (choice === problem.correctAnswer) {
              btnClass += 'border-green-500 bg-green-900/40 text-green-300';
            } else if (choice === selectedAnswer) {
              btnClass += 'border-red-500 bg-red-900/40 text-red-300';
            } else {
              btnClass += 'border-navy-700 bg-navy-900 text-navy-500';
            }
            return (
              <button
                key={choice}
                onClick={() => handleAnswer(choice)}
                disabled={answered}
                className={btnClass}
              >
                {headingLabel(choice)}
              </button>
            );
          })}
        </div>

        {/* Feedback */}
        {answered && (
          <div className={`rounded-lg p-3 text-sm ${wasCorrect ? 'bg-green-900/30 text-green-300' : 'bg-red-900/30 text-red-300'}`}>
            <p className="font-semibold">{wasCorrect ? 'Correct!' : 'Incorrect'}</p>
            <p className="mt-1 text-navy-300">
              {explanationParts.join(' \u2192 ')}
              {' '}&rarr; <span className="font-semibold text-white">{headingLabel(problem.correctAnswer)}</span>
            </p>
          </div>
        )}

        {/* Next */}
        {answered && (
          <button
            onClick={nextQuestion}
            className="w-full rounded-lg bg-gold-400 px-4 py-2.5 font-semibold text-navy-900 hover:bg-gold-300 transition-colors"
          >
            Next Question
          </button>
        )}
      </div>
    </PBMExerciseCard>
  );
}
