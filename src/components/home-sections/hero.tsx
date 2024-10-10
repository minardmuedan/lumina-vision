import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ImageIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { HeroSlidingImage } from './components'

export default function HeroSection() {
  return (
    <>
      <section className='min-h-smDvhMinusNav flex flex-col justify-center gap-20 overflow-hidden bg-gradient-to-t from-accent to-background pt-14 md:min-h-dvhMinusNav 2xl:min-h-fit'>
        <div className='relative mx-auto flex max-w-4xl flex-col items-center text-center'>
          <h1 className='mb-2 font-calstavier text-3xl sm:text-4xl md:text-5xl'>A Canvas Where Each Image Tells a Different Stories</h1>
          <p className='text-sm text-muted-foreground md:text-base'>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>

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

        <div className='relative mx-auto w-full'>
          <HeroSlidingImage />
        </div>
      </section>

      <div className='h-20 w-20 border'></div>
    </>
  )
}
