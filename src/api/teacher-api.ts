import type { CreateTeacherData, Teacher, UpdateTeacherData } from '@/types/Teacher'
import apiFetch from '@/lib/ofetch'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export function useGetAllTeachers() {
  return useQuery({
    queryKey: ['teachers'],
    queryFn: async () => {
      const res = await apiFetch<{ teachers: Teacher[] }>('/teachers')

      return res.teachers
    },
  })
}

export function useGetTeacherById(id?: number) {
  return useQuery({
    queryKey: ['teachers', id],
    queryFn: async () => {
      const res = await apiFetch<{ teacher: Teacher }>(`/teachers/${id}`)
      return res.teacher
    },
  })
}

export function useGetTeachersBySubjectId(subjectId: number) {
  return useQuery({
    queryKey: ['teachers', { subjectId }],
    queryFn: async () => {
      const res = await apiFetch<{ teachers: Teacher[] }>(`/teachers?subjectId=${subjectId}`)
      return res.teachers
    },
  })
}

export function useCreateTeacher() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreateTeacherData) => {
      const res = await apiFetch('/teachers', {
        method: 'POST',
        body: data,
      })
      return res
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teachers'] })
    },
  })
}

export function useUpdateTeacher(id: number) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: UpdateTeacherData) => {
      const res = await apiFetch<{ message: 'Updated', teacher: Teacher }>(`/teachers/${id}`, {
        method: 'PUT',
        body: data,
      })
      return res
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teachers'] })
    },
  })
}

export function useDeleteTeacher(id: number) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (_data: null) => {
      const res = await apiFetch<{ message: 'Deleted', teacher: Teacher }>(`/teachers/${id}`, {
        method: 'DELETE',
      })
      return res
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teachers'] })
    },
  })
}
