import type { CreateTeacherData, Teacher } from '@/types/Teacher'
import apiFetch from '@/lib/ofetch'
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query'

export function useGetAllTeachers() {
  return useQuery({
    queryKey: ['teachers'],
    queryFn: async () => {
      const res = await apiFetch<Teacher[]>('/teachers')

      console.log(res)

      return res
    },
  })
}

export function useCreateTeacher() {
  const queryClient = new QueryClient()

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
