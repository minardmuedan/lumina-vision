import InfiniteScrollCollections from '@/components/collections/infinite-scroll'
import { getSearchCollections } from '@/lib/unsplash/search'
import { SearchNoResult } from '../_components'

export default async function SearchCollectionsPage({ searchParams: { query } }: { searchParams: { query: string } }) {
  const { total, collections } = await getSearchCollections(query, 1)

  if (!collections.length) return <SearchNoResult />

  return (
    <>
      <p className='mb-2 text-center text-sm text-muted-foreground'>{total} collections</p>
      <InfiniteScrollCollections
        initialCollections={collections}
        queryKey={[`search-${query}-collections`]}
        apiEndpoint={`/unsplash/search/collections?query=${query}`}
        hasSearchParams
        max={total}
      />
    </>
  )
}
