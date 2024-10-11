import AddStudentSheet from '@/components/app/student/add-student-sheet'
import { useGetAllStudents } from '@/services/student-service'
import { Button, Heading, Table } from '@radix-ui/themes'
import { createFileRoute, Link } from '@tanstack/react-router'
import clsx from 'clsx'

export const Route = createFileRoute('/students/')({
  component: StudentsPage,
})

function StudentsPage() {
  const { data, isLoading } = useGetAllStudents()
  return (
    <div className="flex gap-6 overflow-hidden">
      <div
        className={clsx('flex flex-col gap-6 w-full transition-all duration-300', {
        // 'w-full': !showVariant,
        // 'w-4/6': showVariant,
        })}
      >
        <div className="flex justify-between">
          <Heading>Daftar Siswa</Heading>
          <div className="flex items-center gap-3">
            {/* <Link to="/students/add">
              <Button>Tambah Siswa</Button>
            </Link> */}
            <AddStudentSheet />
          </div>
        </div>
        <Table.Root variant="surface">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Nama</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Jenis Kelamin</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Tanggal Lahir</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {isLoading
              ? (
                  <Table.Row>
                    <Table.Cell colSpan={4}>loading...</Table.Cell>
                  </Table.Row>
                )
              : data && data.map((student) => {
                const studentFullName = student.last_name && student.middle_name
                  ? `${student.first_name} ${student.middle_name} ${student.last_name}`
                  : student.last_name
                    ? `${student.first_name} ${student.last_name}`
                    : student.middle_name
                      ? `${student.first_name} ${student.middle_name}`
                      : student.first_name
                return (
                  <Table.Row key={student._id}>
                    <Table.RowHeaderCell>{studentFullName}</Table.RowHeaderCell>
                    <Table.Cell>{student.gender}</Table.Cell>
                    <Table.Cell>{new Date(student.birth_date).toLocaleDateString()}</Table.Cell>
                  </Table.Row>
                )
              },
              )}
          </Table.Body>
        </Table.Root>
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
