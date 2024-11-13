import type { Class, CreateClass, UpdateClass } from '@/types/Class'
import apiFetch from '@/lib/ofetch'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export function useGetAllClass() {
  return useQuery({
    queryKey: ['classes'],
    queryFn: async () => {
      const res = await apiFetch<{ classes: Class[] }>('/classes')
      return res.classes
    },
  })
}

export function useGetClassById(id: number) {
  return useQuery({
    queryKey: ['classes', id],
    queryFn: async () => {
      const res = await apiFetch<{ class: Class }>(`/classes/${id}`)
      return res.class
    },
  })
}

export function useCreateClass() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: CreateClass) => {
      await apiFetch('/classes', {
        method: 'POST',
        body: data,
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['classes'] })
    },
  })
}

export function useUpdateClass(id: number) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: UpdateClass) => {
      await apiFetch(`/classes/${id}`, {
        method: 'PUT',
        body: data,
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['classes'] })
    },
  })
}

export function useDeleteClass(id: number) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (_data: null) => {
      await apiFetch(`/classes/${id}`, {
        method: 'DELETE',
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['classes'] })
    },
  })
}
