import OrderByFilterBtn from '@/components/photo/gallery-filter'
import SearchInput from '@/components/search-input'
import { Skeleton } from '@/components/ui/skeleton'

export default function GalleryWithNavLoadingFallback() {
  return (
    <>
      <div className="loading-page mb-5 flex gap-3">
        <SearchInput disabled placeholder="Search for a photo..." className="w-full" />
        <OrderByFilterBtn currentSearchParams="Latest" disabled />
      </div>

      <GalleryLoadingFallback />
    </>
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
