import SearchInput from '@/components/search'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { GridWrapperUl } from '@/components/wrapper'
import Image from 'next/image'

export default function GalleryLoadingFallback() {
  return (
    <section className="container max-h-dvhMinusNav w-full space-y-5 overflow-hidden pt-5">
      <div className="flex gap-3">
        <SearchInput disabled placeholder="Search for a photo..." className="w-full" />
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
              <Skeleton className="h-52 w-full" />
            </li>
          ))}
      </GridWrapperUl>
    </section>
  )
}
