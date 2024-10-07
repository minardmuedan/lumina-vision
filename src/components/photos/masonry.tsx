'use client'

import { TPhoto } from '@/lib/transformed-unsplash/_types'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { MasonryPhotoAlbum } from 'react-photo-album'
import 'react-photo-album/masonry.css'
import Icon from '../icon'
import { buttonVariants } from '../ui/button'
import UnsplashImage from '../unsplash-image'
import { GalleryLoadingFallback } from './gallery-loading'

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
          <div key={index} className='group relative w-full'>
            <div className='absolute right-0 top-0 z-10 rounded-bl-md bg-background opacity-0 group-hover:opacity-100'>
              <Link
                href={`${photo.downloadLink}`}
                target='_blank'
                className={cn(
                  buttonVariants({ variant: 'ghost', size: 'icon' }),
                  `scale-0 transition-transform delay-100 ease-out group-hover:scale-100 ${!photo.downloadLink ? 'pointer-events-none opacity-50' : ''}`,
                )}
              >
                <Icon icon='download' />
                <span className='sr-only'>download this photo</span>
              </Link>
              <span style={{ backgroundImage: 'radial-gradient(circle at 0% 100%, transparent, 8px, white 8px)' }} className='absolute -left-2 top-0 size-2' />
              <span
                style={{ backgroundImage: 'radial-gradient(circle at 0% 100%, transparent, 8px, white 8px)' }}
                className='absolute -bottom-2 -right-0 size-2'
              />
            </div>

            <Link key={index} href={`/photo/${photo.slug}`} className='w-full'>
              <UnsplashImage {...photo} sizes={sizes} className='rounded-md' />
            </Link>
          </div>
        ),
      }}
    />
  )
}
