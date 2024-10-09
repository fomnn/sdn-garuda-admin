import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/teachers/')({
  component: TeachersPage,
})

function TeachersPage() {
  return (
    <div className="">
      Ini Halaman Guru
    </div>
  )
}
