import type { Question, Quest } from '../content/types.ts'
import { checkAnswer } from '../content/answers.ts'

export interface SessionStats {
  answered: number
  correct: number
  mistakes: string[]
}

export function questionOptions(question: Question) {
  return question.options.map((option) => ({
    ...option,
    label: option.textAr ?? option.textEn ?? '',
  }))
}

/** Returns a new array so content records remain immutable across sessions. */
export function shuffle<T>(items: readonly T[], random = Math.random): T[] {
  const shuffled = [...items]
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1))
    const current = shuffled[index]
    shuffled[index] = shuffled[swapIndex]
    shuffled[swapIndex] = current
  }
  return shuffled
}

export function validateOption(question: Question, optionId: string) {
  return checkAnswer(optionId, question.expectedAnswer, [], 'option-id')
}

/**
 * Demonstration questions are playable while draft items stay out of the
 * session. Review status is content policy, not presentation logic.
 */
export function eligibleQuestions(quest: Quest) {
  return quest.questions.filter((question) => question.reviewStatus !== 'draft')
}

export function sessionAccuracy(stats: SessionStats): number {
  return stats.answered === 0
    ? 0
    : Math.round((stats.correct / stats.answered) * 100)
}

export function questQuestions(
  quest: Quest,
  mistakesOnly = false,
  mistakeIds: string[] = [],
  random = Math.random,
) {
  const eligible = eligibleQuestions(quest)
  const source = mistakesOnly
    ? eligible.filter((question) => mistakeIds.includes(question.id))
    : eligible
  const questions = source.length > 0 ? source : eligible
  return shuffle(questions, random).map((question) => ({
    ...question,
    options: shuffle(question.options, random),
  }))
}
