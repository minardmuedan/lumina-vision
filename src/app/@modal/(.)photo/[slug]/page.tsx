import PhotoDetails from '@/components/photo-details-shared-components'
import { getPhoto } from '@/lib/unsplash'

export default async function ModalPhotoDetailsPage({ params }: { params: { slug: string } }) {
  const photo = await getPhoto(params.slug)
  if (!photo)
    return (
      <div className="flex aspect-square w-full items-center justify-center lg:max-h-[100dvh]">
        <p>Something went wrong!</p>
      </div>
    )

  return <PhotoDetails photo={photo} />
}
