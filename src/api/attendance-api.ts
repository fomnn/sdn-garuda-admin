import type { Attendance, CreateAttendance, UpdateAttendance } from '@/types/Attentance'
import apiFetch from '@/lib/ofetch'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export function useGetAllAttendances() {
  return useQuery({
    queryKey: ['attendances'],
    queryFn: async () => {
      const res = await apiFetch<{ attendances: Attendance[] }>('/attendance')
      return res.attendances
    },
  })
}

export function useGetAttendanceById(id: number) {
  return useQuery({
    queryKey: ['attendances', id],
    queryFn: async () => {
      const res = await apiFetch<{ attendance: Attendance }>(`/attendances/${id}`)
      return res.attendance
    },
  })
}

export function useCreateAttendance() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (body: CreateAttendance) => {
      await apiFetch<{ message: 'Created', attendance: Attendance }>('/attendances', {
        method: 'POST',
        body,
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['attendances'] })
    },
  })
}

export function useUpdateAttendance(id: number) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (body: UpdateAttendance) => {
      await apiFetch<{ message: 'Updated', attendance: Attendance }>(`/attendances/${id}`, {
        method: 'PUT',
        body,
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['attendances'] })
    },
  })
}

export function useDeleteAttendance(id: number) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async () => {
      await apiFetch<{ message: 'Deleted', attendance: Attendance }>(`/attendances/${id}`, {
        method: 'DELETE',
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['attendances'] })
    },
  })
}
