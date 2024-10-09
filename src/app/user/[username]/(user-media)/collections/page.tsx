import InfiniteScrollCollections from '@/components/collections/infinite-scroll'
import { NoResult } from '@/components/ui/no-results'
import { getUser, getUserCollections } from '@/lib/unsplash/user'

export default async function UserCollections({ params: { username } }: { params: { username: string } }) {
  const [{ totalCollections }, collections] = await Promise.all([getUser(username), getUserCollections(username, 1)])
  if (!collections.length) return <NoResult message={`User doesn't have collections`} />

  return (
    <InfiniteScrollCollections
      initialCollections={collections}
      queryKey={[`user-${username}collection`]}
      apiEndpoint={`/unsplash/user/${username}/collections`}
      max={totalCollections}
    />
  )
}
