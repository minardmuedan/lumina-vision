import { Skeleton } from '@/components/ui/skeleton'
import { TagsLoadingFallback } from '@/components/ui/tags'
import { MapPinIcon } from 'lucide-react'
import { UserNavbarLoadingFallback } from './[username]/_navbar'
import { GalleryLoadingFallback } from '@/components/photos/gallery-loading'

export default function UserDetailsLoading() {
  return (
    <>
      <div className='my-10 flex flex-col items-center gap-10 md:flex-row md:items-start'>
        <Skeleton className='mx-auto size-32 md:mx-0' />

        <div className='flex max-w-[700px] flex-1 flex-col items-center md:items-start'>
          <Skeleton className='h-12 w-52' />
          <Skeleton className='my-1 h-4 w-full' />
          <Skeleton className='h-4 w-1/2' />

          <div className='mb-10 mt-5 flex items-center justify-center gap-2 md:justify-start'>
            <MapPinIcon strokeWidth={1.3} className='opacity-20' />
            <Skeleton className='h-5 w-20' />
          </div>

          <TagsLoadingFallback count={5} />
        </div>
      </div>
      <UserNavbarLoadingFallback />

      <div className='mt-3'>
        <GalleryLoadingFallback />
      </div>
    </>
  )
}
