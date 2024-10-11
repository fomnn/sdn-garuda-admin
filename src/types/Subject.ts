export interface Subject {
  _id: string
  subject_name: string
  grade?: number // Since it's nullable, we mark it as optional
}

export type CreateSubjectData = Omit<Subject, '_id'>
