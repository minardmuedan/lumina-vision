'use client'

import Image from 'next/image'
import { GridWrapperUl } from '@/components/wrapper'
import Link from 'next/link'
import { TCollections } from '@/schema/collection'
import { useInView } from 'react-intersection-observer'
import { useEffect, useState } from 'react'
import NoResult from '../no-results'
import Loader from '../loader'

let page = 2
export default function InfiniteScrollCollections({
  initialCollections,
  fetchMoreFn,
}: {
  initialCollections: TCollections
  fetchMoreFn: (page: number) => Promise<TCollections | null>
}) {
  const [noMoreResult, setNoMoreResult] = useState(false)
  const [collections, setCollections] = useState(initialCollections)
  const { ref, inView } = useInView({ rootMargin: '0% 0% 50% 0%' })

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined

    if (inView && !noMoreResult) {
      interval = setInterval(async () => {
        const newCollections = await fetchMoreFn(page)
        if (!newCollections || newCollections.length < 1) {
          setNoMoreResult(true)
          return null
        }
        page += 1
        setCollections((prevCollections) => [...prevCollections, ...newCollections])
      }, 1000)
    } else clearInterval(interval)

    return () => clearInterval(interval)
  }, [inView, noMoreResult])

  return (
    <>
      <GridWrapperUl>
        {collections.map((collection) => (
          <li key={collection.id} className="group aspect-[2/1] w-full overflow-hidden rounded-xl bg-black">
            <Link href={`/collection/${collection.id}`} className="relative flex size-full items-center justify-center p-2">
              <p className="z-10 text-center text-background transition-transform ease-in group-hover:scale-0">{collection.title}</p>
              <p className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 scale-0 text-background transition-transform ease-out group-hover:scale-100">
                {collection.total_photos - 1}+
              </p>

              <Image
                src={collection.cover_photo?.urls.small}
                alt={`${collection.cover_photo?.description}`}
                fill
                style={{ backgroundColor: collection.cover_photo?.color }}
                sizes="(min-width: 1560px) 335px, (min-width: 1040px) 22vw, (min-width: 780px) calc(33.33vw - 40px), (min-width: 640px) calc(33.33vw - 24px), calc(50vw - 24px)"
                className="object-cover opacity-75"
              />
            </Link>
          </li>
        ))}
      </GridWrapperUl>

      {noMoreResult ? (
        <NoResult msg={`That's all the collections we have for now`} />
      ) : (
        <div className="flex w-full justify-center py-10" ref={ref}>
          <Loader />
        </div>
      )}
    </>
  )
}
