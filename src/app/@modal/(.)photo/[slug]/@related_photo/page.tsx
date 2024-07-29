import NoResult from '@/components/no-results'
import { getPhotoRelatedPhotos } from '@/lib/unsplash'
import dynamic from 'next/dynamic'

const GalleryMasonry = dynamic(() => import('@/components/masonry'), {
  ssr: false,
})

export default async function PhotoRelatedPhotosPage({ params }: { params: { slug: string } }) {
  const relatedPhotos = await getPhotoRelatedPhotos(params.slug)
  if (!relatedPhotos) return <NoResult msg="no related photos" />

  return <GalleryMasonry photos={relatedPhotos.results} />
}
