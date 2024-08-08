import { getPhotoRelatedPhotos } from '@/lib/unsplash'
import dynamic from 'next/dynamic'

const GalleryMasonry = dynamic(() => import('@/components/photo/masonry'), { ssr: false })

export default async function PhotoRelatedPhotosPage({ params }: { params: { slug: string } }) {
  const relatedPhotos = await getPhotoRelatedPhotos(params.slug)
  if (!relatedPhotos) return <p>no photos</p>

  return <GalleryMasonry photos={relatedPhotos.results} />
}
