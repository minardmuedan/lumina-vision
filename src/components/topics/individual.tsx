import { unsplashImageLoader } from '@/components/unsplash-image'
import { TPreviewPhoto, TTopic } from '@/lib/transformed-unsplash/_types'
import Image from 'next/image'
import Link from 'next/link'

export default function IndividualTopic({ topic }: { topic: TTopic }) {
  return (
    <Link
      href={`/topic/${topic.slug}`}
      className='group relative flex aspect-[10/6] overflow-hidden rounded-lg rounded-bl-none transition-opacity ease-out *:flex-1 hover:opacity-75'
      prefetch={false}
    >
      <div className='relative bg-accent'>
        <TopicImage photo={topic.previewPhotos[0]} />
      </div>

      <ul className='flex flex-col *:flex-1'>
        {topic.previewPhotos[1] && (
          <li className='relative bg-accent'>
            <TopicImage photo={topic.previewPhotos[1]} />
          </li>
        )}
        <li className='relative bg-accent'>
          <div className='absolute inset-0 z-10 grid place-items-center bg-black/50'>
            <p className='text-white'>{topic.totalPhotos - 1} +</p>
          </div>
          <TopicImage photo={topic.previewPhotos[topic.previewPhotos.length - 1]} />
        </li>
      </ul>

      <div className='absolute bottom-0 left-0 z-20 rounded-tr-md bg-white'>
        <p className='px-1.5 py-0.5 text-sm text-muted-foreground'>{topic.title}</p>
        <span style={{ backgroundImage: 'radial-gradient(circle at 100% 0%, transparent, 8px, white 8px)' }} className='absolute -top-2 left-0 size-2' />
        <span style={{ backgroundImage: 'radial-gradient(circle at 100% 0%, transparent, 8px, white 8px)' }} className='absolute -right-2 bottom-0 size-2' />
      </div>
    </Link>
  )
}

export function TopicImage({ photo }: { photo: TPreviewPhoto }) {
  const sizes = '(min-width: 1040px) calc(12.5vw - 26px), (min-width: 780px) calc(16.67vw - 19px), calc(25vw - 8px)'
  return <Image src={photo.src} alt={photo.slug} fill sizes={sizes} loader={unsplashImageLoader} className='bg-accent object-cover' />
}
