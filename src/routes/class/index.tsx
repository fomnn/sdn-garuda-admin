import AddClassSheet from '@/components/app/class/add-class-sheet'
import AddParentSheet from '@/components/app/parent/add-parent-sheet'
import { useGetAllClass } from '@/services/class-service'
import { Heading, Table } from '@radix-ui/themes'
import { createFileRoute } from '@tanstack/react-router'
import clsx from 'clsx'

export const Route = createFileRoute('/class/')({
  component: ClassPage,
})

function ClassPage() {
  const { data: classes, isLoading: classesLoading } = useGetAllClass()
  return (
    <div className="flex gap-6 overflow-hidden">
      <div
        className={clsx('flex flex-col gap-6 w-full transition-all duration-300', {})}
      >
        <div className="flex justify-between">
          <Heading>Daftar Kelas</Heading>
          <div className="flex items-center gap-3">
            <AddClassSheet />
          </div>
        </div>
        <Table.Root variant="surface">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Kelas</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Wali Kelas</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {classesLoading
              ? (
                  <Table.Row>
                    <Table.Cell colSpan={4}>loading...</Table.Cell>
                  </Table.Row>
                )
              : classes && classes.map(class2 => (
                <Table.Row key={class2._id}>
                  <Table.RowHeaderCell>{class2.class_name}</Table.RowHeaderCell>
                  <Table.Cell>{class2.teacher_id}</Table.Cell>
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
