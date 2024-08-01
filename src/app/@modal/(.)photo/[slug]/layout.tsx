import { ModalWrapper } from '@/components/wrapper'
import { Suspense } from 'react'
import ModalPhotoLoadingFallback from './loading'
import PhotoRelatedPhotosLoadingFallback from './@related_photo/loading'

export default function ModalPhotoDetailsLayout({ children, related_photo }: { children: React.ReactNode; related_photo: React.ReactNode }) {
  return (
    <ModalWrapper>
      <Suspense fallback={<ModalPhotoLoadingFallback />}>{children}</Suspense>
      <Suspense fallback={<PhotoRelatedPhotosLoadingFallback />}>{related_photo}</Suspense>
    </ModalWrapper>
  )
}
