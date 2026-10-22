/**
 * Sarf Quest — Player Persistence
 *
 * LocalStorage-backed player profile store.
 * Repository abstraction: swap out the read/write functions to use
 * a cloud backend (e.g. Supabase) without changing callers.
 */

import type {
  PlayerProfile,
  QuestProgress,
  BaabMastery,
  BaabId,
  PlayerSettings,
} from '../content/types'

const STORAGE_KEY = 'sarfquest:player'

export const DEFAULT_PLAYER_SETTINGS: PlayerSettings = {
  soundEnabled: false,
  reducedMotion: false,
  textScale: 'normal',
}

// ── Default profile ───────────────────────────────────────────

function todayISO(): string {
  return new Date().toISOString().slice(0, 10)
}

function makeDefaultProfile(): PlayerProfile {
  return {
    localPlayerId: `local-${Date.now()}`,
    displayName: 'Adventurer',
    level: 1,
    xp: 0,
    xpToNextLevel: 100,
    createdAt: new Date().toISOString(),
    lastPlayedAt: new Date().toISOString(),
    questProgress: {},
    baabMastery: {},
    dailyGoal: {
      date: todayISO(),
      questsCompleted: 0,
      questsTarget: 3,
      xpEarned: 0,
    },
    settings: { ...DEFAULT_PLAYER_SETTINGS },
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value)
}

function normalizeSettings(value: unknown): PlayerSettings {
  if (!isRecord(value)) return { ...DEFAULT_PLAYER_SETTINGS }
  return {
    soundEnabled:
      typeof value.soundEnabled === 'boolean'
        ? value.soundEnabled
        : DEFAULT_PLAYER_SETTINGS.soundEnabled,
    reducedMotion:
      typeof value.reducedMotion === 'boolean'
        ? value.reducedMotion
        : DEFAULT_PLAYER_SETTINGS.reducedMotion,
    textScale: value.textScale === 'large' ? 'large' : 'normal',
  }
}

function getRecordEntry<T>(
  record: Record<string, T>,
  key: string,
): T | undefined {
  return Object.prototype.hasOwnProperty.call(record, key)
    ? record[key]
    : undefined
}

function isStoredProfile(value: unknown): value is PlayerProfile {
  if (!isRecord(value)) return false

  const dailyGoal = value.dailyGoal
  return (
    typeof value.localPlayerId === 'string' &&
    typeof value.displayName === 'string' &&
    isFiniteNumber(value.level) &&
    isFiniteNumber(value.xp) &&
    isFiniteNumber(value.xpToNextLevel) &&
    typeof value.createdAt === 'string' &&
    typeof value.lastPlayedAt === 'string' &&
    isRecord(value.questProgress) &&
    isRecord(value.baabMastery) &&
    isRecord(dailyGoal) &&
    typeof dailyGoal.date === 'string' &&
    isFiniteNumber(dailyGoal.questsCompleted) &&
    isFiniteNumber(dailyGoal.questsTarget) &&
    isFiniteNumber(dailyGoal.xpEarned)
  )
}

// ── Read / Write ──────────────────────────────────────────────

export function loadProfile(): PlayerProfile {
  if (typeof window === 'undefined') return makeDefaultProfile()
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return makeDefaultProfile()
    const parsed: unknown = JSON.parse(raw)
    if (!isStoredProfile(parsed)) {
      window.localStorage.removeItem(STORAGE_KEY)
      return makeDefaultProfile()
    }
    // Reset daily goal if it's a new day
    if (parsed.dailyGoal.date !== todayISO()) {
      parsed.dailyGoal = {
        date: todayISO(),
        questsCompleted: 0,
        questsTarget: parsed.dailyGoal.questsTarget,
        xpEarned: 0,
      }
    }
    parsed.settings = normalizeSettings(parsed.settings)
    return parsed
  } catch {
    return makeDefaultProfile()
  }
}

export function saveProfile(profile: PlayerProfile): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profile))
  } catch (e) {
    console.warn('[SarfQuest] Could not persist player profile:', e)
  }
}

