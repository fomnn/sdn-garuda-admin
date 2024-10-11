import SideNav from '@/components/app/side-nav'
import { Toaster } from '@/components/ui/toaster'
import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import * as React from 'react'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <div>
      <div className="w-full h-screen flex">
        <SideNav />
        <div className="w-10/12 py-8 pl-10 pr-12 bg-zinc-100 dark:bg-zinc-900 overflow-y-scroll">
          <Outlet />
        </div>
      </div>
      <Toaster />
      <TanStackRouterDevtools position="bottom-right" />
    </div>
  )
}
