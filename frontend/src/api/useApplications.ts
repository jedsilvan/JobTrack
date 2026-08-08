import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { api } from './client'
import { type Application, ApplicationStatus } from '../models'

async function fetchApplications(): Promise<Application[]> {
  return await api.get<Application[]>('/applications')
}

async function updateApplicationStatus(
  id: number,
  status: ApplicationStatus,
): Promise<Application> {
  return await api.patch<Application>(`applications/${id}`, { status })
}

// Fetch + cache the board's applications
export function useApplications() {
  return useQuery({
    queryKey: ['applications'],
    queryFn: fetchApplications,
    staleTime: 30_000,
    placeholderData: keepPreviousData,
  })
}

// Drag a card to a new column -> optimistic PATCH with rollback on failure
export function useUpdateApplicationStatus() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, status }: { id: number; status: ApplicationStatus }) =>
      updateApplicationStatus(id, status),

    onMutate: async ({ id, status }) => {
      await queryClient.cancelQueries({ queryKey: ['applications'] })

      const previous = queryClient.getQueryData<Application[]>(['applications'])

      queryClient.setQueryData<Application[]>(['applications'], (old) =>
        old?.map((app) => (app.id === id ? { ...app, status } : app)),
      )

      return { previous }
    },

    onError: (_err, _vars, context) => {
      // Roll back the optimistic move if the PATCH fails
      if (context?.previous) {
        queryClient.setQueryData(['applications'], context.previous)
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['applications'] })
    },
  })
}
