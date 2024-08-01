import GalleryMasonry from '@/components/masonry'
import NoResult from '@/components/no-results'
import { getCollectionPhotos } from '@/lib/unsplash'

export default async function CollectionPhotosPage({ params }: { params: { id: string } }) {
  const collectionPhotos = await getCollectionPhotos(params.id)
  if (!collectionPhotos || collectionPhotos.length < 1) return <NoResult msg="No photo found" />

  return (
    <section className="pb-5">
      <GalleryMasonry photos={collectionPhotos} />
    </section>
  )
}
