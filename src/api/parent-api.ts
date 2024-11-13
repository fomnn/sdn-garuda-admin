import type { Parent } from '@/types/Parent'
import apiFetch from '@/lib/ofetch'
import { useQuery } from '@tanstack/react-query'

export function useGetAllParents() {
  return useQuery({
    queryKey: ['parents'],
    queryFn: async () => {
      const res = await apiFetch<{ parents: Parent[] }>('/parents')

      console.log(res)

      return res.parents
    },
  })
}

export function useGetParentById(id: number) {
  return useQuery({
    queryKey: ['parents', id],
    queryFn: async () => {
      const res = await apiFetch<{ parent: Parent }>(`/parents/${id}`)

      return res.parent
    },
  })
}

export function useGetParentsByStudentId(studentId: number) {
  return useQuery({
    queryKey: ['parents', { studentId }],
    queryFn: async () => {
      const res = await apiFetch<{ parents: Parent[] }>(`/parents?studentId=${studentId}`)

      return res.parents
    },
  })
}
