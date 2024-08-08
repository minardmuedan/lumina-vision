'use client'

import { TPhotos } from '@/schema/photo'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import GalleryMasonry from './masonry'
import NoResult from '../no-results'
import Loader from '../loader'

type TProps = { initialPhotos: TPhotos; fetchMoreFn: (page: number) => Promise<TPhotos | null> }

let page = 2
export default function InfiniteScrollGallery({ initialPhotos, fetchMoreFn }: TProps) {
  const [noMoreResult, setNoMoreResult] = useState(false)
  const [photos, setPhotos] = useState(initialPhotos)

  const { ref, inView } = useInView({ rootMargin: '0% 0% 50% 0%' })

  useEffect(() => {
    setPhotos(initialPhotos)
    setNoMoreResult(false)
  }, [initialPhotos])

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined

    if (inView && !noMoreResult) {
      interval = setInterval(async () => {
        const newPhotos = await fetchMoreFn(page)
        if (!newPhotos || newPhotos.length < 1) {
          setNoMoreResult(true)
          return null
        }
        page += 1
        setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos])
      }, 1000)
    } else clearInterval(interval)

    return () => clearInterval(interval)
  }, [inView, noMoreResult])

  return (
    <>
      <GalleryMasonry photos={photos} />
      {noMoreResult ? (
        <NoResult msg={`That's all the photos we have for now`} />
      ) : (
        <div className="flex w-full justify-center py-10" ref={ref}>
          <Loader />
        </div>
      )}
    </>
  )
}
