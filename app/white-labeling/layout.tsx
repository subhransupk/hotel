import { Metadata } from 'next'
import WhiteLabelingLayoutClient from '../../components/layout/white-labeling-layout-client'

export const metadata: Metadata = {
  title: 'White Labeling | Hotel Management System',
  description: 'Customize your hotel branding and appearance',
}

export default function WhiteLabelingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <WhiteLabelingLayoutClient>{children}</WhiteLabelingLayoutClient>
} 