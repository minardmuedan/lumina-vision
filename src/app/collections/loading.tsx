import SearchInput from '@/components/search-input'
import { Skeleton } from '@/components/ui/skeleton'
import { GridWrapperUl } from '@/components/wrapper'

export default function CollectionLoadingFallback() {
  return (
    <div className="loading-page">
      <SearchInput disabled placeholder="Search for a collection..." />

      <GridWrapperUl>
        {Array(20)
          .fill(0)
          .map((_, i) => (
            <li key={i}>
              <Skeleton className="aspect-[2/1] w-full" />
            </li>
          ))}
      </GridWrapperUl>
    </div>
  )
}
