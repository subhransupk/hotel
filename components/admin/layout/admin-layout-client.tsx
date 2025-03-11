'use client'

import { ReactNode, useState } from 'react'
import { AdminSidebar } from './admin-sidebar'
import { AdminHeader } from './admin-header'

interface AdminLayoutClientProps {
  children: ReactNode
}

export function AdminLayoutClient({ children }: AdminLayoutClientProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="lg:pl-72 min-h-screen">
        <AdminHeader onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="py-10 min-h-[calc(100vh-4rem)]">
          <div className="px-4 sm:px-6 lg:px-8 h-full">
            <div className="h-full backdrop-blur-xl bg-white/30 dark:bg-gray-800/30 rounded-2xl p-6 shadow-lg">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
} 