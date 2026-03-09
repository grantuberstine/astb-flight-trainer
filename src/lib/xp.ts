import { Rank } from '../types/gamification';
import { RANK_THRESHOLDS } from './constants';

const RANK_ORDER = [Rank.CADET, Rank.ENSIGN, Rank.LIEUTENANT, Rank.COMMANDER, Rank.PILOT] as const;

export function getRankProgress(xp: number, currentRank: Rank) {
  const currentIdx = RANK_ORDER.indexOf(currentRank);
  const nextIdx = currentIdx + 1;

  if (nextIdx >= RANK_ORDER.length) {
    return {
      currentXP: xp,
      nextThreshold: RANK_THRESHOLDS[Rank.PILOT],
      progress: 1,
      nextRank: null as Rank | null,
    };
  }

  const nextRank = RANK_ORDER[nextIdx];
  const currentThreshold = RANK_THRESHOLDS[currentRank];
  const nextThreshold = RANK_THRESHOLDS[nextRank];
  const progress = (xp - currentThreshold) / (nextThreshold - currentThreshold);

  return {
    currentXP: xp,
    nextThreshold,
    progress: Math.min(Math.max(progress, 0), 1),
    nextRank,
  };
}
