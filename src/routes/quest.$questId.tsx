import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useEffect, useMemo, useRef, useState } from 'react'
import { QUEST_TAFEEL_SEEGHA_MATCH } from '#/content/data/lesson11'
import { ALL_QUESTS } from '#/content/data/adventures'
import { getQuestReviewStatus, getReviewDisclosure } from '#/content/review'
import type { PlayerProfile, Quest, Question, SeeghaId } from '#/content/types'
import { questQuestions, sessionAccuracy, validateOption } from '#/lib/game'
import type { SessionStats } from '#/lib/game'
import {
  applyPlayerSettings,
  awardXP,
  DEFAULT_PLAYER_SETTINGS,
  loadProfile,
  recordQuestCompletion,
  saveProfile,
  updateBaabMastery,
} from '#/lib/storage'
import { calculateSessionXP, calculateStars } from '#/lib/xp'

export const Route = createFileRoute('/quest/$questId')({
  component: QuestRoute,
})
type Screen = 'intro' | 'play' | 'results'

const SEEGHA_LABELS: Record<string, string> = {
  maadhi: 'ماضي',
  mudhaari: 'مضارع',
  masdar: 'مصدر',
  'amr-hadir': 'أمر حاضر',
  'amr-ghaib': 'أمر غائب',
  nahi: 'نهي',
  juhd: 'جحد',
  nafi: 'نفي',
  istifham: 'استفهام',
}

