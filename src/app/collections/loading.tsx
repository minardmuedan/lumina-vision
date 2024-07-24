import SearchInput from '@/components/search'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { GridWrapperUl } from '@/components/wrapper'
import Image from 'next/image'

export default function CollectionLoadingFallback() {
  return (
    <div className="max-h-[calc(100dvh-14.5rem)] space-y-5 overflow-hidden">
      <div className="flex gap-3">
        <SearchInput disabled placeholder="Search for a collection..." className="flex-1" />
        <Button disabled>
          <p>Filter</p>
          <Image src="/icons/filter.svg" alt="filter-icon" width={19} height={19} className="invert" />
        </Button>
      </div>
      <GridWrapperUl>
        {Array(20)
          .fill(0)
          .map((_, i) => (
            <li key={i}>
              <Skeleton className="aspect-[2/1] w-full" />
            </li>
          ))}
      </GridWrapperUl>
    </div>
  )
}
