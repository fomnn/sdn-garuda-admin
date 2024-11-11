import type { CreateTeacherData } from '@/types/Teacher'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { useCreateTeacher } from '@/api/teacher-api'
import { Icon } from '@iconify/react'
import { Button, Callout } from '@radix-ui/themes'
import { useNavigate, useRouter } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

export default function AddTeacherSheet() {
  const navigate = useNavigate()
  const router = useRouter()

  const [newTeacherData, setNewTeacherData] = useState<CreateTeacherData>({
    first_name: '',
    middle_name: '',
    last_name: '',
    email: '',
    gender: 'male',
    role: 'teacher',
    contact_number: '',
  })
  const [isInputSuccess, setIsInputSuccess] = useState(false)

  const { mutate: createTeacher } = useCreateTeacher()
  function handleSubmit() {
    createTeacher(newTeacherData, {
      onSuccess: () => {
        setIsInputSuccess(true)

        setNewTeacherData({
          first_name: '',
          middle_name: '',
          last_name: '',
          email: '',
          gender: 'male',
          role: 'teacher',
          contact_number: '',
        })
      },
    })
  }

  function handleClose(open: boolean) {
    if (open)
      return

    setIsInputSuccess(false)

    setNewTeacherData({
      first_name: '',
      middle_name: '',
      last_name: '',
      email: '',
      gender: 'male',
      role: 'teacher',
      contact_number: '',
    })
  }

  return (
    <Sheet onOpenChange={handleClose}>
      <SheetTrigger>
        <Button>Tambah Guru atau Staff</Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-5xl">
        <SheetHeader>
          <SheetTitle>Masukkan Data Guru/Staf</SheetTitle>
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
                    value={newTeacherData.first_name}
                    onChange={e => setNewTeacherData({ ...newTeacherData, first_name: e.target.value })}
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="middle_name">Nama Tengah</label>
                  <input
                    type="text"
                    value={newTeacherData.middle_name}
                    onChange={e => setNewTeacherData({ ...newTeacherData, middle_name: e.target.value })}
                    id="middle_name"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="last_name">Nama Belakang</label>
                  <input
                    type="text"
                    value={newTeacherData.last_name}
                    onChange={e => setNewTeacherData({ ...newTeacherData, last_name: e.target.value })}
                    id="last_name"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label htmlFor="gender">Jenis Kelamin</label>
                <select
                  id="gender"
                  value={newTeacherData.gender}
                  onChange={e => setNewTeacherData({ ...newTeacherData, gender: e.target.value as 'male' | 'female' })}
                >
                  <option value="female">Perempuan</option>
                  <option value="male">Laki-laki</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  value={newTeacherData.email}
                  onChange={e => setNewTeacherData({ ...newTeacherData, email: e.target.value })}
                  id="email"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="phone_number">No Telepon/Whatsapp</label>
                <input
                  type="text"
                  value={newTeacherData.contact_number}
                  onChange={e => setNewTeacherData({ ...newTeacherData, contact_number: e.target.value })}
                  id="phone_number"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="role">Role</label>
                <select
                  id="role"
                  value={newTeacherData.role}
                  onChange={e => setNewTeacherData({ ...newTeacherData, role: e.target.value as 'teacher' | 'staff' })}
                >
                  <option value="teacher">Teacher</option>
                  <option value="staff">Staff</option>
                </select>
              </div>

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
                <span>Berhasil menambahkan guru/staf, silahkan input data lagi jika masih ada guru yang perlu ditambahkan.</span>
              </div>
            )}
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>

  )
}
