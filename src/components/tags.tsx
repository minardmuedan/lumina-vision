import Link from 'next/link'
import { Skeleton } from './ui/skeleton'
import { TTag } from '@/schema/unsplash'
import { cn } from '@/lib/utils'

export default function Tags({ tags, className }: { tags: TTag[]; className?: string }) {
  return (
    <FlexWrapperUl className={className}>
      {tags.map((tag, i) => (
        <li key={i} className="bg-accent transition-colors ease-in hover:bg-primary/10">
          <Link href={`/s?v=${tag.title}`}>
            <p className="px-3 py-2">{tag.title}</p>
          </Link>
        </li>
      ))}
    </FlexWrapperUl>
  )
}

export function TagsLoadingFallback({ quantity = 5, className }: { quantity?: number; className?: string }) {
  return (
    <FlexWrapperUl className={className}>
      {Array(quantity)
        .fill(0)
        .map((_, i) => (
          <li key={i}>
            <Skeleton className="h-9 w-32" />
          </li>
        ))}
    </FlexWrapperUl>
  )
}

function FlexWrapperUl({ children, className }: { children: React.ReactNode; className?: string }) {
  return <ul className={cn('flex flex-wrap justify-center gap-3 text-sm', className)}>{children}</ul>
}
