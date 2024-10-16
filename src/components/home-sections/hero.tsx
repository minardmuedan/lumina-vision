import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ImageIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { HeroSlidingImage } from './components'

export default function HeroSection() {
  return (
    <section className='mx-auto flex min-h-smDvhMinusNav flex-col items-center justify-center gap-20 overflow-hidden bg-gradient-to-t from-accent to-background pt-14 md:min-h-dvhMinusNav 2xl:min-h-fit 2xl:max-w-6xl'>
      <div className='relative flex max-w-3xl flex-col items-center text-center'>
        <h1 className='mb-2 px-2 font-calstavier text-3xl sm:text-4xl'>A CANVAS WHERE EACH IMAGE TELLS A DIFFERENT STORIES</h1>
        <p className='text-wrap px-2 text-sm text-muted-foreground'>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>

        <Link href='/gallery' className={cn(buttonVariants(), 'mt-5 w-36')}>
          <p>Gallery</p>
          <ImageIcon size={16} strokeWidth={2} />
        </Link>

        <Image
          src='/home-icons/minimal-abstract 1.png'
          alt='minimal abstract'
          height={300}
          width={200}
          className='absolute -left-28 top-1/2 -translate-y-1/2 opacity-10'
        />
        <Image
          src='/home-icons/minimal-abstract 2.png'
          alt='minimal abstract'
          height={300}
          width={200}
          className='absolute -right-28 top-1/2 -translate-y-1/2 opacity-10'
        />
      </div>

      <HeroSlidingImage imageSlides={imageSlides} />
    </section>
  )
}

const imageSlides = [
  {
    src: 'https://images.unsplash.com/photo-1531347058246-6dfef49b7b7b?ixid=M3w1NzY3MjZ8MHwxfGFsbHx8fHx8fHx8fDE3Mjg1Njg5OTd8&ixlib=rb-4.0.3',
    alt: 'clipped book page',
    color: '#d9d9d9',
    blurHash: 'LGPZouxt-;D%~qNGD%?bM{t8WVRj',
  },
  {
    src: 'https://images.unsplash.com/photo-1472157592780-9e5265f17f8f?ixid=M3w1NzY3MjZ8MHwxfGFsbHx8fHx8fHx8fDE3Mjg1NjkxMjV8&ixlib=rb-4.0.3',
    alt: 'brown tabby cat sitting on bar stool',
    color: '#f3f3f3',
    blurHash: 'LXQ9[*t7_NM{%gj[Mxay-;WBD%t8',
  },
  {
    src: 'https://images.unsplash.com/photo-1585692237961-79dec47c444b?ixid=M3w1NzY3MjZ8MHwxfGFsbHx8fHx8fHx8fDE3Mjg1Njk0NTZ8&ixlib=rb-4.0.3',
    alt: 'white bible on white textile',
    color: '#a6a6c0',
    blurHash: 'LSHU^ZV?IAM_8^MwRitR9Gfk%Ms;',
  },
  {
    src: 'https://images.unsplash.com/photo-1516961642265-531546e84af2?ixid=M3w1NzY3MjZ8MHwxfGFsbHx8fHx8fHx8fDE3Mjg1Njg1ODR8&ixlib=rb-4.0.3',
    alt: 'black and gray Canon camera on white surface',
    color: '#f3f3f3',
    blurHash: 'LFQch%WB~qs:_3ayD%ayxuofayWB',
  },
  {
    src: 'https://images.unsplash.com/photo-1574201635302-388dd92a4c3f?ixid=M3w1NzY3MjZ8MHwxfGFsbHx8fHx8fHx8fDE3Mjg1Njk3MDV8&ixlib=rb-4.0.3',
    alt: 'person wearing grey knit sweater',
    color: '#d9d9d9',
    blurHash: 'LCMtaN?v?wof~qM{RPoMtS%NMxWB',
  },
  {
    src: 'https://images.unsplash.com/photo-1531875456634-3f5418280d20?ixid=M3w1NzY3MjZ8MHwxfGFsbHx8fHx8fHx8fDE3Mjg1Njk3NDd8&ixlib=rb-4.0.3',
    alt: 'green leafed plant',
    color: '#f3f3f3',
    blurHash: 'LQOD,zWp~qWB?bj?Rjt8_3ay9Fof',
  },
  {
    src: 'https://images.unsplash.com/photo-1577109333987-de03cc86e67f?ixid=M3w1NzY3MjZ8MHwxfGFsbHx8fHx8fHx8fDE3Mjg1NzM0NDB8&ixlib=rb-4.0.3',
    alt: 'a black and white photo of a curved ceiling',
    color: '#404040',
    blurHash: 'LKIh:I%MWBay4TRijsay?vofV@ae',
  },
  {
    src: 'https://images.unsplash.com/photo-1500145588304-deb802b4af76?ixid=M3w1NzY3MjZ8MHwxfGFsbHx8fHx8fHx8fDE3Mjg1NzYwNTR8&ixlib=rb-4.0.3',
    alt: 'gray clock tower digital wallpaper',
    color: '#f3f3f3',
    blurHash: 'LISY{qt7~qayt7fQayj[_3WB4nof',
  },
  {
    src: 'https://images.unsplash.com/reserve/LJIZlzHgQ7WPSh5KVTCB_Typewriter.jpg?ixid=M3w1NzY3MjZ8MHwxfGFsbHx8fHx8fHx8fDE3Mjg2MTUwOTJ8&ixlib=rb-4.0.3',
    alt: 'black Fayorit typewriter with printer paper',
    color: '#d9d9d9',
    blurHash: 'LIOWvp-;~qM{~qaxM{of_3M{00xu',
  },
]
