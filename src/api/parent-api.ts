import type { Parent } from '@/types/Parent'
import apiFetch from '@/lib/ofetch'
import { useQuery } from '@tanstack/react-query'

export function useGetAllParents() {
  return useQuery({
    queryKey: ['parents'],
    queryFn: async () => {
      const res = await apiFetch<{parents: Parent[]}>('/parents')

      console.log(res)

      return res.parents
    },
  })
}

export function useGetParentById(id: number) {
  return useQuery({
    queryKey: ['parent', id],
    queryFn: async () => {
      const res = await apiFetch<Parent>(`/parents/${id}`)

      console.log(res)

      return res
    },
  })
}
