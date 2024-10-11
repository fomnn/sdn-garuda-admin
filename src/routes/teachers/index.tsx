import AddTeacherSheet from '@/components/app/teacher/add-teacher-sheet'
import { useGetAllTeachers } from '@/services/teacher-service'
import { Button, Heading, Table } from '@radix-ui/themes'
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
        className={clsx('flex flex-col gap-6 w-full transition-all duration-300', {})}
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
              <Table.ColumnHeaderCell>Nama Depan</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Nama Tengah</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Nama Belakang</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Role</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {isLoading
              ? (
                  <Table.Row>
                    <Table.Cell colSpan={4}>loading...</Table.Cell>
                  </Table.Row>
                )
              : data && data.map(teacher => (
                <Table.Row key={teacher._id}>
                  <Table.RowHeaderCell>{teacher.first_name}</Table.RowHeaderCell>
                  <Table.Cell>{teacher.middle_name}</Table.Cell>
                  <Table.Cell>{teacher.last_name}</Table.Cell>
                  <Table.Cell>{teacher.role}</Table.Cell>
                </Table.Row>
              ))}
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
