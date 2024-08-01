'use client'

import { TPhotos } from '@/schema/photo'
import { UnstableInfiniteScroll as InfiniteScroll } from 'react-photo-album/scroll'
import { definePhotos } from './masonry'
import { MasonryPhotoAlbum } from 'react-photo-album'
import Link from 'next/link'
import getMorePhotosAction from '@/action/getMorePhotos'
import 'react-photo-album/masonry.css'
import { useState } from 'react'
import NoResult from './no-results'
import Loader from './loader'

let page = 2
export function InfinitScrollPhotos({ initialPhotos, orderBy }: { initialPhotos: TPhotos; orderBy?: 'oldest' | 'popular' | 'latest' }) {
  const [noMoreResult, setNoMoreResult] = useState(false)

  const definedInitialPhotos = definePhotos(initialPhotos)
  async function fetchMorePhotos() {
    if (noMoreResult) return null

    const newPhotos = await getMorePhotosAction(page, orderBy)
    if (!newPhotos) {
      setNoMoreResult(true)
      return null
    }

    const definedNewPhotos = definePhotos(newPhotos)
    page += 1
    return definedNewPhotos
  }

  return (
    <>
      <InfiniteScroll singleton photos={definedInitialPhotos} fetch={fetchMorePhotos}>
        <MasonryPhotoAlbum
          photos={[]}
          breakpoints={[640, 768, 1024]}
          columns={(cW) => (cW < 640 ? 2 : cW < 768 ? 3 : 4)}
          render={{ link: (props) => <Link {...props} scroll={false} /> }}
        />
      </InfiniteScroll>

      {noMoreResult ? (
        <NoResult msg={`That's all the photos we have for now`} />
      ) : (
        <div className="flex w-full justify-center py-10">
          <Loader />
        </div>
      )}
    </>
  )
}
