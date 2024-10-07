import { CollectionsContainer } from '@/components/collections/components'
import { IndividualCollectionLoadingFallback } from '@/components/collections/loading-fallback'
import Icon from '@/components/icon'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { TagsLoadingFallback } from '@/components/ui/tags'
import { UserLoadingFallback } from '@/components/users'

export default function PhotoDetailsLoading() {
  return (
    <>
      <div>
        <header className='flex justify-between'>
          <UserLoadingFallback />
          <Button disabled>
            <p>Download</p>
            <Icon icon='download' white />
          </Button>
        </header>
        <Skeleton style={{ aspectRatio: 0.833333 / 1 }} className='mx-auto my-3 w-full sm:max-h-dvh sm:w-auto' />
        <TagsLoadingFallback count={5} />
      </div>

      <RelatedCollections />
    </>
  )
}

function RelatedCollections() {
  return (
    <section className='my-20'>
      <h3 className='mb-2 text-2xl text-muted-foreground'>Related Collections</h3>
      <CollectionsContainer className='lg:grid-cols-3'>
        {Array.from({ length: 3 }).map((_, i) => (
          <IndividualCollectionLoadingFallback key={i} className={i === 0 ? 'col-span-2 md:col-span-1' : ''} />
        ))}
      </CollectionsContainer>
    </section>
  )
}
