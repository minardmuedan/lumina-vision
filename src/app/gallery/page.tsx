import SearchInput from '@/components/search'
import { Button } from '@/components/ui/button'
import { getPhotos } from '@/lib/unsplash'
import Image from 'next/image'
import NoResult from '@/components/no-results'
import { InfiniteScrollGallery } from '@/components/load-more'

export default async function GalleryPage() {
  await new Promise((res) => setTimeout(res, 5000))

  const photos = await getPhotos()
  return (
    <div className="space-y-5">
      <div className="flex gap-3">
        <SearchInput placeholder="Search for a photo..." className="w-full" />
        <Button disabled={!photos}>
          <p>Filter</p>
          <Image src="/icons/filter.svg" alt="filter-icon" width={19} height={19} className="invert" />
        </Button>
      </div>

      {photos ? <InfiniteScrollGallery initialPhotos={photos} /> : <NoResult msg="no photo found" />}
    </div>
  )
}
