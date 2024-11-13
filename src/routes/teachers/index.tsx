import { useGetAllTeachers } from '@/api/teacher-api'
import AddTeacherSheet from '@/components/app/teacher/add-teacher-sheet'
import { Button } from '@/components/ui/button'
import { Heading, Table } from '@radix-ui/themes'
import { createFileRoute, Link } from '@tanstack/react-router'
import clsx from 'clsx'

export const Route = createFileRoute('/teachers/')({
  component: TeachersPage,
})

function TeachersPage() {
  const { data, isLoading } = useGetAllTeachers()
  return (
    <div className="flex gap-6 overflow-hidden">
      <div
        className="flex flex-col gap-6 w-full transition-all duration-300"
      >
        <div className="flex justify-between">
          <Heading>Daftar Guru dan Staff</Heading>
          <div className="flex items-center gap-3">
            {/* <Link to="/teachers/add">
              <Button>Tambah Guru atau Staff</Button>
            </Link> */}
            <AddTeacherSheet />
          </div>
        </div>
        <Table.Root variant="surface">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Nama</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Jenis Kelamin</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>NIP</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Tanggal Lahir</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>NUPTK</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
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
                ? data!.map(teacher => (
                  <Table.Row key={teacher.id}>
                    <Table.RowHeaderCell>{teacher.nama}</Table.RowHeaderCell>
                    <Table.Cell>{teacher.email}</Table.Cell>
                    <Table.Cell>{teacher.jenis_kelamin}</Table.Cell>
                    <Table.Cell>{teacher.NIP}</Table.Cell>
                    <Table.Cell>{teacher.tanggal_lahir ? new Date(teacher.tanggal_lahir).toLocaleDateString() : '-'}</Table.Cell>
                    <Table.Cell>{teacher.NUPTK}</Table.Cell>
                    <Table.Cell>
                      <Button size="sm" variant="secondary" asChild>
                        <Link to={`/teachers/${teacher.id}`}>
                          Detail
                        </Link>
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))
                : (
                    <Table.Row>
                      <Table.Cell colSpan={4}>Belum ada data</Table.Cell>
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
