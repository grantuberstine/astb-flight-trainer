import type { StudyWeek, WeightedSection } from '../types/adaptive';
import type { SectionId } from '../types/question';

const MAX_WEEKS = 12;
const MS_PER_DAY = 86400000;

function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

/**
 * Generate a weekly study plan based on test date and section weights.
 * - Sorts sections by weight descending (weakest first)
 * - Front-loads weakest sections in early weeks
 * - Final week is comprehensive review with lower daily goal
 * - Handles edge cases: past date (1 comprehensive week), far out (cap 12 weeks)
 */
export function generateStudyPlan(
  testDate: string,
  sectionWeights: WeightedSection[],
): StudyWeek[] {
  const now = new Date();
  const test = new Date(testDate);
  const daysRemaining = Math.max(
    0,
    Math.ceil((test.getTime() - now.getTime()) / MS_PER_DAY),
  );

  // Sort sections by weight descending (highest weight = weakest)
  const sorted = [...sectionWeights].sort((a, b) => b.weight - a.weight);
  const allSectionIds = sorted.map((s) => s.sectionId);

  // Edge case: test date in past or today
  if (daysRemaining <= 0) {
    return [
      {
        weekNumber: 1,
        startDate: formatDate(now),
        endDate: formatDate(now),
        focusSections: allSectionIds,
        reviewSections: [],
        dailyGoal: 15,
      },
    ];
  }

  // Calculate number of weeks, capped at MAX_WEEKS
  const rawWeeks = Math.ceil(daysRemaining / 7);
  const numWeeks = Math.min(rawWeeks, MAX_WEEKS);

  const weeks: StudyWeek[] = [];

  for (let i = 0; i < numWeeks; i++) {
    const weekStart = new Date(now.getTime() + i * 7 * MS_PER_DAY);
    const weekEnd = new Date(
      Math.min(
        now.getTime() + (i + 1) * 7 * MS_PER_DAY - MS_PER_DAY,
        test.getTime(),
      ),
    );

    const isLastWeek = i === numWeeks - 1;

    let focusSections: SectionId[];
    let reviewSections: SectionId[];

    if (isLastWeek) {
      // Final week: comprehensive review of all sections
      focusSections = allSectionIds;
      reviewSections = [];
    } else {
      // Distribute sections across weeks, front-loading weakest
      const focusCount = Math.min(2, allSectionIds.length);
      const startIdx = (i * focusCount) % allSectionIds.length;
      focusSections = [];
      for (let j = 0; j < focusCount; j++) {
        focusSections.push(allSectionIds[(startIdx + j) % allSectionIds.length]);
      }
      reviewSections = allSectionIds.filter(
        (s) => !focusSections.includes(s),
      );
    }

    weeks.push({
      weekNumber: i + 1,
      startDate: formatDate(weekStart),
      endDate: formatDate(weekEnd),
      focusSections,
      reviewSections,
      dailyGoal: isLastWeek ? 15 : 20,
    });
  }

  return weeks;
}
