/**
 * Sarf Quest — XP and Scoring System
 *
 * Pure functions: no side-effects, fully testable.
 * XP measures participation; mastery reflects learning evidence.
 */

import type { Quest } from '../content/types'

// ── Star calculation ──────────────────────────────────────────

/**
 * Calculate stars (0–3) from accuracy percentage.
 * @param accuracy     0–100 accuracy percentage
 * @param thresholds   [min% for 1 star, min% for 2 stars, min% for 3 stars]
 */
export function calculateStars(
  accuracy: number,
  thresholds: [number, number, number],
): number {
  if (accuracy >= thresholds[2]) return 3
  if (accuracy >= thresholds[1]) return 2
  if (accuracy >= thresholds[0]) return 1
  return 0
}

// ── XP calculation ────────────────────────────────────────────

interface XPFactors {
  baseXP: number // max XP for perfect run
  accuracy: number // 0–100
  stars: number // 0–3
  isFirstCompletion: boolean
  hintPenaltyCount: number
}

/**
 * Calculate XP earned for a quest session.
 * Rewards accuracy and productive retries, not mere activity.
 */
export function calculateXP({
  baseXP,
  accuracy,
  stars,
  isFirstCompletion,
  hintPenaltyCount,
}: XPFactors): number {
  // Base: proportional to accuracy
  let xp = Math.round(baseXP * (accuracy / 100))

  // Star bonus: 0%, 10%, 25%, 50%
  const starBonus = [0, 0.1, 0.25, 0.5][stars] ?? 0
  xp += Math.round(baseXP * starBonus)

  // First completion bonus
  if (isFirstCompletion) {
    xp += Math.round(baseXP * 0.2)
  }

  // Hint penalty: 5 XP per hint used (capped)
  const penalty = Math.min(hintPenaltyCount * 5, Math.round(xp * 0.3))
  xp = Math.max(0, xp - penalty)

  return xp
}

/** Calculate XP for a session given a Quest and session stats. */
export function calculateSessionXP(
  quest: Quest,
  accuracy: number,
  isFirstCompletion: boolean,
  hintCount = 0,
): number {
  const stars = calculateStars(accuracy, quest.starThresholds)
  return calculateXP({
    baseXP: quest.xpReward,
    accuracy,
    stars,
    isFirstCompletion,
    hintPenaltyCount: hintCount,
  })
}

// ── Level system ──────────────────────────────────────────────

/** XP required to reach a given level from level 1. */
export function xpForLevel(level: number): number {
  // Geometric: 100, 125, 156, 195, ...
  let total = 0
  let threshold = 100
  for (let l = 1; l < level; l++) {
    total += threshold
    threshold = Math.round(threshold * 1.25)
  }
  return total
}

/** XP needed to advance from the current level to the next. */
export function xpToNextLevel(currentLevel: number): number {
  return Math.round(100 * Math.pow(1.25, currentLevel - 1))
}

/** Returns a title label for a given level. */
export function levelTitle(level: number): string {
  if (level < 3) return 'Seeker'
  if (level < 6) return 'Student'
  if (level < 10) return 'Practitioner'
  if (level < 15) return 'Scholar'
  if (level < 20) return 'Master'
  return 'Sage'
}
