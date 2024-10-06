import { TTag } from '@/lib/unsplash/types'
import { buttonVariants } from './button'
import { Skeleton } from './skeleton'

export default function Tags({ tags }: { tags: TTag[] }) {
  return (
    <ul className='flex flex-wrap justify-center gap-1'>
      {tags.map(({ title }, i) => (
        <li key={i} className={buttonVariants({ variant: 'secondary' })}>
          {title}
        </li>
      ))}
    </ul>
  )
}
export function TagsLoadingFallback({ count }: { count: number }) {
  return (
    <div className='flex flex-wrap justify-center gap-1'>
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} className='h-9 w-28 rounded-md bg-secondary' />
      ))}
    </div>
  )
}
