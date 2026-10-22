/**
 * Sarf Quest — Content Schema Types
 * Based on docs/content-schema.md
 *
 * All Arabic teaching content flows through these typed interfaces.
 * UI components must not contain authoritative Sarf rules directly.
 */

// ── Review lifecycle ──────────────────────────────────────────

export type ReviewStatus = 'draft' | 'needs_review' | 'verified'

// ── Identifiers ───────────────────────────────────────────────

export type SeeghaId =
  | 'maadhi' // ماضي    — past tense
  | 'mudhaari' // مضارع   — present/future tense
  | 'masdar' // مصدر    — verbal noun
  | 'amr-hadir' // أمر حاضر — imperative (present address)
  | 'amr-ghaib' // أمر غائب — imperative (third person)
  | 'nahi' // نهي     — prohibition
  | 'juhd' // جحد     — denial (lam + mudhaari jazm)
  | 'nafi' // نفي     — negation
  | 'istifham' // استفهام  — interrogative

export type BaabId =
  | 'ifaal' // باب افعال     — أَفْعَلَ
  | 'tafeel' // باب تفعيل     — فَعَّلَ
  | 'mufaala' // باب مفاعلة    — فَاعَلَ
  | 'tafaul' // باب تفاعل     — تَفَاعَلَ
  | 'tafaful' // باب تفعّل     — تَفَعَّلَ
  | 'iftial' // باب افتعال    — افْتَعَلَ
  | 'infial' // باب انفعال    — انْفَعَلَ
  | 'iflaal' // باب افعلال    — افْعَلَّ
  | 'istifal' // باب استفعال   — اسْتَفْعَلَ
  | 'ifiyaal' // باب افعيعال   — افْعَوْعَلَ

export type GameMode =
  | 'seegha-match'
  | 'word-builder'
  | 'baab-detective'
  | 'speed-run'
  | 'complete-tasreef'
  | 'boss-battle'

export type QuestionType =
  | 'seegha-match' // label → form
  | 'form-identify' // form  → label
  | 'meaning-match' // form  → meaning
  | 'construct' // root + target → form
  | 'fill-table' // fill a blank seegha cell

// ── Content records ───────────────────────────────────────────

/** The nine key forms of a baab, keyed by seegha. */
export interface WaznTable {
  maadhi: string // فَعَّلَ
  mudhaari: string // يُفَعِّلُ
  masdar: string // تَفْعِيل
  amrHadir: string // فَعِّلْ
  amrGhaib: string // لِيُفَعِّلْ
  nahi: string // لا يُفَعِّلْ
  juhd: string // لَمْ يُفَعِّلُ
  nafi: string // لا يُفَعِّلُ
  istifham: string // هَلْ يُفَعِّلُ
}

export interface BaabMeaning {
  id: string
  meaningEn: string
  exampleAr?: string
  exampleTranslation?: string
  reviewStatus: ReviewStatus
}

export interface RootExample {
  rootId: string
  rootAr: string // e.g. 'علم' (unvowelled)
  maadhi: string // e.g. 'عَلَّمَ' (with tashkeel)
  mudhaari: string // e.g. 'يُعَلِّمُ'
  masdar: string // e.g. 'تَعْلِيم'
  meaningEn: string // e.g. 'He taught'
  reviewStatus: ReviewStatus
  sourceNotes?: string
}

export interface BaabRecord {
  id: BaabId
  nameAr: string // e.g. 'باب تفعيل'
  nameEn: string // e.g. 'Baab Tafeel'
  lessonId: string
  wazn: WaznTable
  meanings: BaabMeaning[]
  examples: RootExample[]
  reviewStatus: ReviewStatus
  sourceNotes: string
}

// ── Questions ────────────────────────────────────────────────

export interface AnswerOption {
  id: string
  textAr?: string
  textEn?: string
  isCorrect: boolean
}

export interface Question {
  id: string
  type: QuestionType
  baabId: BaabId
  seeghaId?: SeeghaId
  promptAr?: string
  promptEn?: string
  expectedAnswer: string // id of the correct option
  acceptedVariants: string[]
  options: AnswerOption[]
  explanation: string
  reviewStatus: ReviewStatus
}

// ── Quests ────────────────────────────────────────────────────

export interface Quest {
  id: string
  lessonId: string
  baabId: BaabId
  gameMode: GameMode
  titleEn: string
  titleAr: string
  descriptionEn: string
  baabScope: string // human-readable scope (shown on intro screen)
  xpReward: number // max XP for a perfect run
  /** min accuracy % (0–100) to earn 1, 2, and 3 stars respectively */
  starThresholds: [number, number, number]
  questions: Question[]
  prereqQuestIds: string[]
}

// ── Player profile / persistence ─────────────────────────────

export type MasteryState = 'locked' | 'learning' | 'practiced' | 'mastered'

export interface PlayerSettings {
  soundEnabled: boolean
  reducedMotion: boolean
  textScale: 'normal' | 'large'
}

export interface QuestProgress {
  questId: string
  completedAt?: string
  bestStars: number // 0–3
  bestAccuracy: number // 0–1
  attempts: number
  totalXpEarned: number
  mistakeQuestionIds?: string[]
}

export interface BaabMastery {
  baabId: BaabId
  masteryState: MasteryState
  attempts: number
  correctAttempts: number
  lastReviewedAt?: string
  nextReviewAt?: string
}

export interface DailyGoal {
  date: string
  questsCompleted: number
  questsTarget: number
  xpEarned: number
}

export interface PlayerProfile {
  localPlayerId: string
  displayName: string
  level: number
  xp: number
  xpToNextLevel: number
  createdAt: string
  lastPlayedAt: string
  questProgress: Record<string, QuestProgress>
  baabMastery: Record<string, BaabMastery>
  dailyGoal: DailyGoal
  settings?: PlayerSettings
}

// ── Session ────────────────────────────────────────────────────

export interface AnswerResult {
  questionId: string
  submittedAnswer: string
  isCorrect: boolean
  hintUsed: boolean
  feedbackShown: boolean
  answeredAt: string
}

export interface GameSession {
  sessionId: string
  questId: string
  startedAt: string
  completedAt?: string
  answers: AnswerResult[]
  accuracy: number
  xpAwarded: number
  completionStatus: 'in_progress' | 'completed' | 'abandoned'
}
