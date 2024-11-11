import type { CreateStudentAssignment, StudentAssignment, UpdateStudentAssignment } from '@/types/StudentAssignment'
import apiFetch from '@/lib/ofetch'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export function useGetAllStudentAssignments() {
  return useQuery({
    queryKey: ['studentAssignments'],
    queryFn: async () => {
      const res = await apiFetch<{ student_assignments: StudentAssignment[] }>('/student-assignments')
      return res.student_assignments
    },
  })
}

export function useGetStudentAssignmentById(id: number) {
  return useQuery({
    queryKey: ['studentAssignments', id],
    queryFn: async () => {
      const res = await apiFetch<{ student_assignment: StudentAssignment }>(`/student-assignments/${id}`)
      return res.student_assignment
    },
  })
}

export function useCreateStudentAssignment() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (body: CreateStudentAssignment) => {
      await apiFetch<{ message: 'Created', student_assignment: StudentAssignment }>('/student-assignments', {
        method: 'POST',
        body,
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['studentAssignments'] })
    },
  })
}

export function useUpdateStudentAssignment(id: number) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (body: UpdateStudentAssignment) => {
      await apiFetch<{ message: 'Updated', student_assignment: StudentAssignment }>(`/student-assignments/${id}`, {
        method: 'PUT',
        body,
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['studentAssignments'] })
    },
  })
}

export function useDeleteStudentAssignment(id: number) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async () => {
      await apiFetch<{ message: 'Deleted', student_assignment: StudentAssignment }>(`/student-assignments/${id}`, {
        method: 'DELETE',
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['studentAssignments'] })
    },
  })
}
