import type { CreateParent, Parent, UpdateParent } from '@/types/Parent'
import apiFetch from '@/lib/ofetch'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

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

export function useCreateParent() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: CreateParent) => {
      await apiFetch<{
        message: 'Created'
        parent: Parent
      }>('/parents', {
        method: 'POST',
        body: data,
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['parents'] })
    },
  })
}

export function useUpdateParent(id: number) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: UpdateParent) => {
      await apiFetch<{
        message: 'Updated'
        parent: Parent
      }>(`/parents/${id}`, {
        method: 'PUT',
        body: data,
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['parents'] })
    },
  })
}

export function useDeleteParent(id: number) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (_data: null) => {
      await apiFetch<{
        message: 'Deleted'
        parent: Parent
      }>(`/parents/${id}`, {
        method: 'DELETE',
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['parents'] })
    },
  })
}
