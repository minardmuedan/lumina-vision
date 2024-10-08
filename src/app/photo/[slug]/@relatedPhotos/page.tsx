import GalleryMasonry from '@/components/photos/masonry'
import { getRelatedPhotos } from '@/lib/unsplash/photos'

export default async function RelatedPhotosPage({ params }: { params: { slug: string } }) {
  const relatedPhotos = await getRelatedPhotos(params.slug)
  return <GalleryMasonry photos={relatedPhotos.results} />
}
