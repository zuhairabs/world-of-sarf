import type { BaabRecord, BaabMastery, PlayerProfile } from '../content/types'

export interface RevisionJourney {
  baabId: string
  title: string
  titleAr: string
  masteryState: BaabMastery['masteryState']
  seeghaCount: number
  due: boolean
  prompt: string
}

export function isReviewDue(nextReviewAt?: string, now = new Date()): boolean {
  if (!nextReviewAt) return false
  return new Date(nextReviewAt).getTime() <= now.getTime()
}

export function revisionJourneys(
  profile: PlayerProfile,
  baabs: BaabRecord[],
  now = new Date(),
): RevisionJourney[] {
  return baabs.map((baab) => {
    const mastery = profile.baabMastery[baab.id]
    const due = isReviewDue(mastery?.nextReviewAt, now)
    return {
      baabId: baab.id,
      title: baab.nameEn,
      titleAr: baab.nameAr,
      masteryState: mastery?.masteryState ?? 'locked',
      seeghaCount: Object.keys(baab.wazn).length,
      due,
      prompt: due
        ? 'A lantern is dimming — revisit this baab.'
        : mastery
          ? 'Your next review will appear here.'
          : 'Begin the first quest to start this journey.',
    }
  })
}
