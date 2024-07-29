import { Suspense } from 'react'
import PhotoRelatedPhotosLoadingFallback from './@related_photo/loading'
import PhotoDetailsLoadingFallback from './loading'

export default function PhotoDetailsLayout({ children, related_photo }: { children: React.ReactNode; related_photo: React.ReactNode }) {
  return (
    <div className="container w-full py-5">
      <Suspense fallback={<PhotoDetailsLoadingFallback />}>{children}</Suspense>
      <Suspense fallback={<PhotoRelatedPhotosLoadingFallback />}>{related_photo}</Suspense>
    </div>
  )
}
