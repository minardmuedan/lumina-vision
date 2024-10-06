import ErrorBoundary from '@/components/error-boundary'
import { pagePadding } from '@/components/pages'

export default function PhotoDetailsLayout({ children, relatedPhotos }: { children: React.ReactNode; relatedPhotos: React.ReactNode }) {
  return (
    <div className={pagePadding}>
      {children}

      <section>
        <h3 className='mb-2 text-2xl text-muted-foreground'>Related Photos</h3>
        <ErrorBoundary className='min-h-fit py-10'>{relatedPhotos}</ErrorBoundary>
      </section>
    </div>
  )
}
