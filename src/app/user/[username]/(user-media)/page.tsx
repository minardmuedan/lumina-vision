import InfiniteScrollGallery from '@/components/photos/infinite-scroll'
import { NoResult } from '@/components/ui/no-results'
import { getUser, getUserPhotos } from '@/lib/unsplash/user'

export default async function UserPhotosPage({ params: { username } }: { params: { username: string } }) {
  const { totalPhotos } = await getUser(username)
  const photos = await getUserPhotos(username, 1)
  if (!photos.length) return <NoResult message={`User does'nt have photos`} />

  return (
    <InfiniteScrollGallery initialPhotos={photos} queryKey={[`user-${username}-photos`]} apiEndpoint={`/unsplash/user/${username}/photos`} max={totalPhotos} />
  )
}
