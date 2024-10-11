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

export function useGetParentById(id: string) {
  return useQuery({
    queryKey: ['parent', id],
    queryFn: async () => {
      const res = await apiFetch<Parent>(`/parents/${id}`)

      console.log(res)

      return res
    },
  })
}
