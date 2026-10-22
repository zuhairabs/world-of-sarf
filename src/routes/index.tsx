import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect, useMemo, useRef, useState, type PointerEvent } from 'react'
import { QUEST_TAFEEL_SEEGHA_MATCH } from '#/content/data/lesson11'
import { QUESTS_BY_BAAB } from '#/content/data/adventures'
import { CURRICULUM_BAABS } from '#/content/data/curriculum'
import { getQuestReviewStatus, getReviewDisclosure } from '#/content/review'
import type { PlayerProfile, PlayerSettings, Quest } from '#/content/types'
import { GAME_MODE_DEFINITIONS, isModeUnlocked } from '#/lib/modes'
import { revisionJourneys } from '#/lib/progression'
import {
  applyPlayerSettings,
  DEFAULT_PLAYER_SETTINGS,
  loadProfile,
  savePlayerSettings,
} from '#/lib/storage'
import { levelTitle } from '#/lib/xp'

export const Route = createFileRoute('/')({ component: WorldMap })

type CampaignStop = {
  baabId: string
  nameEn: string
  nameAr: string
  lessonId: string
  quests: Quest[]
  completedQuestIds: string[]
  completedCount: number
  currentQuest: Quest | null
  displayQuest: Quest
  allComplete: boolean
}

function getCampaignStops(profile: PlayerProfile | null): CampaignStop[] {
  return CURRICULUM_BAABS.map((baab) => {
    const quests = QUESTS_BY_BAAB[baab.id]
    const completedQuestIds = quests
      .filter((quest) => profile?.questProgress[quest.id]?.completedAt)
      .map((quest) => quest.id)
    const completedCount = completedQuestIds.length
    const currentQuest =
      quests.find((quest) => !profile?.questProgress[quest.id]?.completedAt) ??
      null
    return {
      baabId: baab.id,
      nameEn: baab.nameEn,
      nameAr: baab.nameAr,
      lessonId: baab.lessonId,
      quests,
      completedQuestIds,
      completedCount,
      currentQuest,
      displayQuest: currentQuest ?? quests[quests.length - 1],
      allComplete: completedCount === quests.length,
    }
  })
}

