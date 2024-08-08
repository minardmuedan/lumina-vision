import SearchInput from '@/components/search-input'
import { getPhotos } from '@/lib/unsplash'
import NoResult from '@/components/no-results'
import dynamic from 'next/dynamic'
import OrderByFilterBtn from '@/components/photo/gallery-filter'

const InfiniteScrollGallery = dynamic(() => import('@/components/photo/infinite-scroll-gallery'), { ssr: false })

export default async function GalleryPage({ searchParams }: { searchParams: { order_by: 'oldest' | 'popular' | 'latest' } }) {
  const orderBy = searchParams.order_by === 'oldest' ? 'oldest' : searchParams.order_by === 'popular' ? 'popular' : 'latest'
  const photos = await getPhotos(undefined, orderBy)

  async function fetchMoreFn(page: number) {
    'use server'
    return await getPhotos(page, orderBy)
  }

  return (
    <>
      <div className="flex gap-3">
        <SearchInput placeholder="Search for a photo..." className="w-full" />
        <OrderByFilterBtn currentSearchParams={orderBy} />
      </div>

      {photos ? <InfiniteScrollGallery initialPhotos={photos} fetchMoreFn={fetchMoreFn} /> : <NoResult msg="no photo found" />}
    </>
  )
}
