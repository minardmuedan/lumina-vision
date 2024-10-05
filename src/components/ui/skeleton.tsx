import { cn } from '@/lib/utils'

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('animate-pulse rounded-md bg-primary/10', className)} {...props}>
      <span className='sr-only'>loading skeleton</span>
    </div>
  )
}

export { Skeleton }
