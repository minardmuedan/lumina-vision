import ErrorBoundary from '@/components/error-boundary'
import PageWrapper from '@/components/pages'
import { Suspense } from 'react'

export default function PhotoDetailsLayout({ children, relatedPhotos }: { children: React.ReactNode; relatedPhotos: React.ReactNode }) {
  return (
    <PageWrapper className='py-5'>
      <Suspense>{children}</Suspense>

      <section>
        <h3 className='mb-2 text-2xl text-muted-foreground'>Related Photos</h3>
        <ErrorBoundary className='min-h-fit py-10'>
          <Suspense>{relatedPhotos}</Suspense>
        </ErrorBoundary>
      </section>
    </PageWrapper>
  )
}
