import type { Student } from '@/types/Student'
import { useGetClassById } from '@/api/class-api'
import { Button } from '@/components/ui/button'
import { Table } from '@radix-ui/themes'
import { Link } from '@tanstack/react-router'

interface StudentTableRowParameter {
  student: Student
}

export default function StudentTableRow({ student }: StudentTableRowParameter) {
  const { data: classData, isLoading: classLoading } = useGetClassById(student.class_id)

  if (classLoading) {
    <Table.Row key={student.id}>
      <Table.Cell colSpan={4}>{student.jenis_kelamin}</Table.Cell>
    </Table.Row>
  }
  return (
    <Table.Row key={student.id}>
      <Table.RowHeaderCell>{student.nama}</Table.RowHeaderCell>
      <Table.Cell>{student.jenis_kelamin === 'male' ? 'Laki-laki' : 'perempuan'}</Table.Cell>
      <Table.Cell>{student.NISN}</Table.Cell>
      <Table.Cell>{classData?.class_name ?? student.id}</Table.Cell>
      <Table.Cell>
        <Button size="sm" variant="secondary" asChild>
          <Link to={`/students/${student.id}`}>
            Detail
          </Link>
        </Button>
      </Table.Cell>
    </Table.Row>
  )
}