export function savePlayerSettings(
  profile: PlayerProfile,
  settings: PlayerSettings,
): PlayerProfile {
  const nextProfile = { ...profile, settings: normalizeSettings(settings) }
  saveProfile(nextProfile)
  return nextProfile
}

export function applyPlayerSettings(settings: PlayerSettings): void {
  if (typeof document === 'undefined') return
  document.documentElement.dataset.textScale = settings.textScale
  document.documentElement.dataset.reducedMotion = String(settings.reducedMotion)
}

// ── Profile mutations ─────────────────────────────────────────

/** Award XP and handle level-up. Returns the updated profile. */
export function awardXP(profile: PlayerProfile, amount: number): PlayerProfile {
  let { xp, level, xpToNextLevel } = profile
  xp += amount

  while (xp >= xpToNextLevel) {
    xp -= xpToNextLevel
    level += 1
    xpToNextLevel = Math.round(xpToNextLevel * 1.25) // scale with level
  }

  return {
    ...profile,
    xp,
    level,
    xpToNextLevel,
    lastPlayedAt: new Date().toISOString(),
    dailyGoal: {
      ...profile.dailyGoal,
      xpEarned: profile.dailyGoal.xpEarned + amount,
    },
  }
}

/** Record a completed quest and update best stars/accuracy. */
export function recordQuestCompletion(
  profile: PlayerProfile,
  questId: string,
  stars: number,
  accuracy: number,
  xpEarned: number,
  mistakeQuestionIds: string[] = [],
): PlayerProfile {
  const existing = getRecordEntry(profile.questProgress, questId)
  const updated: QuestProgress = {
    questId,
    completedAt: new Date().toISOString(),
    bestStars: Math.max(stars, existing?.bestStars ?? 0),
    bestAccuracy: Math.max(accuracy, existing?.bestAccuracy ?? 0),
    attempts: (existing?.attempts ?? 0) + 1,
    totalXpEarned: (existing?.totalXpEarned ?? 0) + xpEarned,
    mistakeQuestionIds,
  }

  const dailyGloal = profile.dailyGoal
  const justCompleted = !existing?.completedAt
  return {
    ...profile,
    questProgress: { ...profile.questProgress, [questId]: updated },
    dailyGoal: {
      ...dailyGloal,
      questsCompleted: justCompleted
        ? dailyGloal.questsCompleted + 1
        : dailyGloal.questsCompleted,
    },
  }
}

/** Update mastery state for a baab based on recent performance. */
export function updateBaabMastery(
  profile: PlayerProfile,
  baabId: BaabId,
  accuracy: number,
): PlayerProfile {
  const existing: BaabMastery = getRecordEntry(profile.baabMastery, baabId) ?? {
    baabId,
    masteryState: 'locked',
    attempts: 0,
    correctAttempts: 0,
  }

  const attempts = existing.attempts + 1
  const correctAttempts = existing.correctAttempts + Math.round(accuracy / 100)

  let masteryState = existing.masteryState
  const ratio = correctAttempts / attempts
  if (attempts >= 1) masteryState = 'learning'
  if (attempts >= 3 && ratio >= 0.6) masteryState = 'practiced'
  if (attempts >= 5 && ratio >= 0.85) masteryState = 'mastered'

  const updated: BaabMastery = {
    baabId,
    masteryState,
    attempts,
    correctAttempts,
    lastReviewedAt: new Date().toISOString(),
    nextReviewAt: new Date(
      Date.now() +
        (accuracy >= 85 ? 7 : accuracy >= 60 ? 3 : 1) * 24 * 60 * 60 * 1000,
    ).toISOString(),
  }

  return {
    ...profile,
    baabMastery: { ...profile.baabMastery, [baabId]: updated },
  }
}

/** Check whether a quest is available to play. */
export function isQuestUnlocked(
  profile: PlayerProfile,
  prereqQuestIds: string[],
): boolean {
  if (prereqQuestIds.length === 0) return true
  return prereqQuestIds.every((id) => {
    const progress = getRecordEntry(profile.questProgress, id)
    return Boolean(progress?.completedAt)
  })
}
