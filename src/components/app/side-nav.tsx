// import { authStore } from '@/stores/auth'
import { Icon } from '@iconify/react'
import { Box, Popover, Switch } from '@radix-ui/themes'
import { Link, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

export default function SideNav() {
  const navigate = useNavigate()

  const [darkmode, setDarkmode] = useState(false)

  // function handleLogout() {
  //   localStorage.removeItem('token')
  //   localStorage.removeItem('admin_id')
  //   authStore.setState(() => ({
  //     admin_id: null,
  //   }))
  //   navigate({
  //     to: '/auth/login',
  //   })
  // }

  function handleChangeDarkmode(darkmode: boolean) {
    if (darkmode) {
      setDarkmode(true)
      document.documentElement.classList.add('dark')
      localStorage.setItem('darkmode', 'true')
    } else {
      setDarkmode(false)
      document.documentElement.classList.remove('dark')
      localStorage.setItem('darkmode', 'false')
    }
  }

  useEffect(() => {
    const darkmode = localStorage.getItem('darkmode')
    if (darkmode === 'true') {
      setDarkmode(true)
      document.documentElement.classList.add('dark')
    }
  }, [])
  return (
    <nav className="w-2/12 py-5 flex flex-col justify-between">
      <div className="flex flex-col gap-4 ">
        <div className="flex items-center gap-2 justify-center py-3">
          <Icon icon="solar:user-bold-duotone" className="text-3xl text-sky-600" />
          <span className="font-semibold">
            Admin SDN Garuda
          </span>
        </div>
        <div className="flex flex-col gap-2 px-3">
          <Link
            to="/"
            activeProps={{
              className: 'bg-slate-100 dark:bg-zinc-800 shadow',
            }}
            className="flex items-center gap-2 px-2 py-1 rounded-sm transition-all duration-75 hover:bg-slate-50 dark:hover:bg-zinc-900"
          >
            <Icon icon="solar:documents-minimalistic-broken" />
            Menu
          </Link>
          <Link
            to="/teachers"
            activeProps={{
              className: 'bg-slate-100 dark:bg-zinc-800 shadow',
            }}
            className="flex items-center gap-2 px-2 py-1 rounded-sm transition-all duration-75 hover:bg-slate-50 dark:hover:bg-zinc-900"
          >
            <Icon icon="ph:chalkboard-teacher-light" />
            Guru
          </Link>
          <Link
            to="/students"
            activeProps={{
              className: 'bg-slate-100 dark:bg-zinc-800 shadow',
            }}
            className="flex items-center gap-2 px-2 py-1 rounded-sm transition-all duration-75 hover:bg-slate-50 dark:hover:bg-zinc-900"
          >
            <Icon icon="ph:student-light" />
            Siswa
          </Link>
          <Link
            to="/parents"
            activeProps={{
              className: 'bg-slate-100 dark:bg-zinc-800 shadow',
            }}
            className="flex items-center gap-2 px-2 py-1 rounded-sm transition-all duration-75 hover:bg-slate-50 dark:hover:bg-zinc-900"
          >
            <Icon icon="material-symbols:family-restroom" />
            Orang Tua Siswa
          </Link>
          <Link
            to="/"
            activeProps={{
              className: 'bg-slate-100 dark:bg-zinc-800 shadow',
            }}
            className="flex items-center gap-2 px-2 py-1 rounded-sm transition-all duration-75 hover:bg-slate-50 dark:hover:bg-zinc-900"
          >
            <Icon icon="material-symbols:book-2-outline" />
            Mata Pelajaran
          </Link>
          <Link
            to="/"
            activeProps={{
              className: 'bg-slate-100 dark:bg-zinc-800 shadow',
            }}
            className="flex items-center gap-2 px-2 py-1 rounded-sm transition-all duration-75 hover:bg-slate-50 dark:hover:bg-zinc-900"
          >
            <Icon icon="arcticons:classroom" />
            Kelas
          </Link>
          <Link
            to="/"
            activeProps={{
              className: 'bg-slate-100 dark:bg-zinc-800 shadow',
            }}
            className="flex items-center gap-2 px-2 py-1 rounded-sm transition-all duration-75 hover:bg-slate-50 dark:hover:bg-zinc-900"
          >
            <Icon icon="fluent:calendar-week-numbers-20-regular" />
            Nilai Siswa
          </Link>
          <Link
            to="/"
            activeProps={{
              className: 'bg-slate-100 dark:bg-zinc-800 shadow',
            }}
            className="flex items-center gap-2 px-2 py-1 rounded-sm transition-all duration-75 hover:bg-slate-50 dark:hover:bg-zinc-900"
          >
            <Icon icon="material-symbols-light:person-raised-hand-outline-rounded" />
            Kehadiran Siswa
          </Link>
        </div>

      </div>
      <div className="flex flex-col gap-2 px-3">
        <Popover.Root>
          <Popover.Trigger>
            <button
              type="button"
              className="flex bg-zinc-50 dark:bg-zinc-800 items-center gap-2 px-2 py-1 rounded-md transition-all duration-75 hover:bg-slate-50 dark:hover:bg-zinc-900"
            >
              <Icon icon="solar:settings-line-duotone" />
              Settings
            </button>
          </Popover.Trigger>
          <Popover.Content>
            <Box>
              <div className="flex items-center gap-2 w-full justify-between">
                <label>Dark Mode</label>
                <Switch checked={darkmode} onCheckedChange={handleChangeDarkmode} />
              </div>
            </Box>
          </Popover.Content>
        </Popover.Root>
        <button
          type="button"
          className="flex bg-zinc-50 dark:bg-zinc-800 items-center gap-2 px-2 py-1 rounded-md transition-all duration-75 hover:bg-slate-50 dark:hover:bg-zinc-900"
          // onClick={handleLogout}
        >
          <Icon icon="solar:login-outline" />
          Log out
        </button>
      </div>
    </nav>
  )
}
