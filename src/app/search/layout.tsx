import PageWrapper from '@/components/pages'
import BackButton from '@/components/ui/back-button'
import { Suspense } from 'react'
import { SearchNavbar, SearchQuery } from './_components'

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return (
    <PageWrapper>
      <BackButton />

      <div className='pb-14 pt-10'>
        <Suspense>
          <SearchQuery />
        </Suspense>
      </div>

      <Suspense>
        <SearchNavbar />
        {children}
      </Suspense>
    </PageWrapper>
  )
}
