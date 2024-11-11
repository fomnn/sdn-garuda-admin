import type { Class } from '@/types/Class'
import { useGetTeacherById } from '@/api/teacher-api'
import { Table } from '@radix-ui/themes'

interface ClassRowParameter {
  class2: Class
}

export default function ClassRow({ class2 }: ClassRowParameter) {
  const { data: teacher } = useGetTeacherById(class2.teacher_id)
  return (
    <Table.Row key={class2.id}>
      <Table.RowHeaderCell>{class2.class_name}</Table.RowHeaderCell>
      <Table.Cell>{teacher?.nama ?? ''}</Table.Cell>
    </Table.Row>
  )
}
