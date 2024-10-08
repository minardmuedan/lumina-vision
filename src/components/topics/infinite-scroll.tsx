'use client'

import { fetcher } from '@/lib/client-fetcher'
import { TTopic } from '@/lib/transformed-unsplash/_types'
import { useInfiniteQuery } from '@tanstack/react-query'
import { memo, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { CollectionsContainer } from '../collections/components'
import CollectionsLoadingFallback from '../collections/loading-fallback'
import { InfiniteScrollError, InfiniteScrollLoader } from '../ui/infinite-scroll'
import IndividualTopic from './individual'

const InfiniteScrollTopics = memo(({ initialTopics }: { initialTopics: TTopic[] }) => {
  const { ref, inView } = useInView({ rootMargin: '400px' })

  const {
    data: topics,
    fetchNextPage,
    isFetchingNextPage,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ['topics'],
    queryFn: ({ pageParam }) => fetcher<TTopic[]>(`/unsplash/topics?page=${pageParam}`),
    initialData: { pageParams: [1], pages: [initialTopics] },
    initialPageParam: 2,
    getNextPageParam: (lastPage, _, lastPageParam) => {
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
        {topics.map(topic => (
          <IndividualTopic key={topic.id} topic={topic} />
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

InfiniteScrollTopics.displayName = 'InfiniteScrollTopics'
export default InfiniteScrollTopics
