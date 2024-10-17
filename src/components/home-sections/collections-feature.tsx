import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { buttonVariants } from '../ui/button'
import UnsplashImage from '../unsplash-image'

export default function CollectionsFeatureSection() {
  return (
    <section className='mx-auto flex min-h-dvh w-full flex-col items-center justify-center gap-20 px-2 pt-40 text-center md:flex-row md:gap-0 2xl:min-h-fit 2xl:max-w-6xl'>
      <div className='flex w-full flex-col gap-2 md:flex-1 md:gap-5'>
        <ul className='flex gap-2 md:gap-5'>
          <li className='w-[calc(25%-5px)] md:w-[calc(25%-12.5px)]'></li>
          <Collection collection={collections[0]} />
          <Collection collection={collections[1]} />
          <li className='w-[calc(25%-5px)] md:w-[calc(25%-12.5px)]'></li>
        </ul>
        <ul className='flex gap-2 md:gap-5'>
          <Collection collection={collections[2]} />
          <Collection collection={collections[3]} />
          <li className='w-1/2'></li>
        </ul>
        <ul className='flex gap-2 md:gap-5'>
          <li className='w-1/2'></li>
          <Collection collection={collections[4]} />
          <Collection collection={collections[5]} />
        </ul>
      </div>

      <div className='max-w-[700px] space-y-5 text-center md:flex-1 md:pr-5 md:text-end'>
        <h2 className='font-calstavier text-2xl md:text-3xl'>Explore Curated Collections</h2>
        <p className='text-sm text-muted-foreground'>
          Journey through handpicked collections, organized by style, theme, or mood for a personalized visual experience
        </p>

        <Link href='/collections' className={buttonVariants()}>
          <p>Go to Collections</p>
          <ArrowRight size={16} strokeWidth={1.5} />
        </Link>
      </div>
    </section>
  )
}

const Collection = ({ collection }: { collection: (typeof collections)[0] }) => {
  const sizes = '(min-width: 1540px) 208px, (min-width: 1480px) calc(40vw - 301px), (min-width: 780px) calc(21.91vw - 37px), calc(40vw - 12px)'

  return (
    <li className='relative grid aspect-[10/6] w-full place-items-center overflow-hidden rounded-md bg-black p-1'>
      <UnsplashImage {...collection.coverPhoto} fill sizes={sizes} className='opacity-65' />
      <p className='relative z-10 text-center font-normal text-background'>{collection.title}</p>
    </li>
  )
}

const collections = [
  {
    title: 'Dopamine',
    coverPhoto: {
      src: 'https://plus.unsplash.com/premium_photo-1671019820530-728527dec7e4?ixlib=rb-4.0.3',
      alt: 'a very colorful abstract background with lots of different colors',
      color: '#EFEFEF',
      blurHash: 'LBK]H6C#{0z=t1K4ryM_:+5YEQv*',
    },
  },
  {
    title: 'Finance',
    coverPhoto: {
      src: 'https://plus.unsplash.com/premium_photo-1679457432935-e78cb545e331?ixlib=rb-4.0.3',
      alt: 'a stack of one hundred dollar bills laying on top of each other',
      color: '#d9c073',
      blurHash: 'LENw0,s*xSxtNGkDt6ad-IWYNOV@',
    },
  },
  {
    title: 'In Neon',
    coverPhoto: {
      src: 'https://plus.unsplash.com/premium_photo-1725727550362-e5df2c571faa?ixlib=rb-4.0.3',
      alt: 'A multicolored chain on a black background',
      color: '#262626',
      blurHash: 'L9A9yXEQ0Mf+Ne^iI?9vM|of?FI@',
    },
  },
  {
    title: 'Earthbound',
    coverPhoto: {
      src: 'https://plus.unsplash.com/premium_photo-1671467857784-73e69ed7a02e?ixlib=rb-4.0.3',
      alt: 'a pile of different colored fabric on top of each other',
      color: '#EFEFEF',
      blurHash: 'L48pojr?0~OE0#t6sTE358SNnixF',
    },
  },
  {
    title: 'At Sea',
    coverPhoto: {
      src: 'https://plus.unsplash.com/premium_photo-1680831748238-1fe52ad0e3af?ixlib=rb-4.0.3',
      alt: 'a small boat floating on top of a body of water',
      color: '#407373',
      blurHash: 'LCB4~_WA0eofRit7ayay0KfP^kRk',
    },
  },
  {
    title: 'Technology',
    coverPhoto: {
      src: 'https://plus.unsplash.com/premium_photo-1668473367234-fe8a1decd456?ixlib=rb-4.0.3',
      alt: 'a close up of a white bowl with a design on it',
      color: '#EFEFEF',
      blurHash: 'LJLE$uDh~Wv~xGs:V@f+-;IoE1yD',
    },
  },
]
