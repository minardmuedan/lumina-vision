import ErrorBoundary from '@/components/error-boundary'
import PageWrapper from '@/components/pages'
import BackButton from '@/components/ui/back-button'
import { Suspense } from 'react'

export default function CollectionDetailsLayout({ children, collectionPhotos }: { children: React.ReactNode; collectionPhotos: React.ReactNode }) {
  return (
    <PageWrapper>
      <BackButton />
      <Suspense>{children}</Suspense>

      <section className='mt-20'>
        <ErrorBoundary>
          <Suspense>{collectionPhotos} </Suspense>
        </ErrorBoundary>
      </section>
    </PageWrapper>
  )
}
