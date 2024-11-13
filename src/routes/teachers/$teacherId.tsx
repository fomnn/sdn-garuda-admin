import type { UpdateTeacherData } from '@/types/Teacher'
import { useDeleteTeacher, useGetTeacherById, useUpdateTeacher } from '@/api/teacher-api'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'
import { Icon } from '@iconify/react'
import { Heading } from '@radix-ui/themes'
import { createFileRoute, Link, useRouter } from '@tanstack/react-router'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/teachers/$teacherId')({
  component: DetailTeacherPage,
})

function DetailTeacherPage() {
  const { toast } = useToast()
  const { teacherId } = Route.useParams()
  const router = useRouter()

  const { data: teacher } = useGetTeacherById(Number.parseInt(teacherId))
  const { mutate: updateTeacher } = useUpdateTeacher(Number.parseInt(teacherId))
  const { mutate: deleteTeacher } = useDeleteTeacher(Number.parseInt(teacherId))

  const [data, setData] = useState<UpdateTeacherData>({
    nama: '',
    email: '',
    jenis_kelamin: 'male',
    NIP: '',
    NUPTK: '',
    tanggal_lahir: new Date(),
  })

  function handleUpdate() {
    updateTeacher(data, {
      onSuccess: () => {
        toast({
          title: 'Berhasil meng-update data guru',
        })
      },
    })
  }

  function handleDelete() {
    deleteTeacher(null, {
      onSuccess: () => {
        toast({
          title: 'Berhasil menghapus data guru',
        })
        router.history.go(-1)
      },
    })
  }

  useEffect(() => {
    if (teacher) {
      setData({
        nama: teacher.nama,
        email: teacher.email,
        jenis_kelamin: teacher.jenis_kelamin,
        NIP: teacher.NIP,
        NUPTK: teacher.NUPTK,
        tanggal_lahir: teacher.tanggal_lahir ? new Date(teacher.tanggal_lahir) : new Date(),
      })
    }
  }, [teacher])

  return (
    <div className="flex gap-6">
      <div
        className="flex flex-col gap-6 w-full transition-all duration-300"
      >
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Button variant="secondary" asChild size="icon" color="gray">
              <Link to="/teachers">
                <Icon icon="solar:alt-arrow-left-linear"></Icon>
              </Link>
            </Button>
            <Heading>Detail Guru</Heading>
          </div>
          <div className="flex items-center gap-3">
            {/* <AddTeacherSheet /> */}
          </div>
        </div>
        <div className="">
          <Card>
            <CardHeader>
              <CardTitle>{data.nama}</CardTitle>
              <CardDescription>Anda dapat meng-update data guru atau menghapusnya. Guru yang telah dihapus tidak dapat dikembalikan.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid w-full max-w-xl items-center gap-1.5">
                  <Label htmlFor="fullname">Nama lengkap</Label>
                  <Input value={data.nama} onChange={e => setData(d => ({ ...d, nama: e.target.value }))} className="bg-white" type="text" id="fullname" placeholder="nama lengkap" />
                </div>
                <div className="grid w-full max-w-xl items-center gap-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input value={data.email} onChange={e => setData(d => ({ ...d, email: e.target.value }))} className="bg-white" type="email" id="email" placeholder="email" />
                </div>
                <div className="grid w-full max-w-xl items-center gap-1.5">
                  <Label htmlFor="gender">Jenis kelamin</Label>
                  {/* <Input value={teacher?.jenis_kelamin} className="bg-white" type="text" id="gender" placeholder="jenis kelamin" /> */}
                  <Select value={data.jenis_kelamin} onValueChange={e => setData(d => ({ ...d, jenis_kelamin: e as 'male' | 'female' }))}>
                    <SelectTrigger className="">
                      <SelectValue placeholder="Theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="female">Perempuan</SelectItem>
                      <SelectItem value="male">Laki-laki</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid w-full max-w-xl items-center gap-1.5">
                  <Label htmlFor="birth_date">Tanggal lahir</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        color="gray"
                        className={cn(
                          'w-full justify-start text-left font-normal',
                          !data.tanggal_lahir && 'text-muted-foreground',
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {data.tanggal_lahir ? format(data.tanggal_lahir, 'PPP') : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={data.tanggal_lahir}
                        onSelect={e => setData((d) => {
                          if (!e)
                            return d
                          return {
                            ...d,
                            tanggal_lahir: new Date(Date.UTC(e.getFullYear(), e.getMonth(), e.getDate())),
                          }
                        })}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="grid w-full max-w-xl items-center gap-1.5">
                  <Label htmlFor="nip">NIP</Label>
                  <Input value={data.NIP} onChange={e => setData(d => ({ ...d, NIP: e.target.value }))} className="bg-white" type="number" id="nip" placeholder="NIP" />
                </div>
                <div className="grid w-full max-w-xl items-center gap-1.5">
                  <Label htmlFor="nuptk">NUPTK</Label>
                  <Input value={data.NUPTK} onChange={e => setData(d => ({ ...d, NUPTK: e.target.value }))} className="bg-white" type="number" id="nuptk" placeholder="NUPTK" />
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
                      <AlertDialogTitle>Apakah Anda benar-benar yakin?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Tindakan ini tidak dapat dibatalkan. Tindakan ini akan menghapus guru secara permanen dan menghapus data guru Anda dari database.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Batal</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDelete}>Hapus</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="default">Update</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Update data guru?</AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Batal</AlertDialogCancel>
                      <AlertDialogAction onClick={handleUpdate}>Update</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
