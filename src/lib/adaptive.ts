import type { WeightedSection } from '../types/adaptive';
import type { SectionId } from '../types/question';
import type { SectionScore } from '../types/progress';

const SECTION_IDS: SectionId[] = ['MST', 'RCT', 'MCT', 'ANIT', 'SAT'];

/**
 * Compute weights for each section based on inverse accuracy.
 * Untested sections (total = 0) get weight 1.0 (highest priority).
 * Formula: max(1 - accuracy, minWeight)
 */
export function computeSectionWeights(
  scores: Record<SectionId, SectionScore>,
  minWeight = 0.1,
): WeightedSection[] {
  return SECTION_IDS.map((sectionId) => {
    const score = scores[sectionId];
    if (score.total === 0) {
      return { sectionId, weight: 1.0 };
    }
    const accuracy = score.correct / score.total;
    const weight = Math.max(1 - accuracy, minWeight);
    return { sectionId, weight };
  });
}

/**
 * Weighted random selection from WeightedSection array.
 * Returns the selected SectionId.
 */
export function pickWeightedSection(weights: WeightedSection[]): SectionId {
  const totalWeight = weights.reduce((sum, w) => sum + w.weight, 0);
  let random = Math.random() * totalWeight;

  for (const w of weights) {
    random -= w.weight;
    if (random <= 0) {
      return w.sectionId;
    }
  }

  // Fallback: return last section
  return weights[weights.length - 1].sectionId;
}
