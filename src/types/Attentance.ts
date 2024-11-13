export interface Attendance {
  id: number
  student_id: number
  class_id: number
  date?: Date
  status?: 'present' | 'absent' | 'excused'
}

export type CreateAttendance = Omit<Attendance, 'id'>
export type UpdateAttendance = Omit<Attendance, 'id'>
