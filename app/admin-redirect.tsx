'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSafeUser } from '@/lib/clerk-utils'

export default function AdminRedirect() {
  const router = useRouter()
  const { user, isLoaded } = useSafeUser()

  useEffect(() => {
    if (isLoaded && user) {
      const userRole = user.publicMetadata.role as string
      
      if (userRole === 'admin') {
        router.push('/admin')
      } else {
        router.push('/dashboard')
      }
    }
  }, [isLoaded, user, router])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h2 className="text-xl font-semibold">Redirecting...</h2>
        <p className="mt-2 text-gray-600">Please wait while we redirect you to the appropriate dashboard.</p>
      </div>
    </div>
  )
} 