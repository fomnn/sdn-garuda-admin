import type { CreateParentData } from '@/types/Parent'
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

export default function AddParentSheet() {
  function handleSubmit() {
  }

  const [newParentData, setNewParentData] = useState<CreateParentData>({
    first_name: '',
    middle_name: '',
    last_name: '',
    email: '',
    gender: 'male',
    address: '',
    contact_number: '',
    occupation: '',
    dependents: [
      {
        student_id: '',
        relationship: 'father',
      },
    ],
  })
  const [isInputSuccess, setIsInputSuccess] = useState(false)

  // function handleSubmit() {
  //   createTeacher(newTeacherData, {
  //     onSuccess: () => {
  //       setIsInputSuccess(true)
  //     },
  //   })
  // }

  function handleClose(open: boolean) {
    if (open)
      return
    console.log('bejir')

    setIsInputSuccess(false)

    setNewParentData({
      first_name: '',
      middle_name: '',
      last_name: '',
      email: '',
      gender: 'male',
      address: '',
      contact_number: '',
      occupation: '',
      dependents: [
        {
          student_id: '',
          relationship: 'father',
        },
      ],
    })
  }

  function addDependent() {
    setNewParentData({
      ...newParentData,
      dependents: [
        ...newParentData.dependents,
        {
          student_id: '',
          relationship: 'father',
        },
      ],
    })
  }

  return (
    <Sheet onOpenChange={handleClose}>
      <SheetTrigger>
        <Button>Tambah Orang Tua</Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-5xl">
        <SheetHeader>
          <SheetTitle>Masukkan Data Orang Tua</SheetTitle>
          <SheetDescription>
            <div className="h-[calc(100vh-8rem)] overflow-y-auto">
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
                      value={newParentData.first_name}
                      onChange={e => setNewParentData({ ...newParentData, first_name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="middle_name">Nama Tengah</label>
                    <input
                      type="text"
                      value={newParentData.middle_name}
                      onChange={e => setNewParentData({ ...newParentData, middle_name: e.target.value })}
                      id="middle_name"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="last_name">Nama Belakang</label>
                    <input
                      type="text"
                      value={newParentData.last_name}
                      onChange={e => setNewParentData({ ...newParentData, last_name: e.target.value })}
                      id="last_name"
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="gender">Jenis Kelamin</label>
                  <select
                    id="gender"
                    value={newParentData.gender}
                    onChange={e => setNewParentData({ ...newParentData, gender: e.target.value as 'male' | 'female' })}
                  >
                    <option value="female">Perempuan</option>
                    <option value="male">Laki-laki</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    value={newParentData.email}
                    onChange={e => setNewParentData({ ...newParentData, email: e.target.value })}
                    id="email"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="contact_number">No Telepon/Whatsapp</label>
                  <input
                    type="text"
                    value={newParentData.contact_number}
                    onChange={e => setNewParentData({ ...newParentData, contact_number: e.target.value })}
                    id="contact_number"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="address">Alamat</label>
                  <input
                    type="text"
                    value={newParentData.address}
                    onChange={e => setNewParentData({ ...newParentData, address: e.target.value })}
                    id="address"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="occupation">Pekerjaan</label>
                  <input
                    type="text"
                    value={newParentData.occupation}
                    onChange={e => setNewParentData({ ...newParentData, occupation: e.target.value })}
                    id="occupation"
                  />
                </div>
                {newParentData.dependents.map((_, i) => (
                  <div className="flex flex-col gap-4" key={i}>
                    <div className="flex flex-col">
                      <label htmlFor={`child-${i}`}>
                        Anak/Anak Wali
                        {i > 0 ? i + 1 : ''}
                      </label>
                      <select
                        id={`child-${i}`}
                        value={newParentData.dependents[i].student_id}
                        onChange={e => setNewParentData({ ...newParentData, dependents: { ...newParentData.dependents, [i]: { ...newParentData.dependents[i], student_id: e.target.value } } })}
                      >
                        <option value="fasdf">Bejir</option>
                      </select>
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor={`relationship-${i}`}>Hubungan</label>
                      <select
                        value={newParentData.dependents[i].relationship}
                        onChange={e => setNewParentData({ ...newParentData, dependents: { ...newParentData.dependents, [i]: { ...newParentData.dependents[i], relationship: e.target.value as 'father' | 'mother' | 'guardian' } } })}
                        id={`relationship-${i}`}
                      >
                        <option value="fdslkf">Ayah</option>
                      </select>
                    </div>
                  </div>
                ))}
                {/* submit buuton */}
                <div className="flex justify-between">
                  <button
                    type="button"
                    className="px-4 py-2 text-zinc-500 border rounded-md"
                    onClick={addDependent}
                  >
                    Tambah Anak/Anak Wali
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
            {isInputSuccess && (
              <div className="flex items-center gap-4 border border-green-700 bg-green-500/30 text-black px-5 py-2 rounded-md w-fit mt-6">
                <Icon icon="solar:check-circle-linear" />
                <span>Berhasil menambahkan orang tua, silahkan input data lagi jika masih ada data orang tua yang perlu ditambahkan.</span>
              </div>
            )}
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>

  )
}
