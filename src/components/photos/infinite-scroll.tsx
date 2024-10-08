'use client'

import { fetcher } from '@/lib/client-fetcher'

import { QueryKey, useInfiniteQuery } from '@tanstack/react-query'
import 'react-photo-album/masonry.css'
import { UnstableInfiniteScroll as InfiniteScroll } from 'react-photo-album/scroll'
import { InfiniteScrollLoader, InfiniteScrollError } from '../ui/infinite-scroll'
import GalleryMasonry from './masonry'
import { TPhoto } from '@/lib/transformed-unsplash/_types'
import { memo } from 'react'

type TProps = { initialPhotos: TPhoto[]; queryKey: QueryKey; apiEndpoint: string; hasSearchParams?: boolean; max?: number }

const InfiniteScrollGallery = memo(({ initialPhotos, apiEndpoint, hasSearchParams, queryKey, max }: TProps) => {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isError, error } = useInfiniteQuery({
    queryKey: queryKey,
    queryFn: ({ pageParam }) => fetcher<TPhoto[]>(`${apiEndpoint}${hasSearchParams ? '&' : '?'}page=${pageParam}`),
    initialData: { pageParams: [1], pages: [initialPhotos] },
    initialPageParam: 2,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (max && allPages.length >= Math.ceil(max / 10)) return null
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
            photos={data.pages.flat()}
            fetch={async () => {
              const { data: newPages } = await fetchNextPage({ throwOnError: true })
              if (!hasNextPage) return null
              if (!newPages?.pages.length) return null

              const newPhotos = newPages.pages[newPages.pageParams.length - 1]
              if (!newPhotos?.length) return null
              return newPhotos
            }}
            finished={!hasNextPage}
          >
            <GalleryMasonry photos={[]} />
          </InfiniteScroll>
          {isFetchingNextPage && <InfiniteScrollLoader />}
          {isError && !isFetchingNextPage && <InfiniteScrollError message={error.message} refetch={() => fetchNextPage()} />}
        </>
      )}
    </>
  )
})

InfiniteScrollGallery.displayName = 'InfiniteScrollGallery'
export default InfiniteScrollGallery
