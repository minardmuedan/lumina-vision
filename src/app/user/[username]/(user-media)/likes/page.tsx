import InfiniteScrollGallery from '@/components/photos/infinite-scroll'
import { NoResult } from '@/components/ui/no-results'
import { getUser, getUserLikes } from '@/lib/unsplash/user'

export default async function UserLikes({ params: { username } }: { params: { username: string } }) {
  const { totalLikes } = await getUser(username)
  const photos = await getUserLikes(username, 1)

  if (!photos.length) return <NoResult message={`User does'nt have photos`} />

  return (
    <InfiniteScrollGallery initialPhotos={photos} queryKey={[`user-${username}-likes`]} apiEndpoint={`/unsplash/user/${username}/likes`} max={totalLikes} />
  )
}
