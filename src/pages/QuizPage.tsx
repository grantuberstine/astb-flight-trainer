import { useParams, useLocation, Navigate } from 'react-router';
import type { SectionId } from '../types/question';
import { ASTB_SECTIONS } from '../lib/constants';
import { QuizSession } from '../components/quiz/QuizSession';

const validSections = new Set<string>(ASTB_SECTIONS.map((s) => s.id));

export function QuizPage() {
  const { sectionId } = useParams<{ sectionId: string }>();
  const location = useLocation();

  if (!sectionId || !validSections.has(sectionId)) {
    return <Navigate to="/practice" replace />;
  }

  const mode = location.pathname.includes('timed-test') ? 'timed' : 'practice';

  return (
    <QuizSession
      sectionId={sectionId as SectionId}
      mode={mode as 'practice' | 'timed'}
    />
  );
}
