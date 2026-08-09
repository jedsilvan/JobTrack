import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes - when data becomes "stale"
      retry: 3, // retry failed queries 3 times
      refetchOnWindowFocus: true, // auto-refetch on window focus
    },
  },
})

// use for tests
export const testQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0, // disable retries for tests
    },
  },
})
