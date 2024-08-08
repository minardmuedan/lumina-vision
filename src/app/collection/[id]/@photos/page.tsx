import NoResult from '@/components/no-results'
import { getCollectionPhotos } from '@/lib/unsplash'
import dynamic from 'next/dynamic'

const InfiniteScrollGallery = dynamic(() => import('@/components/photo/infinite-scroll-gallery'), { ssr: false })

export default async function CollectionPhotosPage({ params }: { params: { id: string } }) {
  const collectionPhotos = await getCollectionPhotos(params.id)
  if (!collectionPhotos || collectionPhotos.length < 1)
    return (
      <div className="pt-2.5">
        <NoResult msg="No photo found" />
      </div>
    )

  async function getMoreCollectionPhotos(page: number) {
    'use server'
    return await getCollectionPhotos(params.id, page)
  }

  return (
    <section className="space-y-5 pb-5">
      <InfiniteScrollGallery initialPhotos={collectionPhotos} fetchMoreFn={getMoreCollectionPhotos} />
    </section>
  )
}
