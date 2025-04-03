'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { AdminHeader } from '@/components/admin/layout/admin-header'
import { AdminSidebar } from '@/components/admin/layout/admin-sidebar'

const publicPages = ['/admin/login', '/admin/register', '/admin/forgot-password']

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isPublicPage = publicPages.includes(pathname)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  if (isPublicPage) {
    return <>{children}</>
  }

  return (
    <div>
      <AdminSidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />
      <div className="lg:pl-72">
        <AdminHeader 
          onMenuClick={() => setIsSidebarOpen(true)} 
        />
        <main className="py-10">
          <div className="px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
} 