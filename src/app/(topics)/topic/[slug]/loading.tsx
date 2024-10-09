import { Skeleton } from '@/components/ui/skeleton'
import { UserLoadingFallback } from '@/components/users/components'

export default function TopicDetailsLoading() {
  return (
    <>
      <div className='mt-3 flex flex-col-reverse items-center justify-center md:flex-row'>
        <div className='w-full flex-1'>
          <UserLoadingFallback />
          <Skeleton className='mb-1 mt-2 h-12 w-52' />
          <Skeleton className='mb-1 h-4 w-full' />
          <Skeleton className='mb-10 h-4 w-3/4' />

          <div className='flex flex-wrap gap-5'>
            {Array.from({ length: 3 }).map((_, i) => (
              <UserLoadingFallback key={i} />
            ))}
          </div>
        </div>

        <Skeleton className='max-h-[50dvh] min-h-96 w-full flex-1 bg-black/0 bg-gradient-to-t from-black/0 to-accent md:bg-gradient-to-r' />
      </div>
    </>
  )
}
