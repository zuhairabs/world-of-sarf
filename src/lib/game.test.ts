import assert from 'node:assert/strict'
import { checkAnswer } from '../content/answers.ts'
import { QUEST_TAFEEL_SEEGHA_MATCH } from '../content/data/lesson11.ts'
import { EXPANSION_QUESTS } from '../content/data/expansion.ts'
import { CURRICULUM_BAABS } from '../content/data/curriculum.ts'
import { CURRICULUM_QUESTS, QUESTS_BY_BAAB } from '../content/data/adventures.ts'
import { GAME_MODE_DEFINITIONS, isModeUnlocked } from './modes.ts'
import { isReviewDue, revisionJourneys } from './progression.ts'
import { calculateStars } from './xp.ts'
import { loadProfile, recordQuestCompletion, saveProfile } from './storage.ts'
import {
  eligibleQuestions,
  questQuestions,
  sessionAccuracy,
  shuffle,
  validateOption,
} from './game.ts'

assert.equal(checkAnswer('b', 'b', [], 'option-id').isCorrect, true)
assert.equal(checkAnswer('a', 'b', [], 'option-id').isCorrect, false)
assert.equal(checkAnswer('يُفَعِّلُ', 'يُفَعِّلُ', [], 'exact').isCorrect, true)
assert.equal(calculateStars(76, [50, 75, 100]), 2)
assert.equal(sessionAccuracy({ answered: 4, correct: 3, mistakes: ['q4'] }), 75)
assert.deepEqual(shuffle([1, 2, 3], () => 0), [2, 3, 1])
assert.equal(eligibleQuestions(QUEST_TAFEEL_SEEGHA_MATCH).length, 8)
assert.equal(questQuestions(QUEST_TAFEEL_SEEGHA_MATCH).length, 8)
assert.equal(
  questQuestions(QUEST_TAFEEL_SEEGHA_MATCH, true, ['tsm-02']).length,
  1,
)
assert.equal(
  validateOption(QUEST_TAFEEL_SEEGHA_MATCH.questions[0], 'a').isCorrect,
  true,
)
assert.equal(
  validateOption(QUEST_TAFEEL_SEEGHA_MATCH.questions[0], 'd').isCorrect,
  false,
)

const firstProfile = loadProfile()
const firstCompletion = recordQuestCompletion(
  firstProfile,
  QUEST_TAFEEL_SEEGHA_MATCH.id,
  2,
  0.75,
  60,
  ['tsm-04'],
)
const repeatCompletion = recordQuestCompletion(
  firstCompletion,
  QUEST_TAFEEL_SEEGHA_MATCH.id,
  1,
  0.5,
  30,
  ['tsm-01', 'tsm-03'],
)
assert.equal(repeatCompletion.dailyGoal.questsCompleted, 1)
assert.equal(repeatCompletion.questProgress[QUEST_TAFEEL_SEEGHA_MATCH.id].attempts, 2)
assert.equal(repeatCompletion.questProgress[QUEST_TAFEEL_SEEGHA_MATCH.id].bestStars, 2)
assert.equal(
  repeatCompletion.questProgress[QUEST_TAFEEL_SEEGHA_MATCH.id].mistakeQuestionIds?.length,
  2,
)
assert.equal(isModeUnlocked(firstProfile, GAME_MODE_DEFINITIONS[0]), true)
assert.equal(isModeUnlocked(firstProfile, GAME_MODE_DEFINITIONS[1]), true)
assert.equal(isReviewDue('2000-01-01T00:00:00.000Z'), true)
assert.equal(revisionJourneys(firstProfile, []).length, 0)
assert.deepEqual(Object.keys(EXPANSION_QUESTS).sort(), [
  'baab-detective',
  'boss-battle',
  'complete-tasreef',
  'speed-run',
  'word-builder',
])
assert.ok(EXPANSION_QUESTS['word-builder'].questions.length > 0)
assert.ok(EXPANSION_QUESTS['boss-battle'].questions.length > 0)
assert.equal(CURRICULUM_BAABS.length, 10)
for (const baab of CURRICULUM_BAABS) {
  assert.equal(QUESTS_BY_BAAB[baab.id].length, 6)
  assert.ok(QUESTS_BY_BAAB[baab.id].every((quest) => quest.questions.length > 0))
}
assert.equal(Object.keys(CURRICULUM_QUESTS).length, 60)

const persistedValues = new Map<string, string>()
Object.defineProperty(globalThis, 'window', {
  configurable: true,
  value: {
    localStorage: {
      getItem: (key: string) => persistedValues.get(key) ?? null,
      setItem: (key: string, value: string) => persistedValues.set(key, value),
      removeItem: (key: string) => persistedValues.delete(key),
    },
  },
})
saveProfile(repeatCompletion)
const reloaded = loadProfile()
assert.equal(
  reloaded.questProgress[QUEST_TAFEEL_SEEGHA_MATCH.id].bestStars,
  2,
)
assert.deepEqual(
  reloaded.questProgress[QUEST_TAFEEL_SEEGHA_MATCH.id].mistakeQuestionIds,
  ['tsm-01', 'tsm-03'],
)
delete (globalThis as { window?: unknown }).window

console.log('Sarf Quest game logic tests passed')
