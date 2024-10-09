import InfiniteScrollGallery from '@/components/photos/infinite-scroll'
import { NoResult } from '@/components/ui/no-results'
import { getUser, getUserPhotos } from '@/lib/unsplash/user'

export default async function UserPhotosPage({ params: { username } }: { params: { username: string } }) {
  const [{ totalPhotos }, photos] = await Promise.all([getUser(username), getUserPhotos(username, 1)])
  if (!photos.length) return <NoResult message={`User doesn't have photos`} />

  return (
    <InfiniteScrollGallery initialPhotos={photos} queryKey={[`user-${username}-photos`]} apiEndpoint={`/unsplash/user/${username}/photos`} max={totalPhotos} />
  )
}
