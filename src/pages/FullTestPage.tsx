import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router';
import {
  Shield,
  ChevronRight,
  Target,
  Calculator,
  BookOpen,
  Wrench,
  Plane,
  Compass,
  Trophy,
  ArrowLeft,
} from 'lucide-react';
import { ASTB_SECTIONS, TIMED_TEST_CONFIG } from '../lib/constants';
import type { SectionId } from '../types/question';
import { QuizSession } from '../components/quiz/QuizSession';
import type { AnswerEntry } from '../hooks/useQuizSession';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Calculator,
  BookOpen,
  Wrench,
  Plane,
  Compass,
};

const SECTION_ORDER: SectionId[] = ['MST', 'RCT', 'MCT', 'ANIT', 'SAT'];

interface SectionResult {
  sectionId: SectionId;
  answers: AnswerEntry[];
}

type Stage = 'briefing' | 'testing' | 'interstitial' | 'complete';

export function FullTestPage() {
  const navigate = useNavigate();
  const [stage, setStage] = useState<Stage>('briefing');
  const [currentSectionIdx, setCurrentSectionIdx] = useState(0);
  const [results, setResults] = useState<SectionResult[]>([]);

  const currentSectionId = SECTION_ORDER[currentSectionIdx];

  const handleSectionComplete = useCallback(
    (answers: AnswerEntry[]) => {
      setResults((prev) => [
        ...prev,
        { sectionId: currentSectionId, answers },
      ]);
      if (currentSectionIdx >= SECTION_ORDER.length - 1) {
        setStage('complete');
      } else {
        setStage('interstitial');
      }
    },
    [currentSectionId, currentSectionIdx],
  );

  const handleNextSection = useCallback(() => {
    setCurrentSectionIdx((i) => i + 1);
    setStage('testing');
  }, []);

  // Briefing screen
  if (stage === 'briefing') {
    return (
      <div className="mx-auto max-w-lg space-y-6 py-8">
        <div className="text-center">
          <Shield className="mx-auto h-16 w-16 text-gold-400" />
          <h1 className="mt-4 text-3xl font-bold">Full Practice Test</h1>
          <p className="mt-2 text-navy-300">
            Complete all 5 ASTB sections back-to-back, just like the real exam.
          </p>
        </div>

        <div className="rounded-xl bg-navy-800 p-6">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-navy-400">
            Mission Briefing
          </h2>
          <div className="space-y-3">
            {SECTION_ORDER.map((id, idx) => {
              const section = ASTB_SECTIONS.find((s) => s.id === id);
              if (!section) return null;
              const Icon = iconMap[section.icon] ?? Target;
              const config = TIMED_TEST_CONFIG[id];
              return (
                <div
                  key={id}
                  className="flex items-center gap-3 rounded-lg bg-navy-700/50 p-3"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-navy-600 text-xs font-bold text-navy-300">
                    {idx + 1}
                  </span>
                  <Icon className="h-5 w-5 text-navy-300" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">
                      {section.name}
                    </p>
                  </div>
                  <span className="text-xs text-navy-400">
                    {config.questionCount}q
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <button
          onClick={() => setStage('testing')}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-gold-500 py-3 text-lg font-bold text-navy-900 transition-colors hover:bg-gold-400"
        >
          Begin Test
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    );
  }

  // Testing
  if (stage === 'testing') {
    const config = TIMED_TEST_CONFIG[currentSectionId];
    return (
      <div className="space-y-2">
        <p className="text-center text-xs font-semibold uppercase tracking-wider text-navy-400">
          Section {currentSectionIdx + 1} of {SECTION_ORDER.length}
        </p>
        <QuizSession
          key={currentSectionId}
          sectionId={currentSectionId}
          mode="full-test"
          questionCount={config.questionCount}
          onComplete={handleSectionComplete}
        />
      </div>
    );
  }

  // Interstitial
  if (stage === 'interstitial') {
    const lastResult = results[results.length - 1];
    const correct = lastResult.answers.filter((a) => a.correct).length;
    const total = lastResult.answers.length;
    const sectionName =
      ASTB_SECTIONS.find((s) => s.id === lastResult.sectionId)?.name ??
      lastResult.sectionId;
    const nextSection = ASTB_SECTIONS.find(
      (s) => s.id === SECTION_ORDER[currentSectionIdx + 1],
    );

    return (
      <div className="mx-auto max-w-md space-y-6 py-12 text-center">
        <h2 className="text-2xl font-bold text-white">Section Complete</h2>
        <div className="rounded-xl bg-navy-800 p-6">
          <p className="text-sm text-navy-400">{sectionName}</p>
          <p className="mt-2 text-4xl font-bold text-gold-400">
            {correct}/{total}
          </p>
          <p className="text-sm text-navy-300">correct</p>
        </div>

        {nextSection && (
          <div className="text-sm text-navy-400">
            Up next: <span className="text-white">{nextSection.name}</span>
          </div>
        )}

        <button
          onClick={handleNextSection}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-gold-500 py-3 font-bold text-navy-900 transition-colors hover:bg-gold-400"
        >
          Continue to Next Section
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    );
  }

  // Complete - comprehensive summary
  const totalCorrect = results.reduce(
    (sum, r) => sum + r.answers.filter((a) => a.correct).length,
    0,
  );
  const totalQuestions = results.reduce((sum, r) => sum + r.answers.length, 0);
  const overallPercent =
    totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;

  return (
    <div className="mx-auto max-w-lg space-y-6 py-8">
      <div className="text-center">
        <Trophy className="mx-auto h-16 w-16 text-gold-400" />
        <h1 className="mt-4 text-3xl font-bold">Mission Complete</h1>
        <p className="mt-2 text-4xl font-bold text-gold-400">
          {overallPercent}%
        </p>
        <p className="text-navy-300">
          {totalCorrect} of {totalQuestions} correct
        </p>
      </div>

      <div className="rounded-xl bg-navy-800 p-6">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-navy-400">
          Section Breakdown
        </h2>
        <div className="space-y-3">
          {results.map((result) => {
            const section = ASTB_SECTIONS.find(
              (s) => s.id === result.sectionId,
            );
            const correct = result.answers.filter((a) => a.correct).length;
            const total = result.answers.length;
            const pct =
              total > 0 ? Math.round((correct / total) * 100) : 0;
            const Icon = iconMap[section?.icon ?? ''] ?? Target;

            return (
              <div
                key={result.sectionId}
                className="flex items-center gap-3 rounded-lg bg-navy-700/50 p-3"
              >
                <Icon className="h-5 w-5 text-navy-300" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">
                    {section?.name ?? result.sectionId}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-white">
                    {correct}/{total}
                  </p>
                  <p className="text-xs text-navy-400">{pct}%</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="space-y-2">
        <button
          onClick={() => {
            setResults([]);
            setCurrentSectionIdx(0);
            setStage('briefing');
          }}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-gold-500 py-3 font-semibold text-navy-900 hover:bg-gold-400"
        >
          Take Again
        </button>
        <button
          onClick={() => navigate('/practice')}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-navy-600 py-3 font-medium text-navy-300 hover:bg-navy-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Practice
        </button>
      </div>
    </div>
  );
}