function WorldMap() {
  const [profile, setProfile] = useState<PlayerProfile | null>(null)
  const [settings, setSettings] = useState<PlayerSettings>(
    DEFAULT_PLAYER_SETTINGS,
  )
  const [panel, setPanel] = useState<'journal' | 'settings' | null>(() =>
    typeof window !== 'undefined' && window.location.hash === '#games'
      ? 'journal'
      : null,
  )
  const [mapView, setMapView] = useState({ x: 0, y: 0, scale: 1 })
  const mapDrag = useRef({ active: false, x: 0, y: 0, moved: false })
  useEffect(() => {
    const loaded = loadProfile()
    const loadedSettings = loaded.settings ?? DEFAULT_PLAYER_SETTINGS
    setProfile(loaded)
    setSettings(loadedSettings)
    applyPlayerSettings(loadedSettings)
    if (window.location.hash === '#games') {
      window.history.replaceState(null, '', window.location.pathname)
    }
  }, [])
  const xpPercent = profile
    ? Math.min(100, (profile.xp / profile.xpToNextLevel) * 100)
    : 0
  const review = getReviewDisclosure(
    getQuestReviewStatus(QUEST_TAFEEL_SEEGHA_MATCH),
  )
  const campaign = useMemo(() => getCampaignStops(profile), [profile])
  const activeStop =
    campaign.find((stop) => !stop.allComplete) ?? campaign[campaign.length - 1]
  const activeQuest = activeStop?.displayQuest ?? QUEST_TAFEEL_SEEGHA_MATCH
  const completedQuestCount = campaign.reduce(
    (total, stop) => total + stop.completedCount,
    0,
  )
  const totalQuestCount = campaign.reduce(
    (total, stop) => total + stop.quests.length,
    0,
  )
  const journeys = useMemo(
    () => (profile ? revisionJourneys(profile, CURRICULUM_BAABS) : []),
    [profile],
  )

  function updateSettings(next: PlayerSettings) {
    const nextProfile = savePlayerSettings(loadProfile(), next)
    setProfile(nextProfile)
    setSettings(next)
    applyPlayerSettings(next)
  }

  function moveMap(event: PointerEvent<HTMLElement>) {
    if (!mapDrag.current.active) return
    const dx = event.clientX - mapDrag.current.x
    const dy = event.clientY - mapDrag.current.y
    mapDrag.current.x = event.clientX
    mapDrag.current.y = event.clientY
    if (Math.abs(dx) + Math.abs(dy) > 1) mapDrag.current.moved = true
    setMapView((current) => ({
      ...current,
      x: Math.max(-360, Math.min(360, current.x + dx)),
      y: Math.max(-240, Math.min(240, current.y + dy)),
    }))
  }

  function zoomMap(amount: number) {
    setMapView((current) => ({
      ...current,
      scale: Math.max(
        0.82,
        Math.min(1.45, Number((current.scale + amount).toFixed(2))),
      ),
    }))
  }

  return (
    <main className="world-screen">
      <div className="map-stars" aria-hidden="true" />
      <div className="map-moon" aria-hidden="true" />
      <header className="world-hud">
        <div className="brand-mark" aria-label="Sarf Quest">
          <span className="brand-mark-glyph">ص</span>
          <span>
            <strong>SARF</strong>
            <small>QUEST</small>
          </span>
        </div>
        <div className="player-progress">
          <div className="hud-line">
            <span>
              Level {profile?.level ?? 1} · {levelTitle(profile?.level ?? 1)}
            </span>
            <span>
              {profile?.xp ?? 0} / {profile?.xpToNextLevel ?? 100} XP
            </span>
          </div>
          <div className="xp-track">
            <span style={{ width: `${xpPercent}%` }} />
          </div>
        </div>
        <div
          className="hud-token"
          title="Daily quest progress"
          aria-label={`Daily quest progress: ${profile?.dailyGoal.questsCompleted ?? 0} of 3 quests completed`}
        >
          <span>✦</span>
          <b>{profile?.dailyGoal.questsCompleted ?? 0}/3</b>
        </div>
      </header>

      <section className="world-heading">
        <div className="eyebrow">THE ILLUSTRATED MORPHOLOGY ATLAS</div>
        <h1 id="world-map-title">
          The World of <em>Sarf</em>
        </h1>
        <p lang="ar" dir="rtl">
          عَالَمُ الصَّرْفِ
        </p>
        <div className="demo-ribbon">{review.label} · TEXTBOOK OCR</div>
      </section>

      <section
        className="map-stage"
        aria-labelledby="world-map-title"
        aria-label="Sarf Quest world map"
        onPointerDown={(event) => {
          mapDrag.current = {
            active: true,
            x: event.clientX,
            y: event.clientY,
            moved: false,
          }
          event.currentTarget.setPointerCapture(event.pointerId)
        }}
        onPointerMove={moveMap}
        onPointerUp={(event) => {
          mapDrag.current.active = false
          event.currentTarget.releasePointerCapture(event.pointerId)
        }}
        onPointerCancel={() => {
          mapDrag.current.active = false
        }}
        onClick={(event) => {
          if (mapDrag.current.moved) {
            event.preventDefault()
            event.stopPropagation()
            mapDrag.current.moved = false
          }
        }}
        onWheel={(event) => {
          event.preventDefault()
          zoomMap(event.deltaY > 0 ? -0.08 : 0.08)
        }}
      >
        <div
          className="map-canvas"
          style={{
            transform: `translate3d(${mapView.x}px, ${mapView.y}px, 0) scale(${mapView.scale})`,
          }}
        >
          <div className="map-haze haze-one" aria-hidden="true" />
          <div className="map-haze haze-two" aria-hidden="true" />
          {/* <div className="ridge ridge-back" aria-hidden="true" />
          <div className="ridge ridge-front" aria-hidden="true" /> */}
          {/* <div className="river" aria-hidden="true" /> */}
          <div className="map-region region-north">THE NORTHERN ARCHIVE</div>
          <div className="map-region region-south">THE ROOTLANDS</div>
          {/* <div className="river-title" aria-hidden="true">
            <span>RIVER OF KNOWLEDGE</span>
            <b lang="ar" dir="rtl">
              نَهْرُ الْمَعْرِفَةِ
            </b>
          </div> */}
          <MapCampaign stops={campaign} activeBaabId={activeStop?.baabId} />
        </div>
        <div
          className="map-controls"
          aria-label="Map controls"
          onPointerDown={(event) => event.stopPropagation()}
        >
          <button
            type="button"
            onClick={() => zoomMap(0.12)}
            aria-label="Zoom in"
          >
            +
          </button>
          <button
            type="button"
            onClick={() => zoomMap(-0.12)}
            aria-label="Zoom out"
          >
            −
          </button>
          <button
            type="button"
            onClick={() => setMapView({ x: 0, y: 0, scale: 1 })}
            aria-label="Recenter map"
          >
            ⌖
          </button>
        </div>
        <p className="map-hint">
          Drag to explore · scroll or use + / − to zoom
        </p>
        <div className="map-legend" role="group" aria-label="Map legend">
          <span>
            <i className="legend-dot legend-quest" /> Next game
          </span>
          <span>
            <i className="legend-dot legend-complete" /> Completed
          </span>
        </div>
      </section>

      <section className="world-footer">
        <div className="daily-quest">
          <div className="quest-scroll-icon">✧</div>
          <div>
            <small>YOUR NEXT ADVENTURE</small>
            <strong>
              {activeStop?.allComplete
                ? 'The atlas is lit'
                : activeQuest.titleEn}
            </strong>
            <span>
              {activeStop?.nameEn ?? 'Sarf Quest'} · {completedQuestCount}/
              {totalQuestCount} games complete
            </span>
          </div>
        </div>
        <div className="world-actions">
          <Link
            className="map-action"
            to="/quest/$questId"
            params={{ questId: activeQuest.id }}
          >
            <span>{activeStop?.allComplete ? '↻' : '➜'}</span>
            {activeStop?.allComplete ? 'Replay last game' : 'Play next game'}
          </Link>
          <button
            className="map-utility"
            onClick={() => setPanel('journal')}
            aria-haspopup="dialog"
          >
            ✧ Choose another game
          </button>
          <button
            className="map-utility"
            onClick={() => setPanel('settings')}
            aria-haspopup="dialog"
          >
            ⚙ Camp settings
          </button>
        </div>
      </section>
      {panel && (
        <WorldPanel
          panel={panel}
          profile={profile}
          campaign={campaign}
          journeys={journeys}
          settings={settings}
          reviewLabel={review.label}
          onClose={() => setPanel(null)}
          onSettingsChange={updateSettings}
        />
      )}
    </main>
  )
}

