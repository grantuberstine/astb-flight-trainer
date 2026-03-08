import { useParams, useNavigate, Navigate } from 'react-router';
import { useState, useEffect } from 'react';
import { Loader2, BookOpen } from 'lucide-react';
import type { SectionId } from '../types/question';
import type { SectionLesson } from '../types/lesson';
import { ASTB_SECTIONS } from '../lib/constants';
import { getLessons } from '../data/lessons';
import { LessonViewer } from '../components/lessons/LessonViewer';

const validSections = new Set<string>(ASTB_SECTIONS.map((s) => s.id));

export function LessonPage() {
  const { sectionId } = useParams<{ sectionId: string }>();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState<SectionLesson | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sectionId || !validSections.has(sectionId)) return;
    setLoading(true);
    getLessons(sectionId as SectionId).then((data) => {
      setLesson(data);
      setLoading(false);
    });
  }, [sectionId]);

  if (!sectionId || !validSections.has(sectionId)) {
    return <Navigate to="/practice" replace />;
  }

  if (loading || !lesson) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20">
        <Loader2 className="h-8 w-8 animate-spin text-gold-400" />
        <p className="text-navy-300">Loading lesson...</p>
      </div>
    );
  }

  const sectionName =
    ASTB_SECTIONS.find((s) => s.id === sectionId)?.name ?? sectionId;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <BookOpen className="h-6 w-6 text-gold-400" />
        <h1 className="text-2xl font-bold">{sectionName} - Study Guide</h1>
      </div>
      <LessonViewer
        lesson={lesson}
        onComplete={() => navigate(`/practice/${sectionId}`)}
      />
    </div>
  );
}
