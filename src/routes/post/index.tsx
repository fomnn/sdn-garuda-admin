import { useGetAllPosts } from '@/api/post-api'
import { Heading, Table } from '@radix-ui/themes'
import { createFileRoute } from '@tanstack/react-router'
import clsx from 'clsx'

export const Route = createFileRoute('/post/')({
  component: PostsPage,
})

function PostsPage() {
  const { data:posts, isLoading } = useGetAllPosts()
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
            <Table.ColumnHeaderCell>Judul</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Image</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Dibuat pada</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {isLoading
            ? (
                <Table.Row>
                  <Table.Cell colSpan={4}>loading...</Table.Cell>
                </Table.Row>
              )
            : posts!.length > 0
              ? posts!.map(post => (
                <Table.Row key={post.id}>
                  <Table.RowHeaderCell>{post.title}</Table.RowHeaderCell>
                  <Table.Cell>{post.image_path}</Table.Cell>
                  <Table.Cell>{post.created_at}</Table.Cell>
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
