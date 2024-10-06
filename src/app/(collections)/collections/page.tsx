import InfiniteScrollCollections from '@/components/collections/infinite-scroll'
import { pagePadding } from '@/components/pages'
import { getCollections } from '@/lib/unsplash/collections'

export default async function CollectionsPage() {
  const collections = await getCollections(1)

  return (
    <div className={pagePadding}>
      <InfiniteScrollCollections initialCollections={collections} />
    </div>
  )
}
