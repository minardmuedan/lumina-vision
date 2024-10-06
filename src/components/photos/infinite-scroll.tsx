'use client'

import { fetcher } from '@/lib/client-fetcher'

import { useInfiniteQuery } from '@tanstack/react-query'
import 'react-photo-album/masonry.css'
import { UnstableInfiniteScroll as InfiniteScroll } from 'react-photo-album/scroll'
import { InfiniteScrollLoader, InfiniteScrollError } from '../ui/infinite-scroll'
import GalleryMasonry from './masonry'
import { TPhoto } from '@/lib/transformed-unsplash/_types'

export default function InfiniteScrollGallery({ initialPhotos, apiEndpoint }: { initialPhotos: TPhoto[]; apiEndpoint: string }) {
  const { data, fetchNextPage, isFetchingNextPage, isError, error } = useInfiniteQuery({
    queryKey: ['photos'],
    queryFn: ({ pageParam }) => fetcher<TPhoto[]>(`${apiEndpoint}?page=${pageParam}`),
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
        fetch={async () => {
          const { data } = await fetchNextPage({ throwOnError: true })
          if (data) return data
          return []
        }}
      >
        <GalleryMasonry photos={[]} />
      </InfiniteScroll>

      {!isError && <InfiniteScrollLoader />}
      {isError && !isFetchingNextPage && <InfiniteScrollError message={error.message} refetch={() => fetchNextPage()} />}
    </>
  )
}
