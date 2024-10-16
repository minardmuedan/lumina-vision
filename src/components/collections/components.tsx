import { TCollection } from '@/lib/transformed-unsplash/_types'
import UnsplashImage from '../unsplash-image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export function CollectionsContainer({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('mb-2 grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4', className)}>{children}</div>
}

type IndividualCollectionProps = {
  collection: TCollection
  className?: string
  sizes?: string
}

export function IndividualCollection({
  collection,
  className,
  sizes = '(min-width: 1040px) calc(33.32vw - 58px), (min-width: 780px) calc(33.33vw - 32px), calc(50vw - 12px)',
}: IndividualCollectionProps) {
  return (
    <Link key={collection.id} href={`/collection/${collection.id}/`} className={className}>
      <div className='group relative flex aspect-[10/6] items-center justify-center overflow-hidden rounded-lg bg-black p-1'>
        <UnsplashImage {...collection.coverPhoto} fill sizes={sizes} className='opacity-65' />

        <div className='text-center font-normal text-white *:z-10 *:transition-transform'>
          <p className='scale-100 group-hover:scale-0'>{collection.title}</p>
          <p className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-0 group-hover:scale-100'>
            {collection.totalPhotos > 2 ? collection.totalPhotos - 1 + ' +' : collection.totalPhotos}
          </p>
        </div>
      </div>
    </Link>
  )
}
