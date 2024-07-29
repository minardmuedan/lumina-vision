import { Suspense } from 'react'
import PhotoRelatedPhotosLoadingFallback from './loading'

export default function PhotoRelatedPhotosLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="mt-20">
      <p className="mb-3 font-calstavier text-2xl">Related Photos</p>
      <Suspense fallback={<PhotoRelatedPhotosLoadingFallback />}>{children}</Suspense>
    </section>
  )
}
