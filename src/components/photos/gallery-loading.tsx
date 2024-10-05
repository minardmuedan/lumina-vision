import { Skeleton } from '../ui/skeleton'

export function GalleryLoadingFallback({ count = 10 }: { count?: number }) {
  const aspectRatios = [1.499, 0.662, 0.662, 0.799, 1.499, 0.666, 0.666, 1.5, 1.5, 0.666]

  return (
    <div className='w-full columns-2 gap-2 md:columns-3 lg:columns-4'>
      {aspectRatios.slice(0, count).map((aspectRatio, i) => (
        <Skeleton key={i} style={{ aspectRatio }} className='mb-2 w-full' />
      ))}
    </div>
  )
}
