'use client'

import { TPhotos } from '@/schema/photo'
import { useEffect, useState } from 'react'
import Loader from './loader'
import { useInView } from 'react-intersection-observer'
import NoResult from './no-results'
import getMorePhotosAction from '@/action/getMorePhotos'
import dynamic from 'next/dynamic'

const GalleryMasonry = dynamic(() => import('@/components/masonry'), {
  ssr: false,
})

let page = 2
export function InfiniteScrollGallery({ initialPhotos }: { initialPhotos: TPhotos }) {
  const [photos, setPhotos] = useState(initialPhotos)
  const [noMoreResult, setNoMoreResult] = useState(false)

  async function fetchMore() {
    const newPhotos = await getMorePhotosAction(page)
    if (!!!newPhotos) return setNoMoreResult(true)

    setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos])
    page += 1
  }

  return (
    <div className="space-y-5">
      <GalleryMasonry photos={photos} />
      {!noMoreResult ? <Tracker fetchMoreFn={fetchMore} /> : <NoResult msg="No More Photos" />}
    </div>
  )
}

function Tracker({ fetchMoreFn }: { fetchMoreFn: () => Promise<void> }) {
  const { ref, inView } = useInView({ rootMargin: '0% 0% 50% 0%' })
  useEffect(() => {
    if (inView) fetchMoreFn()
  }, [inView])

  return (
    <div ref={ref} className="flex w-full justify-center py-20">
      <Loader />
    </div>
  )
}
