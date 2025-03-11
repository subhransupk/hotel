import { DashboardLayoutClient } from '@/components/layout/dashboard-layout-client'
import OnboardingCheck from '@/components/onboarding/OnboardingCheck'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Server-side authentication check
  const { userId } = await auth()
  
  if (!userId) {
    redirect('/sign-in')
  }
  
  return (
    <OnboardingCheck>
      <DashboardLayoutClient>{children}</DashboardLayoutClient>
    </OnboardingCheck>
  )
} 