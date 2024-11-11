export interface Subject {
  id: number
  subject_name: string
}

export type CreateSubjectData = Omit<Subject, 'id'>
