import InfiniteScrollSearchUsers from '@/components/users/infinite-scroll'
import { getSearchUsers } from '@/lib/unsplash/search'

export default async function SearchUsersPage({ searchParams: { query } }: { searchParams: { query: string } }) {
  const { total, users } = await getSearchUsers(query, 1)
  return (
    <>
      <p className='mb-2 text-center text-sm text-muted-foreground'>{total} users</p>
      <InfiniteScrollSearchUsers query={query} initialUsers={users} />
    </>
  )
}
