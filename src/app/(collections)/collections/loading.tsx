import CollectionsLoadingFallback from '@/components/collections/loading-fallback'
import PageWrapper from '@/components/pages'

export default function CollectionsLoading() {
  return (
    <PageWrapper>
      <CollectionsLoadingFallback />
    </PageWrapper>
  )
}
