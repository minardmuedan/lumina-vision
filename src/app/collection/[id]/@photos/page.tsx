import { getCollectionPhotos } from '@/lib/unsplash'
import dynamic from 'next/dynamic'

const GalleryMasonry = dynamic(() => import('@/components/masonry'), {
  ssr: false,
})

export default async function CollectionPhotosPage({ params }: { params: { id: string } }) {
  const collectionPhotos = await getCollectionPhotos(params.id)
  if (!collectionPhotos || collectionPhotos.length < 1)
    return (
      <div className="flex justify-center py-10">
        <p className="text-sm text-muted-foreground"> no photos</p>
      </div>
    )

  return (
    <section className="pb-5">
      <GalleryMasonry photos={collectionPhotos} />
    </section>
  )
}
