import type {
  AnswerResult,
  GameMode,
  MasteryState,
  PlayerProfile,
  Question,
  Quest,
} from '../content/types'

export interface GameModeContract<QuestionState = unknown, Answer = string> {
  mode: GameMode
  createSession: (quest: Quest) => QuestionState
  selectQuestion: (state: QuestionState) => Question | undefined
  validateAnswer: (question: Question, answer: Answer) => AnswerResult
  scoreAnswer: (result: AnswerResult) => number
}

export interface GameModeDefinition {
  id: GameMode
  title: string
  titleAr: string
  description: string
  unlockLabel: string
  requiredMastery?: MasteryState
}

/** Mode metadata is presentation-safe; actual rules belong to each mode engine. */
export const GAME_MODE_DEFINITIONS: GameModeDefinition[] = [
  {
    id: 'seegha-match',
    title: 'Seegha Match',
    titleAr: 'مطابقة الصيغة',
    description: 'Match patterns, forms, and meanings in a short quest.',
    unlockLabel: 'Available now',
  },
  {
    id: 'word-builder',
    title: 'Word Builder',
    titleAr: 'بناء الكلمة',
    description: 'Assemble a form from a root and a target pattern.',
    unlockLabel: 'Training ground open',
  },
  {
    id: 'baab-detective',
    title: 'Baab Detective',
    titleAr: 'محقق الباب',
    description: 'Trace a pattern through its examples and clues.',
    unlockLabel: 'Training ground open',
  },
  {
    id: 'speed-run',
    title: 'Sarf Speed Run',
    titleAr: 'سباق الصرف',
    description: 'Recall familiar forms with an optional time challenge.',
    unlockLabel: 'Training ground open',
  },
  {
    id: 'complete-tasreef',
    title: 'Complete the Tasreef',
    titleAr: 'أكمل التصريف',
    description: 'Restore missing entries in a tasreef table.',
    unlockLabel: 'Training ground open',
  },
  {
    id: 'boss-battle',
    title: 'Boss Battle',
    titleAr: 'المواجهة الكبرى',
    description: 'Face a mixed challenge drawn from mastered ground.',
    unlockLabel: 'Reach learning mastery',
    requiredMastery: 'learning',
  },
]

const MASTERY_ORDER: MasteryState[] = [
  'locked',
  'learning',
  'practiced',
  'mastered',
]

export function isModeUnlocked(
  profile: PlayerProfile,
  definition: GameModeDefinition,
): boolean {
  if (!definition.requiredMastery) return true
  const requiredIndex = MASTERY_ORDER.indexOf(definition.requiredMastery)
  return Object.values(profile.baabMastery).some(
    (mastery) => MASTERY_ORDER.indexOf(mastery.masteryState) >= requiredIndex,
  )
}
