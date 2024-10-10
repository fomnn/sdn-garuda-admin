import type { CreateTeacherData } from '@/types/Teacher'
import { useCreateTeacher } from '@/services/teacher-service'
import { Heading } from '@radix-ui/themes'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/teachers/add')({
  component: TeachersAddPage,
})

function TeachersAddPage() {
  const navigate = useNavigate()
  const [newTeacherData, setNewTeacherData] = useState<CreateTeacherData>({
    first_name: '',
    middle_name: '',
    last_name: '',
    email: '',
    gender: 'male',
    role: 'teacher',
    contact_number: '',
  })
  const { mutate: createTeacher } = useCreateTeacher()
  function handleSubmit() {
    createTeacher(newTeacherData, {
      onSuccess: () => {
        navigate({
          to: '/teachers',
        })
      },
    })
  }

  return (
    <div className="px-40 py-6 space-y-6">
      <Heading className="text-3xl">Tambah Guru atau Staff</Heading>

      <form
        className="add-something-form space-y-6"
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
    </div>
  )
}
