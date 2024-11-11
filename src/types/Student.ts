export interface Student {
  id: number
  nama: string
  jenis_kelamin: 'male' | 'female'
  NISN: string
}

export type CreateStudentData = Omit<Student, 'id'>
