import { GalleryLoadingFallback } from '@/components/photos/gallery-loading'
import { Skeleton } from '@/components/ui/skeleton'

export default function TopicPhotosLoading() {
  return (
    <div className='flex flex-col items-center gap-3'>
      <Skeleton className='h-5 w-20' />
      <GalleryLoadingFallback />
    </div>
  )
}
