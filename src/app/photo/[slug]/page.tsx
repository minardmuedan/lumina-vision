import { CollectionsContainer, IndividualCollection } from '@/components/collections/components'
import Icon from '@/components/icon'
import { buttonVariants } from '@/components/ui/button'
import Tags from '@/components/ui/tags'
import UnsplashImage from '@/components/unsplash-image'
import { User } from '@/components/users/components'
import { TCollection } from '@/lib/transformed-unsplash/_types'
import { getPhoto } from '@/lib/unsplash/photos'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export default async function PhotoDetailsPage({ params }: { params: { slug: string } }) {
  const photo = await getPhoto(params.slug)
  const sizes = '(min-width: 640px) 37.5vw, calc(100vw - 16px)'

  return (
    <>
      <div>
        <header className='flex justify-between'>
          <User user={photo.user} />
          <Link href={`${photo.downloadLink}`} className={cn(buttonVariants(), !photo.downloadLink ? 'pointer-events-none opacity-50' : '')} target='_blank'>
            <p>Download</p> <Icon icon='download' white />
          </Link>
        </header>
        <UnsplashImage {...photo} sizes={sizes} className='mx-auto my-3 w-full sm:max-h-dvh sm:w-auto sm:min-w-[300px]' />
        <Tags tags={photo.tags} />
      </div>

      <RelatedCollections collections={photo.relatedCollections.results.slice(0, 3)} />
    </>
  )
}

function RelatedCollections({ collections }: { collections: TCollection[] }) {
  return (
    <section className='my-20'>
      <h3 className='mb-2 text-2xl text-muted-foreground'>Related Collections</h3>
      <CollectionsContainer className='lg:grid-cols-3'>
        {collections.map((collection, i) => (
          <IndividualCollection
            key={collection.id}
            collection={collection}
            className={i === 0 ? 'col-span-2 md:col-span-1' : ''}
            sizes={i === 0 ? '(min-width: 1040px) calc(33.32vw - 58px), (min-width: 780px) calc(33.33vw - 32px), calc(100vw - 16px)' : undefined}
          />
        ))}
      </CollectionsContainer>
    </section>
  )
}
