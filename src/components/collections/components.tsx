import { TCollection } from '@/lib/unsplash/schema/transformedType'
import UnsplashImage from '../unsplash-image'

export function CollectionsContainerUl({ children }: { children: React.ReactNode }) {
  return <ul className='mb-2 grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4'>{children}</ul>
}

export function IndividualCollection({ collection }: { collection: TCollection }) {
  const sizes = '(min-width: 1040px) calc(25vw - 46px), (min-width: 780px) calc(33.33vw - 32px), calc(50vw - 12px)'
  return (
    <li key={collection.id} className='group relative flex aspect-[10/6] items-center justify-center overflow-hidden rounded-lg bg-black p-1'>
      <UnsplashImage {...collection.cover_photo} fill sizes={sizes} className='opacity-65' />

      <div className='text-center font-normal text-white *:z-10 *:transition-transform'>
        <p className='scale-100 group-hover:scale-0'>{collection.title}</p>
        <p className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-0 group-hover:scale-100'>
          {collection.total_photos > 2 ? collection.total_photos - 1 : collection.total_photos}+
        </p>
      </div>
    </li>
  )
}
