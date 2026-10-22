/**
 * Sarf Quest — Lesson 11 Content
 * باب تفعيل و باب مفاعلة
 *
 * Source: We Learn Sarf, Sec. 2, Lesson 11, pages 7–9
 * Review status: needs_review
 * All tashkeel must be verified against the original textbook pages.
 */

import type { BaabRecord, Quest, Question } from '../types'

// ── باب تفعيل ─────────────────────────────────────────────────

export const BAAB_TAFEEL: BaabRecord = {
  id: 'tafeel',
  nameAr: 'باب تفعيل',
  nameEn: 'Baab Tafeel',
  lessonId: 'lesson-11',
  wazn: {
    maadhi: 'فَعَّلَ',
    mudhaari: 'يُفَعِّلُ',
    masdar: 'تَفْعِيل',
    amrHadir: 'فَعِّلْ',
    amrGhaib: 'لِيُفَعِّلْ',
    nahi: 'لا يُفَعِّلْ',
    juhd: 'لَمْ يُفَعِّلُ',
    nafi: 'لا يُفَعِّلُ',
    istifham: 'هَلْ يُفَعِّلُ',
  },
  meanings: [
    {
      id: 'tafeel-m1',
      meaningEn:
        'To make an intransitive verb transitive (متعدي) — the verb that was complete without an object now acts on one.',
      exampleAr: 'نَزَلَ → نَزَّلَ',
      exampleTranslation: 'He came down → He sent down',
      reviewStatus: 'needs_review',
    },
    {
      id: 'tafeel-m2',
      meaningEn:
        'To attribute or ascribe a quality/action to the object (مفعول).',
      exampleAr: 'وَحَّدْتُ اللهَ',
      exampleTranslation: 'I declared Allah to be One',
      reviewStatus: 'needs_review',
    },
  ],
  examples: [
    {
      rootId: 'alm',
      rootAr: 'علم',
      maadhi: 'عَلَّمَ',
      mudhaari: 'يُعَلِّمُ',
      masdar: 'تَعْلِيم',
      meaningEn: 'He taught',
      reviewStatus: 'needs_review',
      sourceNotes: 'Lesson 11, p.7',
    },
    {
      rootId: 'sdq',
      rootAr: 'صدق',
      maadhi: 'صَدَّقَ',
      mudhaari: 'يُصَدِّقُ',
      masdar: 'تَصْدِيق',
      meaningEn: 'He affirmed / ascribed truthfulness',
      reviewStatus: 'needs_review',
      sourceNotes: 'Lesson 11, p.7',
    },
    {
      rootId: 'whd',
      rootAr: 'وحد',
      maadhi: 'وَحَّدَ',
      mudhaari: 'يُوَحِّدُ',
      masdar: 'تَوْحِيد',
      meaningEn: 'He declared to be One',
      reviewStatus: 'needs_review',
      sourceNotes: 'Lesson 11, p.7',
    },
  ],
  reviewStatus: 'needs_review',
  sourceNotes:
    'Transcribed from OCR of We Learn Sarf Lesson 11. Full tashkeel verification pending.',
}

// ── باب مفاعلة ───────────────────────────────────────────────

export const BAAB_MUFAALA: BaabRecord = {
  id: 'mufaala',
  nameAr: 'باب مفاعلة',
  nameEn: 'Baab Mufaala',
  lessonId: 'lesson-11',
  wazn: {
    maadhi: 'فَاعَلَ',
    mudhaari: 'يُفَاعِلُ',
    masdar: 'مُفَاعَلَة',
    amrHadir: 'فَاعِلْ',
    amrGhaib: 'لِيُفَاعِلُ',
    nahi: 'لا يُفَاعِلُ',
    juhd: 'لَمْ يُفَاعِلُ',
    nafi: 'لا يُفَاعِلُ',
    istifham: 'هَلْ يُفَاعِلُ',
  },
  meanings: [
    {
      id: 'mufaala-m1',
      meaningEn:
        'Co-operation and Reciprocity — any action the subject does on the object is reciprocated by the object on the subject.',
      exampleAr: 'قَاتَلَ عَلِيٌّ سَعِيدًا',
      exampleTranslation: 'Ali and Saeed fought each other (mutual action)',
      reviewStatus: 'needs_review',
    },
  ],
  examples: [
    {
      rootId: 'ktb',
      rootAr: 'كتب',
      maadhi: 'كَاتَبَ',
      mudhaari: 'يُكَاتِبُ',
      masdar: 'مُكَاتَبَة',
      meaningEn: 'They corresponded with each other',
      reviewStatus: 'needs_review',
      sourceNotes: 'Lesson 11, p.8',
    },
    {
      rootId: 'qtl',
      rootAr: 'قتل',
      maadhi: 'قَاتَلَ',
      mudhaari: 'يُقَاتِلُ',
      masdar: 'مُقَاتَلَة',
      meaningEn: 'They fought each other',
      reviewStatus: 'needs_review',
      sourceNotes: 'Lesson 11, p.8',
    },
    {
      rootId: 'bhs',
      rootAr: 'بحث',
      maadhi: 'بَاحَثَ',
      mudhaari: 'يُبَاحِثُ',
      masdar: 'مُبَاحَثَة',
      meaningEn: 'They discussed with each other',
      reviewStatus: 'needs_review',
      sourceNotes: 'Lesson 11, p.8',
    },
  ],
  reviewStatus: 'needs_review',
  sourceNotes:
    'Transcribed from OCR of We Learn Sarf Lesson 11. Full tashkeel verification pending.',
}

