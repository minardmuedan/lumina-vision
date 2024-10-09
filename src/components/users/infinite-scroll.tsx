'use client'

import { fetcher } from '@/lib/client-fetcher'
import { TUser } from '@/lib/transformed-unsplash/_types'
import { useInfiniteQuery } from '@tanstack/react-query'
import { memo, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { InfiniteScrollError, InfiniteScrollLoader } from '../ui/infinite-scroll'
import { IndividualUser, UsersLoadingFallback } from './components'

const InfiniteScrollSearchUsers = memo(({ query, initialUsers }: { query: string; initialUsers: TUser[] }) => {
  const { ref, inView } = useInView({ rootMargin: '400px' })

  const {
    data: users,
    fetchNextPage,
    isFetchingNextPage,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: [`search-${query}-users`],
    queryFn: ({ pageParam }) => fetcher<TUser[]>(`/unsplash/search/users?query=${query}&page=${pageParam}`),
    initialData: { pageParams: [1], pages: [initialUsers] },
    initialPageParam: 2,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (lastPage.length < 10) return null
      return lastPageParam + 1
    },
    select: data => data.pages.flat(),
  })

  useEffect(() => {
    if (inView && !isFetchingNextPage) fetchNextPage()
  }, [inView, isFetchingNextPage, fetchNextPage])

  return (
    <div>
      <ul className='mb-2 flex flex-col gap-2'>
        {users.map((user, i) => (
          <IndividualUser key={i} user={user} />
        ))}
      </ul>

      {isError && !isFetchingNextPage && <InfiniteScrollError message={error.message} refetch={() => fetchNextPage()} />}

      {!isError && (
        <span ref={ref} className='sr-only'>
          load more
        </span>
      )}

      {isFetchingNextPage && (
        <>
          <UsersLoadingFallback />
          <InfiniteScrollLoader />
        </>
      )}
    </div>
  )
})

InfiniteScrollSearchUsers.displayName = 'InfiniteScrollSearchUsers'
export default InfiniteScrollSearchUsers
