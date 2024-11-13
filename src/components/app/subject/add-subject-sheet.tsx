import type { CreateStudentData } from '@/types/Student'
import type { CreateSubject } from '@/types/Subject'
import type { CreateTeacherData } from '@/types/Teacher'
import { useGetAllParents } from '@/api/parent-api'
import { useCreateStudent } from '@/api/student-api'
import { useCreateSubject } from '@/api/subject-api'
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
import { useNavigate, useRouter } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

export default function AddSubjectSheet() {
  const [newSubjectData, setNewSubjectData] = useState<CreateSubject>({
    subject_name: '',
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
              {/* submit buuton */}
              <div className="flex justify-end">
                <Button type="submit">
                  Submit
                </Button>
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
