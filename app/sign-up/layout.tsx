import { PublicHeader } from '@/components/layout/public/header'
import { PublicFooter } from '@/components/layout/public/footer'

export default function SignUpLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <PublicHeader />
      <main>{children}</main>
      <PublicFooter />
    </>
  )
} 