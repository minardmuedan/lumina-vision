import PageWrapper from '@/components/pages'
import BackButton from '@/components/ui/back-button'
import { Suspense } from 'react'

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <PageWrapper>
      <BackButton />
      <Suspense>{children}</Suspense>
    </PageWrapper>
  )
}
