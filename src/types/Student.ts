export interface Student {
  first_name: string
  middle_name?: string
  last_name?: string
  birth_date: string
  gender: 'male' | 'female'
  parent_id?: string
  class_id: string
  _id: string
}

export type CreateStudentData = Omit<Student, '_id'>
