import React, { Suspense } from 'react'
import ModalWrapper from './_components'
import ErrorBoundary from '@/components/error-boundary'
import PageWrapper from '@/components/pages'

export default function ModalPhotoDetailsLayout({ children, relatedPhotos }: { children: React.ReactNode; relatedPhotos: React.ReactNode }) {
  return (
    <ModalWrapper>
      <PageWrapper>
        <Suspense>{children}</Suspense>

        <section>
          <h3 className='mb-2 text-2xl text-muted-foreground'>Related Photos</h3>
          <ErrorBoundary className='min-h-fit py-10'>
            <Suspense>{relatedPhotos}</Suspense>
          </ErrorBoundary>
        </section>
      </PageWrapper>
    </ModalWrapper>
  )
}
