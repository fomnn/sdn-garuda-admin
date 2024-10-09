import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/students/')({
  component: StudentsPage,
})

function StudentsPage() {
  return (
    <div className="">
      Ini Halaman Siswa
    </div>
  )
}
