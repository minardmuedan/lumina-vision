import GalleryMasonry from '@/components/masonry'
import NoResult from '@/components/no-results'
import { getPhotoRelatedPhotos } from '@/lib/unsplash'

export default async function PhotoRelatedPhotosPage({ params }: { params: { slug: string } }) {
  const relatedPhotos = await getPhotoRelatedPhotos(params.slug)
  if (!relatedPhotos) return <NoResult msg="no related photos" />

  return <GalleryMasonry photos={relatedPhotos.results} />
}
