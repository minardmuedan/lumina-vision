import { CollectionsContainer, IndividualCollection } from '@/components/collections/components'
import { Button } from '@/components/ui/button'
import Tags from '@/components/ui/tags'
import UnsplashImage from '@/components/unsplash-image'
import { TCollection } from '@/lib/transformed-unsplash/_types'
import { getPhoto } from '@/lib/unsplash/photos'

export default async function PhotoDetailsPage({ params }: { params: { slug: string } }) {
  await new Promise(res => setTimeout(res, 5000))
  const photo = await getPhoto(params.slug)
  const sizes = '(min-width: 640px) 37.5vw, calc(100vw - 16px)'

  return (
    <>
      <div>
        <header className='flex justify-between border'>
          <div></div>
          <Button>Download</Button>
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
