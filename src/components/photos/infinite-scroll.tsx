'use client'

import { fetcher } from '@/lib/client-fetcher'

import { QueryKey, useInfiniteQuery } from '@tanstack/react-query'
import 'react-photo-album/masonry.css'
import { UnstableInfiniteScroll as InfiniteScroll } from 'react-photo-album/scroll'
import { InfiniteScrollLoader, InfiniteScrollError } from '../ui/infinite-scroll'
import GalleryMasonry from './masonry'
import { TPhoto } from '@/lib/transformed-unsplash/_types'

type TProps = { initialPhotos: TPhoto[]; queryKey: QueryKey; apiEndpoint: string }

export default function InfiniteScrollGallery({ initialPhotos, apiEndpoint, queryKey }: TProps) {
  const { data, fetchNextPage, isFetchingNextPage, isError, error } = useInfiniteQuery({
    queryKey: queryKey,
    queryFn: ({ pageParam }) => fetcher<TPhoto[]>(`${apiEndpoint}?page=${pageParam}`),
    initialPageParam: 2,
    initialData: { pageParams: [1], pages: [initialPhotos] },
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (lastPage.length < 10) return null
      return lastPageParam + 1
    },
  })

  return (
    <>
      {initialPhotos.length < 10 ? (
        <GalleryMasonry photos={initialPhotos} />
      ) : (
        <>
          <InfiniteScroll
            singleton
            photos={data.pages[0]}
            fetch={async () => {
              const { data: newPages } = await fetchNextPage({ throwOnError: true })
              if (!newPages?.pages.length) return null

              const newPhotos = newPages.pages[newPages.pageParams.length - 1]
              if (!newPhotos?.length) return null
              return newPhotos
            }}
          >
            <GalleryMasonry photos={[]} />
          </InfiniteScroll>
          {isFetchingNextPage && <InfiniteScrollLoader />}
          {isError && !isFetchingNextPage && <InfiniteScrollError message={error.message} refetch={() => fetchNextPage()} />}
        </>
      )}
    </>
  )
}