function WorldPanel({
  panel,
  profile,
  campaign,
  journeys,
  settings,
  reviewLabel,
  onClose,
  onSettingsChange,
}: {
  panel: 'journal' | 'settings'
  profile: PlayerProfile | null
  campaign: CampaignStop[]
  journeys: ReturnType<typeof revisionJourneys>
  settings: PlayerSettings
  reviewLabel: string
  onClose: () => void
  onSettingsChange: (settings: PlayerSettings) => void
}) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  return (
    <div className="world-panel-backdrop" role="presentation" onClick={onClose}>
      <section
        className="world-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="world-panel-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="world-panel-close"
          onClick={onClose}
          aria-label="Close panel"
        >
          ×
        </button>
        {panel === 'journal' ? (
          <>
            <p className="eyebrow">FIELD JOURNAL</p>
            <h2 id="world-panel-title">The scholar’s satchel</h2>
            <p className="panel-intro">
              Track the ground you have learned and follow the next review
              trail.
            </p>
            <div className="journal-disclosure">
              {reviewLabel} · demonstration archive
            </div>
            {journeys.map((journey) => (
              <div className="journey-entry" key={journey.baabId}>
                <div>
                  <strong>{journey.title}</strong>
                  <b lang="ar" dir="rtl">
                    {journey.titleAr}
                  </b>
                  <small>{journey.seeghaCount} seeghas in the archive</small>
                </div>
                <span className={`mastery-badge ${journey.masteryState}`}>
                  {journey.due
                    ? 'REVIEW DUE'
                    : journey.masteryState.toUpperCase()}
                </span>
                <small>{journey.prompt}</small>
              </div>
            ))}
            <h3>Mode gates</h3>
            <div className="mode-list">
              {GAME_MODE_DEFINITIONS.map((definition) => {
                const unlocked = profile
                  ? isModeUnlocked(profile, definition)
                  : definition.id === 'seegha-match'
                const targetQuest =
                  definition.id === 'seegha-match'
                    ? QUEST_TAFEEL_SEEGHA_MATCH
                    : QUESTS_BY_BAAB.tafeel.find(
                        (quest) => quest.gameMode === definition.id,
                      )
                const row = (
                  <>
                    <div>
                      <strong>{definition.title}</strong>
                      <b lang="ar" dir="rtl">
                        {definition.titleAr}
                      </b>
                    </div>
                    <small>
                      {unlocked
                        ? 'Enter the training ground'
                        : definition.unlockLabel}
                    </small>
                  </>
                )
                return unlocked && targetQuest ? (
                  <Link
                    className="mode-row is-open"
                    key={definition.id}
                    to="/quest/$questId"
                    params={{ questId: targetQuest.id }}
                  >
                    {row}
                  </Link>
                ) : (
                  <div className="mode-row is-locked" key={definition.id}>
                    {row}
                  </div>
                )
              })}
            </div>
            <h3>Campaign map</h3>
            <p className="panel-intro panel-intro-tight">
              Every supplied baab has its own route through six different game
              scenes. All entries are demonstration content until reviewed.
            </p>
            <div className="adventure-list">
              {campaign.map((stop, index) => {
                const { quests, completedCount: completed } = stop
                return (
                  <article className="adventure-entry" key={stop.baabId}>
                    <div className="adventure-heading">
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      <div>
                        <strong>{stop.nameEn}</strong>
                        <b lang="ar" dir="rtl">
                          {stop.nameAr}
                        </b>
                      </div>
                      <small>
                        {completed}/{quests.length}
                      </small>
                    </div>
                    <div className="adventure-quests">
                      {quests.map((quest) => (
                        <Link
                          key={quest.id}
                          className={`adventure-quest ${profile?.questProgress[quest.id]?.completedAt ? 'is-completed' : ''} ${stop.currentQuest?.id === quest.id ? 'is-next' : ''}`}
                          to="/quest/$questId"
                          params={{ questId: quest.id }}
                        >
                          <span>{quest.titleEn}</span>
                          <small>
                            {profile?.questProgress[quest.id]?.completedAt
                              ? 'Replay'
                              : 'Enter'}
                          </small>
                        </Link>
                      ))}
                    </div>
                  </article>
                )
              })}
            </div>
          </>
        ) : (
          <>
            <p className="eyebrow">CAMP SETTINGS</p>
            <h2 id="world-panel-title">Tune the journey</h2>
            <p className="panel-intro">Your choices stay on this device.</p>
            <label className="setting-row">
              <span>
                <strong>Sound cues</strong>
                <small>Ready for future audio feedback</small>
              </span>
              <input
                type="checkbox"
                checked={settings.soundEnabled}
                onChange={(event) =>
                  onSettingsChange({
                    ...settings,
                    soundEnabled: event.target.checked,
                  })
                }
              />
            </label>
            <label className="setting-row">
              <span>
                <strong>Reduced motion</strong>
                <small>Calm pulses and reward movement</small>
              </span>
              <input
                type="checkbox"
                checked={settings.reducedMotion}
                onChange={(event) =>
                  onSettingsChange({
                    ...settings,
                    reducedMotion: event.target.checked,
                  })
                }
              />
            </label>
            <div className="setting-row setting-scale">
              <span>
                <strong>Text size</strong>
                <small>Increase reading comfort</small>
              </span>
              <div
                className="scale-options"
                role="group"
                aria-label="Text size"
              >
                <button
                  className={
                    settings.textScale === 'normal' ? 'is-selected' : ''
                  }
                  onClick={() =>
                    onSettingsChange({ ...settings, textScale: 'normal' })
                  }
                >
                  A
                </button>
                <button
                  className={
                    settings.textScale === 'large' ? 'is-selected' : ''
                  }
                  onClick={() =>
                    onSettingsChange({ ...settings, textScale: 'large' })
                  }
                >
                  A+
                </button>
              </div>
            </div>
          </>
        )}
      </section>
    </div>
  )
}

