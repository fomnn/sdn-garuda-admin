export interface Class {
  id: number
  class_name: string
  teacher_id?: number
}

export type CreateClass = Omit<Class, 'id'>
export type UpdateClass = Omit<Class, 'id'>
