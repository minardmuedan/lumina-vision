'use client'

import { TUser } from '@/schema/user'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import NoResult from './no-results'
import Loader from './loader'

let page = 2
export default function InfiniteScrollUsers({
  initialUsers,
  fetchMoreFn,
}: {
  initialUsers: TUser[]
  fetchMoreFn: (page: number) => Promise<TUser[] | null>
}) {
  const [noMoreResult, setNoMoreResult] = useState(false)
  const [users, setUsers] = useState(initialUsers)

  const { ref, inView } = useInView({ rootMargin: '0% 0% 50% 0%' })

  useEffect(() => {
    setUsers(initialUsers)
  }, [initialUsers])

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined

    if (inView && !noMoreResult) {
      interval = setInterval(async () => {
        const newUsers = await fetchMoreFn(page)
        if (!newUsers || newUsers.length < 1) {
          setNoMoreResult(true)
          return null
        }
        page += 1
        setUsers((prevUsers) => [...prevUsers, ...newUsers])
      }, 1000)
    } else clearInterval(interval)

    return () => clearInterval(interval)
  }, [inView, noMoreResult])

  return (
    <div>
      <div className="grid grid-cols-2 gap-5 md:grid-cols-3">
        {users.map((user) => (
          <Link key={user.id} href={`/user/${user.username}`}>
            <div className="flex flex-col items-center gap-2 border p-3 text-center transition-colors ease-in-out hover:border-primary/45 sm:flex-row sm:items-start sm:text-start">
              <Image src={user.profile_image.large} alt="profile" height={80} width={80} />
              <div className="flex-1 space-y-1">
                <p className="font-normal">{user.name}</p>
                <p className="line-clamp-3 text-ellipsis text-sm text-muted-foreground">{user.bio ?? 'no bio'}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {noMoreResult ? (
        <NoResult msg={`That's all the users we have for now`} />
      ) : (
        <div className="flex w-full justify-center py-10" ref={ref}>
          <Loader />
        </div>
      )}
    </div>
  )
}
