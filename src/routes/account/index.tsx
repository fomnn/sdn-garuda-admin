import { useGetAllAccounts } from '@/api/account-api'
import AddTeacherSheet from '@/components/app/teacher/add-teacher-sheet'
import { Heading, Table } from '@radix-ui/themes'
import { createFileRoute } from '@tanstack/react-router'
import clsx from 'clsx'

export const Route = createFileRoute('/account/')({
  component: AccountsPage,
})

function AccountsPage() {
  const { data: accounts, isLoading } = useGetAllAccounts()
  return (
    <div className="flex gap-6 overflow-hidden">
      <div
        className={clsx('flex flex-col gap-6 w-full transition-all duration-300', {})}
      >
        <div className="flex justify-between">
          <Heading>Daftar Account</Heading>
          <div className="flex items-center gap-3">
            {/* <Link to="/teachers/add">
              <Button>Tambah Guru atau Staff</Button>
            </Link> */}
            {/* <AddTeacherSheet /> */}
          </div>
        </div>
        <Table.Root variant="surface">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Tipe</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>User</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {isLoading
              ? (
                  <Table.Row>
                    <Table.Cell colSpan={4}>loading...</Table.Cell>
                  </Table.Row>
                )
              : accounts!.length > 0
                ? accounts!.map(account => (
                  <Table.Row key={account.id}>
                    <Table.RowHeaderCell>{account.email}</Table.RowHeaderCell>
                    <Table.Cell>{account.type}</Table.Cell>
                    <Table.Cell>{account.user_id}</Table.Cell>
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
