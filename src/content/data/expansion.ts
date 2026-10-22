import { BAAB_MUFAALA, BAAB_TAFEEL, QUEST_TAFEEL_SEEGHA_MATCH } from './lesson11'
import type { BaabRecord, Question, Quest, SeeghaId } from '../types'

const SEEGHA_KEYS: Array<{ id: SeeghaId; key: keyof BaabRecord['wazn']; label: string }> = [
  { id: 'maadhi', key: 'maadhi', label: 'ماضي' },
  { id: 'mudhaari', key: 'mudhaari', label: 'مضارع' },
  { id: 'masdar', key: 'masdar', label: 'مصدر' },
  { id: 'amr-hadir', key: 'amrHadir', label: 'أمر حاضر' },
]

function options(correct: string, distractors: string[]) {
  return [correct, ...distractors].map((textAr, index) => ({
    id: String.fromCharCode(97 + index),
    textAr,
    isCorrect: index === 0,
  }))
}

function exampleQuestion(
  id: string,
  baab: BaabRecord,
  exampleIndex: number,
  seegha: (typeof SEEGHA_KEYS)[number],
  distractorIndexes: number[],
): Question {
  const example = baab.examples[exampleIndex]
  const correct = example[seegha.key]
  const distractors = distractorIndexes.map(
    (index) => baab.examples[index][seegha.key],
  )
  return {
    id,
    type: 'construct',
    baabId: baab.id,
    seeghaId: seegha.id,
    promptAr: example.rootAr,
    promptEn: `Build the ${seegha.label} form for this root.`,
    expectedAnswer: 'a',
    acceptedVariants: [],
    options: options(correct, distractors),
    explanation: `${seegha.label} entry from ${baab.nameAr}, root ${example.rootAr}. Demonstration content; textbook review is pending.`,
    reviewStatus: 'needs_review',
  }
}

const WORD_BUILDER_QUESTIONS: Question[] = [
  exampleQuestion('wb-01', BAAB_TAFEEL, 0, SEEGHA_KEYS[0], [1, 2]),
  exampleQuestion('wb-02', BAAB_TAFEEL, 1, SEEGHA_KEYS[1], [0, 2]),
  exampleQuestion('wb-03', BAAB_TAFEEL, 2, SEEGHA_KEYS[2], [0, 1]),
]

const BAAB_DETECTIVE_QUESTIONS: Question[] = [
  {
    id: 'bd-01',
    type: 'form-identify',
    baabId: 'tafeel',
    promptAr: BAAB_TAFEEL.examples[0].maadhi,
    promptEn: 'Which baab does this lesson example belong to?',
    expectedAnswer: 'a',
    acceptedVariants: [],
    options: options('باب تفعيل', ['باب مفاعلة', 'باب تفاعل', 'باب إفعال']),
    explanation: 'This demonstration example is listed under باب تفعيل in Lesson 11; review is pending.',
    reviewStatus: 'needs_review',
  },
  {
    id: 'bd-02',
    type: 'form-identify',
    baabId: 'mufaala',
    promptAr: BAAB_MUFAALA.examples[0].maadhi,
    promptEn: 'Which baab does this lesson example belong to?',
    expectedAnswer: 'a',
    acceptedVariants: [],
    options: options('باب مفاعلة', ['باب تفعيل', 'باب افتعال', 'باب استفعال']),
    explanation: 'This demonstration example is listed under باب مفاعلة in Lesson 11; review is pending.',
    reviewStatus: 'needs_review',
  },
  {
    id: 'bd-03',
    type: 'form-identify',
    baabId: 'mufaala',
    promptAr: BAAB_MUFAALA.examples[1].maadhi,
    promptEn: 'Which baab does this lesson example belong to?',
    expectedAnswer: 'a',
    acceptedVariants: [],
    options: options('باب مفاعلة', ['باب تفعيل', 'باب تفاعل', 'باب إفعال']),
    explanation: 'This demonstration example is listed under باب مفاعلة in Lesson 11; review is pending.',
    reviewStatus: 'needs_review',
  },
]

