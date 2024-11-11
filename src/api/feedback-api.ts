import type { CreateFeedback, Feedback, UpdateFeedback } from '@/types/Feedback'
import apiFetch from '@/lib/ofetch'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export function useGetAllFeedbacks() {
  return useQuery({
    queryKey: ['feedbacks'],
    queryFn: async () => {
      const res = await apiFetch<{ feedbacks: Feedback[] }>('/feedbacks')
      return res.feedbacks
    },
  })
}

export function useGetFeedbackById(id: number) {
  return useQuery({
    queryKey: ['feedbacks', id],
    queryFn: async () => {
      const res = await apiFetch<{ feedback: Feedback }>(`/feedbacks/${id}`)
      return res.feedback
    },
  })
}

export function useCreateFeedback() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (body: CreateFeedback) => {
      await apiFetch<{ message: 'Created', feedback: Feedback }>('/feedbacks', {
        method: 'POST',
        body,
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feedbacks'] })
    },
  })
}

export function useUpdateFeedback(id: number) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (body: UpdateFeedback) => {
      await apiFetch<{ message: 'Updated', feedback: Feedback }>(`/feedbacks/${id}`, {
        method: 'PUT',
        body,
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feedbacks'] })
    },
  })
}

export function useDeleteFeedback(id: number) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async () => {
      await apiFetch<{ message: 'Deleted', feedback: Feedback }>(`/feedbacks/${id}`, {
        method: 'DELETE',
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feedbacks'] })
    },
  })
}
