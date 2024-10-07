import InfiniteScrollGallery from '@/components/photos/infinite-scroll'
import { NoResult } from '@/components/ui/no-results'
import { getUserLikes } from '@/lib/unsplash/user'

export default async function UserLikes({ params }: { params: { username: string } }) {
  const photos = await getUserLikes(params.username, 1)
  if (!photos.length) return <NoResult message={`User does'nt have photos`} />

  return <InfiniteScrollGallery initialPhotos={photos} queryKey={[`user-${params.username}-likes`]} apiEndpoint={`/unsplash/users/${params.username}/likes`} />
}
