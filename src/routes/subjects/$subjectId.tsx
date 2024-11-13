import type { UpdateSubject } from '@/types/Subject'
import { useDeleteSubject, useGetSubjectById, useUpdateSubject } from '@/api/subject-api'
import { useGetTeachersBySubjectId } from '@/api/teacher-api'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { Icon } from '@iconify/react'
import { Heading, Table } from '@radix-ui/themes'
import { createFileRoute, Link, useRouter } from '@tanstack/react-router'
import clsx from 'clsx'
import { Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/subjects/$subjectId')({
  component: SubjectTeachersPage,
})

function SubjectTeachersPage() {
  const { toast } = useToast()
  const router = useRouter()
  const { subjectId } = Route.useParams()

  const { data: teachers, isLoading } = useGetTeachersBySubjectId(Number.parseInt(subjectId))
  const { data: subject } = useGetSubjectById(Number.parseInt(subjectId))
  const { mutate: updateSubject } = useUpdateSubject(Number.parseInt(subjectId))
  const { mutate: deleteSubject, isPending: deletePending } = useDeleteSubject(Number.parseInt(subjectId))

  const [subjectData, setSubjectData] = useState<UpdateSubject>({
    subject_name: '',
  })

  function handleUpdate() {
    updateSubject(subjectData, {
      onSuccess: () => {
        toast({
          title: 'Berhasil meng-update data mata pelajaran',
        })
      },
    })
  }

  function handleDelete() {
    deleteSubject(null, {
      onSuccess: () => {
        router.history.go(-1)
        toast({
          title: 'Berhasil menghapus data mata pelajaran',
        })
      },
    })
  }

  useEffect(() => {
    if (subject) {
      setSubjectData({
        subject_name: subject.subject_name,
      })
    }
  }, [subject])

  return (
    <div className="flex gap-6 overflow-hidden">
      <div
        className={clsx('flex flex-col gap-6 w-full transition-all duration-300', {})}
      >
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Button
              asChild
              variant="secondary"
              size="icon"
              color="gray"
            >
              <Link to="/subjects">
                <Icon icon="solar:alt-arrow-left-linear"></Icon>
              </Link>
            </Button>
            <Heading>
              Daftar guru
              {' '}
              {subject?.subject_name}
            </Heading>
          </div>
          <div className="flex items-center gap-3">
          </div>
        </div>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{subject?.subject_name}</CardTitle>
              <CardDescription>
                Anda dapat meng-update data siswa atau menghapusnya. Siswa yang
                telah dihapus tidak dapat dikembalikan.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid w-full max-w-xl items-center gap-1.5">
                <Label htmlFor="name">Nama mata pelajaran</Label>
                <Input
                  value={subjectData.subject_name}
                  onChange={e =>
                    setSubjectData(d => ({ ...d, subject_name: e.target.value }))}
                  className="bg-white"
                  type="text"
                  id="name"
                  placeholder="nama lengkap"
                />
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex justify-end w-full gap-4">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" disabled={deletePending}>
                      {deletePending
                        ? (
                            <>
                              <Loader2 className="animate-spin" />
                              Please wait
                            </>
                          )
                        : 'Hapus'}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Apakah Anda benar-benar yakin?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Tindakan ini tidak dapat dibatalkan. Tindakan ini akan
                        menghapus mata pelajaran secara permanen dan menghapus data mata pelajaran
                        Anda dari database.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Batal</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDelete}>
                        Hapus
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="default">Update</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Update data mata pelajaran?</AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Batal</AlertDialogCancel>
                      <AlertDialogAction onClick={handleUpdate}>
                        Update
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardFooter>
          </Card>
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
                : teachers!.length > 0
                  ? teachers!.map(teacher => (
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
