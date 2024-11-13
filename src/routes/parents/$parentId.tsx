import type { UpdateParentData } from '@/types/Parent'
import { useGetParentById } from '@/api/parent-api'
import { useGetStudentsByParentId } from '@/api/student-api'
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
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/parents/$parentId')({
  component: ParentChildrenPage,
})

function ParentChildrenPage() {
  const { toast } = useToast()
  const { parentId } = Route.useParams()
  const router = useRouter()

  const { data: students, isLoading: studentsLoading } = useGetStudentsByParentId(Number.parseInt(parentId))
  const { data: parent, isLoading: parentLoading } = useGetParentById(Number.parseInt(parentId))

  const [data, setData] = useState<UpdateParentData>({
    nama: '',
    email: '',
    jenjang_pendidikan: '',
    NIK: '',
    pekerjaan: '',
    penghasilan: '',
    tahun_lahir: 0,
  })

  function handleUpdate() {

  }

  function handleDelete() {

  }

  useEffect(() => {
    if (parent) {
      setData({
        nama: parent.nama,
        email: parent.email,
        jenjang_pendidikan: parent.jenjang_pendidikan,
        NIK: parent.NIK,
        pekerjaan: parent.pekerjaan,
        penghasilan: parent.penghasilan,
        tahun_lahir: parent.tahun_lahir ?? 2000,
      })
    }
  }, [parent])

  return (
    <div className="flex gap-6">
      <div className="flex flex-col gap-6 w-full transition-all duration-300">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Button variant="secondary" asChild size="icon" color="gray">
              <Link to="/parents">
                <Icon icon="solar:alt-arrow-left-linear"></Icon>
              </Link>
            </Button>
            <Heading>Detail Orang tua</Heading>
          </div>
          <div className="flex items-center gap-3">
            {/* <AddTeacherSheet /> */}
          </div>
        </div>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{parent?.nama}</CardTitle>
              <CardDescription>
                Anda dapat meng-update data siswa atau menghapusnya. Siswa yang
                telah dihapus tidak dapat dikembalikan.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid w-full max-w-xl items-center gap-1.5">
                  <Label htmlFor="fullname">Nama lengkap</Label>
                  <Input
                    value={data.nama}
                    onChange={e =>
                      setData(d => ({ ...d, nama: e.target.value }))}
                    className="bg-white"
                    type="text"
                    id="fullname"
                    placeholder="nama lengkap"
                  />
                </div>
                <div className="grid w-full max-w-xl items-center gap-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    value={data.email}
                    onChange={e =>
                      setData(d => ({ ...d, email: e.target.value }))}
                    className="bg-white"
                    type="email"
                    id="email"
                    placeholder="email"
                  />
                </div>
                <div className="grid w-full max-w-xl items-center gap-1.5">
                  <Label htmlFor="jenjang_pendidikan">Jenjang pendidikan</Label>
                  <Input
                    value={data.jenjang_pendidikan}
                    onChange={e =>
                      setData(d => ({ ...d, jenjang_pendidikan: e.target.value }))}
                    className="bg-white"
                    type="text"
                    id="jenjang_pendidikan"
                    placeholder="jenjang pendidikan"
                  />
                </div>
                <div className="grid w-full max-w-xl items-center gap-1.5">
                  <Label htmlFor="nik">NIK</Label>
                  <Input
                    value={data.NIK}
                    onChange={e =>
                      setData(d => ({ ...d, NIK: e.target.value }))}
                    className="bg-white"
                    type="text"
                    id="nik"
                    placeholder="NIK"
                  />
                </div>
                <div className="grid w-full max-w-xl items-center gap-1.5">
                  <Label htmlFor="pekerjaan">Pekerjaan</Label>
                  <Input
                    value={data.pekerjaan}
                    onChange={e =>
                      setData(d => ({ ...d, pekerjaan: e.target.value }))}
                    className="bg-white"
                    type="text"
                    id="pekerjaan"
                    placeholder="pekerjaan"
                  />
                </div>
                <div className="grid w-full max-w-xl items-center gap-1.5">
                  <Label htmlFor="penghasilan">Penghasilan</Label>
                  <Input
                    value={data.penghasilan}
                    onChange={e =>
                      setData(d => ({ ...d, penghasilan: e.target.value }))}
                    className="bg-white"
                    type="text"
                    id="penghasilan"
                    placeholder="penghasilan"
                  />
                </div>
                <div className="grid w-full max-w-xl items-center gap-1.5">
                  <Label htmlFor="tahun_lahir">Tahun lahir</Label>
                  <Input
                    value={data.tahun_lahir}
                    onChange={e =>
                      setData(d => ({ ...d, tahun_lahir: Number.parseInt(e.target.value) }))}
                    className="bg-white"
                    type="number"
                    id="tahun_lahir"
                    placeholder="tahun lahir"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex justify-end w-full gap-4">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline">Hapus</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Apakah Anda benar-benar yakin?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Tindakan ini tidak dapat dibatalkan. Tindakan ini akan
                        menghapus siswa secara permanen dan menghapus data siswa
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
                      <AlertDialogTitle>Update data siswa?</AlertDialogTitle>
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
          <Card>
            <CardHeader>
              <CardTitle>Daftar anak</CardTitle>
              {/* <CardDescription>
              Anda dapat meng-update data siswa atau menghapusnya. Siswa yang
              telah dihapus tidak dapat dikembalikan.
            </CardDescription> */}
            </CardHeader>
            <CardContent>
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
                    : students!.length > 0
                      ? students!.map((student) => {
                        return (
                          <StudentTableRow student={student} key={student.id} />
                        )
                      })
                      : (
                          <Table.Row>
                            <Table.Cell colSpan={4}>Tidak ada data</Table.Cell>
                          </Table.Row>
                        )}
                </Table.Body>
              </Table.Root>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
