import { cn } from '@/lib/utils'
import ErrorBoundary from './error-boundary'

export default function PageWrapper({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={cn('min-h-[calc(100dvh-121px)] px-2 py-3 md:min-h-dvhMinusNav md:px-10 lg:px-20', className)}>
      <ErrorBoundary>{children}</ErrorBoundary>
    </section>
  )
}
