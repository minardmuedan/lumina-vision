import BackButton from '@/components/ui/back-button'
import UnsplashImage from '@/components/unsplash-image'
import { getCollection } from '@/lib/unsplash/collections'

export default async function CollectionDetailsPage({ params }: { params: { id: string } }) {
  const collection = await getCollection(params.id)

  return (
    <div>
      <BackButton />
      <header className='max-w-[700px] space-y-2'>
        <h1 className='font-calstavier text-3xl sm:text-4xl md:text-6xl'>{collection.title}</h1>
        {collection.description && <p className='text-sm text-muted-foreground md:text-base'>{collection.description}</p>}
      </header>

      <UnsplashImage {...collection.coverPhoto} sizes='300px' className='w-60' />
    </div>
  )
}
