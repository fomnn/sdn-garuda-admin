import type { Account, CreateAccount, UpdateAccount } from '@/types/Account'
import apiFetch from '@/lib/ofetch'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export function useGetAllAccounts() {
  return useQuery({
    queryKey: ['accounts'],
    queryFn: async () => {
      const res = await apiFetch<{ accounts: Account[] }>('/accounts')
      return res.accounts
    },
  })
}

export function useGetAccountById(id: number) {
  return useQuery({
    queryKey: ['accounts', id],
    queryFn: async () => {
      const res = await apiFetch<{ account: Account }>(`/accounts/${id}`)
      return res.account
    },
  })
}

export function useCreateAccount() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (body: CreateAccount) => {
      await apiFetch<{ message: 'Created', account: Account }>('/accounts', {
        method: 'POST',
        body,
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] })
    },
  })
}

export function useUpdateAccount(id: number) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (body: UpdateAccount) => {
      await apiFetch<{ message: 'Updated', account: Account }>(`/accounts/${id}`, {
        method: 'PUT',
        body,
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] })
    },
  })
}

export function useDeleteAccount(id: number) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async () => {
      await apiFetch<{ message: 'Deleted', account: Account }>(`/accounts/${id}`, {
        method: 'DELETE',
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] })
    },
  })
}