const COMPLETE_TASREEF_QUESTIONS: Question[] = SEEGHA_KEYS.slice(0, 3).map(
  (seegha, index) => {
    const correct = BAAB_TAFEEL.wazn[seegha.key]
    const other = SEEGHA_KEYS.filter((candidate) => candidate.id !== seegha.id)
      .slice(0, 3)
      .map((candidate) => BAAB_TAFEEL.wazn[candidate.key])
    return {
      id: `ct-${index + 1}`,
      type: 'fill-table',
      baabId: 'tafeel',
      seeghaId: seegha.id,
      promptAr: seegha.label,
      promptEn: 'Restore the missing entry in the demonstration tasreef table.',
      expectedAnswer: 'a',
      acceptedVariants: [],
      options: options(correct, other),
      explanation: `The Lesson 11 demonstration table lists ${correct} for ${seegha.label}; review is pending.`,
      reviewStatus: 'needs_review',
    }
  },
)

const SPEED_RUN_QUESTIONS = QUEST_TAFEEL_SEEGHA_MATCH.questions.slice(0, 5).map(
  (question, index) => ({ ...question, id: `sr-${index + 1}` }),
)

export const EXPANSION_QUESTS: Record<string, Quest> = {
  'word-builder': {
    id: 'word-builder-demo',
    lessonId: 'lesson-11',
    baabId: 'tafeel',
    gameMode: 'word-builder',
    titleEn: 'Word Builder',
    titleAr: 'بناء الكلمة',
    descriptionEn: 'Assemble demonstration forms from supplied roots and seegha targets.',
    baabScope: BAAB_TAFEEL.nameAr,
    xpReward: 55,
    starThresholds: [50, 75, 100],
    questions: WORD_BUILDER_QUESTIONS,
    prereqQuestIds: [],
  },
  'baab-detective': {
    id: 'baab-detective-demo',
    lessonId: 'lesson-11',
    baabId: 'tafeel',
    gameMode: 'baab-detective',
    titleEn: 'Baab Detective',
    titleAr: 'محقق الباب',
    descriptionEn: 'Follow lesson examples and identify the baab they are filed under.',
    baabScope: 'باب تفعيل · باب مفاعلة',
    xpReward: 55,
    starThresholds: [50, 75, 100],
    questions: BAAB_DETECTIVE_QUESTIONS,
    prereqQuestIds: [],
  },
  'speed-run': {
    id: 'speed-run-demo',
    lessonId: 'lesson-11',
    baabId: 'tafeel',
    gameMode: 'speed-run',
    titleEn: 'Sarf Speed Run',
    titleAr: 'سباق الصرف',
    descriptionEn: 'Recall familiar demonstration forms in optional timed rounds or calm practice.',
    baabScope: BAAB_TAFEEL.nameAr,
    xpReward: 60,
    starThresholds: [50, 75, 100],
    questions: SPEED_RUN_QUESTIONS,
    prereqQuestIds: [],
  },
  'complete-tasreef': {
    id: 'complete-tasreef-demo',
    lessonId: 'lesson-11',
    baabId: 'tafeel',
    gameMode: 'complete-tasreef',
    titleEn: 'Complete the Tasreef',
    titleAr: 'أكمل التصريف',
    descriptionEn: 'Restore missing entries from the Lesson 11 demonstration table.',
    baabScope: BAAB_TAFEEL.nameAr,
    xpReward: 60,
    starThresholds: [50, 75, 100],
    questions: COMPLETE_TASREEF_QUESTIONS,
    prereqQuestIds: [],
  },
  'boss-battle': {
    id: 'boss-battle-demo',
    lessonId: 'lesson-11',
    baabId: 'tafeel',
    gameMode: 'boss-battle',
    titleEn: 'Boss Battle',
    titleAr: 'المواجهة الكبرى',
    descriptionEn: 'Face a mixed demonstration challenge from the Lantern Library.',
    baabScope: 'باب تفعيل · باب مفاعلة',
    xpReward: 90,
    starThresholds: [50, 75, 100],
    questions: [
      ...WORD_BUILDER_QUESTIONS.slice(0, 1),
      ...BAAB_DETECTIVE_QUESTIONS.slice(1, 2),
      ...COMPLETE_TASREEF_QUESTIONS.slice(0, 1),
      ...SPEED_RUN_QUESTIONS.slice(2, 4),
    ],
    prereqQuestIds: [],
  },
}
