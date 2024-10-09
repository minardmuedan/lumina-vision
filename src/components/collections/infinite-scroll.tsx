'use client'

import { TCollection } from '@/lib/transformed-unsplash/_types'
import { CollectionsContainer, IndividualCollection } from './components'
import CollectionsLoadingFallback from './loading-fallback'
import { InfiniteScrollLoader, InfiniteScrollError } from '../ui/infinite-scroll'
import { useInView } from 'react-intersection-observer'
import { QueryKey, useInfiniteQuery } from '@tanstack/react-query'
import { fetcher } from '@/lib/client-fetcher'
import { memo, useEffect } from 'react'

type TProps = { initialCollections: TCollection[]; queryKey: QueryKey; apiEndpoint: string; hasSearchParams?: boolean; max?: number }

const InfiniteScrollCollections = memo(({ initialCollections, queryKey, apiEndpoint, hasSearchParams, max }: TProps) => {
  const { ref, inView } = useInView({ rootMargin: '400px' })

  const {
    data: collections,
    fetchNextPage,
    isFetchingNextPage,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: queryKey,
    queryFn: ({ pageParam }) => fetcher<TCollection[]>(`${apiEndpoint}${hasSearchParams ? '&' : '?'}page=${pageParam}`),
    initialData: { pageParams: [1], pages: [initialCollections] },
    initialPageParam: 2,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (max && allPages.length >= Math.ceil(max / 12)) return null
      if (lastPage.length < 12) return null
      return lastPageParam + 1
    },
    select: data => data.pages.flat(),
  })

  useEffect(() => {
    if (inView && !isFetchingNextPage) fetchNextPage()
  }, [inView, isFetchingNextPage, fetchNextPage])

  return (
    <div>
      <CollectionsContainer>
        {collections.map((collection, i) => (
          <IndividualCollection key={i} collection={collection} />
        ))}
      </CollectionsContainer>

      {isError && !isFetchingNextPage && <InfiniteScrollError message={error.message} refetch={() => fetchNextPage()} />}

      {!isError && (
        <span ref={ref} className='sr-only'>
          load more
        </span>
      )}

      {isFetchingNextPage && (
        <>
          <CollectionsLoadingFallback />
          <InfiniteScrollLoader />
        </>
      )}
    </div>
  )
})

InfiniteScrollCollections.displayName = 'InfiniteScrollCollections'
export default InfiniteScrollCollections
