import BackButton from '@/components/ui/back-button'
import Tags from '@/components/ui/tags'
import UnsplashImage from '@/components/unsplash-image'
import { User } from '@/components/users'
import { getCollection } from '@/lib/unsplash/collections'

export default async function CollectionDetailsPage({ params }: { params: { id: string } }) {
  const collection = await getCollection(params.id)

  return (
    <>
      <BackButton />
      <div className='mt-3 flex flex-col-reverse items-center justify-center md:flex-row'>
        <div className='flex-1 md:py-14'>
          <header className='mb-10 max-w-[700px]'>
            <User user={collection.user} />
            <h1 className='mt-3 font-calstavier text-5xl lg:text-6xl'>{collection.title}</h1>
            {collection.description && <p className='text-sm text-muted-foreground'>{collection.description}</p>}
          </header>
          <Tags tags={collection.tags} />
        </div>

        <UnsplashImage
          {...collection.coverPhoto}
          sizes='300px'
          className='h-[75dvh] min-h-[300px] max-w-2xl flex-1 from-background to-black/0 after:absolute after:inset-0 after:bg-gradient-to-t md:after:bg-gradient-to-r'
        />
      </div>
    </>
  )
}
