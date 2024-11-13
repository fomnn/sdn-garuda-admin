import type { Class } from '@/types/Class'
import { useGetTeacherById } from '@/api/teacher-api'
import { Button } from '@/components/ui/button'
import { Table } from '@radix-ui/themes'
import { Link } from '@tanstack/react-router'

interface ClassTableRowParameter {
  class2: Class
}

export default function ClassTableRow({ class2 }: ClassTableRowParameter) {
  const { data: teacher } = useGetTeacherById(class2.teacher_id)
  return (
    <Table.Row key={class2.id}>
      <Table.RowHeaderCell>{class2.class_name}</Table.RowHeaderCell>
      <Table.Cell>{teacher?.nama ?? ''}</Table.Cell>
      <Table.Cell>
        <Button size="sm" variant="secondary" asChild>
          <Link
            to={`/class/${class2.id}`}
          >
            Detail
          </Link>
        </Button>
      </Table.Cell>
    </Table.Row>
  )
}
