import InfiniteScrollGallery from '@/components/photos/infinite-scroll'
import { getUnsplashPhotos } from '@/lib/unsplash/photos'

export default async function GalleryPage() {
  const photos = await getUnsplashPhotos(1)
  return (
    <div className='px-2 py-3 md:px-10 lg:px-20'>
      <InfiniteScrollGallery initialPhotos={photos} />
    </div>
  )
}
