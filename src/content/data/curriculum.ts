import type { BaabRecord, RootExample, WaznTable } from '../types'
import { BAAB_MUFAALA, BAAB_TAFEEL } from './lesson11'

const needsReview = 'needs_review' as const

function example(
  rootId: string,
  rootAr: string,
  maadhi: string,
  mudhaari: string,
  masdar: string,
  meaningEn: string,
  lessonId: string,
): RootExample {
  return {
    rootId,
    rootAr,
    maadhi,
    mudhaari,
    masdar,
    meaningEn,
    reviewStatus: needsReview,
    sourceNotes: `We Learn Sarf ${lessonId}; OCR transcription pending textbook verification.`,
  }
}

function pattern(
  maadhi: string,
  mudhaari: string,
  masdar: string,
  amrHadir: string,
  amrGhaib: string,
  nahi: string,
  juhd: string,
  nafi: string,
  istifham: string,
): WaznTable {
  return { maadhi, mudhaari, masdar, amrHadir, amrGhaib, nahi, juhd, nafi, istifham }
}

function record(
  id: BaabRecord['id'],
  nameAr: string,
  nameEn: string,
  lessonId: string,
  wazn: WaznTable,
  meanings: BaabRecord['meanings'],
  examples: RootExample[],
  sourceNotes: string,
): BaabRecord {
  return {
    id,
    nameAr,
    nameEn,
    lessonId,
    wazn,
    meanings,
    examples,
    reviewStatus: needsReview,
    sourceNotes,
  }
}

const meaning = (id: string, meaningEn: string) => ({
  id,
  meaningEn,
  reviewStatus: needsReview,
})

export const BAAB_IFAAL = record(
  'ifaal',
  'باب افعال',
  'Baab Ifaal',
  'lesson-10',
  pattern('أَفْعَلَ', 'يُفْعِلُ', 'إِفْعَال', 'أَفْعِلْ', 'لِيُفْعِلْ', 'لا يُفْعِلْ', 'لَمْ يُفْعِلُ', 'لا يُفْعِلُ', 'هَلْ يُفْعِلُ'),
  [meaning('ifaal-m1', 'Making an intransitive verb transitive; finding an attribute in the subject.')],
  [
    example('khrj', 'خرج', 'أَخْرَجَ', 'يُخْرِجُ', 'إِخْرَاج', 'He sent out', 'Lesson 10'),
    example('nzl', 'نزل', 'أَنْزَلَ', 'يُنْزِلُ', 'إِنْزَال', 'He sent down', 'Lesson 10'),
    example('krm', 'كرم', 'أَكْرَمَ', 'يُكْرِمُ', 'إِكْرَام', 'He honoured', 'Lesson 10'),
  ],
  'Lesson 10 baab entry is not confirmed in the OCR curriculum map; these exercise-table examples remain needs_review.',
)

export const BAAB_TAFAUL = record(
  'tafaul',
  'باب تفاعل',
  'Baab Tafaaul',
  'lesson-12',
  pattern('تَفَاعَلَ', 'يَتَفَاعَلُ', 'تَفَاعُل', 'تَفَاعَلْ', 'لِيَتَفَاعَلْ', 'لا يَتَفَاعَلُ', 'لَمْ يَتَفَاعَلُ', 'لا يَتَفَاعَلُ', 'هَلْ يَتَفَاعَلُ'),
  [meaning('tafaul-m1', 'Partnership, co-operation, or feigning an action.')],
  [
    example('awn', 'عون', 'تَعَاوَنَ', 'يَتَعَاوَنُ', 'تَعَاوُن', 'They helped each other', 'Lesson 12'),
    example('jwz', 'جوز', 'تَجَاوَزَ', 'يَتَجَاوَزُ', 'تَجَاوُز', 'They went beyond', 'Lesson 12'),
    example('mrd', 'مرض', 'تَمَارَضَ', 'يَتَمَارَضُ', 'تَمَارُض', 'He feigned sickness', 'Lesson 12'),
  ],
  'Transcribed from Lesson 12 examples; tashkeel and exercise answers need textbook review.',
)

