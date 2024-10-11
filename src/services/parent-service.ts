import type { Parent } from '@/types/Parent'
import apiFetch from '@/lib/ofetch'
import { useQuery } from '@tanstack/react-query'

export function useGetAllParents() {
  return useQuery({
    queryKey: ['parents'],
    queryFn: async () => {
      const res = await apiFetch<Parent[]>('/parents')

      console.log(res)

      return res
    },
  })
}
