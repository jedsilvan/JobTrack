export const APPLICATION_STATUS_OPTIONS = [
  { value: 'applied', label: 'Applied' },
  { value: 'interview', label: 'Interview' },
  { value: 'offer', label: 'Offer' },
  { value: 'rejected', label: 'Rejected' },
]

export const ApplicationStatus = {
  Applied: 'applied',
  Interview: 'interview',
  Offer: 'offer',
  Rejected: 'rejected',
} as const

export type ApplicationStatus =
  (typeof ApplicationStatus)[keyof typeof ApplicationStatus]

export type Application = {
  id: number
  applied_date: string
  company: string
  job_link?: string
  notes?: string
  offer_date?: string
  response_deadline?: string
  role: string
  salary?: number
  status: ApplicationStatus
  tags?: string[]
}

export const StatsGranularity = {
  Week: 'week',
  Month: 'month',
  Year: 'year',
} as const

export type StatsGranularity =
  (typeof StatsGranularity)[keyof typeof StatsGranularity]

export type Stats = {
  total_applications: number
  applications_by_status: {
    applied: number
    interview: number
    offer: number
    rejected: number
  }
  conversion_rate: number
}

export type StatsOverTime = {
  period: string
  count: number
}

export type StatsPercentages = Record<ApplicationStatus, number>
