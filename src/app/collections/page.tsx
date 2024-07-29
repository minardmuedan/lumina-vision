import SearchInput from '@/components/search'
import { Button } from '@/components/ui/button'
import { GridWrapperUl } from '@/components/wrapper'
import { getCollections } from '@/lib/unsplash'
import Image from 'next/image'
import Link from 'next/link'

export default async function CollectionsPage() {
  const collections = await getCollections()

  return (
    <div className="space-y-5">
      <div className="flex gap-3">
        <SearchInput placeholder="Search for a collection..." className="flex-1" />
        <Button className="gap-2">
          <p>Filter</p>
          <Image src="/icons/filter.svg" alt="filter-icon" width={19} height={19} className="invert" />
        </Button>
      </div>

      {collections ? (
        <GridWrapperUl className="pb-5">
          {collections.map((collection) => (
            <li key={collection.id} className="group aspect-[2/1] w-full overflow-hidden rounded-xl bg-black">
              <Link href={`/collection/${collection.id}`} className="relative flex size-full items-center justify-center p-2">
                <p className="z-10 text-center text-background transition-transform ease-in group-hover:scale-0">{collection.title}</p>
                <p className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 scale-0 text-background transition-transform ease-out group-hover:scale-100">
                  {collection.total_photos - 1}+
                </p>

                <Image
                  src={collection.cover_photo.urls.small}
                  alt={`${collection.cover_photo.description}`}
                  fill
                  style={{ backgroundColor: collection.cover_photo.color }}
                  sizes="(min-width: 1560px) 335px, (min-width: 1040px) 22vw, (min-width: 780px) calc(33.33vw - 40px), (min-width: 640px) calc(33.33vw - 24px), calc(50vw - 24px)"
                  className="object-cover opacity-75"
                />
              </Link>
            </li>
          ))}
        </GridWrapperUl>
      ) : (
        <div className="flex w-full justify-center py-10">
          <p className="text-muted-foreground">no collections</p>
        </div>
      )}
    </div>
  )
}
