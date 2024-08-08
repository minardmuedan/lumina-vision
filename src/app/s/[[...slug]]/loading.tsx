import SearchInput from '@/components/search-input'
import { Skeleton } from '@/components/ui/skeleton'

export default function SearchResultLoadingFallback() {
  return (
    <div className="loading-page w-full space-y-14">
      <SearchInput placeholder="Search for anything..." disabled />

      <div className="space-y-2">
        <Skeleton className="h-9 w-72 sm:h-10 md:h-12" />
        <Skeleton className="h-5 w-40 md:h-6" />
      </div>

      <nav className="flex w-full items-center gap-3 overflow-x-auto">
        {[105.39, 134.16, 145.41].map((v, i) => (
          <Skeleton key={i} style={{ width: `${v}px` }} className="h-10" />
        ))}
      </nav>
    </div>
  )
}
