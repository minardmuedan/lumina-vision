import { pagePadding } from '@/components/pages'
import InfiniteScrollGallery from '@/components/photos/infinite-scroll'
import { getPhotos } from '@/lib/unsplash/photos'

export default async function GalleryPage() {
  const photos = await getPhotos(1)
  return (
    <div className={pagePadding}>
      <InfiniteScrollGallery initialPhotos={photos} apiEndpoint='/unsplash/photos' />
    </div>
  )
}
