import type { BaabRecord, Question, Quest, SeeghaId } from '../types'
import { CURRICULUM_BAABS } from './curriculum'
import { EXPANSION_QUESTS } from './expansion'

const SEEGHA_KEYS: Array<{ id: SeeghaId; key: keyof BaabRecord['wazn']; label: string }> = [
  { id: 'maadhi', key: 'maadhi', label: 'ماضي' },
  { id: 'mudhaari', key: 'mudhaari', label: 'مضارع' },
  { id: 'masdar', key: 'masdar', label: 'مصدر' },
  { id: 'amr-hadir', key: 'amrHadir', label: 'أمر حاضر' },
  { id: 'amr-ghaib', key: 'amrGhaib', label: 'أمر غائب' },
  { id: 'nahi', key: 'nahi', label: 'نهي' },
  { id: 'juhd', key: 'juhd', label: 'جحد' },
  { id: 'nafi', key: 'nafi', label: 'نفي' },
  { id: 'istifham', key: 'istifham', label: 'استفهام' },
]

const OTHER_BAAB_LABELS = ['باب تفعيل', 'باب مفاعلة', 'باب تفاعل']

function options(correct: string, distractors: string[]) {
  return [correct, ...distractors].map((textAr, index) => ({
    id: String.fromCharCode(97 + index),
    textAr,
    isCorrect: index === 0,
  }))
}

function question(
  id: string,
  baab: BaabRecord,
  type: Question['type'],
  promptEn: string,
  correct: string,
  distractors: string[],
  explanation: string,
  seeghaId?: SeeghaId,
  promptAr?: string,
): Question {
  return {
    id,
    type,
    baabId: baab.id,
    seeghaId,
    promptAr,
    promptEn,
    expectedAnswer: 'a',
    acceptedVariants: [],
    options: options(correct, distractors),
    explanation: `${explanation} Demonstration content; textbook review is pending.`,
    reviewStatus: 'needs_review',
  }
}

function seeghaQuestions(baab: BaabRecord, prefix: string) {
  return SEEGHA_KEYS.map((seegha, index) =>
    question(
      `${prefix}-seegha-${index + 1}`,
      baab,
      'seegha-match',
      `Which ${seegha.label} pattern belongs to ${baab.nameAr}?`,
      baab.wazn[seegha.key],
      [
        baab.wazn[SEEGHA_KEYS[(index + 1) % SEEGHA_KEYS.length].key],
        baab.wazn[SEEGHA_KEYS[(index + 2) % SEEGHA_KEYS.length].key],
      ],
      `The ${seegha.label} pattern shown in the lesson record for ${baab.nameAr} is ${baab.wazn[seegha.key]}.`,
      seegha.id,
    ),
  )
}

function makeAdventure(baab: BaabRecord): Record<string, Quest> {
  const prefix = baab.id
  const exampleQuestions = baab.examples.slice(0, 3).map((entry, index) => {
    const seegha = SEEGHA_KEYS[index % SEEGHA_KEYS.length]
    return question(
      `${prefix}-builder-${index + 1}`,
      baab,
      'construct',
      `Build the ${seegha.label} form for this root.`,
      entry[seegha.key],
      baab.examples
        .filter((candidate) => candidate.rootId !== entry.rootId)
        .slice(0, 2)
        .map((candidate) => candidate[seegha.key]),
      `${seegha.label} entry for root ${entry.rootAr} is ${entry[seegha.key]}.`,
      seegha.id,
      entry.rootAr,
    )
  })
  const detectiveQuestions = baab.examples.slice(0, 3).map((entry, index) =>
    question(
      `${prefix}-detective-${index + 1}`,
      baab,
      'form-identify',
      'Which baab does this lesson example belong to?',
      baab.nameAr,
      [...OTHER_BAAB_LABELS.filter((label) => label !== baab.nameAr), 'باب استفعال'].slice(0, 3),
      `${entry.maadhi} is filed under ${baab.nameAr} in the lesson record.`,
      'maadhi',
      entry.maadhi,
    ),
  )
  const tableQuestions = SEEGHA_KEYS.map((seegha, index) =>
    question(
      `${prefix}-table-${index + 1}`,
      baab,
      'fill-table',
      'Restore the missing entry in this demonstration tasreef table.',
      baab.wazn[seegha.key],
      SEEGHA_KEYS.map((candidate) => baab.wazn[candidate.key])
        .filter((value) => value !== baab.wazn[seegha.key])
        .slice(0, 3),
      `The ${seegha.label} row for ${baab.nameAr} uses ${baab.wazn[seegha.key]}.`,
      seegha.id,
      seegha.label,
    ),
  )
  const speedQuestions = seeghaQuestions(baab, `${prefix}-speed`)
  const mixed = [exampleQuestions[0], detectiveQuestions[0], tableQuestions[0], speedQuestions[1]]
  const quest = (mode: Quest['gameMode'], titleEn: string, titleAr: string, descriptionEn: string, questions: Question[], xpReward: number): Quest => ({
    id: `adventure-${prefix}-${mode}`,
    lessonId: baab.lessonId,
    baabId: baab.id,
    gameMode: mode,
    titleEn,
    titleAr,
    descriptionEn,
    baabScope: baab.nameAr,
    xpReward,
    starThresholds: [50, 75, 100],
    questions,
    prereqQuestIds: [],
  })

  return {
    [`${prefix}-seegha-match`]: quest('seegha-match', 'Pattern Lanterns', 'فوانيس الصيغ', 'Match the lesson patterns to their seeghas.', seeghaQuestions(baab, prefix), 45),
    [`${prefix}-word-builder`]: quest('word-builder', 'Root Forge', 'مِصْهَرُ الجذر', 'Build forms from supplied roots and the lesson pattern.', exampleQuestions, 55),
    [`${prefix}-baab-detective`]: quest('baab-detective', 'Baab Detective', 'محقق الباب', 'Trace lesson examples back to their baab.', detectiveQuestions, 55),
    [`${prefix}-speed-run`]: quest('speed-run', 'Sarf Speed Run', 'سباق الصرف', 'Recall this baab in optional timed or untimed practice.', speedQuestions, 60),
    [`${prefix}-complete-tasreef`]: quest('complete-tasreef', 'Tasreef Table', 'جدول التصريف', 'Restore the missing entries in the lesson pattern table.', tableQuestions, 60),
    [`${prefix}-boss-battle`]: quest('boss-battle', 'Baab Guardian', 'حارس الباب', 'Face a mixed challenge built from this baab.', mixed, 90),
  }
}

export const CURRICULUM_QUESTS: Record<string, Quest> = Object.assign(
  {},
  ...CURRICULUM_BAABS.map(makeAdventure),
)

/** Backwards-compatible original demo quests plus the complete curriculum campaign. */
export const ALL_QUESTS: Record<string, Quest> = {
  ...EXPANSION_QUESTS,
  ...CURRICULUM_QUESTS,
}

export const QUESTS_BY_BAAB: Record<BaabRecord['id'], Quest[]> = Object.fromEntries(
  CURRICULUM_BAABS.map((baab) => [
    baab.id,
    Object.values(CURRICULUM_QUESTS).filter((quest) => quest.baabId === baab.id),
  ]),
) as Record<BaabRecord['id'], Quest[]>