function QuestRoute() {
  const navigate = useNavigate()
  const { questId } = Route.useParams()
  const quest = useMemo(
    () =>
      questId === QUEST_TAFEEL_SEEGHA_MATCH.id
        ? QUEST_TAFEEL_SEEGHA_MATCH
        : Object.values(ALL_QUESTS).find((item) => item.id === questId) ??
          QUEST_TAFEEL_SEEGHA_MATCH,
    [questId],
  )
  const review = getReviewDisclosure(getQuestReviewStatus(quest))
  useEffect(() => {
    applyPlayerSettings(loadProfile().settings ?? DEFAULT_PLAYER_SETTINGS)
  }, [])
  const [screen, setScreen] = useState<Screen>('intro')
  const [mistakesOnly, setMistakesOnly] = useState(false)
  const [practiceIds, setPracticeIds] = useState<string[]>([])
  const [timedSpeedRun, setTimedSpeedRun] = useState(false)
  const [sessionNonce, setSessionNonce] = useState(0)
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [feedback, setFeedback] = useState<boolean | null>(null)
  const [stats, setStats] = useState<SessionStats>({
    answered: 0,
    correct: 0,
    mistakes: [],
  })
  const [finishedStats, setFinishedStats] = useState<SessionStats | null>(null)
  const [earnedXp, setEarnedXp] = useState(0)
  const recorded = useRef(false)
  const answerLocked = useRef(false)
  const questions = useMemo(
    () => questQuestions(quest, mistakesOnly, practiceIds),
    [mistakesOnly, practiceIds, quest, sessionNonce],
  )
  const question = questions[index]

  useEffect(() => {
    document.getElementById('quest-content')?.focus()
  }, [screen])

  function start(
    practiceMistakes = false,
    savedMistakes: string[] = [],
    timed = timedSpeedRun,
  ) {
    setTimedSpeedRun(timed)
    setSessionNonce((current) => current + 1)
    setMistakesOnly(practiceMistakes)
    setPracticeIds(
      practiceMistakes ? (finishedStats?.mistakes ?? savedMistakes) : [],
    )
    setIndex(0)
    setSelected(null)
    setFeedback(null)
    setStats({ answered: 0, correct: 0, mistakes: [] })
    setFinishedStats(null)
    setEarnedXp(0)
    recorded.current = false
    answerLocked.current = false
    setScreen('play')
  }
  function choose(optionId: string) {
    if (feedback !== null || answerLocked.current) return
    answerLocked.current = true
    setSelected(optionId)
    const result = validateOption(question, optionId)
    setFeedback(result.isCorrect)
    setStats((current) => ({
      answered: current.answered + 1,
      correct: current.correct + (result.isCorrect ? 1 : 0),
      mistakes: result.isCorrect
        ? current.mistakes
        : [...current.mistakes, question.id],
    }))
  }
  function next() {
    if (index + 1 >= questions.length) {
      const completed = stats
      setFinishedStats(completed)
      finish(completed)
      setScreen('results')
      return
    }
    setIndex((current) => current + 1)
    setSelected(null)
    setFeedback(null)
    answerLocked.current = false
  }
  function finish(completed: SessionStats) {
    if (recorded.current) return
    recorded.current = true
    const profile = loadProfile()
    const accuracy = sessionAccuracy(completed)
    const stars = calculateStars(accuracy, quest.starThresholds)
    const xp = calculateSessionXP(
      quest,
      accuracy,
      !(quest.id in profile.questProgress),
    )
    setEarnedXp(xp)
    let nextProfile: PlayerProfile = awardXP(profile, xp)
    nextProfile = recordQuestCompletion(
      nextProfile,
      quest.id,
      stars,
      accuracy / 100,
      xp,
      completed.mistakes,
    )
    nextProfile = updateBaabMastery(nextProfile, quest.baabId, accuracy)
    saveProfile(nextProfile)
  }

  const accuracy = sessionAccuracy(finishedStats ?? stats)
  const stars = calculateStars(accuracy, quest.starThresholds)
  return (
    <main className={`quest-screen ${screen} mode-${quest.gameMode}`}>
      <a className="skip-link" href="#quest-content">
        Skip to quest content
      </a>
      <div className="quest-backdrop" aria-hidden="true">
        <span className="orb orb-a" />
        <span className="orb orb-b" />
        <span className="constellation" />
      </div>
      <header className="quest-hud">
        <Link to="/" className="hud-back" aria-label="Return to world map">
          ← <span>World map</span>
        </Link>
        <div className="quest-hud-title">
          <small>
            QUEST{' '}
            {screen === 'play'
              ? `${index + 1} / ${questions.length}`
              : '· LANTERN LIBRARY'}
          </small>
          <b lang="ar" dir="rtl">
            {quest.titleAr}
          </b>
        </div>
        <div className="hud-seal">✦</div>
      </header>
      <div id="quest-content" className="quest-content" tabIndex={-1}>
        {screen === 'intro' && (
          <Intro
            quest={quest}
            timedSpeedRun={timedSpeedRun}
            onTimedChange={setTimedSpeedRun}
            onStart={() => start(false, [], timedSpeedRun)}
            onPractice={(mistakes) => start(true, mistakes)}
            savedMistakes={
              loadProfile().questProgress[quest.id]?.mistakeQuestionIds ?? []
            }
            completed={quest.id in loadProfile().questProgress}
            reviewLabel={review.label}
          />
        )}
        {screen === 'play' && (
          <ModeChallenge
            question={question}
            index={index}
            total={questions.length}
            selected={selected}
            feedback={feedback}
            onChoose={choose}
            onNext={next}
            reviewLabel={review.label}
            modeTitle={quest.titleEn}
            mode={quest.gameMode}
            timedSpeedRun={timedSpeedRun}
          />
        )}
        {screen === 'results' && finishedStats && (
          <Results
            accuracy={accuracy}
            stars={stars}
            xp={earnedXp}
            questionsCompleted={finishedStats.answered}
            mistakes={finishedStats.mistakes}
          onReplay={() => start(false)}
          onPractice={() => start(true)}
          onModes={() => navigate({ to: '/', hash: 'games' })}
          onMap={() => navigate({ to: '/' })}
          />
        )}
      </div>
    </main>
  )
}

