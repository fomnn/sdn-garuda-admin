import type { CreateSubjectData, Subject } from '@/types/Subject'
import apiFetch from '@/lib/ofetch'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export function useGetAllSubjects() {
  return useQuery({
    queryKey: ['subjects'],
    queryFn: async () => {
      const res = await apiFetch<Subject[]>('/subjects')
      console.log(res)
      return res
    },
  })
}

export function useCreateSubject() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: CreateSubjectData) => {
      await apiFetch('/subjects', {
        method: 'POST',
        body: data,
      })
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['subjects'] }),
  })
}
