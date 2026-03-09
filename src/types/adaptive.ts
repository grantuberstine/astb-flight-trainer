import type { SectionId } from './question';

export interface SRCard {
  questionId: string;
  section: SectionId;
  easeFactor: number;
  interval: number;
  repetitions: number;
  nextReview: number;
  lastReview: number;
}

export interface WeightedSection {
  sectionId: SectionId;
  weight: number;
}

export interface DiagnosticSectionResult {
  correct: number;
  total: number;
  accuracy: number;
  avgTimeMs: number;
  weakTags: string[];
}

export interface DiagnosticResult {
  timestamp: number;
  sectionResults: Record<SectionId, DiagnosticSectionResult>;
  overallAccuracy: number;
  weakestSections: SectionId[];
  recommendedFocus: SectionId[];
}

export interface StudyWeek {
  weekNumber: number;
  startDate: string;
  endDate: string;
  focusSections: SectionId[];
  reviewSections: SectionId[];
  dailyGoal: number;
}