function Intro({
  quest,
  onStart,
  onPractice,
  timedSpeedRun,
  onTimedChange,
  savedMistakes,
  completed,
  reviewLabel,
}: {
  quest: Quest
  onStart: () => void
  onPractice: (mistakes: string[]) => void
  timedSpeedRun: boolean
  onTimedChange: (value: boolean) => void
  savedMistakes: string[]
  completed: boolean
  reviewLabel: string
}) {
  const seeghaScope = Array.from(
    new Set(
      quest.questions
        .map((question) => question.seeghaId)
        .filter((seeghaId): seeghaId is SeeghaId => Boolean(seeghaId)),
    ),
  )

  return (
    <section className="intro-panel" aria-labelledby="quest-intro-title">
      <div className="intro-illustration">
        <div className="library-tower">
          <span>⌘</span>
          <i>✦</i>
        </div>
        <div className="lantern lantern-left">✧</div>
        <div className="lantern lantern-right">✧</div>
      </div>
      <div className="demo-ribbon">{reviewLabel}</div>
      <p className="eyebrow">
        {quest.titleEn.toUpperCase()} · LANTERN LIBRARY · {quest.lessonId.replace('lesson-', 'LESSON ')}
      </p>
      <h1 id="quest-intro-title">
        {quest.gameMode === 'seegha-match' ? (
          <>
            Light the
            <br />
            <em>Lanterns</em>
          </>
        ) : (
          <>
            <em>{quest.titleEn}</em>
            <br />
            Training Ground
          </>
        )}
      </h1>
      <p className="arabic-title" lang="ar" dir="rtl">
        {quest.titleAr}
      </p>
      <p className="intro-copy">
        {quest.descriptionEn}
      </p>
      <div className="scope-rune">
        <span>BAAB SCOPE</span>
        <strong lang="ar" dir="rtl">
          {quest.baabScope}
        </strong>
      </div>
      <div className="intro-scope-note">
        <span>SEE GHA SCOPE</span>
        <strong lang="ar" dir="rtl">
          {seeghaScope
            .map((seeghaId) => SEEGHA_LABELS[seeghaId] ?? seeghaId)
            .join(' · ')}
        </strong>
      </div>
      <div className="reward-preview">
        <span className="reward-star">✦</span>
        <div>
          <small>QUEST REWARD</small>
          <strong>
            Up to {quest.xpReward} XP · {quest.starThresholds.length} stars
          </strong>
        </div>
        <span className="reward-chest">▣</span>
      </div>
      <button className="primary-action" onClick={onStart}>
        <span>⚔</span>
        {completed ? 'Replay the quest' : 'Begin the quest'}
        <b>→</b>
      </button>
      {quest.gameMode === 'speed-run' && (
        <label className="speed-toggle">
          <input
            type="checkbox"
            checked={timedSpeedRun}
            onChange={(event) => onTimedChange(event.target.checked)}
          />
          <span>
            <strong>Time trial</strong>
            <small>Optional · 15 seconds per round</small>
          </span>
        </label>
      )}
      {completed && savedMistakes.length > 0 && (
        <button
          className="secondary-action intro-practice-action"
          onClick={() => onPractice(savedMistakes)}
        >
          Practise {savedMistakes.length} saved mistake
          {savedMistakes.length === 1 ? '' : 's'} <span>↻</span>
        </button>
      )}
      <p className="microcopy">
        {quest.questions.length} questions ·{' '}
        {quest.gameMode === 'speed-run'
          ? timedSpeedRun
            ? '15 seconds per round'
            : 'untimed practice'
          : 'untimed practice'}{' '}
        · learn by trying
      </p>
    </section>
  )
}

type ChallengeProps = {
  question: Question
  index: number
  total: number
  selected: string | null
  feedback: boolean | null
  onChoose: (id: string) => void
  onNext: () => void
  reviewLabel: string
  modeTitle: string
  mode: Quest['gameMode']
  timedSpeedRun: boolean
}

function ModeChallenge(props: ChallengeProps) {
  const { mode, question } = props
  const constructionRound =
    mode === 'boss-battle' && question.type === 'construct'
  const detectiveRound =
    mode === 'boss-battle' && question.type === 'form-identify'
  const tableRound = mode === 'complete-tasreef' ||
    (mode === 'boss-battle' && question.type === 'fill-table')

  if (mode === 'word-builder' || constructionRound) {
    return <DragBoardChallenge {...props} kind="builder" />
  }
  if (mode === 'baab-detective' || detectiveRound) {
    return <DragBoardChallenge {...props} kind="detective" />
  }
  if (tableRound) {
    return <TasreefBoardChallenge {...props} />
  }
  return <Challenge {...props} speedRun={mode === 'speed-run' && props.timedSpeedRun} />
}

