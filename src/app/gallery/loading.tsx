import { pagePadding } from '@/components/pages'
import { GalleryLoadingFallback } from '@/components/photos/gallery-loading'

export default function GalleryLoading() {
  return (
    <div className={pagePadding}>
      <GalleryLoadingFallback />
    </div>
  )
}
