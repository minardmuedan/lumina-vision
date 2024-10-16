import ErrorBoundary from '@/components/error-boundary'
import CollectionsFeatureSection from '@/components/home-sections/collections-feature'
import GalleryFeatureSection from '@/components/home-sections/gallery-feautre'
import HeroSection from '@/components/home-sections/hero'
import SearchFeatureSection from '@/components/home-sections/search-feature'
import TopicsFeatureSection from '@/components/home-sections/topics-feature'
import { GalleryLoadingFallback } from '@/components/photos/gallery-loading'
import { Suspense } from 'react'

export default function Home() {
  return (
    <>
      <HeroSection />
      <SearchFeatureSection />
      <CollectionsFeatureSection />
      <TopicsFeatureSection />
      <ErrorBoundary>
        <Suspense
          fallback={
            <section className='px-2 md:px-10 lg:px-20'>
              <GalleryLoadingFallback />
            </section>
          }
        >
          <GalleryFeatureSection />
        </Suspense>
      </ErrorBoundary>
    </>
  )
}
