import type { CreateStudentData } from '@/types/Student'
import type { CreateTeacherData } from '@/types/Teacher'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { useGetAllParents } from '@/services/parent-service'
import { useCreateStudent } from '@/services/student-service'
import { useCreateTeacher } from '@/services/teacher-service'
import { Icon } from '@iconify/react'
import { Button, Callout } from '@radix-ui/themes'
import { useNavigate, useRouter } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

export default function AddStudentSheet() {
  const navigate = useNavigate()
  const router = useRouter()
  const [newStudentData, setNewStudentData] = useState<CreateStudentData & {
    relationship: 'father' | 'mother' | 'guardian'
  }>({
    first_name: '',
    middle_name: '',
    last_name: '',
    birth_date: '',
    gender: 'male',
    class_id: '',
    parent_id: '',
    relationship: 'father',
  })
  const { mutate: createStudent } = useCreateStudent()
  const { data: parents, isLoading: parentsLoading } = useGetAllParents()
  function handleSubmit() {
    createStudent(newStudentData)
  }

  const [isInputSuccess, setIsInputSuccess] = useState(false)

  function handleClose(open: boolean) {
    if (open)
      return

    setIsInputSuccess(false)

    setNewStudentData({
      first_name: '',
      middle_name: '',
      last_name: '',
      birth_date: '',
      gender: 'male',
      class_id: '',
      parent_id: '',
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
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col">
                  <label htmlFor="first_name">Nama Depan*</label>
                  <input
                    type="text"
                    id="first_name"
                    value={newStudentData.first_name}
                    onChange={e =>
                      setNewStudentData({
                        ...newStudentData,
                        first_name: e.target.value,
                      })}
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="middle_name">Nama Tengah</label>
                  <input
                    type="text"
                    value={newStudentData.middle_name}
                    onChange={e =>
                      setNewStudentData({
                        ...newStudentData,
                        middle_name: e.target.value,
                      })}
                    id="middle_name"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="last_name">Nama Belakang</label>
                  <input
                    type="text"
                    value={newStudentData.last_name}
                    onChange={e =>
                      setNewStudentData({
                        ...newStudentData,
                        last_name: e.target.value,
                      })}
                    id="last_name"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label htmlFor="gender">Jenis Kelamin</label>
                <select
                  id="gender"
                  value={newStudentData.gender}
                  onChange={e =>
                    setNewStudentData({
                      ...newStudentData,
                      gender: e.target.value as 'male' | 'female',
                    })}
                >
                  <option value="female">Perempuan</option>
                  <option value="male">Laki-laki</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="birth_date">Tanggal Lahir</label>
                <input
                  type="date"
                  value={newStudentData.birth_date}
                  onChange={e =>
                    setNewStudentData({ ...newStudentData, birth_date: e.target.value })}
                  id="birth_date"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="class2">Kelas</label>
                <select
                  id="class2"
                >
                  <option value="0">3A</option>
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
                      parent_id: e.target.value,
                    })}
                >
                  <option selected>Pilih Orang Tua/Wali</option>
                  {
                    parentsLoading
                      ? <div>Loading...</div>
                      : parents && parents.map((parent) => {
                        const parentFullName = parent.middle_name && parent.last_name
                          ? `${parent.first_name} ${parent.middle_name} ${parent.last_name}`
                          : parent.last_name
                            ? `${parent.first_name} ${parent.last_name}`
                            : parent.middle_name
                              ? `${parent.first_name} ${parent.middle_name}`
                              : parent.first_name
                        return (
                          <option value={parent._id} key={parent._id}>
                            {parentFullName}
                          </option>
                        )
                      })
                  }

                </select>
              </div>
              {newStudentData.parent_id && (
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
              )}

              {/* submit buuton */}
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
