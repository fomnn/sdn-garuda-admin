import type { CreateClassData } from '@/types/Class'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { useCreateClass } from '@/api/class-api'
import { useGetAllTeachers } from '@/api/teacher-api'
import { Icon } from '@iconify/react'
import { Button } from '@radix-ui/themes'
import { useState } from 'react'

export default function AddClassSheet() {
  const { data: teachers, isLoading: teachersLoading } = useGetAllTeachers()
  const [newClassData, setNewClassData] = useState<CreateClassData>({
    class_name: '',
    teacher_id: '',
  })
  const [isInputSuccess, setIsInputSuccess] = useState(false)
  const { mutate: createClass } = useCreateClass()

  function handleSubmit() {
    createClass(newClassData, {
      onSuccess: () => {
        setIsInputSuccess(true)

        setNewClassData({
          class_name: '',
          teacher_id: '',
        })
      },
    })
  }

  function handleClose(open: boolean) {
    if (open)
      return

    setIsInputSuccess(false)

    setNewClassData({
      class_name: '',
      teacher_id: '',
    })
  }

  return (
    <Sheet onOpenChange={handleClose}>
      <SheetTrigger>
        <Button>Tambah Kelas</Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-5xl">
        <SheetHeader>
          <SheetTitle>Masukkan Data Kelas</SheetTitle>
          <SheetDescription>
            <form
              className="add-something-form space-y-4"
              onSubmit={(e) => {
                e.preventDefault()
                handleSubmit()
              }}
            >
              <div className="flex flex-col">
                <label htmlFor="class_name">Nama Kelas</label>
                <input
                  type="text"
                  value={newClassData.class_name}
                  onChange={(e) => {
                    setNewClassData({
                      ...newClassData,
                      class_name: e.target.value,
                    })
                  }}
                  id="class_name"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="teacher_id">Wali Kelas</label>
                <select
                  id="teacher_id"
                  value={newClassData.teacher_id}
                  onChange={(e) => {
                    setNewClassData({
                      ...newClassData,
                      teacher_id: e.target.value,
                    })
                  }}
                  required
                >
                  <option>Pilih Wali Kelas</option>
                  {
                    teachersLoading
                      ? <div>loading...</div>
                      : teachers?.map(teacher => (
                        <option
                          key={teacher._id}
                          value={teacher._id}
                        >
                          {teacher.first_name}
                          {' '}
                          {teacher.middle_name ? `${teacher.middle_name} ` : ''}
                          {teacher.last_name}
                        </option>
                      ))
                  }
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
                <span>Berhasil menambahkan kelas, silahkan input data lagi jika masih ada kelas yang perlu ditambahkan.</span>
              </div>
            )}
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
