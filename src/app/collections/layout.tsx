import { Suspense } from 'react'
import CollectionLoadingFallback from './loading'
import Header from '@/components/page-header'

export default function CollectionsLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="container min-h-dvhMinusNav w-full space-y-14 py-10">
      <Header title="Collections" description="Lorem ipsum dolor sit, amet consectetur adipisicing." />

      <Suspense fallback={<CollectionLoadingFallback />}>{children}</Suspense>
    </section>
  )
}
