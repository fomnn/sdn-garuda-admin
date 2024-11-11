import { useGetAllParents } from '@/api/parent-api'
import AddParentSheet from '@/components/app/parent/add-parent-sheet'
import ParentChildrenCard from '@/components/app/parent/parent-children-card'
import { Icon } from '@iconify/react'
import { Box, Button, Card, Heading, Separator, Table } from '@radix-ui/themes'
import { createFileRoute, Link } from '@tanstack/react-router'
import clsx from 'clsx'
import { useState } from 'react'

export const Route = createFileRoute('/parents/')({
  component: ParentsPage,
})

function ParentsPage() {
  const [showChildren, setShowChildren] = useState(false)
  const { isLoading, data: parents } = useGetAllParents()
  const [selectedParentId, setSelectedParentId] = useState<number | null>()

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
        <div className="gap-6 flex overflow-hidden">
          <div className={clsx('transition-all duration-700', {
            'w-4/6': showChildren,
            'w-full': !showChildren,
          })}
          >
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
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedParentId(parent.id)
                            setShowChildren(true)
                          }}
                          className={clsx('px-3 py-1 text-xs transition-opacity duration-300 rounded-md border border-zinc-300', {
                            'opacity-0': selectedParentId === parent.id,
                          })}
                        >
                          Lihat Anak/Anak Wali
                        </button>
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
          {selectedParentId && <ParentChildrenCard
            showChildren={showChildren}
            clodeCard={() => {
              setShowChildren(false)
              setSelectedParentId(null)
            }}
            parentId={selectedParentId}
          />}
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
