enum AttendanceStatus {
  PRESENT = 'present',
  ABSENT = 'absent',
  EXCUSED = 'excused'
}

export interface Attendance {
  id: number;
  student_id: number;
  class_id: number;
  date?: Date;
  status?: AttendanceStatus;
}

export type CreateAttendance = Omit<Attendance, 'id'>
export type UpdateAttendance = Omit<Attendance, 'id'>
