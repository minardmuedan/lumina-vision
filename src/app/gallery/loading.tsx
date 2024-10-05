import { GalleryLoadingFallback } from '@/components/photos/gallery-loading'

export default function GalleryLoading() {
  return (
    <div className='px-2 py-3 md:px-10 lg:px-20'>
      <GalleryLoadingFallback />
    </div>
  )
}
