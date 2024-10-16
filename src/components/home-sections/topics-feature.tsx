import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { buttonVariants } from '../ui/button'
import UnsplashImage from '../unsplash-image'

export default function TopicsFeatureSection() {
  return (
    <section className='mx-auto flex min-h-dvh flex-col items-center justify-center gap-20 pt-40 md:flex-row md:gap-2 md:border-t-0 2xl:min-h-fit 2xl:max-w-6xl'>
      <div className='max-w-[700px] space-y-5 px-2 text-center md:flex-1 md:px-0 md:pl-5 md:text-start'>
        <h2 className='font-calstavier text-2xl md:text-3xl'>Uncover Trending Topics</h2>
        <p className='text-sm text-muted-foreground'>Stay on top of the latest photo trends and explore fresh, popular themes regularly updated</p>

        <Link href='/topics' className={buttonVariants()}>
          <p>Go to Topics</p>
          <ArrowRight size={16} strokeWidth={1.5} />
        </Link>
      </div>

      <div className='w-full overflow-hidden md:flex-1'>
        <ul className='grid translate-x-20 grid-cols-3 gap-3'>
          {topics.map((topic, i) => (
            <li key={i}>
              <div className='relative aspect-[1/1.5] overflow-hidden rounded-md bg-accent'>
                <UnsplashImage {...topic.photo} fill sizes='200px' />
              </div>
              <p className='mt-1 text-center text-muted-foreground'>{topic.title}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

const topics = [
  {
    title: 'Architecture & Interiors',
    photo: {
      src: 'https://images.unsplash.com/photo-1728343070551-d0893e207533?ixid=M3w2NjUxNzJ8MHwxfGFsbHx8fHx8fHx8fDE3MjkwNTQ1MTB8&ixlib=rb-4.0.3',
      alt: 'A very tall building with a lot of windows',
      color: '#268cc0',
      blurHash: 'LIBYN[S%Gct6T#jYIUR*I[xCr;Rk',
    },
  },
  {
    title: 'Travel',
    photo: {
      src: 'https://images.unsplash.com/photo-1716369415108-93d563d4e40a?ixid=M3w2NjUxNzJ8MHwxfGFsbHx8fHx8fHx8fDE3MjkwNTQ1ODR8&ixlib=rb-4.0.3',
      alt: 'steam rises from the ground near a mountain',
      color: '#f3f3f3',
      blurHash: 'LJG*~IIU?GE2?v-=.8E1?w?Ho#WA',
    },
  },
  {
    title: 'People',
    photo: {
      src: 'https://images.unsplash.com/photo-1728402525374-c8e013db54f3?ixid=M3w2NjUxNzJ8MHwxfGFsbHx8fHx8fHx8fDE3MjkwNTQ2OTh8&ixlib=rb-4.0.3',
      alt: 'A woman in a white top drinking from a paper cup',
      color: '#d9d9d9',
      blurHash: 'LXIOkU-;R%%M00RkM{RjkXM{%LWX',
    },
  },
]
