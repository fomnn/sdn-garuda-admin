import { useGetAllStudents } from '@/api/student-api'
import AddStudentSheet from '@/components/app/student/add-student-sheet'
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
              <Table.ColumnHeaderCell>NISN</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {isLoading
              ? (
                  <Table.Row>
                    <Table.Cell colSpan={4}>loading...</Table.Cell>
                  </Table.Row>
                )
              : data!.length > 0
                ? data!.map((student) => {
                  return (
                    <Table.Row key={student.id}>
                      <Table.RowHeaderCell>{student.nama}</Table.RowHeaderCell>
                      <Table.Cell>{student.jenis_kelamin}</Table.Cell>
                      <Table.Cell>{student.NISN}</Table.Cell>
                    </Table.Row>
                  )
                })
                : (
                    <Table.Row>
                      <Table.Cell colSpan={4}>Tidak ada data</Table.Cell>
                    </Table.Row>
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
