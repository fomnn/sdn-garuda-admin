import type { CreateStudentData, Student } from '@/types/Student'
import apiFetch from '@/lib/ofetch'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export function useGetAllStudents() {
  return useQuery({
    queryKey: ['students'],
    queryFn: async () => {
      const res = await apiFetch<{students: Student[]}>('/students')

      console.log(res)

      return res.students
    },
  })
}

export function useCreateStudent() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: CreateStudentData) => {
      await apiFetch('/students', {
        method: 'POST',
        body: data,
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] })
    },
  })
}
