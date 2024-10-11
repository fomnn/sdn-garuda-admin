import AddSubjectSheet from '@/components/app/subject/add-subject-sheet'
import { useGetAllSubjects } from '@/services/subject-service'
import { Heading, Table } from '@radix-ui/themes'
import { createFileRoute } from '@tanstack/react-router'
import clsx from 'clsx'

export const Route = createFileRoute('/subjects/')({
  component: SubjectsPage,
})

function SubjectsPage() {
  const { data: subjects, isLoading: subjectsLoading } = useGetAllSubjects()
  return (
    <div className="flex gap-6 overflow-hidden">
      <div
        className={clsx('flex flex-col gap-6 w-full transition-all duration-300', {})}
      >
        <div className="flex justify-between">
          <Heading>Daftar Mata Pelajaran</Heading>
          <div className="flex items-center gap-3">
            {/* <Link to="/parents/add">
          <Button>Tambah Orang Tua Siswa</Button>
        </Link> */}
            <AddSubjectSheet />
          </div>
        </div>
        <Table.Root variant="surface">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Pelajaran</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Kelas</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {subjectsLoading
              ? (
                  <Table.Row>
                    <Table.Cell colSpan={4}>loading...</Table.Cell>
                  </Table.Row>
                )
              : subjects && subjects.map(subject => (
                <Table.Row key={subject._id}>
                  <Table.RowHeaderCell>{subject.subject_name}</Table.RowHeaderCell>
                  <Table.Cell>{subject.grade}</Table.Cell>
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
