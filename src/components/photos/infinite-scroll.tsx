'use client'

import { fetcher } from '@/lib/client-fetcher'
import { TPhoto } from '@/lib/unsplash/schema/transformedType'
import { useInfiniteQuery } from '@tanstack/react-query'
import 'react-photo-album/masonry.css'
import { UnstableInfiniteScroll as InfiniteScroll } from 'react-photo-album/scroll'
import { InfiniteScrollLoader, InfiniteScrollError } from '../ui/infinite-scroll'
import GalleryMasonry from './masonry'

export default function InfiniteScrollGallery({ initialPhotos }: { initialPhotos: TPhoto[] }) {
  const { data, fetchNextPage, isFetchingNextPage, isError, error } = useInfiniteQuery({
    queryKey: ['photos'],
    queryFn: ({ pageParam }) => fetcher<TPhoto[]>(`/unsplash/photos?page=${pageParam}`),
    initialPageParam: 2,
    initialData: { pageParams: [1], pages: [initialPhotos] },
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (lastPage.length < 10) return null
      return lastPageParam + 1
    },
    select: data => data.pages.flat(),
  })

  return (
    <>
      <InfiniteScroll
        singleton
        photos={data}
        loading={<InfiniteScrollLoader />}
        fetch={async () => {
          const { data } = await fetchNextPage({ throwOnError: true })
          if (data) return data
          return []
        }}
      >
        <GalleryMasonry photos={[]} />
      </InfiniteScroll>

      {isError && !isFetchingNextPage && <InfiniteScrollError message={error.message} refetch={() => fetchNextPage()} />}
    </>
  )
}
