import type { CreateParent } from '@/types/Parent'
import { useCreateParent } from '@/api/parent-api'
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

export default function AddParentSheet() {
  const { mutate: createParent } = useCreateParent()

  const [newParentData, setNewParentData] = useState<CreateParent>({
    email: '',
    jenjang_pendidikan: '',
    tahun_lahir: 2000,
    penghasilan: '',
    nama: '',
    NIK: '',
    pekerjaan: '',
  })
  const [isInputSuccess, setIsInputSuccess] = useState(false)

  function handleSubmit() {
    createParent(newParentData, {
      onSuccess: () => {
        setIsInputSuccess(true)
        setNewParentData({
          nama: '',
          NIK: '',
          email: '',
          jenjang_pendidikan: '',
          tahun_lahir: 2000,
          pekerjaan: '',
          penghasilan: '',
        })
      },
    })
  }

  function handleClose(open: boolean) {
    if (open)
      return

    setIsInputSuccess(false)

    setNewParentData({
      nama: '',
      NIK: '',
      email: '',
      jenjang_pendidikan: '',
      tahun_lahir: 2000,
      pekerjaan: '',
      penghasilan: '',
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
            <div className="overflow-y-auto">
              <form
                className="add-something-form space-y-4"
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSubmit()
                }}
              >
                {/* name: text */}
                <div className="flex flex-col">
                  <label htmlFor="fullname">Nama lengkap</label>
                  <input
                    type="text"
                    id="fullname"
                    value={newParentData.nama}
                    onChange={e => setNewParentData({ ...newParentData, nama: e.target.value })}
                    required
                  />
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
                  <label htmlFor="nik">NIK</label>
                  <input
                    type="text"
                    value={newParentData.NIK}
                    onChange={e => setNewParentData({ ...newParentData, NIK: e.target.value })}
                    id="nik"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label htmlFor="tahun_lahir">Tahun lahir</label>
                    <input
                      type="number"
                      value={newParentData.tahun_lahir}
                      onChange={e => setNewParentData({ ...newParentData, tahun_lahir: Number.parseInt(e.target.value) })}
                      id="tahun_lahir"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="jenjang_pendidikan">Jenjang Pendidikan</label>
                    <input
                      type="text"
                      value={newParentData.jenjang_pendidikan}
                      onChange={e => setNewParentData({ ...newParentData, jenjang_pendidikan: e.target.value })}
                      id="jenjang_pendidikan"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label htmlFor="pekerjaan">Pekerjaan</label>
                    <input
                      type="text"
                      value={newParentData.pekerjaan}
                      onChange={e => setNewParentData({ ...newParentData, pekerjaan: e.target.value })}
                      id="pekerjaan"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="penghasilan">Penghasilan</label>
                    <input
                      type="number"
                      value={newParentData.penghasilan}
                      onChange={e => setNewParentData({ ...newParentData, penghasilan: e.target.value })}
                      id="penghasilan"
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button type="submit">
                    Submit
                  </Button>
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
