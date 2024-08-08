import { Suspense } from 'react'
import CollectionDetailsLoadingFallback from './loading'
import CollectionPhotosLoadingFallback from './@photos/loading'

export default function CollectionDetailsLayout({ children, photos }: { children: React.ReactNode; photos: React.ReactNode }) {
  return (
    <div className="container min-h-dvhMinusNav w-full border-green-500 py-5">
      <Suspense fallback={<CollectionDetailsLoadingFallback />}>{children}</Suspense>

      <Suspense fallback={<CollectionPhotosLoadingFallback />}>{photos}</Suspense>
    </div>
  )
}