function Challenge({
  question,
  index,
  total,
  selected,
  feedback,
  onChoose,
  onNext,
  reviewLabel,
  modeTitle,
  speedRun = false,
}: ChallengeProps & { speedRun?: boolean }) {
  const [secondsLeft, setSecondsLeft] = useState(15)

  useEffect(() => {
    setSecondsLeft(15)
    if (!speedRun || feedback !== null) return
    const timer = window.setInterval(() => {
      setSecondsLeft((current) => {
        if (current <= 1) {
          const fallback = question.options.find(
            (option) => option.id !== question.expectedAnswer,
          )
          if (fallback) onChoose(fallback.id)
          return 0
        }
        return current - 1
      })
    }, 1000)
    return () => window.clearInterval(timer)
  }, [feedback, index, question.id, speedRun])

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (feedback !== null || event.repeat) return
      const key = event.key.toLowerCase()
      const optionIndex = ['a', 'b', 'c', 'd'].indexOf(key)
      const numericIndex = ['1', '2', '3', '4'].indexOf(key)
      const index = optionIndex >= 0 ? optionIndex : numericIndex
      const option = question.options[index]
      if (option) onChoose(option.id)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [feedback, onChoose, question.options])

  const expected =
    question.options[
      question.options.findIndex(
        (option) => option.id === question.expectedAnswer,
      )
    ]
  return (
    <section className="challenge-shell" aria-labelledby="challenge-title">
      <div className="challenge-intro">
        <div>
          <p className="eyebrow">
            {modeTitle.toUpperCase()} · {index + 1} OF {total}
          </p>
          <h1 id="challenge-title" className="challenge-prompt-en">
            {question.promptEn ?? 'Choose the matching seegha'}
          </h1>
        </div>
        {speedRun && (
          <div className="speed-clock" aria-live="polite">
            <span>⌛</span> {secondsLeft}s
          </div>
        )}
        <div className="challenge-progress">
          <span
            style={{
              width: `${((index + (feedback !== null ? 1 : 0)) / total) * 100}%`,
            }}
          />
        </div>
      </div>
      <div className="question-plaque">
        <span className="plaque-rune">✦</span>
        {question.promptAr ? (
          <strong lang="ar" dir="rtl">
            {question.promptAr}
          </strong>
        ) : (
          <strong lang="ar" dir="rtl">
            اِخْتَرِ الصِّيغَةَ
          </strong>
        )}
        <small>Select the form that belongs to this pattern</small>
      </div>
      <div className="answer-grid">
        {question.options.map((option) => {
          const state =
            feedback === null
              ? selected === option.id
                ? 'selected'
                : ''
              : option.id === question.expectedAnswer
                ? 'correct'
                : option.id === selected
                  ? 'incorrect'
                  : ''
          return (
            <button
              key={option.id}
              className={`answer-choice ${state}`}
              onClick={() => onChoose(option.id)}
              disabled={feedback !== null}
              aria-pressed={selected === option.id}
            >
              <span className="choice-rune">{option.id.toUpperCase()}</span>
              <span
                lang={option.textAr ? 'ar' : undefined}
                dir={option.textAr ? 'rtl' : undefined}
              >
                {option.textAr ?? option.textEn}
              </span>
              {feedback !== null && option.id === question.expectedAnswer && (
                <b className="state-mark">✓</b>
              )}
              {feedback !== null && option.id === selected && !feedback && (
                <b className="state-mark">×</b>
              )}
            </button>
          )
        })}
      </div>
      {feedback !== null && (
        <div
          className={`feedback-panel ${feedback ? 'is-correct' : 'is-wrong'}`}
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          <div className="feedback-icon">{feedback ? '✦' : '!'}</div>
          <div>
            <strong>
              {feedback
                ? 'The lantern catches!'
                : 'The path flickers — try again next time.'}
            </strong>
            <p>
              {feedback
                ? question.explanation
                : `The correct answer is ${expected.textAr ?? expected.textEn}. ${question.explanation}`}
            </p>
          </div>
          <button className="next-action" onClick={onNext}>
            {index + 1 === total ? 'Claim reward' : 'Next form'} <span>→</span>
          </button>
        </div>
      )}
      <p className="challenge-note">
        {reviewLabel} · source: We Learn Sarf, Lesson 11
        <span className="keyboard-hint"> · Choose with A–D or 1–4</span>
      </p>
    </section>
  )
}

