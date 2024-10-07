import InfiniteScrollGallery from '@/components/photos/infinite-scroll'
import { NoResult } from '@/components/ui/no-results'
import { getCollection, getCollectionPhotos } from '@/lib/unsplash/collections'

export default async function CollectionPhotos({ params }: { params: { id: string } }) {
  const [{ totalPhotos }, photos] = await Promise.all([getCollection(params.id), getCollectionPhotos(params.id, 1)])

  if (totalPhotos < 1) return <NoResult message='this collection have no photos' />
  return (
    <>
      <p className='mb-3 text-center text-sm text-muted-foreground'>{totalPhotos} photos</p>
      <InfiniteScrollGallery initialPhotos={photos} queryKey={[`collection-${params.id}-photos`]} apiEndpoint={`/unsplash/collections/${params.id}/photos`} />

      {photos.length < 9 && totalPhotos > 9 && (
        <div className='my-20 text-center'>
          <p className='font-calstavier text-2xl'>SORRY FOR INCONVINIENT</p>
          <p className='text-sm text-muted-foreground'>API does not provide more photo</p>
        </div>
      )}
    </>
  )
}
