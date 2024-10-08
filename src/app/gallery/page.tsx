import PageWrapper from '@/components/pages'
import InfiniteScrollGallery from '@/components/photos/infinite-scroll'
import { getPhotos } from '@/lib/unsplash/photos'

export default async function GalleryPage() {
  const photos = await getPhotos(1)
  return (
    <PageWrapper>
      <InfiniteScrollGallery initialPhotos={photos} queryKey={['gallery']} apiEndpoint='/unsplash/photos' />
    </PageWrapper>
  )
}
