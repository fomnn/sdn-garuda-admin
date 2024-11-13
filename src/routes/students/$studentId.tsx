import type {
  ChartConfig,
} from '@/components/ui/chart'
import type { UpdateStudentData } from '@/types/Student'
import { useGetAttendancesByStudentId } from '@/api/attendance-api'
import { useGetAllClass } from '@/api/class-api'
import { useGetParentsByStudentId } from '@/api/parent-api'
import { useDeleteStudent, useGetStudentById, useUpdateStudent } from '@/api/student-api'
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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { Input } from '@/components/ui/input'
import { Label as Label2 } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'
import { Icon } from '@iconify/react'
import { Heading, Table } from '@radix-ui/themes'

import { createFileRoute, Link, useRouter } from '@tanstack/react-router'
import { TrendingUp } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import * as React from 'react'
import { Label, Pie, PieChart } from 'recharts'

export const Route = createFileRoute('/students/$studentId')({
  component: DetailStudentPage,
})

function DetailStudentPage() {
  const { toast } = useToast()
  const { studentId } = Route.useParams()
  const router = useRouter()

  const { data: student } = useGetStudentById(Number.parseInt(studentId))
  const { data: classes } = useGetAllClass()
  const { data: parents, isLoading: parensLoading } = useGetParentsByStudentId(Number.parseInt(studentId))
  const { data: attendances } = useGetAttendancesByStudentId(Number.parseInt(studentId))
  const { mutate: updateStudent } = useUpdateStudent(Number.parseInt(studentId))
  const { mutate: deleteStudent } = useDeleteStudent(Number.parseInt(studentId))

  const [data, setData] = useState<UpdateStudentData>({
    nama: '',
    class_id: 0,
    jenis_kelamin: 'male',
    NISN: '',
  })

  const { attendancesCount, attendancesAbsentCount, attendancesExcusedCount, attendancesPresentCount } = useMemo(() => {
    if (!attendances) {
      return {
        attendancesCount: 0,
        attendancesPresentCount: 0,
        attendancesAbsentCount: 0,
        attendancesExcusedCount: 0,
      }
    }

    const attendancesPresentCount = attendances.filter(attendance => attendance.status === 'present').length
    const attendancesAbsentCount = attendances.filter(attendance => attendance.status === 'absent').length
    const attendancesExcusedCount = attendances.filter(attendance => attendance.status === 'excused').length
    const attendancesCount = attendances.length
    return {
      attendancesCount,
      attendancesPresentCount,
      attendancesAbsentCount,
      attendancesExcusedCount,
    }
  }, [attendances])

  const chartData = useMemo(() => ([
    { status: 'Hadir', count: attendancesPresentCount, fill: 'var(--color-hadir)' },
    { status: 'Absen', count: attendancesAbsentCount, fill: 'var(--color-absen)' },
    { status: 'Izin', count: attendancesExcusedCount, fill: 'var(--color-izin)' },
  ]), [attendances])
  const chartConfig = {
    absensi: {
      label: 'Absensi',
    },
    hadir: {
      label: 'Chrome',
      color: 'hsl(var(--chart-1))',
    },
    absen: {
      label: 'Safari',
      color: 'hsl(var(--chart-2))',
    },
    izin: {
      label: 'Firefox',
      color: 'hsl(var(--chart-3))',
    },
  } satisfies ChartConfig


  function handleUpdate() {
    updateStudent(data, {
      onSuccess: () => {
        toast({
          title: 'Berhasil meng-update data siswa',
        })
      },
    })
  }

  function handleDelete() {
    deleteStudent(null, {
      onSuccess: () => {
        toast({
          title: 'Berhasil menghapus data siswa',
        })
        router.history.go(-1)
      },
    })
  }

  useEffect(() => {
    if (student) {
      setData({
        nama: student.nama,
        class_id: student.class_id,
        jenis_kelamin: student.jenis_kelamin,
        NISN: student.NISN,
      })
    }
  }, [student])

  return (
    <div className="flex gap-6">
      <div className="flex flex-col gap-6 w-full transition-all duration-300">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Button variant="secondary" asChild size="icon" color="gray">
              <Link to="/students">
                <Icon icon="solar:alt-arrow-left-linear"></Icon>
              </Link>
            </Button>
            <Heading>Detail Siswa</Heading>
          </div>
          <div className="flex items-center gap-3">
            {/* <AddTeacherSheet /> */}
          </div>
        </div>
        <div className="space-y-6">

          <Card>
            <CardHeader>
              <CardTitle>Kehadiran</CardTitle>
              {/* <CardDescription>
                Anda dapat meng-update data siswa atau menghapusnya. Siswa yang
                telah dihapus tidak dapat dikembalikan.
              </CardDescription> */}
            </CardHeader>
            <CardContent>
              <div className="relative">
                <div className="absolute pl-4 pr-8 py-2 border rounded-md text-sm top-0 left-0">
                  <p className='font-medium'>
                    Total Absensi:
                    {' '}
                    {attendancesCount}
                  </p>
                  <p className='font-medium text-green-600'>
                    Total Hadir:
                    {' '}
                    {attendancesPresentCount}
                  </p>
                  <p className='font-medium text-red-600'>
                    Total Absen:
                    {' '}
                    {attendancesAbsentCount}
                  </p>
                  <p className='font-medium text-sky-600'>
                    Total Izin:
                    {' '}
                    {attendancesExcusedCount}
                  </p>
                </div>
                <ChartContainer
                  config={chartConfig}
                  className="mx-auto aspect-square max-h-[250px]"
                >
                  <PieChart>
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent hideLabel />}
                    />
                    <Pie
                      data={chartData}
                      dataKey="count"
                      nameKey="status"
                      innerRadius={60}
                      strokeWidth={5}
                    >
                      <Label
                        content={({ viewBox }) => {
                          if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                            return (
                              <text
                                x={viewBox.cx}
                                y={viewBox.cy}
                                textAnchor="middle"
                                dominantBaseline="middle"
                              >
                                <tspan
                                  x={viewBox.cx}
                                  y={viewBox.cy}
                                  className="fill-foreground text-3xl font-bold"
                                >
                                  {attendancesCount}
                                </tspan>
                                <tspan
                                  x={viewBox.cx}
                                  y={(viewBox.cy || 0) + 24}
                                  className="fill-muted-foreground"
                                >
                                  count
                                </tspan>
                              </text>
                            )
                          }
                        }}
                      />
                    </Pie>
                  </PieChart>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>{data.nama}</CardTitle>
              <CardDescription>
                Anda dapat meng-update data siswa atau menghapusnya. Siswa yang
                telah dihapus tidak dapat dikembalikan.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid w-full max-w-xl items-center gap-1.5">
                  <Label2 htmlFor="fullname">Nama lengkap</Label2>
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
                  <Label2 htmlFor="nisn">NISN</Label2>
                  <Input
                    value={data.NISN}
                    onChange={e =>
                      setData(d => ({ ...d, nisn: e.target.value }))}
                    className="bg-white"
                    type="text"
                    id="nisn"
                    placeholder="NISN"
                  />
                </div>
                <div className="grid w-full max-w-xl items-center gap-1.5">
                  <Label2 htmlFor="gender">Jenis kelamin</Label2>
                  {/* <Input value={teacher?.jenis_kelamin} className="bg-white" type="text" id="gender" placeholder="jenis kelamin" /> */}
                  <Select
                    value={data.jenis_kelamin}
                    onValueChange={e =>
                      setData(d => ({
                        ...d,
                        jenis_kelamin: e as 'male' | 'female',
                      }))}
                  >
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
                  <Label2 htmlFor="kelas">Kelas</Label2>
                  <Select
                    value={data.class_id.toString()}
                    onValueChange={e =>
                      setData(d => ({
                        ...d,
                        class_id: Number.parseInt(e),
                      }))}
                  >
                    <SelectTrigger className="">
                      <SelectValue placeholder="Theme" />
                    </SelectTrigger>
                    <SelectContent>
                      {
                        classes && classes.length > 0
                          ? classes.map(class2 => (
                            <SelectItem value={class2.id.toString()} key={class2.id}>{class2.class_name}</SelectItem>
                          ))
                          : (
                            <SelectItem value="female">Perempuan</SelectItem>
                          )
                      }
                      <SelectItem value="female">Perempuan</SelectItem>
                      <SelectItem value="male">Laki-laki</SelectItem>
                    </SelectContent>
                  </Select>
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
              <CardTitle>Orang tua</CardTitle>
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
                    <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Pekerjaan</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {parensLoading
                    ? (
                      <Table.Row>
                        <Table.Cell colSpan={4}>loading...</Table.Cell>
                      </Table.Row>
                    )
                    : parents!.length > 0
                      ? parents!.map((parent) => {
                        return (
                          <Table.Row key={parent.id}>
                            <Table.RowHeaderCell>
                              {parent.nama}
                            </Table.RowHeaderCell>
                            {/* <Table.Cell>{parent.middle_name}</Table.Cell>
                      <Table.Cell>{parent.last_name}</Table.Cell> */}
                            <Table.Cell>{parent.email}</Table.Cell>
                            <Table.Cell>{parent.pekerjaan}</Table.Cell>
                            <Table.Cell>
                              <Button size="sm" variant="secondary">
                                <Link to={`/parents/${parent.id}`}>
                                  Detail
                                </Link>
                              </Button>
                            </Table.Cell>
                          </Table.Row>
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