function MapCampaign({
  stops,
  activeBaabId,
}: {
  stops: CampaignStop[]
  activeBaabId?: string
}) {
  return (
    <div className="map-campaign" aria-label="Campaign checkpoints">
      <div className="river-route" aria-hidden="true" />
      {stops.map((stop, index) => (
        <Link
          key={stop.baabId}
          to="/quest/$questId"
          params={{ questId: stop.displayQuest.id }}
          className={`map-stop ${stop.allComplete ? 'is-complete' : ''} ${stop.baabId === activeBaabId ? 'is-current' : ''}`}
          aria-label={`${stop.nameEn}: ${stop.completedCount} of ${stop.quests.length} games complete${stop.currentQuest ? `. Next: ${stop.currentQuest.titleEn}` : ''}`}
          onPointerDown={(event) => event.stopPropagation()}
        >
          <span className="map-stop-orb">
            {stop.allComplete ? '✓' : String(index + 1).padStart(2, '0')}
          </span>
          <strong lang="ar" dir="rtl">
            {stop.nameAr}
          </strong>
          <small>
            {stop.completedCount}/{stop.quests.length} games
          </small>
          <span className="map-stop-games" aria-hidden="true">
            {stop.quests.map((quest) => (
              <i key={quest.id} className={profileQuestClass(stop, quest)} />
            ))}
          </span>
        </Link>
      ))}
    </div>
  )
}

function profileQuestClass(stop: CampaignStop, quest: Quest) {
  if (stop.currentQuest?.id === quest.id) return 'is-next'
  return stop.completedQuestIds.includes(quest.id) ? 'is-complete' : ''
}
