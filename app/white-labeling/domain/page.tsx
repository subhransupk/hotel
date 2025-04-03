'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function DomainRedirect() {
  const router = useRouter()
  
  useEffect(() => {
    // Redirect to the correct plural URL
    router.replace('/white-labeling/domains')
  }, [router])
  
  return (
    <div className="p-4 md:p-10 mx-auto max-w-7xl">
      <p>Redirecting to domain settings...</p>
    </div>
  )
} 