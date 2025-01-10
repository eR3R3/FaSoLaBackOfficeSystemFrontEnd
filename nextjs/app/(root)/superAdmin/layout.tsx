'use client'

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import SideBar from "@/components/shared/SideBar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
      <SidebarProvider className="w-screen">
          <SideBar />
          <main className="w-full">
            <SidebarTrigger />
            <div className="px-10 py-6 w-full">
              {children}
            </div>
          </main>
      </SidebarProvider>
  )
}