export const BAAB_TAFAFUL = record(
  'tafaful',
  'باب تفعّل',
  'Baab Tafaaul with Shadda',
  'lesson-12',
  pattern('تَفَعَّلَ', 'يَتَفَعَّلُ', 'تَفَعُّل', 'تَفَعَّلْ', 'لِيَتَفَعَّلْ', 'لا يَتَفَعَّلُ', 'لَمْ يَتَفَعَّلُ', 'لا يَتَفَعَّلُ', 'هَلْ يَتَفَعَّلُ'),
  [meaning('tafaful-m1', 'Acceptance of the effect of an action.')],
  [
    example('alm', 'علم', 'تَعَلَّمَ', 'يَتَعَلَّمُ', 'تَعَلُّم', 'He learned', 'Lesson 12'),
    example('jma', 'جمع', 'تَجَمَّعَ', 'يَتَجَمَّعُ', 'تَجَمُّع', 'They gathered', 'Lesson 12'),
    example('fhm', 'فهم', 'تَفَهَّمَ', 'يَتَفَهَّمُ', 'تَفَهُّم', 'He came to understand', 'Lesson 12'),
  ],
  'Transcribed from Lesson 12 examples; assimilation notes and exercise answers need textbook review.',
)

export const BAAB_IFTIAAL = record(
  'iftial',
  'باب افتعال',
  'Baab Iftiaal',
  'lesson-13',
  pattern('افْتَعَلَ', 'يَفْتَعِلُ', 'افْتِعَال', 'افْتَعِلْ', 'لِيَفْتَعِلْ', 'لا يَفْتَعِلُ', 'لَمْ يَفْتَعِلُ', 'لا يَفْتَعِلُ', 'هَلْ يَفْتَعِلُ'),
  [meaning('iftial-m1', 'Effort or exaggeration; fulfilment on the object.')],
  [
    example('jma', 'جمع', 'اجْتَمَعَ', 'يَجْتَمِعُ', 'اجْتِمَاع', 'They gathered', 'Lesson 13'),
    example('ksb', 'كسب', 'اكْتَسَبَ', 'يَكْتَسِبُ', 'اكْتِسَاب', 'He earned', 'Lesson 13'),
    example('nzm', 'نظم', 'انْتَظَمَ', 'يَنْتَظِمُ', 'انْتِظَام', 'He became organized', 'Lesson 13'),
  ],
  'Transcribed from Lesson 13; ابدال explanations and exercise answers need textbook review.',
)

export const BAAB_INFIAAL = record(
  'infial',
  'باب انفعال',
  'Baab Infi aal',
  'lesson-13',
  pattern('انْفَعَلَ', 'يَنْفَعِلُ', 'انْفِعَال', 'انْفَعِلْ', 'لِيَنْفَعِلْ', 'لا يَنْفَعِلُ', 'لَمْ يَنْفَعِلُ', 'لا يَنْفَعِلُ', 'هَلْ يَنْفَعِلُ'),
  [meaning('infial-m1', 'Acceptance of an effect or undergoing an action.')],
  [
    example('jmd', 'جمد', 'انْجَمَدَ', 'يَنْجَمِدُ', 'انْجِمَاد', 'It froze', 'Lesson 13'),
    example('bst', 'بسط', 'انْبَسَطَ', 'يَنْبَسِطُ', 'انْبِسَاط', 'He became happy / spread out', 'Lesson 13'),
    example('zlm', 'ظلم', 'انْظَلَمَ', 'يَنْظَلِمُ', 'انْظِلَام', 'He accepted injustice', 'Lesson 13'),
  ],
  'Lesson 13 explicitly notes that OCR dropped the نون prefix; restored forms remain needs_review.',
)

