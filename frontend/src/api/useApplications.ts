import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { type Application, ApplicationStatus } from '../models';

const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:8000';

async function fetchApplications(): Promise<Application[]> {
  const res = await fetch(`${API_BASE}/applications`);
  if (!res.ok) throw new Error('Failed to fetch applications');
  return res.json();
}

async function updateApplicationStatus(id: number, status: ApplicationStatus): Promise<Application> {
  const res = await fetch(`${API_BASE}/applications/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error('Failed to update application');
  return res.json();
}

// Fetch + cache the board's applications
export function useApplications() {
  return useQuery({
    queryKey: ['applications'],
    queryFn: fetchApplications,
    staleTime: 30_000,
  });
}

// Drag a card to a new column -> optimistic PATCH with rollback on failure
export function useUpdateApplicationStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: number; status: ApplicationStatus }) =>
      updateApplicationStatus(id, status),

    onMutate: async ({ id, status }) => {
      await queryClient.cancelQueries({ queryKey: ['applications'] });

      const previous = queryClient.getQueryData<Application[]>(['applications']);

      queryClient.setQueryData<Application[]>(['applications'], (old) =>
        old?.map((app) => (app.id === id ? { ...app, status } : app))
      );

      return { previous };
    },

    onError: (_err, _vars, context) => {
      // Roll back the optimistic move if the PATCH fails
      if (context?.previous) {
        queryClient.setQueryData(['applications'], context.previous);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['applications'] });
    },
  });
}