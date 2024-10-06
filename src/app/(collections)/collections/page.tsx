import InfiniteScrollCollections from '@/components/collections/infinite-scroll'
import { getCollections } from '@/lib/unsplash/collections'

export default async function CollectionsPage() {
  const collections = await getCollections(1)

  return (
    <div className='px-2 py-3 md:px-10 lg:px-20'>
      <InfiniteScrollCollections initialCollections={collections} />
    </div>
  )
}
