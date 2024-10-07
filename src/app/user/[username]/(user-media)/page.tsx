import InfiniteScrollGallery from '@/components/photos/infinite-scroll'
import { NoResult } from '@/components/ui/no-results'
import { getUserPhotos } from '@/lib/unsplash/user'

export default async function UserPhotosPage({ params }: { params: { username: string } }) {
  const photos = await getUserPhotos(params.username, 1)
  if (!photos.length) return <NoResult message={`User does'nt have photos`} />

  return (
    <InfiniteScrollGallery initialPhotos={photos} queryKey={[`user-${params.username}-photos`]} apiEndpoint={`/unsplash/users/${params.username}/photos`} />
  )
}
