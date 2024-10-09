import SideNav from '@/components/app/side-nav'
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
        <div className="w-10/12 py-8 pl-8 pr-8 bg-zinc-100 dark:bg-zinc-900 overflow-y-scroll">
          <Outlet />
        </div>
      </div>
      <TanStackRouterDevtools position="bottom-right" />
    </div>
  )
}
