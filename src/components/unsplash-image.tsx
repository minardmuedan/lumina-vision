'use client'

import { cn } from '../lib/utils'
import Image, { ImageLoaderProps } from 'next/image'
import { memo, useState } from 'react'
import { Blurhash } from 'react-blurhash'

type TImageSize = { fill?: false; height: number; width: number } | { fill: true }

const UnsplashImage = memo((props: TProps & TImageSize) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  return (
    <div
      style={{ aspectRatio: !props.fill ? props.width / props.height : undefined, backgroundColor: props.color }}
      className={cn(`w-full overflow-hidden ${props.fill ? 'absolute inset-0' : 'relative'}`, props.className)}
    >
      {props.blurHash && <Blurhash hash={props.blurHash} height='100%' width='100%' />}
      <Image
        src={props.src}
        alt={props.alt}
        quality={props.quality}
        fill
        sizes={props.sizes}
        loader={unsplashImageLoader}
        onLoad={() => setIsImageLoaded(true)}
        className={`object-cover transition-opacity ease-in ${isImageLoaded ? 'opacity-100' : 'opacity-0'} `}
      />
    </div>
  )
})

UnsplashImage.displayName = 'UnsplashImage'
export default UnsplashImage

export function unsplashImageLoader({ src, width, quality }: ImageLoaderProps) {
  const url = new URL(src)
  if (width) url.searchParams.append('w', `${width}`)
  if (quality) url.searchParams.append('q', `${quality}`)

  return url.toString()
}

type TProps = {
  blurHash: string | null
  src: string
  alt: string
  sizes: string
  color?: string
  quality?: number
  className?: string
}
