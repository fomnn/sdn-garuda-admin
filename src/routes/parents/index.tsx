import AddParentSheet from '@/components/app/parent/add-parent-sheet'
import { useGetAllParents } from '@/services/parent-service'
import { Button, Heading, Table } from '@radix-ui/themes'
import { createFileRoute, Link } from '@tanstack/react-router'
import clsx from 'clsx'

export const Route = createFileRoute('/parents/')({
  component: ParentsPage,
})

function ParentsPage() {
  const { isLoading, data: parents } = useGetAllParents()

  return (
    <div className="flex gap-6 overflow-hidden">
      <div
        className={clsx('flex flex-col gap-6 w-full transition-all duration-300', {})}
      >
        <div className="flex justify-between">
          <Heading>Daftar Orang Tua Siswa</Heading>
          <div className="flex items-center gap-3">
            {/* <Link to="/parents/add">
              <Button>Tambah Orang Tua Siswa</Button>
            </Link> */}
            <AddParentSheet />
          </div>
        </div>
        <Table.Root variant="surface">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Nama Depan</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Nama Tengah</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Nama Belakang</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>No Telepon/Whatsapp</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Pekerjaan</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Alamat</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {isLoading
              ? (
                  <Table.Row>
                    <Table.Cell colSpan={4}>loading...</Table.Cell>
                  </Table.Row>
                )
              : parents && parents.map(parent => (
                <Table.Row key={parent._id}>
                  <Table.RowHeaderCell>{parent.first_name}</Table.RowHeaderCell>
                  <Table.Cell>{parent.middle_name}</Table.Cell>
                  <Table.Cell>{parent.last_name}</Table.Cell>
                  <Table.Cell>{parent.contact_number}</Table.Cell>
                  <Table.Cell>{parent.email}</Table.Cell>
                  <Table.Cell>{parent.occupation}</Table.Cell>
                  <Table.Cell>{parent.address}</Table.Cell>
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
