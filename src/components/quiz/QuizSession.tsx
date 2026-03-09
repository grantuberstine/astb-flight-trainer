import { useEffect, useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router';
import { Loader2, Zap } from 'lucide-react';
import type { SectionId } from '../../types/question';
import { useQuizSession } from '../../hooks/useQuizSession';
import { useCountdown } from '../../hooks/useCountdown';
import { useProgressStore } from '../../stores/progress-store';
import { useGamificationStore } from '../../stores/gamification-store';
import { useAdaptiveStore } from '../../stores/adaptive-store';
import { useAdaptiveQuiz } from '../../hooks/useAdaptiveQuiz';
import { getQuestions } from '../../data/questions';
import { ASTB_SECTIONS, TIMED_TEST_CONFIG, XP_VALUES } from '../../lib/constants';
import { evaluateNewBadges } from '../../lib/badges';
import { ProgressDots } from './ProgressDots';
import { QuestionCard } from './QuestionCard';
import { ExplanationPanel } from './ExplanationPanel';
import { TimerBar } from './TimerBar';
import { QuitDialog } from './QuitDialog';
import { SessionSummary } from './SessionSummary';
import { XPNotification } from '../gamification/XPNotification';
import { YayLizard } from './YayLizard';

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
  const adaptiveMode = useAdaptiveStore((s) => s.adaptiveMode);
  const { loadAdaptiveQuestions, onQuizComplete } = useAdaptiveQuiz();
  const [showQuitDialog, setShowQuitDialog] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | undefined>(undefined);

  // Gamification state
  const addXP = useGamificationStore((s) => s.addXP);
  const updateStreak = useGamificationStore((s) => s.updateStreak);
  const earnBadges = useGamificationStore((s) => s.earnBadges);
  const [xpNotification, setXpNotification] = useState({ amount: 0, visible: false });
  const [sessionXP, setSessionXP] = useState(0);
  const [newBadgeIds, setNewBadgeIds] = useState<string[]>([]);
  const [showLizard, setShowLizard] = useState(false);
  const lizardKeyRef = useRef(0);
  const sessionCompleteHandled = useRef(false);

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
    sessionCompleteHandled.current = false;
    setSessionXP(0);
    setNewBadgeIds([]);
    dispatch({ type: 'START', sectionId, count, timed: isTimed, timeLimitSec });
  }, [dispatch, sectionId, count, isTimed, timeLimitSec]);

  // Load questions when status is 'loading'
  useEffect(() => {
    if (state.status !== 'loading') return;
    let cancelled = false;
    const loader = adaptiveMode
      ? loadAdaptiveQuestions(sectionId, count)
      : getQuestions(sectionId, count);
    loader.then((questions) => {
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
  }, [state.status, sectionId, count, dispatch, isTimed, timeLimitSec, reset, resume, adaptiveMode, loadAdaptiveQuestions]);

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

  // Handle session completion: streak, perfect bonus, badge evaluation
  useEffect(() => {
    if (state.status !== 'complete' || sessionCompleteHandled.current) return;
    if (state.answers.length === 0) return;
    sessionCompleteHandled.current = true;

    // Create SR cards for incorrect answers (adaptive learning)
    if (state.sectionId) {
      onQuizComplete(state.answers, state.sectionId);
    }

    // Update streak
    updateStreak();

    // Check for perfect session
    const allCorrect = state.answers.every((a) => a.correct);
    let bonusXP = 0;
    if (allCorrect) {
      bonusXP = XP_VALUES.perfectSection;
      addXP(bonusXP);
    }
    setSessionXP((prev) => prev + bonusXP);

    // Build badge context and evaluate
    const gamState = useGamificationStore.getState();
    const progState = useProgressStore.getState();
    const sectionsAttempted = new Set(progState.questionHistory.map((r) => r.section));

    // Count fast correct answers in this session (< 12s)
    const fastCorrectCount = state.answers.filter(
      (a) => a.correct && a.timeMs < 12000,
    ).length;

    const context = {
      xp: gamState.xp,
      currentStreak: gamState.currentStreak,
      longestStreak: gamState.longestStreak,
      sectionScores: progState.sectionScores,
      totalQuestionsAnswered: progState.questionHistory.length,
      sectionsAttempted,
      hasPerfectSession: allCorrect,
      usedStreakFreeze: gamState.streakFreezesUsed > 0,
      fastCorrectCount,
      timedTestBestScore: 0,
      personalBestBeaten: false,
      badges: gamState.badges,
    };

    const earned = evaluateNewBadges(context);
    if (earned.length > 0) {
      earnBadges(earned);
      setNewBadgeIds(earned);
    }
  }, [state.status, state.answers, state.sectionId, updateStreak, addXP, earnBadges, onQuizComplete]);

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

        // Award XP for correct answer + show lizard celebration
        if (correct) {
          addXP(XP_VALUES.correctAnswer);
          setSessionXP((prev) => prev + XP_VALUES.correctAnswer);
          setXpNotification({ amount: XP_VALUES.correctAnswer, visible: true });
          setTimeout(() => setXpNotification((prev) => ({ ...prev, visible: false })), 1500);
          lizardKeyRef.current += 1;
          setShowLizard(true);
          setTimeout(() => setShowLizard(false), 2100);
        }

        // Evaluate badges after every answer (not just session end)
        setTimeout(() => {
          const gamState = useGamificationStore.getState();
          const progState = useProgressStore.getState();
          const sectionsAttempted = new Set(progState.questionHistory.map((r) => r.section));
          const ctx = {
            xp: gamState.xp,
            currentStreak: gamState.currentStreak,
            longestStreak: gamState.longestStreak,
            sectionScores: progState.sectionScores,
            totalQuestionsAnswered: progState.questionHistory.length,
            sectionsAttempted,
            hasPerfectSession: false,
            usedStreakFreeze: gamState.streakFreezesUsed > 0,
            fastCorrectCount: 0,
            timedTestBestScore: 0,
            personalBestBeaten: false,
            badges: gamState.badges,
          };
          const earned = evaluateNewBadges(ctx);
          if (earned.length > 0) {
            earnBadges(earned);
            setNewBadgeIds((prev) => [...prev, ...earned]);
          }
        }, 50);
      }
    },
    [state.status, state.subQuestionIndex, state.questionStartedAt, currentQuestion, dispatch, recordAnswer, sectionId, addXP],
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
        <Loader2 className="h-8 w-8 animate-spin text-pink-400" />
        <p className="text-slate-500">Loading questions...</p>
      </div>
    );
  }

  // Complete state
  if (state.status === 'complete') {
    if (state.questions.length === 0) {
      return (
        <div className="py-20 text-center">
          <p className="text-lg font-medium text-slate-500">
            No questions available for this section yet.
          </p>
          <p className="mt-1 text-sm text-slate-500">
            Questions are coming soon!
          </p>
          <button
            onClick={() => navigate('/practice')}
            className="mt-6 rounded-xl bg-pink-400 px-6 py-2.5 font-semibold text-white hover:bg-pink-500"
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
        sessionXP={sessionXP}
        newBadgeIds={newBadgeIds}
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
      {/* XP Notification */}
      <XPNotification amount={xpNotification.amount} visible={xpNotification.visible} />

      {/* Lizard celebration on correct answer */}
      <YayLizard key={lizardKeyRef.current} show={showLizard} />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-bold text-slate-800">{sectionName}</h2>
          {adaptiveMode && (
            <span className="flex items-center gap-1 rounded bg-pink-50 px-2 py-0.5 text-xs font-medium text-pink-500">
              <Zap className="h-3 w-3" />
              Adaptive
            </span>
          )}
        </div>
        <button
          onClick={() => setShowQuitDialog(true)}
          className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-500 hover:bg-slate-50"
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
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
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
            className="w-full rounded-xl bg-pink-400 py-3 font-semibold text-white transition-colors hover:bg-pink-500"
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
