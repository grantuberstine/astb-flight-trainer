import type { DiagnosticResult, DiagnosticSectionResult } from '../types/adaptive';
import type { SectionId } from '../types/question';
import type { AnswerRecord } from '../types/progress';

export const DIAGNOSTIC_QUESTIONS_PER_SECTION = 5;

const SECTION_IDS: SectionId[] = ['MST', 'RCT', 'MCT', 'ANIT', 'SAT'];

const emptySectionResult: DiagnosticSectionResult = {
  correct: 0,
  total: 0,
  accuracy: 0,
  avgTimeMs: 0,
  weakTags: [],
};

/**
 * Score a diagnostic test from answer records.
 * tagLookup maps questionId -> tags for pure function (no async loading).
 */
export function scoreDiagnostic(
  answers: AnswerRecord[],
  tagLookup: Record<string, string[]>,
): DiagnosticResult {
  // Group answers by section
  const bySection = new Map<SectionId, AnswerRecord[]>();
  for (const id of SECTION_IDS) {
    bySection.set(id, []);
  }
  for (const answer of answers) {
    const existing = bySection.get(answer.section);
    if (existing) {
      existing.push(answer);
    }
  }

  const sectionResults = {} as Record<SectionId, DiagnosticSectionResult>;
  let totalCorrect = 0;
  let totalAnswers = 0;

  for (const sectionId of SECTION_IDS) {
    const sectionAnswers = bySection.get(sectionId) ?? [];

    if (sectionAnswers.length === 0) {
      sectionResults[sectionId] = { ...emptySectionResult };
      continue;
    }

    const correct = sectionAnswers.filter((a) => a.correct).length;
    const total = sectionAnswers.length;
    const accuracy = correct / total;
    const avgTimeMs = Math.round(
      sectionAnswers.reduce((sum, a) => sum + a.timeSpentMs, 0) / total,
    );

    // Collect tags from incorrect answers as weak tags
    const weakTagSet = new Set<string>();
    for (const answer of sectionAnswers) {
      if (!answer.correct) {
        const tags = tagLookup[answer.questionId];
        if (tags) {
          for (const tag of tags) {
            weakTagSet.add(tag);
          }
        }
      }
    }

    sectionResults[sectionId] = {
      correct,
      total,
      accuracy,
      avgTimeMs,
      weakTags: [...weakTagSet],
    };

    totalCorrect += correct;
    totalAnswers += total;
  }

  const overallAccuracy = totalAnswers > 0 ? totalCorrect / totalAnswers : 0;

  // Identify weakest sections (sorted by accuracy ascending, take bottom 2-3)
  const scoredSections = SECTION_IDS
    .filter((id) => sectionResults[id].total > 0)
    .map((id) => ({ id, accuracy: sectionResults[id].accuracy }))
    .sort((a, b) => a.accuracy - b.accuracy);

  const weakestCount = Math.min(3, Math.max(2, scoredSections.length));
  const weakestSections = scoredSections
    .slice(0, weakestCount)
    .map((s) => s.id);

  // Recommended focus: weakest sections with accuracy below 70%
  const recommendedFocus = scoredSections
    .filter((s) => s.accuracy < 0.7)
    .map((s) => s.id);

  return {
    timestamp: Date.now(),
    sectionResults,
    overallAccuracy,
    weakestSections,
    recommendedFocus: recommendedFocus.length > 0 ? recommendedFocus : weakestSections.slice(0, 2),
  };
}
