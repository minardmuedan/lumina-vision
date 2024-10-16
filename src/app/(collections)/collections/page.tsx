import InfiniteScrollCollections from '@/components/collections/infinite-scroll'
import PageWrapper from '@/components/pages'
import { getCollections } from '@/lib/unsplash/collections'

export const metadata = {
  title: 'Collections - Curated Image Sets',
  description: 'Browse curated image collections and discover photos grouped by themes and categories.',
}

export default async function CollectionsPage() {
  const collections = await getCollections(1)

  return (
    <PageWrapper>
      <InfiniteScrollCollections initialCollections={collections} queryKey={['collections']} apiEndpoint='/unsplash/collections' />
    </PageWrapper>
  )
}
