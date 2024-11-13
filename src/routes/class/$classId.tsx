import type { UpdateClass } from '@/types/Class'
import { useDeleteClass, useGetClassById, useUpdateClass } from '@/api/class-api'
import { useGetStudentsByClassId } from '@/api/student-api'
import StudentTableRow from '@/components/app/student/student-table-row'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { Icon } from '@iconify/react'
import { Heading, Table } from '@radix-ui/themes'
import { createFileRoute, Link, useRouter } from '@tanstack/react-router'
import { Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/class/$classId')({
  component: ClassStudentsPage,
})

function ClassStudentsPage() {
  const { toast } = useToast()
  const router = useRouter()
  const { classId } = Route.useParams()

  const { data: students, isLoading: studentsLoading } = useGetStudentsByClassId(Number.parseInt(classId))
  const { data: classData, isLoading: classLoading } = useGetClassById(Number.parseInt(classId))
  const { mutate: deleteClass, isPending: deletePending } = useDeleteClass(Number.parseInt(classId))
  const { mutate: updateClass } = useUpdateClass(Number.parseInt(classId))

  const [classData2, setClassData2] = useState<UpdateClass>({
    teacher_id: 0,
    class_name: '',
  })

  function handleUpdate() {
    updateClass(classData2, {
      onSuccess: () => {
        toast({
          title: 'Berhasil meng-update data kelas',
        })
      },
    })
  }

  function handleDelete() {
    deleteClass(null, {
      onSuccess: () => {
        router.history.go(-1)
        toast({
          title: 'Berhasil menghapus data kelas',
        })
      },
    })
  }

  useEffect(() => {
    if (classData) {
      setClassData2({
        teacher_id: classData.teacher_id ?? 0,
        class_name: classData.class_name,
      })
    }
  }, [classData])

  return (
    <div className="flex gap-6 overflow-hidden">
      <div
        className="flex flex-col gap-6 w-full transition-all duration-300"
      >
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Button variant="secondary" asChild size="icon" color="gray">
              <Link to="/class">
                <Icon icon="solar:alt-arrow-left-linear"></Icon>
              </Link>
            </Button>
            <Heading>
              Daftar siswa kelas
              {' '}
              {classData2?.class_name}
            </Heading>
          </div>
          <div className="flex items-center gap-3">
          </div>
        </div>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{classData2?.class_name}</CardTitle>
              <CardDescription>
                Anda dapat meng-update data siswa atau menghapusnya. Siswa yang
                telah dihapus tidak dapat dikembalikan.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid w-full max-w-xl items-center gap-1.5">
                <Label htmlFor="name">Nama kelas</Label>
                <Input
                  value={classData2.class_name}
                  onChange={e =>
                    setClassData2(d => ({ ...d, class_name: e.target.value }))}
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
                        menghapus kelas secara permanen dan menghapus data kelas
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
                      <AlertDialogTitle>Update data kelas?</AlertDialogTitle>
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
                <Table.ColumnHeaderCell>Jenis Kelamin</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>NISN</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Kelas</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {studentsLoading
                ? (
                    <Table.Row>
                      <Table.Cell colSpan={4}>loading...</Table.Cell>
                    </Table.Row>
                  )
                : students && students.length > 0
                  ? students.map(student => (
                    <StudentTableRow student={student} key={student.id} />
                  ))
                  : (
                      <Table.Row>
                        <Table.Cell colSpan={6}>Tidak ada data</Table.Cell>
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
