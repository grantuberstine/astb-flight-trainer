import { useState, useEffect, useCallback, useRef } from 'react';
import { Loader2, RotateCcw, Crosshair } from 'lucide-react';
import type { SectionId, Question } from '../types/question';
import type { AnswerRecord } from '../types/progress';
import { ASTB_SECTIONS } from '../lib/constants';
import { getQuestions } from '../data/questions';
import { DIAGNOSTIC_QUESTIONS_PER_SECTION, scoreDiagnostic } from '../lib/diagnostic';
import { computeSectionWeights } from '../lib/adaptive';
import { generateStudyPlan } from '../lib/study-plan';
import { useAdaptiveStore } from '../stores/adaptive-store';
import { useProgressStore } from '../stores/progress-store';
import { useSettingsStore } from '../stores/settings-store';
import { DiagnosticResults } from '../components/adaptive/DiagnosticResults';
import { QuestionCard } from '../components/quiz/QuestionCard';
import { ExplanationPanel } from '../components/quiz/ExplanationPanel';
import type { DiagnosticResult } from '../types/adaptive';

const SECTION_IDS: SectionId[] = ['MST', 'RCT', 'MCT', 'ANIT', 'SAT'];

interface DiagnosticQuestion {
  question: Question;
  section: SectionId;
}

type DiagnosticStatus = 'idle' | 'loading' | 'answering' | 'showing-explanation' | 'complete';

