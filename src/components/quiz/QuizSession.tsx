import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { Loader2 } from 'lucide-react';
import type { SectionId } from '../../types/question';
import { useQuizSession } from '../../hooks/useQuizSession';
import { useCountdown } from '../../hooks/useCountdown';
import { useProgressStore } from '../../stores/progress-store';
import { getQuestions } from '../../data/questions';
import { ASTB_SECTIONS, TIMED_TEST_CONFIG } from '../../lib/constants';
import { ProgressDots } from './ProgressDots';
import { QuestionCard } from './QuestionCard';
import { ExplanationPanel } from './ExplanationPanel';
import { TimerBar } from './TimerBar';
import { QuitDialog } from './QuitDialog';
import { SessionSummary } from './SessionSummary';

interface QuizSessionProps {
  sectionId: SectionId;
  mode: 'practice' | 'timed' | 'full-test';
  questionCount?: number;
  timeLimitSecOverride?: number;
  onComplete?: (answers: Array<{ questionId: string; selected: number; correct: boolean; timeMs: number }>) => void;
}

export function QuizSession({
  sectionId,
  mode,
  questionCount,
  timeLimitSecOverride,
  onComplete,
}: QuizSessionProps) {
  const navigate = useNavigate();
  const { state, dispatch, currentQuestion, progress } = useQuizSession();
  const recordAnswer = useProgressStore((s) => s.recordAnswer);
  const [showQuitDialog, setShowQuitDialog] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | undefined>(undefined);

  const isTimed = mode === 'timed';
  const timedConfig = TIMED_TEST_CONFIG[sectionId];
  const timeLimitSec = isTimed ? (timeLimitSecOverride ?? timedConfig.timeLimitSec) : 0;
  const count = questionCount ?? (isTimed ? timedConfig.questionCount : 10);

  const { remaining, isPaused, isExpired, pause, resume, reset } =
    useCountdown(timeLimitSec);

  const sectionName =
    ASTB_SECTIONS.find((s) => s.id === sectionId)?.name ?? sectionId;

  // Start quiz on mount
  useEffect(() => {
    dispatch({ type: 'START', sectionId, count, timed: isTimed, timeLimitSec });
  }, [dispatch, sectionId, count, isTimed, timeLimitSec]);

  // Load questions when status is 'loading'
  useEffect(() => {
    if (state.status !== 'loading') return;
    let cancelled = false;
    getQuestions(sectionId, count).then((questions) => {
      if (!cancelled) {
        dispatch({ type: 'QUESTIONS_LOADED', questions });
        if (isTimed) {
          reset(timeLimitSec);
          // Need to call resume after a tick to let state settle
          setTimeout(() => resume(), 0);
        }
      }
    });
    return () => {
      cancelled = true;
    };
  }, [state.status, sectionId, count, dispatch, isTimed, timeLimitSec, reset, resume]);

  // Pause timer during explanation, resume during answering
  useEffect(() => {
    if (!isTimed) return;
    if (state.status === 'showing-explanation') {
      pause();
    } else if (state.status === 'answering' && isPaused && !isExpired) {
      resume();
    }
  }, [state.status, isTimed, pause, resume, isPaused, isExpired]);

  // Handle timer expiry
  useEffect(() => {
    if (isTimed && isExpired && state.status !== 'complete') {
      dispatch({ type: 'TIME_UP' });
    }
  }, [isTimed, isExpired, state.status, dispatch]);

  // Call onComplete when quiz finishes
  useEffect(() => {
    if (state.status === 'complete' && onComplete) {
      onComplete(state.answers);
    }
  }, [state.status, state.answers, onComplete]);

  const handleAnswer = useCallback(
    (selected: number) => {
      if (state.status !== 'answering') return;
      setSelectedAnswer(selected);
      dispatch({ type: 'ANSWER', selected });

      // Record to progress store
      if (currentQuestion) {
        const isPassage = currentQuestion.type === 'passage';
        const subQ = isPassage
          ? currentQuestion.questions[state.subQuestionIndex]
          : null;
        const correctIdx = subQ
          ? subQ.correctAnswer
          : (currentQuestion.type !== 'passage' ? currentQuestion.correctAnswer : 0);
        const correct = selected === correctIdx;
        const qId = isPassage
          ? `${currentQuestion.id}_sub${state.subQuestionIndex}`
          : currentQuestion.id;
        recordAnswer(qId, correct, sectionId, Date.now() - (state.questionStartedAt ?? Date.now()));
      }
    },
    [state.status, state.subQuestionIndex, state.questionStartedAt, currentQuestion, dispatch, recordAnswer, sectionId],
  );

  const handleNext = useCallback(() => {
    setSelectedAnswer(undefined);
    dispatch({ type: 'NEXT' });
  }, [dispatch]);

  const handleQuit = useCallback(() => {
    setShowQuitDialog(false);
    dispatch({ type: 'QUIT' });
  }, [dispatch]);

  // Loading state
  if (state.status === 'idle' || state.status === 'loading') {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20">
        <Loader2 className="h-8 w-8 animate-spin text-gold-400" />
        <p className="text-navy-300">Loading questions...</p>
      </div>
    );
  }

  // Complete state
  if (state.status === 'complete') {
    if (state.questions.length === 0) {
      return (
        <div className="py-20 text-center">
          <p className="text-lg font-medium text-navy-300">
            No questions available for this section yet.
          </p>
          <p className="mt-1 text-sm text-navy-400">
            Questions are coming soon!
          </p>
          <button
            onClick={() => navigate('/practice')}
            className="mt-6 rounded-lg bg-gold-500 px-6 py-2.5 font-semibold text-navy-900 hover:bg-gold-400"
          >
            Back to Sections
          </button>
        </div>
      );
    }

    return (
      <SessionSummary
        answers={state.answers}
        sectionName={sectionName}
        questions={state.questions}
        onPracticeAgain={() => {
          dispatch({ type: 'START', sectionId, count, timed: isTimed, timeLimitSec });
        }}
        onBackToSections={() => navigate('/practice')}
        onReviewMistakes={() => {
          // TODO: implement review mistakes flow
          navigate('/practice');
        }}
      />
    );
  }

  // Active quiz state
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-white">{sectionName}</h2>
        <button
          onClick={() => setShowQuitDialog(true)}
          className="rounded-lg border border-navy-600 px-3 py-1.5 text-sm text-navy-300 hover:bg-navy-700"
        >
          Quit
        </button>
      </div>

      {/* Timer */}
      {isTimed && (
        <TimerBar
          remaining={remaining}
          totalSeconds={timeLimitSec}
          isPaused={isPaused}
        />
      )}

      {/* Progress */}
      <ProgressDots total={progress.total} answers={state.answers} />

      {/* Question */}
      {currentQuestion && (
        <div className="rounded-xl bg-navy-800 p-6">
          <QuestionCard
            question={currentQuestion}
            subIndex={state.subQuestionIndex}
            onAnswer={handleAnswer}
            disabled={state.status === 'showing-explanation'}
            selectedAnswer={selectedAnswer}
            showResult={state.status === 'showing-explanation'}
          />
        </div>
      )}

      {/* Explanation */}
      {state.status === 'showing-explanation' && currentQuestion && (
        <>
          <ExplanationPanel
            question={currentQuestion}
            selectedAnswer={selectedAnswer ?? 0}
            subIndex={
              currentQuestion.type === 'passage'
                ? state.subQuestionIndex
                : undefined
            }
          />
          <button
            onClick={handleNext}
            className="w-full rounded-lg bg-gold-500 py-3 font-semibold text-navy-900 transition-colors hover:bg-gold-400"
          >
            Next
          </button>
        </>
      )}

      {/* Quit Dialog */}
      <QuitDialog
        open={showQuitDialog}
        onConfirm={handleQuit}
        onCancel={() => setShowQuitDialog(false)}
        answeredCount={progress.answered}
        totalCount={progress.total}
      />
    </div>
  );
}
