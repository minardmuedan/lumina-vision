import ErrorBoundary from '@/components/error-boundary'
import { pagePadding } from '@/components/pages'

export default function CollectionDetailsLayout({ children, collectionPhotos }: { children: React.ReactNode; collectionPhotos: React.ReactNode }) {
  return (
    <div className={pagePadding}>
      {children}

      <section className='mt-20'>
        <ErrorBoundary>{collectionPhotos}</ErrorBoundary>
      </section>
    </div>
  )
}
