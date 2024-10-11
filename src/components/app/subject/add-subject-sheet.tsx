import type { CreateStudentData } from '@/types/Student'
import type { CreateSubjectData } from '@/types/Subject'
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
import { useCreateSubject } from '@/services/subject-service'
import { useCreateTeacher } from '@/services/teacher-service'
import { Icon } from '@iconify/react'
import { Button, Callout } from '@radix-ui/themes'
import { useNavigate, useRouter } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

export default function AddSubjectSheet() {
  const [newSubjectData, setNewSubjectData] = useState<CreateSubjectData>({
    subject_name: '',
    grade: 1,
  })
  const { mutate: createSubject } = useCreateSubject()
  const [isInputSuccess, setIsInputSuccess] = useState(false)

  function handleSubmit() {
    createSubject(newSubjectData, {
      onSuccess: () => {
        setIsInputSuccess(true)
      },
    })
  }

  function handleClose(open: boolean) {
    if (open)
      return

    setIsInputSuccess(false)

    setNewSubjectData({
      subject_name: '',
      grade: 1,
    })
  }

  return (
    <Sheet onOpenChange={handleClose}>
      <SheetTrigger>
        <Button>Tambah Mata Pelajaran</Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-5xl">
        <SheetHeader>
          <SheetTitle>Masukkan Data Mata Pelajaran</SheetTitle>
          <SheetDescription>
            <form
              className="add-something-form space-y-4"
              onSubmit={(e) => {
                e.preventDefault()
                handleSubmit()
              }}
            >
              <div className="flex flex-col">
                <label htmlFor="subject_name">Nama Mata Pelajaran</label>
                <input
                  type="text"
                  value={newSubjectData.subject_name}
                  onChange={(e) => {
                    setNewSubjectData({
                      ...newSubjectData,
                      subject_name: e.target.value,
                    })
                  }}
                  id="subject_name"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="class2">Kelas</label>
                <select
                  id="class2"
                  value={newSubjectData.grade}
                  onChange={(e) => {
                    setNewSubjectData({
                      ...newSubjectData,
                      grade: Number(e.target.value),
                    })
                  }}
                  required
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
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
                <span>Berhasil menambahkan mata pelajaran, silahkan input data lagi jika masih ada mata pelajaran yang perlu ditambahkan.</span>
              </div>
            )}
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>

  )
}
