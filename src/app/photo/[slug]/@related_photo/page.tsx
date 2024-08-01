import GalleryMasonry from '@/components/masonry'
import { getPhotoRelatedPhotos } from '@/lib/unsplash'

export default async function PhotoRelatedPhotosPage({ params }: { params: { slug: string } }) {
  const relatedPhotos = await getPhotoRelatedPhotos(params.slug)
  if (!relatedPhotos) return <p>no photos</p>

  return <GalleryMasonry photos={relatedPhotos.results} />
}