// ── Seegha Match Quest — باب تفعيل ───────────────────────────

const TAFEEL_QUESTIONS: Question[] = [
  {
    id: 'tsm-01',
    type: 'seegha-match',
    baabId: 'tafeel',
    seeghaId: 'maadhi',
    promptEn: 'Which pattern is the ماضي (past tense) in باب تفعيل?',
    expectedAnswer: 'a',
    acceptedVariants: [],
    options: [
      { id: 'a', textAr: 'فَعَّلَ', isCorrect: true },
      { id: 'b', textAr: 'فَاعَلَ', isCorrect: false },
      { id: 'c', textAr: 'أَفْعَلَ', isCorrect: false },
      { id: 'd', textAr: 'افْتَعَلَ', isCorrect: false },
    ],
    explanation:
      'The ماضي of باب تفعيل follows فَعَّلَ — the middle letter (عين الفعل) is doubled with a شدّة. Example: عَلَّمَ (he taught).',
    reviewStatus: 'needs_review',
  },
  {
    id: 'tsm-02',
    type: 'form-identify',
    baabId: 'tafeel',
    seeghaId: 'maadhi',
    promptAr: 'عَلَّمَ',
    promptEn: 'Which seegha is عَلَّمَ?',
    expectedAnswer: 'c',
    acceptedVariants: [],
    options: [
      { id: 'a', textEn: 'مضارع', isCorrect: false },
      { id: 'b', textEn: 'مصدر', isCorrect: false },
      { id: 'c', textEn: 'ماضي', isCorrect: true },
      { id: 'd', textEn: 'أمر حاضر', isCorrect: false },
    ],
    explanation:
      'عَلَّمَ is the ماضي (past tense) of root علم in باب تفعيل. Note the شدّة on the middle letter ل.',
    reviewStatus: 'needs_review',
  },
  {
    id: 'tsm-03',
    type: 'seegha-match',
    baabId: 'tafeel',
    seeghaId: 'mudhaari',
    promptEn: 'Which is the مضارع (present) pattern in باب تفعيل?',
    expectedAnswer: 'b',
    acceptedVariants: [],
    options: [
      { id: 'a', textAr: 'يَفْعَلُ', isCorrect: false },
      { id: 'b', textAr: 'يُفَعِّلُ', isCorrect: true },
      { id: 'c', textAr: 'يُفَاعِلُ', isCorrect: false },
      { id: 'd', textAr: 'يَفْتَعِلُ', isCorrect: false },
    ],
    explanation:
      'The مضارع of باب تفعيل is يُفَعِّلُ. Note the ضمّة (dammah) on the حرف مضارعة — a sign that the ماضي had four letters.',
    reviewStatus: 'needs_review',
  },
  {
    id: 'tsm-04',
    type: 'meaning-match',
    baabId: 'tafeel',
    seeghaId: 'mudhaari',
    promptAr: 'يُعَلِّمُ',
    promptEn: 'What does يُعَلِّمُ mean?',
    expectedAnswer: 'b',
    acceptedVariants: [],
    options: [
      { id: 'a', textEn: 'He learned', isCorrect: false },
      { id: 'b', textEn: 'He teaches', isCorrect: true },
      { id: 'c', textEn: 'He asked', isCorrect: false },
      { id: 'd', textEn: 'He sought knowledge', isCorrect: false },
    ],
    explanation:
      'يُعَلِّمُ is the مضارع of عَلَّمَ (he taught). Root: علم. Baab: تفعيل. Translation: he teaches / he is teaching.',
    reviewStatus: 'needs_review',
  },
  {
    id: 'tsm-05',
    type: 'seegha-match',
    baabId: 'tafeel',
    seeghaId: 'masdar',
    promptEn: 'What is the مصدر (verbal noun) pattern of باب تفعيل?',
    expectedAnswer: 'd',
    acceptedVariants: [],
    options: [
      { id: 'a', textAr: 'تَفَاعُل', isCorrect: false },
      { id: 'b', textAr: 'مُفَاعَلَة', isCorrect: false },
      { id: 'c', textAr: 'إِفْعَال', isCorrect: false },
      { id: 'd', textAr: 'تَفْعِيل', isCorrect: true },
    ],
    explanation:
      'The مصدر of باب تفعيل is تَفْعِيل. Example: تَعْلِيم (teaching / education), تَوْحِيد (declaration of oneness).',
    reviewStatus: 'needs_review',
  },
  {
    id: 'tsm-06',
    type: 'form-identify',
    baabId: 'tafeel',
    seeghaId: 'juhd',
    promptAr: 'لَمْ يُعَلِّمُ',
    promptEn: 'Which seegha is لَمْ يُعَلِّمُ?',
    expectedAnswer: 'c',
    acceptedVariants: [],
    options: [
      { id: 'a', textEn: 'نهي', isCorrect: false },
      { id: 'b', textEn: 'نفي', isCorrect: false },
      { id: 'c', textEn: 'جحد', isCorrect: true },
      { id: 'd', textEn: 'استفهام', isCorrect: false },
    ],
    explanation:
      'جحد (denial) is formed with لَمْ + مضارع مجزوم. It negates the past: لَمْ يُعَلِّمُ = He did not teach.',
    reviewStatus: 'needs_review',
  },
  {
    id: 'tsm-07',
    type: 'meaning-match',
    baabId: 'tafeel',
    promptEn: 'What is the primary grammatical function of باب تفعيل?',
    expectedAnswer: 'b',
    acceptedVariants: [],
    options: [
      { id: 'a', textEn: 'To seek something from an object', isCorrect: false },
      { id: 'b', textEn: 'To make a verb transitive (متعدي)', isCorrect: true },
      {
        id: 'c',
        textEn: 'Partnership and mutual co-operation',
        isCorrect: false,
      },
      {
        id: 'd',
        textEn: 'Acceptance of the effect of an action',
        isCorrect: false,
      },
    ],
    explanation:
      'The primary function of باب تفعيل is to make an intransitive (لازم) verb transitive (متعدي), e.g. نَزَلَ → نَزَّلَ (came down → sent down).',
    reviewStatus: 'needs_review',
  },
  {
    id: 'tsm-08',
    type: 'seegha-match',
    baabId: 'tafeel',
    seeghaId: 'amr-hadir',
    promptEn: 'Which form is the أمر حاضر (direct command) in باب تفعيل?',
    expectedAnswer: 'c',
    acceptedVariants: [],
    options: [
      { id: 'a', textAr: 'لِيُفَعِّلْ', isCorrect: false },
      { id: 'b', textAr: 'يُفَعِّلُ', isCorrect: false },
      { id: 'c', textAr: 'فَعِّلْ', isCorrect: true },
      { id: 'd', textAr: 'لا يُفَعِّلْ', isCorrect: false },
    ],
    explanation:
      'The أمر حاضر (command to a present person) of باب تفعيل is فَعِّلْ. Example: عَلِّمْ! (Teach!). لِيُفَعِّلْ is أمر غائب (command to an absent person).',
    reviewStatus: 'needs_review',
  },
]

export const QUEST_TAFEEL_SEEGHA_MATCH: Quest = {
  id: 'tafeel-seegha-match',
  lessonId: 'lesson-11',
  baabId: 'tafeel',
  gameMode: 'seegha-match',
  titleEn: 'Seegha Match',
  titleAr: 'مطابقة الصيغة',
  descriptionEn:
    'Recognize the nine seeghas and patterns of باب تفعيل at a glance. Match forms to labels and discover their meanings.',
  baabScope: 'باب تفعيل — فَعَّلَ · يُفَعِّلُ · تَفْعِيل',
  xpReward: 80,
  starThresholds: [50, 75, 100],
  questions: TAFEEL_QUESTIONS,
  prereqQuestIds: [],
}
