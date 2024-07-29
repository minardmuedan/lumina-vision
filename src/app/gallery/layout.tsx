import { Suspense } from 'react'
import { GalleryLoadingFallback } from './loading'

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="container min-h-dvhMinusNav w-full py-5">
      <Suspense fallback={<GalleryLoadingFallback />}>{children}</Suspense>
    </section>
  )
}
