import InfiniteScrollCollections from '@/components/collections/infinite-scroll'
import { NoResult } from '@/components/ui/no-results'
import { getUserCollections } from '@/lib/unsplash/user'

export default async function UserCollections({ params: { username } }: { params: { username: string } }) {
  const collections = await getUserCollections(username, 1)
  if (!collections.length) return <NoResult message={`User does'nt have collections`} />

  return (
    <InfiniteScrollCollections
      initialCollections={collections}
      queryKey={[`user-${username}collection`]}
      apiEndpoint={`/unsplash/users/${username}/collections`}
    />
  )
}
