import type { BadgeContext } from '../types/gamification';
import { BADGE_DEFINITIONS } from '../data/badges';

/**
 * Evaluates all badge definitions against the current context.
 * Returns an array of badge IDs that are newly earned (not already in context.badges).
 */
export function evaluateNewBadges(context: BadgeContext): string[] {
  const earnedIds = new Set(context.badges.map((b) => b.id));

  return BADGE_DEFINITIONS
    .filter((def) => !earnedIds.has(def.id) && def.check(context))
    .map((def) => def.id);
}