function DragBoardChallenge({
  question,
  index,
  total,
  selected,
  feedback,
  onChoose,
  onNext,
  reviewLabel,
  modeTitle,
  kind,
}: ChallengeProps & { kind: 'builder' | 'detective' }) {
  const [dragged, setDragged] = useState<string | null>(null)
  const expected = question.options.find(
    (option) => option.id === question.expectedAnswer,
  )
  const isBuilder = kind === 'builder'

  function place(optionId: string) {
    if (feedback === null) onChoose(optionId)
  }

  return (
    <section className="challenge-shell" aria-labelledby="challenge-title">
      <div className="challenge-intro">
        <div>
          <p className="eyebrow">
            {modeTitle.toUpperCase()} · {index + 1} OF {total}
          </p>
          <h1 id="challenge-title" className="challenge-prompt-en">
            {question.promptEn}
          </h1>
        </div>
        <div className="challenge-progress">
          <span style={{ width: `${((index + (feedback !== null ? 1 : 0)) / total) * 100}%` }} />
        </div>
      </div>
      <div className={`drag-board ${isBuilder ? 'builder-board' : 'detective-board'}`}>
        <p className="drag-instruction">
          {isBuilder ? 'Drag or tap the form tile into the lantern.' : 'Inspect the clue, then place the matching baab seal.'}
        </p>
        <div
          className={`drop-zone ${selected ? 'has-selection' : ''}`}
          role="button"
          tabIndex={0}
          aria-label={isBuilder ? 'Form placement lantern' : 'Baab case evidence drop zone'}
          onDragOver={(event) => event.preventDefault()}
          onDrop={(event) => {
            event.preventDefault()
            const optionId = event.dataTransfer.getData('text/plain') || dragged
            if (optionId) place(optionId)
          }}
          onKeyDown={(event) => {
            if ((event.key === 'Enter' || event.key === ' ') && dragged) {
              event.preventDefault()
              place(dragged)
            }
          }}
        >
          <span className="drop-rune">{isBuilder ? '⌘' : '♜'}</span>
          <strong lang="ar" dir="rtl">
            {selected
              ? question.options.find((option) => option.id === selected)?.textAr ??
                question.options.find((option) => option.id === selected)?.textEn
              : question.promptAr ?? 'اِخْتَرِ الدَّلِيلَ'}
          </strong>
          <small>{selected ? 'Placed tile' : 'Drop a tile here'}</small>
        </div>
        <div className="drag-options" aria-label="Draggable answer tiles">
          {question.options.map((option) => (
            <button
              key={option.id}
              className={`drag-card ${selected === option.id ? 'selected' : ''}`}
              draggable={feedback === null}
              aria-grabbed={dragged === option.id}
              disabled={feedback !== null}
              onDragStart={(event) => {
                setDragged(option.id)
                event.dataTransfer.setData('text/plain', option.id)
              }}
              onDragEnd={() => setDragged(null)}
              onClick={() => place(option.id)}
            >
              <span className="choice-rune">{option.id.toUpperCase()}</span>
              <span lang={option.textAr ? 'ar' : undefined} dir={option.textAr ? 'rtl' : undefined}>
                {option.textAr ?? option.textEn}
              </span>
            </button>
          ))}
        </div>
      </div>
      {feedback !== null && (
        <ModeFeedback
          question={question}
          selected={selected}
          feedback={feedback}
          expected={expected?.textAr ?? expected?.textEn ?? ''}
          onNext={onNext}
          isLast={index + 1 === total}
        />
      )}
      <p className="challenge-note">{reviewLabel} · drag or tap · untimed demonstration</p>
    </section>
  )
}

function TasreefBoardChallenge({
  question,
  index,
  total,
  selected,
  feedback,
  onChoose,
  onNext,
  reviewLabel,
  modeTitle,
}: ChallengeProps) {
  const [dragged, setDragged] = useState<string | null>(null)
  const expected = question.options.find(
    (option) => option.id === question.expectedAnswer,
  )
  return (
    <section className="challenge-shell" aria-labelledby="challenge-title">
      <div className="challenge-intro">
        <div>
          <p className="eyebrow">{modeTitle.toUpperCase()} · {index + 1} OF {total}</p>
          <h1 id="challenge-title" className="challenge-prompt-en">Restore the missing table cell</h1>
        </div>
        <div className="challenge-progress">
          <span style={{ width: `${((index + (feedback !== null ? 1 : 0)) / total) * 100}%` }} />
        </div>
      </div>
      <div className="tasreef-board">
        <div className="tasreef-heading">
          <span>DEMONSTRATION TABLE · باب تفعيل</span>
          <b lang="ar" dir="rtl">{question.promptAr}</b>
        </div>
        <div className="tasreef-row tasreef-header">
          <span>SEE GHA</span>
          <span>FORM</span>
        </div>
        <div className="tasreef-row">
          <strong lang="ar" dir="rtl">{question.promptAr}</strong>
          <div
            className={`tasreef-cell ${selected ? 'has-selection' : ''}`}
            role="button"
            tabIndex={0}
            aria-label="Missing tasreef table cell"
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => {
              event.preventDefault()
              const optionId = event.dataTransfer.getData('text/plain') || dragged
              if (optionId && feedback === null) onChoose(optionId)
            }}
            onKeyDown={(event) => {
              if ((event.key === 'Enter' || event.key === ' ') && dragged) {
                event.preventDefault()
                if (feedback === null) onChoose(dragged)
              }
            }}
          >
            <span lang="ar" dir="rtl">
              {selected
                ? question.options.find((option) => option.id === selected)?.textAr
                : '؟'}
            </span>
          </div>
        </div>
        <div className="tasreef-palette" aria-label="Tasreef form tiles">
          {question.options.map((option) => (
            <button
              key={option.id}
              className={`drag-card ${selected === option.id ? 'selected' : ''}`}
              draggable={feedback === null}
              disabled={feedback !== null}
              onDragStart={(event) => {
                setDragged(option.id)
                event.dataTransfer.setData('text/plain', option.id)
              }}
              onDragEnd={() => setDragged(null)}
              onClick={() => feedback === null && onChoose(option.id)}
            >
              <span lang="ar" dir="rtl">{option.textAr ?? option.textEn}</span>
            </button>
          ))}
        </div>
      </div>
      {feedback !== null && (
        <ModeFeedback
          question={question}
          selected={selected}
          feedback={feedback}
          expected={expected?.textAr ?? expected?.textEn ?? ''}
          onNext={onNext}
          isLast={index + 1 === total}
        />
      )}
      <p className="challenge-note">{reviewLabel} · restore by drag or tap · untimed demonstration</p>
    </section>
  )
}

