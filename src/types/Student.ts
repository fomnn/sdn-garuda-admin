export interface Student {
  id: number
  nama: string
  jenis_kelamin: 'male' | 'female'
  NISN: string
  class_id: number
}
export type CreateStudentData = Omit<Student, 'id'> & {
  parent_id?: number
  relationship?:  'father' | 'mother' | 'guardian'
}
export type UpdateStudentData = Omit<Student, 'id'>
