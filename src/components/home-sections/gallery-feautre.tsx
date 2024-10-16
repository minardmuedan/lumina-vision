import { formatPhotos } from '@/lib/transformed-unsplash/photos'
import { unsplashFetch } from '@/lib/unsplash'
import { TUnsplashPhoto } from '@/lib/unsplash/types/photo'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { buttonVariants } from '../ui/button'
import UnsplashImage from '../unsplash-image'

export default async function GalleryFeatureSection() {
  const photos = formatPhotos(await unsplashFetch<TUnsplashPhoto[]>('/photos?page=1&per_page=20'))

  return (
    <section className='relative mx-auto mb-20 px-2 pb-1 pt-40 md:px-10 lg:px-20 2xl:max-w-6xl'>
      <ul className='columns-4 gap-2 md:columns-6'>
        {photos.map(photo => (
          <li key={photo.id} className='mb-2 overflow-hidden rounded-sm'>
            <UnsplashImage
              {...photo}
              sizes='(min-width: 1540px) 159px, (min-width: 1040px) calc(16.67vw - 33px), (min-width: 780px) calc(16.67vw - 20px), calc(25vw - 10px)'
            />
          </li>
        ))}
      </ul>

      <div className='absolute bottom-0 left-0 flex w-full flex-col items-center gap-5 bg-gradient-to-t from-background from-65% to-background/0 px-2 pb-20 pt-40 text-center'>
        <h2 className='font-calstavier text-2xl md:text-3xl'>Beyond the Horizon</h2>
        <p className='text-sm text-muted-foreground'>Explore more stunning images that captivate and inspire </p>

        <Link href='/gallery' className={buttonVariants()}>
          <p>Go to Gallery</p>
          <ArrowRight size={16} strokeWidth={1.5} />
        </Link>
      </div>
    </section>
  )
}
