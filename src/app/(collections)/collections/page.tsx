import InfiniteScrollCollections from '@/components/collections/infinite-scroll'
import PageWrapper from '@/components/pages'
import { getCollections } from '@/lib/unsplash/collections'

export default async function CollectionsPage() {
  const collections = await getCollections(1)

  return (
    <PageWrapper>
      <InfiniteScrollCollections initialCollections={collections} queryKey={['collections']} apiEndpoint='/unsplash/collections' />
    </PageWrapper>
  )
}