function ModeFeedback({
  question,
  selected,
  feedback,
  expected,
  onNext,
  isLast,
}: {
  question: Question
  selected: string | null
  feedback: boolean
  expected: string
  onNext: () => void
  isLast: boolean
}) {
  return (
    <div className={`feedback-panel ${feedback ? 'is-correct' : 'is-wrong'}`} role="status" aria-live="polite" aria-atomic="true">
      <div className="feedback-icon">{feedback ? '✦' : '!'}</div>
      <div>
        <strong>{feedback ? 'The mechanism clicks!' : 'The tile slips — keep exploring.'}</strong>
        <p>{feedback ? question.explanation : `The correct answer is ${expected}. ${question.explanation}`}</p>
      </div>
      <button className="next-action" onClick={onNext}>
        {isLast ? 'Claim reward' : 'Next challenge'} <span>→</span>
      </button>
    </div>
  )
}

function Results({
  accuracy,
  stars,
  xp,
  questionsCompleted,
  mistakes,
  onReplay,
  onPractice,
  onModes,
  onMap,
}: {
  accuracy: number
  stars: number
  xp: number
  questionsCompleted: number
  mistakes: string[]
  onReplay: () => void
  onPractice: () => void
  onModes: () => void
  onMap: () => void
}) {
  return (
    <section className="results-panel" aria-labelledby="results-title">
      <div className="reward-burst" aria-hidden="true">
        <span>✦</span>
        <i>✧</i>
        <b>✦</b>
      </div>
      <div className="reward-xp" aria-label={`${xp} XP earned`}>
        +{xp} XP
      </div>
      <p className="eyebrow">QUEST COMPLETE</p>
      <h1 id="results-title">
        The library
        <br />
        <em>remembers you.</em>
      </h1>
      <p className="results-ar" lang="ar" dir="rtl">
        أَحْسَنْتَ، أَيُّهَا السَّاعِي
      </p>
      <div
        className="star-row"
        role="img"
        aria-label={`${stars} out of 3 stars earned`}
      >
        {[1, 2, 3].map((star) => (
          <span key={star} className={star <= stars ? 'lit' : ''}>
            ✦
          </span>
        ))}
      </div>
      <div className="result-stats">
        <div>
          <span>ACCURACY</span>
          <strong>{accuracy}%</strong>
        </div>
        <div>
          <span>XP EARNED</span>
          <strong className="gold-text">+{xp}</strong>
        </div>
        <div>
          <span>FORMS MATCHED</span>
          <strong>{questionsCompleted}</strong>
        </div>
      </div>
      <div className="result-message">
        {mistakes.length > 0 ? (
          <>
            <b>
              {mistakes.length} form{mistakes.length > 1 ? 's' : ''} need
              another pass.
            </b>
            <span>Your mistakes are saved for practice.</span>
          </>
        ) : (
          <>
            <b>Every lantern is lit.</b>
            <span>Perfect recognition on this run.</span>
          </>
        )}
      </div>
      <div className="results-actions">
        {mistakes.length > 0 && (
          <button className="primary-action compact" onClick={onPractice}>
            Practise mistakes <b>→</b>
          </button>
        )}
        <button className="secondary-action" onClick={onReplay}>
          Replay the quest
        </button>
        <button className="secondary-action" onClick={onModes}>
          Choose another game <b>✧</b>
        </button>
        <button className="text-action" onClick={onMap}>
          Return to world map
        </button>
      </div>
    </section>
  )
}
