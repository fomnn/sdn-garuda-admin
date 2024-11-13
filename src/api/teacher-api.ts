import type { CreateTeacherData, Teacher } from '@/types/Teacher'
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
    }
  })
}

export function useCreateTeacher() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreateTeacherData) => {
      console.log(data)
      const res = await apiFetch('/teachers', {
        method: 'POST',
        body: data,
      })

      console.log(res)

      return res
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teachers'] })
    },
  })
}