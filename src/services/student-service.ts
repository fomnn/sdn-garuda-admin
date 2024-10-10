import type { Student } from '@/types/Student'
import apiFetch from '@/lib/ofetch'
import { useQuery } from '@tanstack/react-query'

export function useGetAllStudents() {
  return useQuery({
    queryKey: ['students'],
    queryFn: async () => {
      const res = await apiFetch<Student[]>('/students')

      console.log(res)

      return res
    },
  })
}
