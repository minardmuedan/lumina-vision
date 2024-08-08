'use client'

import { TPhotos } from '@/schema/photo'
import { useContainerPosition, useMasonry, usePositioner, useScroller } from 'masonic'
import { useWindowSize } from '@react-hook/window-size'
import { useRef } from 'react'
import { EllipsisIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { TPhoto } from '@/schema/photo'
import { Button } from '../ui/button'
import { AddToAlbumButton, DownloadButton } from './photo-btn'

export default function GalleryMasonry({ photos }: { photos: TPhotos }) {
  const containerRef = useRef(null)
  const [windowWidth, height] = useWindowSize()
  const { offset, width } = useContainerPosition(containerRef, [windowWidth, height])
  const { scrollTop, isScrolling } = useScroller(offset)
  const positioner = usePositioner({ width, columnWidth: 150, columnGutter: 12, maxColumnCount: 4 }, [photos])

  return useMasonry({
    containerRef,
    positioner,
    scrollTop,
    isScrolling,
    height,
    items: photos,
    render: MasonryPhoto,
  })
}

export function MasonryPhoto({ index, data: photo }: { index: number; data: TPhoto }) {
  const photoNavLinks = [
    { title: 'Add to Like', src: '/icons/heart-picture.svg' },
    { title: 'Share', src: '/icons/share.svg' },
  ]

  return (
    <div key={index} className="group relative bg-black">
      <div className="absolute left-0 top-1 z-10 flex w-full items-center justify-between gap-2 px-2 text-white">
        <Link
          href={`/user/${photo.user.username}`}
          className="flex items-center gap-2 overflow-hidden underline-offset-2 opacity-0 hover:underline group-hover:opacity-100"
        >
          <Image src={photo.user.profile_image.medium} alt="profile" width={16} height={16} className="border border-white/20" />
          <p className="w-full flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-sm">{photo.user.username}</p>
        </Link>

        <Popover>
          <PopoverTrigger className="p-1 opacity-0 transition-colors ease-in-out hover:bg-black/75 group-hover:opacity-100 aria-expanded:bg-black/75 aria-expanded:opacity-100">
            <EllipsisIcon size={19} />
          </PopoverTrigger>
          <PopoverContent align="end" className="w-56 space-y-1 p-1">
            <DownloadButton variant="ghost" downloadLink={photo?.links?.download} className="w-full justify-start" />
            <AddToAlbumButton />
            {photoNavLinks.map((navlink, i) => (
              <Button key={i} variant="ghost" className="w-full justify-start">
                <Image src={navlink.src} alt="icon" width={17} height={17} />
                <p>{navlink.title}</p>
              </Button>
            ))}
          </PopoverContent>
        </Popover>
      </div>

      <Link href={`/photo/${photo.slug ?? photo.id}`}>
        <Image
          src={photo.urls.small}
          alt={`${photo.alt_description}`}
          width={photo.width}
          height={photo.height}
          style={{ backgroundColor: photo.color }}
          className="0 w-full transition-opacity ease-out group-hover:opacity-85"
        />
      </Link>
    </div>
  )
}
