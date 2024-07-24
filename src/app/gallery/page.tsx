import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import Image from 'next/image'

export default function GalleryPage() {
  return (
    <>
      <div className="mb-5 flex w-full gap-3">
        <Button variant="outline" className="group w-full justify-start gap-2 text-muted-foreground">
          <Image src="/icons/search.svg" alt="search-icon" width={19} height={19} className="opacity-75 group-hover:opacity-100" />
          <p>Search for a photo ...</p>
        </Button>
        <Button className="gap-2">
          <p>Filter</p>
          <Image src="/icons/filter.svg" alt="filter-icon" width={19} height={19} className="invert" />
        </Button>
      </div>

      <div className="grid w-full grid-cols-4 gap-5 border">
        {Array(20)
          .fill(0)
          .map((_, i) => (
            <Skeleton key={i} className="h-40" />
          ))}
      </div>
    </>
  )
}
