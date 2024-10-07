import ErrorBoundary from '@/components/error-boundary'
import { pagePadding } from '@/components/pages'
import BackButton from '@/components/ui/back-button'

export default function CollectionDetailsLayout({ children, collectionPhotos }: { children: React.ReactNode; collectionPhotos: React.ReactNode }) {
  return (
    <div className={pagePadding}>
      <BackButton />
      {children}

      <section className='mt-20'>
        <ErrorBoundary>{collectionPhotos}</ErrorBoundary>
      </section>
    </div>
  )
}
