import type { CreateTeacherData } from '@/types/Teacher'
import { useCreateTeacher } from '@/api/teacher-api'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Icon } from '@iconify/react'
import { useState } from 'react'

export default function AddTeacherSheet() {
  const [newTeacherData, setNewTeacherData] = useState<CreateTeacherData>({
    email: '',
    jenis_kelamin: 'male',
    nama: '',
    NIP: '',
    NUPTK: '',
    tanggal_lahir: new Date(),
  })
  const [isInputSuccess, setIsInputSuccess] = useState(false)

  const { mutate: createTeacher } = useCreateTeacher()
  function handleSubmit() {
    createTeacher(newTeacherData, {
      onSuccess: () => {
        setIsInputSuccess(true)

        setNewTeacherData({
          email: '',
          jenis_kelamin: 'male',
          nama: '',
          NIP: '',
          NUPTK: '',
          tanggal_lahir: new Date(),
        })
      },
    })
  }

  function handleClose(open: boolean) {
    if (open)
      return

    setIsInputSuccess(false)

    setNewTeacherData({
      email: '',
      jenis_kelamin: 'male',
      nama: '',
      NIP: '',
      NUPTK: '',
      tanggal_lahir: new Date(),
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
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label htmlFor="full_name">Nama Lengkap</label>
                  <input
                    type="text"
                    id="full_name"
                    value={newTeacherData.nama}
                    onChange={e => setNewTeacherData({ ...newTeacherData, nama: e.target.value })}
                    required
                  />
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
              </div>
              <div className="flex flex-col">
                <label htmlFor="gender">Jenis Kelamin</label>
                <select
                  id="gender"
                  value={newTeacherData.jenis_kelamin}
                  onChange={e => setNewTeacherData({ ...newTeacherData, jenis_kelamin: e.target.value as 'male' | 'female' })}
                >
                  <option value="female">Perempuan</option>
                  <option value="male">Laki-laki</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="nip">NIP</label>
                <input
                  type="text"
                  value={newTeacherData.NIP}
                  onChange={e => setNewTeacherData({ ...newTeacherData, NIP: e.target.value })}
                  id="nip"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="nuptk">NUPTK</label>
                <input
                  type="text"
                  value={newTeacherData.NUPTK}
                  onChange={e => setNewTeacherData({ ...newTeacherData, NUPTK: e.target.value })}
                  id="nuptk"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="tanggal_lahir">Tanggal lahir</label>
                <p>{newTeacherData.tanggal_lahir?.toISOString()}</p>
                <input
                  type="date"
                  value={newTeacherData.tanggal_lahir?.toISOString().split('T')[0]}
                  onChange={e => setNewTeacherData({ ...newTeacherData, tanggal_lahir: new Date(e.target.value) })}
                  id="tanggal_lahir"
                />
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
