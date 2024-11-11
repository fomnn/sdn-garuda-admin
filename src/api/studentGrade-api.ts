import type { CreateStudentGrade, StudentGrade, UpdateStudentGrade } from '@/types/StudentGrade'
import apiFetch from '@/lib/ofetch'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export function useGetAllStudentsGrades() {
  return useQuery({
    queryKey: ['studentsGrades'],
    queryFn: async () => {
      const res = await apiFetch<{ student_grades: StudentGrade[] }>('/student-grades')
      return res.student_grades
    },
  })
}

export function useGetStudentAssignmentById(id: number) {
  return useQuery({
    queryKey: ['studentsGrades', id],
    queryFn: async () => {
      const res = await apiFetch<{ student_grade: StudentGrade }>(`/student-grades/${id}`)
      return res.student_grade
    },
  })
}

export function useCreateStudentAssignment() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (body: CreateStudentGrade) => {
      await apiFetch<{ message: 'Created', student_grade: StudentGrade }>('/student-grades', {
        method: 'POST',
        body,
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['studentsGrades'] })
    },
  })
}

export function useUpdateStudentAssignment(id: number) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (body: UpdateStudentGrade) => {
      await apiFetch<{ message: 'Updated', student_grade: StudentGrade }>(`/student-grades/${id}`, {
        method: 'PUT',
        body,
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['studentsGrades'] })
    },
  })
}

export function useDeleteStudentAssignment(id: number) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async () => {
      await apiFetch<{ message: 'Deleted', student_grade: StudentGrade }>(`/student-grades/${id}`, {
        method: 'DELETE',
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['studentsGrades'] })
    },
  })
}
