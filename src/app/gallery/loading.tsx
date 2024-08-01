import { NoScroll } from '@/components/client-sub-component'
import SearchInput from '@/components/search'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import Image from 'next/image'

export default function GalleryWithNavLoadingFallback() {
  return (
    <NoScroll>
      <div className="mb-5 flex gap-3">
        <SearchInput disabled placeholder="Search for a photo..." className="w-full" />
        <Button disabled>
          <p>Filter</p>
          <Image src="/icons/filter.svg" alt="filter-icon" width={19} height={19} className="invert" />
        </Button>
      </div>

      <GalleryLoadingFallback />
    </NoScroll>
  )
}

export function GalleryLoadingFallback() {
  const itemRatios = [
    '2/3',
    '3/5',
    '5/3',
    '4/6',
    '3/5',
    '3/2',
    '3/5',
    '3/2',
    '6/9',
    '5/6',
    '4/5',
    '4/6',
    '3/4',
    '8/5',
    '3/2',
    '3/2',
    '4/6',
    '4/4',
    '3/5',
    '4/7',
  ]
  return (
    <ul className="columns-2 gap-3 sm:columns-3 md:columns-4">
      {itemRatios.map((ratio, i) => (
        <li key={i} style={{ aspectRatio: ratio }} className="mb-3 min-w-[150px]">
          <Skeleton className="size-full" />
        </li>
      ))}
    </ul>
  )
}
