'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminRedirect() {
  const router = useRouter()

  useEffect(() => {
    // Simply redirect to the dashboard without authentication check
    router.push('/dashboard')
  }, [router])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h2 className="text-xl font-semibold">Redirecting...</h2>
        <p className="mt-2 text-gray-600">Please wait while we redirect you to the dashboard.</p>
      </div>
    </div>
  )
} 