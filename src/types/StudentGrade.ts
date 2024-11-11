export interface StudentGrade {
  id: number
  student_id: number
  student_assignment_id: number
  grade: number // Decimal type di TypeScript biasanya diganti ke number atau library khusus
  term: string
}

export type CreateStudentGrade = Omit<StudentGrade, 'id'>
export type UpdateStudentGrade = Omit<StudentGrade, 'id'>
