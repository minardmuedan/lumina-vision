import Tags from '@/components/ui/tags'
import UnsplashImage from '@/components/unsplash-image'
import { User } from '@/components/users/components'
import { getCollection } from '@/lib/unsplash/collections'

type Props = { params: { id: string } }

export async function generateMetadata({ params }: Props) {
  const collection = await getCollection(params.id)
  return { title: `${collection.title} - Collection`, description: `${collection.description}` }
}

export default async function CollectionDetailsPage({ params }: Props) {
  const collection = await getCollection(params.id)

  return (
    <div className='mt-3 flex flex-col-reverse items-center justify-center md:flex-row'>
      <div className='flex-1'>
        <User user={collection.user} />
        <p className='mt-2 font-calstavier text-5xl'>{collection.title}</p>
        {collection.description && <p className='text-sm text-muted-foreground'>{collection.description}</p>}
        <Tags tags={collection.tags} className='mt-10' />
      </div>

      <UnsplashImage
        {...collection.coverPhoto}
        sizes='(min-width: 1040px) calc(50vw - 80px), (min-width: 780px) calc(50vw - 40px), calc(100vw - 16px)'
        className='max-h-[50dvh] min-h-96 w-full flex-1 rounded-md after:absolute after:inset-0 after:bg-gradient-to-t after:from-background after:to-white/0 after:md:bg-gradient-to-r'
      />
    </div>
  )
}
