import { useState, useCallback } from 'react';
import { Timer, Trophy, Zap, Calculator, BookOpen, Wrench, Plane, Compass, Target } from 'lucide-react';
import { ASTB_SECTIONS } from '../lib/constants';
import { useGamificationStore } from '../stores/gamification-store';
import { QuizSession } from '../components/quiz/QuizSession';
import type { SectionId } from '../types/question';

const CHALLENGE_QUESTION_COUNT = 10;
const CHALLENGE_TIME_LIMIT_SEC = 120;

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Calculator,
  BookOpen,
  Wrench,
  Plane,
  Compass,
};

function formatTime(ms: number): string {
  const totalSec = Math.round(ms / 1000);
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export function ChallengePage() {
  const [activeSection, setActiveSection] = useState<SectionId | null>(null);
  const [challengeResult, setChallengeResult] = useState<{
    score: number;
    timeMs: number;
    isNewPB: boolean;
    sectionId: SectionId;
  } | null>(null);

  const getBestChallenge = useGamificationStore((s) => s.getBestChallenge);
  const recordChallenge = useGamificationStore((s) => s.recordChallenge);
  const addXP = useGamificationStore((s) => s.addXP);

  const handleComplete = useCallback(
    (answers: Array<{ questionId: string; selected: number; correct: boolean; timeMs: number }>) => {
      if (!activeSection) return;

      const correctCount = answers.filter((a) => a.correct).length;
      const score = Math.round((correctCount / answers.length) * 100);
      const totalTimeMs = answers.reduce((sum, a) => sum + a.timeMs, 0);

      const previousBest = getBestChallenge(activeSection);
      const isNewPB = previousBest === null || score > previousBest.score;

      recordChallenge({
        sectionId: activeSection,
        score,
        timeMs: totalTimeMs,
        date: Date.now(),
      });

      // Award XP for completing a challenge
      addXP(25);

      setChallengeResult({ score, timeMs: totalTimeMs, isNewPB, sectionId: activeSection });
    },
    [activeSection, getBestChallenge, recordChallenge, addXP],
  );

  // Active challenge quiz
  if (activeSection && !challengeResult) {
    return (
      <QuizSession
        sectionId={activeSection}
        mode="timed"
        questionCount={CHALLENGE_QUESTION_COUNT}
        timeLimitSecOverride={CHALLENGE_TIME_LIMIT_SEC}
        onComplete={handleComplete}
      />
    );
  }

  // Challenge result screen
  if (challengeResult) {
    const sectionName = ASTB_SECTIONS.find((s) => s.id === challengeResult.sectionId)?.name ?? challengeResult.sectionId;
    return (
      <div className="mx-auto max-w-md space-y-6 py-12 text-center">
        <div className="rounded-2xl bg-white p-8 shadow-sm border border-slate-100">
          {challengeResult.isNewPB && (
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-pink-50 px-4 py-2 text-lg font-bold text-pink-500">
              <Trophy className="h-6 w-6" />
              New Personal Best!
            </div>
          )}

          <h2 className="text-2xl font-bold text-slate-800">{sectionName} Challenge</h2>

          <div className="mt-6 flex justify-center gap-8">
            <div>
              <p className="text-3xl font-bold text-pink-500">{challengeResult.score}%</p>
              <p className="text-sm text-slate-500">Score</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-slate-800">{formatTime(challengeResult.timeMs)}</p>
              <p className="text-sm text-slate-500">Time</p>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-center gap-1 text-sm text-pink-500">
            <Zap className="h-4 w-4" />
            +25 XP earned
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => {
              setChallengeResult(null);
              setActiveSection(null);
            }}
            className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium text-slate-600 transition-colors hover:bg-slate-100"
          >
            Back to Challenges
          </button>
          <button
            onClick={() => {
              setChallengeResult(null);
              // Re-launch same section
            }}
            className="flex-1 rounded-xl bg-pink-400 px-4 py-3 font-semibold text-white transition-colors hover:bg-pink-500 shadow-sm"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Section picker
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Timer className="h-8 w-8 text-pink-500" />
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Challenges</h1>
          <p className="text-sm text-slate-500">
            {CHALLENGE_QUESTION_COUNT} questions, {CHALLENGE_TIME_LIMIT_SEC} seconds. Beat your personal best.
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ASTB_SECTIONS.map((section) => {
          const Icon = iconMap[section.icon] ?? Target;
          const best = getBestChallenge(section.id);

          return (
            <div
              key={section.id}
              className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
            >
              <div className="mb-3 flex items-center gap-3">
                <div className={`rounded-md bg-${section.color}/20 p-2`}>
                  <Icon className={`h-6 w-6 text-${section.color}`} />
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    {section.id}
                  </span>
                  <h3 className="font-bold text-slate-800">{section.name}</h3>
                </div>
              </div>

              {/* Personal best */}
              <div className="mb-4 rounded-xl bg-slate-50 p-3">
                {best ? (
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1.5 text-pink-500">
                      <Trophy className="h-4 w-4" />
                      <span className="font-semibold">Personal Best</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-600">
                      <span className="font-bold">{best.score}%</span>
                      <span className="text-slate-500">{formatTime(best.timeMs)}</span>
                    </div>
                  </div>
                ) : (
                  <p className="text-center text-sm text-slate-500">No record yet</p>
                )}
              </div>

              <div className="flex items-center gap-3 text-xs text-slate-500 mb-4">
                <span>{CHALLENGE_QUESTION_COUNT} questions</span>
                <span>{CHALLENGE_TIME_LIMIT_SEC}s time limit</span>
              </div>

              <button
                onClick={() => setActiveSection(section.id)}
                className="w-full rounded-xl bg-pink-400 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-pink-500 shadow-sm"
              >
                Start Challenge
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
