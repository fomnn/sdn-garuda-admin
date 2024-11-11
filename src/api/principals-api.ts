import type { CreatePrincipal, Principal, UpdatePrincipal } from '@/types/Principal'
import apiFetch from '@/lib/ofetch'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export function useGetAllPrincipals() {
  return useQuery({
    queryKey: ['principals'],
    queryFn: async () => {
      const res = await apiFetch<{ principals: Principal[] }>('/principals')
      return res.principals
    },
  })
}

export function useGetPrincipalById(id: number) {
  return useQuery({
    queryKey: ['principals', id],
    queryFn: async () => {
      const res = await apiFetch<{ principal: Principal }>(`/principals/${id}`)
      return res.principal
    },
  })
}

export function useCreatePrincipal() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (body: CreatePrincipal) => {
      await apiFetch<{ message: 'Created', principal: Principal }>('/principals', {
        method: 'POST',
        body,
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['principals'] })
    },
  })
}

export function useUpdatePrincipal(id: number) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (body: UpdatePrincipal) => {
      await apiFetch<{ message: 'Updated', principal: Principal }>(`/principals/${id}`, {
        method: 'PUT',
        body,
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['principals'] })
    },
  })
}

export function useDeletePrincipal(id: number) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async () => {
      await apiFetch<{ message: 'Deleted', principal: Principal }>(`/principals/${id}`, {
        method: 'DELETE',
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['principals'] })
    },
  })
}
