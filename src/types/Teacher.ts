export interface Teacher {
  email: string
  first_name: string
  last_name?: string
  middle_name?: string
  gender: 'male' | 'female'
  role: 'teacher' | 'staff'
  contact_number: string
  _id: string
}

export type CreateTeacherData = Omit<Teacher, '_id'>
