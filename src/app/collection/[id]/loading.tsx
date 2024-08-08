import BackButton from '@/components/back-btn'
import { TagsLoadingFallback } from '@/components/tags'
import { Skeleton } from '@/components/ui/skeleton'

export default function CollectionDetailsLoadingFallback() {
  return (
    <section className="loading-page pt-2">
      <BackButton disabled variant="ghost" className="mb-2" />
      <div className="mb-14 flex flex-col-reverse gap-1 p-1 lg:flex-row">
        <div className="flex max-w-fit flex-1 flex-col items-center justify-center md:items-start">
          <User />
          <Header />
          <TagsLoadingFallback />
        </div>

        <div className="flex-1">
          <div className="aspect-[10/6.1] w-full bg-gradient-to-t from-background from-10% to-accent lg:bg-gradient-to-r"></div>
        </div>
      </div>

      <Skeleton className="mx-auto mb-5 h-6 w-20" />
    </section>
  )
}

export function User() {
  return (
    <div className="mb-4 flex items-center gap-2">
      <Skeleton className="size-8" />
      <Skeleton className="h-5 w-36" />
    </div>
  )
}

export function Header() {
  return (
    <header className="mb-10 flex w-full flex-col items-center gap-2 md:items-start">
      <Skeleton className="h-9 w-72 sm:h-10 md:h-12" />
      <div className="description mb-7 w-full space-y-1">
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <Skeleton key={i} className={`h-5 md:h-6 ${i == 2 ? 'mx-auto w-3/4 md:mx-0' : 'w-full'}`} />
          ))}
      </div>
    </header>
  )
}
