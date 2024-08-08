import BackButton from '@/components/back-btn'
import PhotoDetails from '@/components/photo/photo-details'
import SearchInput from '@/components/search-input'
import { getPhoto } from '@/lib/unsplash'

export default async function PhotoDetailsPage({ params }: { params: { slug: string } }) {
  const photo = await getPhoto(params.slug)
  if (!photo) return <p>no photo</p>
  return (
    <>
      <BackButton variant="ghost" className="mb-2" />
      <SearchInput placeholder="Search for different photo..." className="mb-10" />
      <PhotoDetails photo={photo} />
    </>
  )
}
