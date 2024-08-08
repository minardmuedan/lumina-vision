import { Suspense } from 'react'
import GalleryWithNavLoadingFallback from './loading'

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="container min-h-dvhMinusNav w-full space-y-5 py-5">
      <Suspense fallback={<GalleryWithNavLoadingFallback />}>{children}</Suspense>
    </section>
  )
}
