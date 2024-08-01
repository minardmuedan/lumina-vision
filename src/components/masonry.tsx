'use client'

import { TPhotos } from '@/schema/photo'
import Link from 'next/link'
import { MasonryPhotoAlbum } from 'react-photo-album'
import 'react-photo-album/masonry.css'

export default function GalleryMasonry({ photos }: { photos: TPhotos }) {
  const definedPhotos = definePhotos(photos)

  return (
    <MasonryPhotoAlbum
      photos={definedPhotos}
      breakpoints={[640, 768, 1024]}
      columns={(cW) => (cW < 640 ? 2 : cW < 768 ? 3 : 4)}
      render={{ link: (props) => <Link {...props} scroll={false} /> }}
    />
  )
}

export function definePhotos(photos: TPhotos) {
  return photos.map((photo) => ({
    src: photo.urls.small,
    title: photo.description,
    alt: photo.alt_description,
    width: photo.width,
    height: photo.height,
    href: `/photo/${photo.slug ?? photo.id}`,
    color: photo.color,
  }))
}
