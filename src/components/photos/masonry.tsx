'use client'

import { TPhoto } from '@/lib/transformed-unsplash/_types'
import { MasonryPhotoAlbum } from 'react-photo-album'
import 'react-photo-album/masonry.css'
import { GalleryLoadingFallback } from './gallery-loading'
import UnsplashImage from '../unsplash-image'
import Link from 'next/link'

export default function GalleryMasonry({ photos }: { photos: TPhoto[] }) {
  const sizes = '(min-width: 1040px) calc(25vw - 46px), (min-width: 780px) calc(25vw - 26px), (min-width: 640px) 33.33vw, calc(50vw - 12px)'
  return (
    <MasonryPhotoAlbum
      photos={photos}
      breakpoints={[640, 768]}
      spacing={8}
      columns={cw => (cw < 640 ? 2 : cw < 768 ? 3 : 4)}
      skeleton={<GalleryLoadingFallback />}
      render={{
        photo: (_, { photo, index }) => (
          <Link key={index} href={`/photo/${photo.slug}`} className='w-full'>
            <UnsplashImage {...photo} sizes={sizes} />
          </Link>
        ),
      }}
    />
  )
}
