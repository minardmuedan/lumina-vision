'use client'

import { TPhoto, TPhotos } from '@/schema/photo'
import { Masonry } from 'masonic'
import Link from 'next/link'
import Image from 'next/image'

export default function GalleryMasonry({ photos, className }: { photos: TPhotos; className?: string }) {
  return <Masonry columnWidth={150} columnGutter={12} maxColumnCount={4} items={photos} render={Photo} className={`overflow-hidden ${className}`} />
}

export function Photo({ index, data: photo }: { index: number; data: TPhoto }) {
  return (
    <div key={index} className="relative">
      <Link href={`/photo/${photo.slug ?? photo.id}`}>
        <Image
          src={photo.urls.small}
          alt={`${photo.description}`}
          width={photo.width}
          height={photo.height}
          style={{ backgroundColor: photo.color }}
          className="w-full transition-opacity ease-in group-hover:opacity-75"
        />
      </Link>
    </div>
  )
}
