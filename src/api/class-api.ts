import type { Class, CreateClassData } from '@/types/Class'
import apiFetch from '@/lib/ofetch'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export function useGetAllClass() {
  return useQuery({
    queryKey: ['classes'],
    queryFn: async () => {
      const res = await apiFetch<{classes: Class[]}>('/classes')
      console.log(res)
      return res.classes
    },
  })
}

export function useCreateClass() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (body: CreateClassData) => {
      await apiFetch('/classes', {
        method: 'POST',
        body,
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['classes'] })
    },
  })
}
