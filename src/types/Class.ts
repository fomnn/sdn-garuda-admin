export interface Class {
  class_name: string
  teacher_id: string
  students: string[]
  _id: string
}

export type CreateClassData = Omit<Class, '_id' | 'students'>
