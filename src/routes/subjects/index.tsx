import { useGetAllSubjects } from '@/api/subject-api'
import AddSubjectSheet from '@/components/app/subject/add-subject-sheet'
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
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {subjectsLoading
              ? (
                  <Table.Row>
                    <Table.Cell colSpan={4}>loading...</Table.Cell>
                  </Table.Row>
                )
              : subjects && subjects.length > 0
                ? subjects.map(subject => (
                  <Table.Row key={subject.id}>
                    <Table.RowHeaderCell>{subject.subject_name}</Table.RowHeaderCell>
                  </Table.Row>
                ))
                : (
                    <Table.Row>
                      <Table.Cell colSpan={4}>Tidak ada data</Table.Cell>
                    </Table.Row>
                  )}
          </Table.Body>
        </Table.Root>
      </div>
    </div>
  )
}
