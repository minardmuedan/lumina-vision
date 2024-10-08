import InfiniteScrollGallery from '@/components/photos/infinite-scroll'
import { NoResult } from '@/components/ui/no-results'
import { getTopic, getTopicPhotos } from '@/lib/unsplash/topics'

export default async function TopicPhotos({ params }: { params: { slug: string } }) {
  const [{ totalPhotos }, photos] = await Promise.all([getTopic(params.slug), getTopicPhotos(params.slug, 1)])

  if (totalPhotos < 1) return <NoResult message='this collection have no photos' />
  return (
    <>
      <p className='mb-3 text-center text-sm text-muted-foreground'>{totalPhotos} photos</p>
      <InfiniteScrollGallery
        initialPhotos={photos}
        queryKey={[`topic-${params.slug}-photos`]}
        apiEndpoint={`/unsplash/topics/${params.slug}/photos`}
        max={totalPhotos}
      />

      {photos.length < 9 && totalPhotos > 9 && (
        <div className='my-20 text-center'>
          <p className='font-calstavier text-2xl'>SORRY FOR INCONVINIENT</p>
          <p className='text-sm text-muted-foreground'>API does not provide more photo</p>
        </div>
      )}
    </>
  )
}
