import PageWrapper from '@/components/pages'
import { GalleryLoadingFallback } from '@/components/photos/gallery-loading'

export default function GalleryLoading() {
  return (
    <PageWrapper>
      <GalleryLoadingFallback />
    </PageWrapper>
  )
}
