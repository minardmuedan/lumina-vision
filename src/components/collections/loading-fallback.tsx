import { Skeleton } from '../ui/skeleton'
import { CollectionsContainerUl } from './components'

export default function CollectionsLoadingFallback({ count }: { count: number }) {
  return (
    <CollectionsContainerUl>
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} className='aspect-[10/6]' />
      ))}
    </CollectionsContainerUl>
  )
}
