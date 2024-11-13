import type { CreateSubject, Subject, UpdateSubject } from '@/types/Subject'
import apiFetch from '@/lib/ofetch'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export function useGetAllSubjects() {
  return useQuery({
    queryKey: ['subjects'],
    queryFn: async () => {
      const res = await apiFetch<{ subjects: Subject[] }>('/subjects')
      console.log(res)
      return res.subjects
    },
  })
}

export function useGetSubjectById(id: number) {
  return useQuery({
    queryKey: ['subjects', id],
    queryFn: async () => {
      const res = await apiFetch<{ subject: Subject }>(`/subjects/${id}`)
      return res.subject
    },
  })
}

export function useCreateSubject() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: CreateSubject) => {
      await apiFetch('/subjects', {
        method: 'POST',
        body: data,
      })
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['subjects'] }),
  })
}

export function useUpdateSubject(id: number) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: UpdateSubject) => {
      await apiFetch(`/subjects/${id}`, {
        method: 'PUT',
        body: data,
      })
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['subjects'] }),
  })
}

export function useDeleteSubject(id: number) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (_data: null) => {
      await apiFetch(`/subjects/${id}`, {
        method: 'DELETE',
      })
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['subjects'] }),
  })
}
