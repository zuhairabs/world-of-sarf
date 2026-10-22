import type { Quest, ReviewStatus } from './types'

export interface ReviewDisclosure {
  label: string
  description: string
  isAuthoritative: boolean
  isDemoOnly: boolean
}

/** Keeps review language consistent wherever content is shown. */
export function getReviewDisclosure(status: ReviewStatus): ReviewDisclosure {
  if (status === 'verified') {
    return {
      label: 'TEXTBOOK CONTENT · VERIFIED',
      description: 'Reviewed textbook content',
      isAuthoritative: true,
      isDemoOnly: false,
    }
  }

  if (status === 'needs_review') {
    return {
      label: 'DEMONSTRATION CONTENT · NEEDS REVIEW',
      description: 'OCR-derived content awaiting textbook review',
      isAuthoritative: false,
      isDemoOnly: true,
    }
  }

  return {
    label: 'DRAFT CONTENT · NOT AUTHORITATIVE',
    description: 'Draft content is not ready for teaching use',
    isAuthoritative: false,
    isDemoOnly: true,
  }
}

export function getQuestReviewStatus(quest: Quest): ReviewStatus {
  const statuses = quest.questions.map((question) => question.reviewStatus)
  if (
    statuses.length > 0 &&
    statuses.every((status) => status === 'verified')
  ) {
    return 'verified'
  }
  if (statuses.some((status) => status === 'needs_review')) {
    return 'needs_review'
  }
  return 'draft'
}
