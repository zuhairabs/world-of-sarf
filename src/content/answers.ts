/**
 * Sarf Quest — Arabic Answer Validation
 *
 * Pure functions for normalizing and comparing Arabic answer text.
 * Any normalization applied here must be explicit, justified, and limited
 * to approved variants. Never remove tashkeel silently.
 *
 * Policy (per AGENTS.md §5):
 * - Preserve tashkeel unless the question explicitly accepts stripped forms.
 * - Do not assume hamza variants or alif forms are interchangeable.
 * - Log every normalization so it can be audited.
 */

// ── Unicode ranges ─────────────────────────────────────────────

/** Arabic diacritics (tashkeel) — fathah, dammah, kasrah, sukun, tanwin, shadda, etc. */
const TASHKEEL_REGEX = /[\u064B-\u065F\u0670]/g

/** Tatweel (kashida) — decorative extension used in some fonts */
const TATWEEL_REGEX = /\u0640/g

/** Arabic punctuation that may vary: e.g. ى vs ي, أ/إ/ا */
const ALIF_VARIANTS_REGEX = /[\u0622\u0623\u0625\u0671]/g // أ إ آ ٱ → normalize to ا

/** ى vs ي (alif maqsura vs ya) */
const ALIF_MAQSURA_REGEX = /\u0649/g

// ── Core normalization functions ──────────────────────────────

/**
 * Strip all tashkeel from an Arabic string.
 * Use only when the question explicitly accepts unvowelled answers.
 */
export function stripTashkeel(text: string): string {
  return text.replace(TASHKEEL_REGEX, '').replace(TATWEEL_REGEX, '')
}

/**
 * Normalize whitespace only — preserve all Arabic characters including tashkeel.
 * This is the minimal normalization applied to all submissions.
 */
export function normalizeWhitespace(text: string): string {
  return text.trim().replace(/\s+/g, ' ')
}

/**
 * Full normalization — applied when matching against accepted variants.
 * Normalizes: whitespace, alif variants, alif maqsura/ya, tatweel.
 * Does NOT strip tashkeel unless `stripDiacritics` is true.
 */
export function normalizeArabic(
  text: string,
  options: { stripDiacritics?: boolean; normalizeAlif?: boolean } = {},
): string {
  let result = normalizeWhitespace(text).replace(TATWEEL_REGEX, '')

  if (options.normalizeAlif) {
    // Normalize alif variants to bare alif — use cautiously
    result = result.replace(ALIF_VARIANTS_REGEX, '\u0627') // → ا
    result = result.replace(ALIF_MAQSURA_REGEX, '\u064A') // ى → ي
  }

  if (options.stripDiacritics) {
    result = stripTashkeel(result)
  }

  return result
}

// ── Answer comparison ─────────────────────────────────────────

export type MatchMode =
  | 'exact' // must match including tashkeel
  | 'strip-tashkeel' // match after removing diacritics
  | 'option-id' // comparing option IDs, not Arabic text

export interface AnswerCheckResult {
  isCorrect: boolean
  matchedVariantId?: string
  normalizedSubmission: string
  normalizedExpected: string
  matchMode: MatchMode
}

/**
 * Check a submitted answer against the expected answer and accepted variants.
 *
 * For option-based questions (multiple choice), pass mode = 'option-id'
 * and compare the selected option id directly.
 *
 * For free-text Arabic input, pass mode = 'exact' or 'strip-tashkeel'.
 */
export function checkAnswer(
  submitted: string,
  expectedId: string,
  acceptedVariants: string[],
  mode: MatchMode = 'option-id',
): AnswerCheckResult {
  if (mode === 'option-id') {
    const isCorrect = submitted.trim() === expectedId.trim()
    return {
      isCorrect,
      normalizedSubmission: submitted.trim(),
      normalizedExpected: expectedId.trim(),
      matchMode: 'option-id',
    }
  }

  const allAccepted = [expectedId, ...acceptedVariants]

  if (mode === 'exact') {
    const norm = normalizeWhitespace(submitted)
    const match = allAccepted.find((v) => normalizeWhitespace(v) === norm)
    return {
      isCorrect: !!match,
      matchedVariantId: match,
      normalizedSubmission: norm,
      normalizedExpected: normalizeWhitespace(expectedId),
      matchMode: 'exact',
    }
  }

  // strip-tashkeel mode
  const normStripped = normalizeArabic(submitted, { stripDiacritics: true })
  const match = allAccepted.find(
    (v) => normalizeArabic(v, { stripDiacritics: true }) === normStripped,
  )
  return {
    isCorrect: !!match,
    matchedVariantId: match,
    normalizedSubmission: normStripped,
    normalizedExpected: normalizeArabic(expectedId, { stripDiacritics: true }),
    matchMode: 'strip-tashkeel',
  }
}

/**
 * Calculate accuracy as a percentage (0–100) from a list of correct/incorrect booleans.
 */
export function calculateAccuracy(results: boolean[]): number {
  if (results.length === 0) return 0
  const correct = results.filter(Boolean).length
  return Math.round((correct / results.length) * 100)
}