export function DiagnosticPage() {
  const [status, setStatus] = useState<DiagnosticStatus>('idle');
  const [diagnosticQuestions, setDiagnosticQuestions] = useState<DiagnosticQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | undefined>(undefined);
  const [result, setResult] = useState<DiagnosticResult | null>(null);
  const questionStartedAt = useRef(Date.now());

  const saveDiagnosticResult = useAdaptiveStore((s) => s.saveDiagnosticResult);
  const setStudyPlan = useAdaptiveStore((s) => s.setStudyPlan);
  const lastDiagnosticAt = useAdaptiveStore((s) => s.lastDiagnosticAt);
  const diagnosticResults = useAdaptiveStore((s) => s.diagnosticResults);
  const sectionScores = useProgressStore((s) => s.sectionScores);
  const testDate = useSettingsStore((s) => s.testDate);

  const lastResult = diagnosticResults.length > 0
    ? diagnosticResults[diagnosticResults.length - 1]
    : null;

  const currentDQ = diagnosticQuestions[currentIndex] ?? null;

  const startDiagnostic = useCallback(async () => {
    setStatus('loading');
    setAnswers([]);
    setCurrentIndex(0);
    setSelectedAnswer(undefined);
    setResult(null);

    try {
      const allQuestions: DiagnosticQuestion[] = [];
      for (const sectionId of SECTION_IDS) {
        const questions = await getQuestions(sectionId, DIAGNOSTIC_QUESTIONS_PER_SECTION);
        for (const q of questions) {
          allQuestions.push({ question: q, section: sectionId });
        }
      }
      setDiagnosticQuestions(allQuestions);
      questionStartedAt.current = Date.now();
      setStatus('answering');
    } catch {
      setStatus('idle');
    }
  }, []);

  const handleAnswer = useCallback(
    (selected: number) => {
      if (status !== 'answering' || !currentDQ) return;
      setSelectedAnswer(selected);

      const { question, section } = currentDQ;
      const correctIdx =
        question.type === 'passage'
          ? question.questions[0].correctAnswer
          : question.correctAnswer;
      const correct = selected === correctIdx;
      const timeSpentMs = Date.now() - questionStartedAt.current;

      const record: AnswerRecord = {
        questionId: question.id,
        correct,
        section,
        timestamp: Date.now(),
        timeSpentMs,
      };

      setAnswers((prev) => [...prev, record]);
      setStatus('showing-explanation');
    },
    [status, currentDQ],
  );

  const handleNext = useCallback(() => {
    setSelectedAnswer(undefined);
    const nextIdx = currentIndex + 1;

    if (nextIdx >= diagnosticQuestions.length) {
      setStatus('complete');
    } else {
      setCurrentIndex(nextIdx);
      questionStartedAt.current = Date.now();
      setStatus('answering');
    }
  }, [currentIndex, diagnosticQuestions.length]);

  // Score diagnostic on completion
  useEffect(() => {
    if (status !== 'complete' || answers.length === 0 || result) return;

    // Build tag lookup from loaded questions
    const tagLookup: Record<string, string[]> = {};
    for (const dq of diagnosticQuestions) {
      tagLookup[dq.question.id] = dq.question.tags;
    }

    const diagnosticResult = scoreDiagnostic(answers, tagLookup);
    setResult(diagnosticResult);
    saveDiagnosticResult(diagnosticResult);

    // Generate study plan if test date is set
    if (testDate) {
      const weights = computeSectionWeights(sectionScores);
      const plan = generateStudyPlan(testDate, weights);
      setStudyPlan(plan);
    }
  }, [status, answers, result, diagnosticQuestions, saveDiagnosticResult, setStudyPlan, testDate, sectionScores]);

  // Current section info for progress display
  const currentSectionIdx = currentDQ
    ? SECTION_IDS.indexOf(currentDQ.section)
    : 0;
  const questionsInCurrentSection = diagnosticQuestions.filter(
    (dq) => currentDQ && dq.section === currentDQ.section,
  );
  const indexInSection =
    currentDQ
      ? diagnosticQuestions
          .slice(0, currentIndex)
          .filter((dq) => dq.section === currentDQ.section).length
      : 0;

  // Idle: show start screen or last results
  if (status === 'idle') {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Crosshair className="h-8 w-8 text-pink-500" />
          <h1 className="text-3xl font-bold text-slate-800">Diagnostic Assessment</h1>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
          <p className="mb-4 text-slate-500">
            Take a 25-question diagnostic covering all 5 ASTB sections (5 questions each).
            Results will identify your strengths and weaknesses to guide your study plan.
          </p>
          <button
            onClick={startDiagnostic}
            className="rounded-xl bg-pink-400 px-6 py-3 font-semibold text-white transition-colors hover:bg-pink-500 shadow-sm"
          >
            {lastDiagnosticAt ? 'Retake Diagnostic' : 'Start Diagnostic'}
          </button>
        </div>

        {lastResult && (
          <div>
            <h2 className="mb-3 text-lg font-semibold text-slate-800">
              Last Results{' '}
              <span className="text-sm font-normal text-slate-500">
                ({new Date(lastResult.timestamp).toLocaleDateString()})
              </span>
            </h2>
            <DiagnosticResults result={lastResult} />
          </div>
        )}
      </div>
    );
  }

  // Loading
  if (status === 'loading') {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20">
        <Loader2 className="h-8 w-8 animate-spin text-pink-500" />
        <p className="text-slate-500">Loading diagnostic questions...</p>
      </div>
    );
  }

  // Complete: show results
  if (status === 'complete' && result) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Crosshair className="h-8 w-8 text-pink-500" />
          <h1 className="text-3xl font-bold text-slate-800">Diagnostic Results</h1>
        </div>

        <DiagnosticResults result={result} />

        <div className="flex gap-3">
          <button
            onClick={startDiagnostic}
            className="inline-flex items-center gap-2 rounded-xl bg-pink-400 px-6 py-3 font-semibold text-white transition-colors hover:bg-pink-500 shadow-sm"
          >
            <RotateCcw className="h-4 w-4" />
            Retake
          </button>
        </div>
      </div>
    );
  }

  // Active quiz
  const sectionName =
    ASTB_SECTIONS.find((s) => s.id === currentDQ?.section)?.name ?? '';

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-800">Diagnostic Assessment</h2>
          <p className="text-sm text-slate-500">
            Section {currentSectionIdx + 1}/5 &mdash; {sectionName} &mdash; Question{' '}
            {indexInSection + 1}/{questionsInCurrentSection.length}
          </p>
        </div>
        <span className="rounded-lg bg-slate-50 px-3 py-1 text-sm text-slate-500">
          {currentIndex + 1}/{diagnosticQuestions.length}
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-pink-400 transition-all"
          style={{
            width: `${((currentIndex + (status === 'showing-explanation' ? 1 : 0)) / diagnosticQuestions.length) * 100}%`,
          }}
        />
      </div>

      {/* Question */}
      {currentDQ && (
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
          <QuestionCard
            question={currentDQ.question}
            subIndex={0}
            onAnswer={handleAnswer}
            disabled={status === 'showing-explanation'}
            selectedAnswer={selectedAnswer}
            showResult={status === 'showing-explanation'}
          />
        </div>
      )}

      {/* Explanation */}
      {status === 'showing-explanation' && currentDQ && (
        <>
          <ExplanationPanel
            question={currentDQ.question}
            selectedAnswer={selectedAnswer ?? 0}
          />
          <button
            onClick={handleNext}
            className="w-full rounded-xl bg-pink-400 py-3 font-semibold text-white transition-colors hover:bg-pink-500 shadow-sm"
          >
            {currentIndex + 1 >= diagnosticQuestions.length ? 'See Results' : 'Next'}
          </button>
        </>
      )}
    </div>
  );
}
