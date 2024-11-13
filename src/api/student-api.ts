import type { CreateStudentData, Student, UpdateStudentData } from '@/types/Student'
import apiFetch from '@/lib/ofetch'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export function useGetAllStudents() {
  return useQuery({
    queryKey: ['students'],
    queryFn: async () => {
      const res = await apiFetch<{ students: Student[] }>('/students')
      return res.students
    },
  })
}

export function useGetStudentById(id: number) {
  return useQuery({
    queryKey: ['students', id],
    queryFn: async () => {
      const res = await apiFetch<{ student: Student }>(`/students/${id}`)
      return res.student
    },
  })
}

export function useGetStudentsByParentId(parentId: number) {
  return useQuery({
    queryKey: ['students', { parentId }],
    queryFn: async () => {
      const res = await apiFetch<{ students: Student[] }>(`/students?parentId=${parentId}`)
      return res.students
    },
  })
}

export function useGetStudentsByClassId(classId: number) {
  return useQuery({
    queryKey: ['students', { classId }],
    queryFn: async () => {
      const res = await apiFetch<{ students: Student[] }>(`/students?classId=${classId}`)
      return res.students
    },
  })
}

export function useCreateStudent() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: CreateStudentData) => {
      const studentData: Omit<CreateStudentData, 'parent_id' | 'relationship'> = {
        class_id: data.class_id,
        NISN: data.NISN,
        jenis_kelamin: data.jenis_kelamin,
        nama: data.nama,
      }
      const studentParent: { parent_id?: number, relationship?: 'father' | 'mother' | 'guardian' } = {
        parent_id: data.parent_id,
        relationship: data.relationship,
      }

      const { student: { id: student_id } } = await apiFetch<{ message: 'Created', student: Student }>('/students', {
        method: 'POST',
        body: studentData,
      })

      await apiFetch('/parents-students', {
        method: 'POST',
        body: {
          ...studentParent,
          student_id,
        },
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] })
    },
  })
}

export function useUpdateStudent(id: number) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: UpdateStudentData) => {
      await apiFetch(`/students/${id}`, {
        method: 'PUT',
        body: data,
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] })
    },
  })
}

export function useDeleteStudent(id: number) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (_data: null) => {
      await apiFetch(`/students/${id}`, {
        method: 'Delete',
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] })
    },
  })
}
