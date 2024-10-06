import CollectionsLoadingFallback from '@/components/collections/loading-fallback'
import { pagePadding } from '@/components/pages'

export default function CollectionsLoading() {
  return (
    <div className={pagePadding}>
      <CollectionsLoadingFallback count={20} />
    </div>
  )
}
