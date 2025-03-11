import PartnerLayoutClient from '../../components/layout/partner-layout-client'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Partner Portal | Hotel Management System',
  description: 'Manage your hotel management system partnership, clients, and commissions',
}

export default function PartnerDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <PartnerLayoutClient>{children}</PartnerLayoutClient>
} 