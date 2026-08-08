import { useQuery } from '@tanstack/react-query'
import { api } from './client'
import {
  type Stats,
  type StatsOverTime,
  type StatsPercentages,
  StatsGranularity,
} from '../models'

async function fetchStats(): Promise<Stats> {
  return await api.get<Stats>('/stats')
}

async function fetchStatsOverTime(
  params: StatsGranularity,
): Promise<StatsOverTime> {
  return await api.get<StatsOverTime>('/stats/over-time', {
    granularity: params,
  })
}

export function useStats() {
  return useQuery({
    queryKey: ['stats'],
    queryFn: fetchStats,
  })
}

export function useStatsOverTime(
  params: StatsGranularity = StatsGranularity.Month,
) {
  return useQuery({
    queryKey: ['stats', 'over-time', params],
    queryFn: () => fetchStatsOverTime(params),
  })
}

export function useStatsApplicationPercentages() {
  return useQuery({
    queryKey: ['applicationStats'],
    queryFn: fetchStats,
    select: (data): StatsPercentages => {
      const total = data.total_applications || 1
      const { applied, interview, offer, rejected } =
        data.applications_by_status

      return {
        applied: Number(((applied / total) * 100).toFixed(2)),
        interview: Number(((interview / total) * 100).toFixed(2)),
        offer: Number(((offer / total) * 100).toFixed(2)),
        rejected: Number(((rejected / total) * 100).toFixed(2)),
      }
    },
  })
}
