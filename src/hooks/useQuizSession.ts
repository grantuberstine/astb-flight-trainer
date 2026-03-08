import { useReducer, useMemo } from 'react';
import type { Question, SectionId } from '../types/question';

export type QuizStatus = 'idle' | 'loading' | 'answering' | 'showing-explanation' | 'complete';

export interface AnswerEntry {
  questionId: string;
  selected: number;
  correct: boolean;
  timeMs: number;
}

export interface QuizState {
  status: QuizStatus;
  questions: Question[];
  currentIndex: number;
  subQuestionIndex: number;
  answers: AnswerEntry[];
  startedAt: number | null;
  questionStartedAt: number | null;
  sectionId: SectionId | null;
  timed: boolean;
  timeLimitSec: number | null;
}

type QuizAction =
  | { type: 'START'; sectionId: SectionId; count: number; timed: boolean; timeLimitSec?: number }
  | { type: 'QUESTIONS_LOADED'; questions: Question[] }
  | { type: 'ANSWER'; selected: number }
  | { type: 'NEXT' }
  | { type: 'QUIT' }
  | { type: 'TIME_UP' };

const initialState: QuizState = {
  status: 'idle',
  questions: [],
  currentIndex: 0,
  subQuestionIndex: 0,
  answers: [],
  startedAt: null,
  questionStartedAt: null,
  sectionId: null,
  timed: false,
  timeLimitSec: null,
};

function getCorrectAnswer(question: Question, subIndex: number): number {
  if (question.type === 'passage') {
    return question.questions[subIndex].correctAnswer;
  }
  return question.correctAnswer;
}

function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case 'START':
      return {
        ...initialState,
        status: 'loading',
        sectionId: action.sectionId,
        timed: action.timed,
        timeLimitSec: action.timeLimitSec ?? null,
      };

    case 'QUESTIONS_LOADED': {
      if (action.questions.length === 0) {
        return { ...state, status: 'complete', questions: [] };
      }
      return {
        ...state,
        status: 'answering',
        questions: action.questions,
        startedAt: Date.now(),
        questionStartedAt: Date.now(),
      };
    }

    case 'ANSWER': {
      if (state.status !== 'answering') return state;
      const current = state.questions[state.currentIndex];
      const now = Date.now();
      const timeMs = now - (state.questionStartedAt ?? now);

      if (current.type === 'passage') {
        const subQ = current.questions[state.subQuestionIndex];
        const correct = action.selected === subQ.correctAnswer;
        const entry: AnswerEntry = {
          questionId: `${current.id}_sub${state.subQuestionIndex}`,
          selected: action.selected,
          correct,
          timeMs,
        };
        const newAnswers = [...state.answers, entry];
        const isLastSubQ = state.subQuestionIndex >= current.questions.length - 1;

        if (isLastSubQ) {
          return {
            ...state,
            answers: newAnswers,
            status: 'showing-explanation',
          };
        }

        // More sub-questions: show explanation briefly then auto-advance
        return {
          ...state,
          answers: newAnswers,
          status: 'showing-explanation',
        };
      }

      // Multiple-choice or spatial
      const correctIdx = getCorrectAnswer(current, 0);
      const correct = action.selected === correctIdx;
      const entry: AnswerEntry = {
        questionId: current.id,
        selected: action.selected,
        correct,
        timeMs,
      };

      return {
        ...state,
        answers: [...state.answers, entry],
        status: 'showing-explanation',
      };
    }

    case 'NEXT': {
      if (state.status !== 'showing-explanation') return state;
      const current = state.questions[state.currentIndex];

      // For passage questions, advance sub-question first
      if (current.type === 'passage') {
        const nextSub = state.subQuestionIndex + 1;
        if (nextSub < current.questions.length) {
          return {
            ...state,
            subQuestionIndex: nextSub,
            status: 'answering',
            questionStartedAt: Date.now(),
          };
        }
      }

      // Move to next question
      const nextIndex = state.currentIndex + 1;
      if (nextIndex >= state.questions.length) {
        return { ...state, status: 'complete' };
      }

      return {
        ...state,
        currentIndex: nextIndex,
        subQuestionIndex: 0,
        status: 'answering',
        questionStartedAt: Date.now(),
      };
    }

    case 'QUIT':
      return { ...state, status: 'complete' };

    case 'TIME_UP':
      return { ...state, status: 'complete' };

    default:
      return state;
  }
}

export function useQuizSession() {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  const currentQuestion = state.questions[state.currentIndex] ?? null;

  const progress = useMemo(() => {
    const answered = state.answers.length;
    let total = 0;
    for (const q of state.questions) {
      if (q.type === 'passage') {
        total += q.questions.length;
      } else {
        total += 1;
      }
    }
    const correct = state.answers.filter((a) => a.correct).length;
    return { answered, total, correct };
  }, [state.answers, state.questions]);

  return { state, dispatch, currentQuestion, progress };
}
