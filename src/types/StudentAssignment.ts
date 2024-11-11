export interface StudentAssignment {
  id: number
  subject_id: number
  date: Date
  deadline_date?: Date
  title: string
}

export type CreateStudentAssignment = Omit<StudentAssignment, 'id'>
export type UpdateStudentAssignment = Omit<StudentAssignment, 'id'>
