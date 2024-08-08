import { Suspense } from 'react'
import SearchResultLoadingFallback from './loading'
import { GalleryLoadingFallback } from '@/app/gallery/loading'

export default function SearchResultLayout({ children, media }: { children: React.ReactNode; media: React.ReactNode }) {
  return (
    <section className="container min-h-dvhMinusNav w-full space-y-5 pb-5 pt-10">
      <Suspense fallback={<SearchResultLoadingFallback />}>{children}</Suspense>
      <Suspense fallback={<GalleryLoadingFallback />}>{media}</Suspense>
    </section>
  )
}
