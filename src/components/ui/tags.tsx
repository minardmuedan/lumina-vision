import { TTag } from '@/lib/unsplash/types'
import { buttonVariants } from './button'
import { Skeleton } from './skeleton'
import Link from 'next/link'

export default function Tags({ tags, className }: { tags: TTag[]; className?: string }) {
  return (
    <ul className={`flex flex-wrap justify-center gap-1 ${className}`}>
      {tags?.map(({ title }, i) => (
        <li key={i}>
          <Link href={`/search?query=${title}`} className={buttonVariants({ variant: 'secondary' })} prefetch={false}>
            {title}
          </Link>
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
