export interface Class {
  id: number
  class_name: string
  teacher_id?: number
}

export type CreateClassData = Omit<Class, 'id'>
