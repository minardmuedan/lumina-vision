import React from 'react'
import ModalWrapper from './_components'
import ErrorBoundary from '@/components/error-boundary'

export default function ModalPhotoDetailsLayout({ children, relatedPhotos }: { children: React.ReactNode; relatedPhotos: React.ReactNode }) {
  return (
    <ModalWrapper>
      <div className='px-2 py-3 md:px-10 lg:px-20'>
        {children}

        <section>
          <h3 className='mb-2 text-2xl text-muted-foreground'>Related Photos</h3>
          <ErrorBoundary className='min-h-fit py-10'>{relatedPhotos}</ErrorBoundary>
        </section>
      </div>
    </ModalWrapper>
  )
}