export const BAAB_IFLAAL = record(
  'iflaal',
  'باب افعلال',
  'Baab Iflaal',
  'lesson-14',
  pattern('افْعَلَّ', 'يَفْعَلُّ', 'افْعِلَال', 'افْعَلَّ', 'لِيَفْعَلَّ', 'لا يَفْعَلَّ', 'لَمْ يَفْعَلَّ', 'لا يَفْعَلُّ', 'هَلْ يَفْعَلُّ'),
  [meaning('iflaal-m1', 'Complete colouring or the presence of a defect.')],
  [
    example('hmr', 'حمر', 'احْمَرَّ', 'يَحْمَرُّ', 'احْمِرَار', 'It became completely red', 'Lesson 14'),
    example('khd', 'خضر', 'اخْضَرَّ', 'يَخْضَرُّ', 'اخْضِرَار', 'It became completely green', 'Lesson 14'),
    example('awj', 'عوج', 'اعْوَجَّ', 'يَعْوَجُّ', 'اعْوِجَاج', 'It became crooked', 'Lesson 14'),
  ],
  'Lesson 14 includes an OCR correction from يَعْرَجُ to يَعْوَجُّ; confirm against the original page.',
)

export const BAAB_ISTIFAAL = record(
  'istifal',
  'باب استفعال',
  'Baab Istifaal',
  'lesson-14',
  pattern('اسْتَفْعَلَ', 'يَسْتَفْعِلُ', 'اسْتِفْعَال', 'اسْتَفْعِلْ', 'لِيَسْتَفْعِلُ', 'لا يَسْتَفْعِلُ', 'لَمْ يَسْتَفْعِلُ', 'لا يَسْتَفْعِلُ', 'هَلْ يَسْتَفْعِلُ'),
  [meaning('istifal-m1', 'The subject seeks something from the object.')],
  [
    example('ghfr', 'غفر', 'اسْتَغْفَرَ', 'يَسْتَغْفِرُ', 'اسْتِغْفَار', 'He sought forgiveness', 'Lesson 14'),
    example('fhm', 'فهم', 'اسْتَفْهَمَ', 'يَسْتَفْهِمُ', 'اسْتِفْهَام', 'He sought understanding', 'Lesson 14'),
    example('kbr', 'كبر', 'اسْتَكْبَرَ', 'يَسْتَكْبِرُ', 'اسْتِكْبَار', 'He sought greatness / was arrogant', 'Lesson 14'),
  ],
  'Transcribed from Lesson 14; tashkeel and exercise answers need textbook review.',
)

export const BAAB_IFIYAAL = record(
  'ifiyaal',
  'باب افعيعال',
  'Baab Ifiyaal',
  'lesson-14',
  pattern('افْعَوْعَلَ', 'يَفْعَوْعِلُ', 'افْعِيعَال', 'افْعَوْعِلْ', 'لِيَفْعَوْعِلُ', 'لا يَفْعَوْعِلُ', 'لَمْ يَفْعَوْعِلُ', 'لا يَفْعَوْعِلُ', 'هَلْ يَفْعَوْعِلُ'),
  [meaning('ifiyaal-m1', 'Exaggeration or excess.')],
  [
    example('ashb', 'عشب', 'اعْشَوْشَبَ', 'يَعْشَوْشِبُ', 'اعْشِيشَاب', 'It grew a lot', 'Lesson 14'),
    example('mtr', 'مطر', 'امْطَوْطَرَ', 'يَمْطَوْطِرُ', 'امْطِيطَار', 'It rained heavily', 'Lesson 14'),
  ],
  'Lesson 14 marks the خلج example as uncertain; only the less-uncertain examples are included here.',
)

export const CURRICULUM_BAABS: BaabRecord[] = [
  BAAB_IFAAL,
  BAAB_TAFEEL,
  BAAB_MUFAALA,
  BAAB_TAFAUL,
  BAAB_TAFAFUL,
  BAAB_IFTIAAL,
  BAAB_INFIAAL,
  BAAB_IFLAAL,
  BAAB_ISTIFAAL,
  BAAB_IFIYAAL,
]

export const BAABS_BY_ID = Object.fromEntries(
  CURRICULUM_BAABS.map((baab) => [baab.id, baab]),
) as Record<BaabRecord['id'], BaabRecord>
