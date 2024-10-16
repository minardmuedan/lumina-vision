import { SearchIcon } from 'lucide-react'
import UnsplashImage from '../unsplash-image'

export default function SearchFeatureSection() {
  return (
    <section className='mx-auto flex min-h-dvh w-full flex-col items-center justify-center px-2 pt-20 text-center 2xl:min-h-fit 2xl:max-w-6xl'>
      <h2 className='font-calstavier text-2xl md:text-3xl'>Discover Art Through Search</h2>
      <p className='my-5 text-sm text-muted-foreground'>
        Uncover incredible photos by entering keywords or browsing related tags. Dive into new moments instantly
      </p>
      <div className='flex h-9 w-full max-w-[700px] items-center justify-between rounded-md border bg-accent px-4 text-muted-foreground'>
        <p className='text-sm'>Space, Galaxy</p>
        <SearchIcon size={16} strokeWidth={1.5} />
      </div>

      <div className='mt-20 flex w-full flex-col gap-2 md:flex-row md:px-20'>
        <ul className='flex w-full gap-2'>
          {Array.from({ length: 3 }).map((_, i) => (
            <li key={i} className='relative aspect-[1/1.5] w-full overflow-hidden rounded-md bg-accent'>
              <UnsplashImage {...images[i]} sizes='(min-width: 1540px) 156px, (min-width: 780px) calc(16.62vw - 36px), calc(33.48vw - 11px)' fill />
            </li>
          ))}
        </ul>

        <ul className='flex w-full gap-2'>
          {Array.from({ length: 3 }).map((_, i) => (
            <li key={i + 3} className='relative aspect-[1/1.5] w-full overflow-hidden rounded-md bg-accent'>
              <UnsplashImage {...images[i + 3]} sizes='(min-width: 1540px) 156px, (min-width: 780px) calc(16.62vw - 36px), calc(33.48vw - 11px)' fill />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

const images = [
  {
    src: 'https://images.unsplash.com/photo-1708112292872-fd5612affa79?ixid=M3w1NzY3MjZ8MHwxfGFsbHx8fHx8fHx8fDE3MjkwMDU0MDJ8&ixlib=rb-4.0.3',
    alt: 'the pillars of the pillars of stars in the sky',
    color: '#405973',
    blurHash: 'L99*Dg-74TNfRWXTrVVrn2W;XUV[',
  },
  {
    src: 'https://plus.unsplash.com/premium_photo-1690571200236-0f9098fc6ca9?ixid=M3w2NjUxNzJ8MHwxfGFsbHx8fHx8fHx8fDE3MjkwMDYyNzV8&ixlib=rb-4.0.3',
    alt: "an artist's impression of a black hole in space",
    color: '#262626',
    blurHash: 'LG8D@SWV0Jj[ofWVWBoL4nj[?bfk',
  },
  {
    src: 'https://plus.unsplash.com/premium_photo-1678832578846-03a3c798262c?ixid=M3w2NjUxNzJ8MHwxfGFsbHx8fHx8fHx8fDE3MjkwMDYzMTJ8&ixlib=rb-4.0.3',
    alt: 'a red and blue background with a black background',
    color: '#260c0c',
    blurHash: 'LPFOfuQ,Kixa.Tv~XSaywcNGR*ay',
  },
  {
    src: 'https://images.unsplash.com/photo-1608178398319-48f814d0750c?ixid=M3w2NjUxNzJ8MHwxfGFsbHx8fHx8fHx8fDE3MjkwMDYzMzN8&ixlib=rb-4.0.3',
    alt: 'purple and black galaxy illustration',
    color: '#262626',
    blurHash: 'LKA+B@$l1EEJWBa#j]kB0^NZ-D$,',
  },
  {
    src: 'https://images.unsplash.com/photo-1707058665477-560297ffe913?ixid=M3w1NzY3MjZ8MHwxfGFsbHx8fHx8fHx8fDE3MjkwMDU0NjR8&ixlib=rb-4.0.3',
    alt: 'an image of a very large and colorful object in the sky',
    color: '#262626',
    blurHash: 'LNB3sgNG0Jxuxut8RPM{9Yt7-pRj',
  },
  {
    src: 'https://images.unsplash.com/photo-1518141532615-4305c9f914c9?ixid=M3w1NzY3MjZ8MHwxfGFsbHx8fHx8fHx8fDE3MjkwMDUyMjZ8&ixlib=rb-4.0.3',
    alt: 'lunar eclipse',
    color: '#262626',
    blurHash: 'L138;jfQ00ayj[IUay%M00ay~qof',
  },
]
