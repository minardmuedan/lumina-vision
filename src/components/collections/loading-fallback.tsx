import { Skeleton } from '../ui/skeleton'
import { CollectionsContainer } from './components'

export default function CollectionsLoadingFallback({ count = 12, className }: { count?: number; className?: string }) {
  return (
    <CollectionsContainer className={className}>
      {Array.from({ length: count }).map((_, i) => (
        <IndividualCollectionLoadingFallback key={i} />
      ))}
    </CollectionsContainer>
  )
}

export function IndividualCollectionLoadingFallback({ className }: { className?: string }) {
  return <Skeleton className={`aspect-[10/6] ${className}`} />
}
