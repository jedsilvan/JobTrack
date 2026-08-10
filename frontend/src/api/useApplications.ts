import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { useToastContext } from '../context/ToastContext'
import { useModalContext } from '../context/ModalContext'
import { api } from './client'
import { type Application, ApplicationStatus } from '../models'

async function fetchApplications(): Promise<Application[]> {
  return await api.get<Application[]>('/applications')
}

async function updateApplicationStatus(
  id: number,
  status: ApplicationStatus,
): Promise<Application> {
  return await api.patch<Application>(`/applications/${id}`, { status })
}

// Create a new application
async function createApplication(
  applicationData: Application,
): Promise<Application> {
  return await api.post<Application>('/applications', applicationData)
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

// Create a new application -> optimistic POST with rollback on failure
export function useCreateApplication() {
  const { showToast } = useToastContext()
  const { closeModal } = useModalContext()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (applicationData: Application) =>
      createApplication(applicationData),

    onMutate: async (newApplication) => {
      await queryClient.cancelQueries({ queryKey: ['applications'] })

      const previous = queryClient.getQueryData<Application[]>(['applications'])

      queryClient.setQueryData<Application[]>(['applications'], (old) =>
        old ? [...old, newApplication] : [newApplication],
      )

      return { previous }
    },

    onSuccess: () => {
      showToast('Application created successfully', 'success')
      closeModal()
    },

    onError: (_err, _vars, context) => {
      // Roll back the optimistic creation if the POST fails
      if (context?.previous) {
        queryClient.setQueryData(['applications'], context.previous)
      }

      showToast('There was an error creating your application', 'error')
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['applications'] })
    },
  })
}
