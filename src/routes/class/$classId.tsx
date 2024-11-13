import { useGetClassById } from '@/api/class-api'
import { useGetStudentsByClassId } from '@/api/student-api'
import StudentTableRow from '@/components/app/student/student-table-row'
import { Button } from '@/components/ui/button'
import { Icon } from '@iconify/react'
import { Heading, Table } from '@radix-ui/themes'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/class/$classId')({
  component: ClassStudentsPage,
})

function ClassStudentsPage() {
  const { classId } = Route.useParams()
  const { data: students, isLoading: studentsLoading } = useGetStudentsByClassId(Number.parseInt(classId))
  const { data: classData, isLoading: classLoading } = useGetClassById(Number.parseInt(classId))
  return (
    <div className="flex gap-6 overflow-hidden">
      <div
        className="flex flex-col gap-6 w-full transition-all duration-300"
      >
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Button variant="secondary" asChild size="icon" color="gray">
              <Link to="/class">
                <Icon icon="solar:alt-arrow-left-linear"></Icon>
              </Link>
            </Button>
            <Heading>
              Daftar siswa kelas
              {' '}
              {classData?.class_name}
            </Heading>
          </div>
          <div className="flex items-center gap-3">
            {/* <AddParentSheet /> */}
          </div>
        </div>
        <div className="transition-all duration-700">
          <Table.Root variant="surface">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>Nama</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Jenis Kelamin</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>NISN</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Kelas</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {studentsLoading
                ? (
                    <Table.Row>
                      <Table.Cell colSpan={4}>loading...</Table.Cell>
                    </Table.Row>
                  )
                : students && students.length > 0
                  ? students.map(student => (
                    <StudentTableRow student={student} key={student.id} />
                  ))
                  : (
                      <Table.Row>
                        <Table.Cell colSpan={6}>Tidak ada data</Table.Cell>
                      </Table.Row>
                    )}
            </Table.Body>
          </Table.Root>
        </div>
      </div>
      {/* <div className={clsx(
      'bg-white rounded-md p-4 transition-all duration-300',
      {
        'w-0 translate-x-[100%]': !showVariant,
        'block w-2/6': showVariant,
      },
    )}
    >
      Coming Soon
    </div> */}
    </div>
  )
}
