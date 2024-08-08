import InfiniteScrollCollections from '@/components/collection/inifinite-scroll-collections'
import NoResult from '@/components/no-results'
import SearchInput from '@/components/search-input'
import { getCollections } from '@/lib/unsplash'

export default async function CollectionsPage() {
  const collections = await getCollections()

  async function fetchMoreFn(page: number) {
    'use server'
    return await getCollections(page)
  }

  return (
    <div className="space-y-5">
      <SearchInput searchFor="collections" placeholder="Search for a collection..." />

      {collections ? (
        <InfiniteScrollCollections initialCollections={collections} fetchMoreFn={fetchMoreFn} />
      ) : (
        <NoResult msg="No collections found" />
      )}
    </div>
  )
}
