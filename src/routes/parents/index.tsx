import { useGetAllParents } from '@/api/parent-api'
import AddParentSheet from '@/components/app/parent/add-parent-sheet'
import { Button } from '@/components/ui/button'
import { Icon } from '@iconify/react'
import { Heading, Table } from '@radix-ui/themes'
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
            <AddParentSheet />
          </div>
        </div>
        <div className="transition-all duration-700">
          <Table.Root variant="surface">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>Nama</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Pekerjaan</Table.ColumnHeaderCell>
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
                : parents && parents.length > 0 ? parents.map(parent => (
                  <Table.Row key={parent.id}>
                    <Table.RowHeaderCell>
                      {parent.nama}
                    </Table.RowHeaderCell>
                    {/* <Table.Cell>{parent.middle_name}</Table.Cell>
                      <Table.Cell>{parent.last_name}</Table.Cell> */}
                    <Table.Cell>{parent.email}</Table.Cell>
                    <Table.Cell>{parent.pekerjaan}</Table.Cell>
                    <Table.Cell>
                      <Button size="sm" variant="secondary" asChild>
                        <Link
                          to={`/parents/${parent.id}`}
                        >
                          Detail
                        </Link>
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                )) : (
                  <Table.Row>
                    <Table.Cell colSpan={6}>Tidak ada data</Table.Cell>
                  </Table.Row>
                )}
            </Table.Body>
          </Table.Root>
        </div>
      </div>
    </div>
  )
}
