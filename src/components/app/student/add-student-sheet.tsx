import type { CreateStudentData } from '@/types/Student'
import { useGetAllClass } from '@/api/class-api'
import { useGetAllParents } from '@/api/parent-api'
import { useCreateStudent } from '@/api/student-api'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Icon } from '@iconify/react'
import { Label } from '@radix-ui/react-label'
import { useState } from 'react'

export default function AddStudentSheet() {
  const [newStudentData, setNewStudentData] = useState<CreateStudentData>({
    nama: '',
    class_id: 0,
    jenis_kelamin: 'male',
    NISN: '',
    parent_id: 0,
    relationship: 'father',
  })
  const { mutate: createStudent } = useCreateStudent()
  const { data: classes } = useGetAllClass()
  const { data: parents, isLoading: parentsLoading } = useGetAllParents()

  const [isInputSuccess, setIsInputSuccess] = useState(false)

  function handleSubmit() {
    createStudent(newStudentData)
  }
  function handleClose(open: boolean) {
    if (open)
      return

    setIsInputSuccess(false)

    setNewStudentData({
      nama: '',
      class_id: 0,
      jenis_kelamin: 'male',
      NISN: '',
      parent_id: 0,
      relationship: 'father',
    })
  }

  return (
    <Sheet onOpenChange={handleClose}>
      <SheetTrigger>
        <Button>Tambah Siswa</Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-5xl">
        <SheetHeader>
          <SheetTitle>Masukkan Data Siswa</SheetTitle>
          <SheetDescription>
            <form
              className="add-something-form space-y-4"
              onSubmit={(e) => {
                e.preventDefault()
                handleSubmit()
              }}
            >
              {/* name: text */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label htmlFor="fullname">Nama lengkap</label>
                  <input
                    type="text"
                    id="fullname"
                    value={newStudentData.nama}
                    onChange={e =>
                      setNewStudentData({
                        ...newStudentData,
                        nama: e.target.value,
                      })}
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="nisn">NISN</label>
                  <input
                    type="text"
                    value={newStudentData.NISN}
                    onChange={e =>
                      setNewStudentData({
                        ...newStudentData,
                        NISN: e.target.value,
                      })}
                    id="nisn"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label htmlFor="gender">Jenis Kelamin</label>
                <select
                  id="gender"
                  value={newStudentData.jenis_kelamin}
                  onChange={e =>
                    setNewStudentData({
                      ...newStudentData,
                      jenis_kelamin: e.target.value as 'male' | 'female',
                    })}
                >
                  <option value="female">Perempuan</option>
                  <option value="male">Laki-laki</option>
                </select>
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="kelas">Kelas</Label>
                <select
                  value={newStudentData.class_id.toString()}
                  onChange={e =>
                    setNewStudentData(d => ({
                      ...d,
                      class_id: Number.parseInt(e.target.value),
                    }))}
                >
                  {
                    classes && classes.length > 0
                      ? classes.map(class2 => (
                        <option value={class2.id.toString()} key={class2.id}>{class2.class_name}</option>
                      ))
                      : (
                          <option>-</option>
                        )
                  }
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="parent_id">Orang Tua/Wali</label>
                <select
                  id="parent_id"
                  value={newStudentData.parent_id}
                  onChange={e =>
                    setNewStudentData({
                      ...newStudentData,
                      parent_id: Number.parseInt(e.target.value),
                    })}
                >
                  <option selected>Pilih Orang Tua/Wali</option>
                  {
                    parentsLoading
                      ? <div>Loading...</div>
                      : parents && parents.map((parent) => {
                        return (
                          <option value={parent.id} key={parent.id}>
                            {parent.nama}
                          </option>
                        )
                      })
                  }
                </select>
              </div>
              {
                newStudentData.parent_id !== 0 && (
                  <div className="flex flex-col">
                    <label htmlFor="parent_id">Hubungan</label>
                    <select
                      id="parent_id"
                      value={newStudentData.relationship}
                      onChange={e =>
                        setNewStudentData({
                          ...newStudentData,
                          relationship: e.target.value as 'father' | 'mother' | 'guardian',
                        })}
                    >
                      <option disabled>Hubungan</option>
                      <option value="father">Ayah</option>
                      <option value="mother">Ibu</option>
                      <option value="guardian">Wali</option>
                    </select>
                  </div>
                )
              }

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  Submit
                </button>
              </div>
            </form>
            {isInputSuccess && (
              <div className="flex items-center gap-4 border border-green-700 bg-green-500/30 text-black px-5 py-2 rounded-md w-fit mt-6">
                <Icon icon="solar:check-circle-linear" />
                <span>Berhasil menambahkan siswa, silahkan input data lagi jika masih ada siswa yang perlu ditambahkan.</span>
              </div>
            )}
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>

  )
}
