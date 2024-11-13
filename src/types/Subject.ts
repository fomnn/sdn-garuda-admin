export interface Subject {
  id: number
  subject_name: string
}

export type CreateSubject = Omit<Subject, 'id'>
export type UpdateSubject = Omit<Subject, 'id'>
