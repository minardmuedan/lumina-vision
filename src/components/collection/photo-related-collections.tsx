import Tags from '@/components/tags'
import { TCollection } from '@/schema/collection'
import Image from 'next/image'
import Link from 'next/link'

export default function PhotoRelatedCollectionSection({ relatedCollections }: { relatedCollections: TCollection[] }) {
  return (
    <section className="mt-20 w-full">
      <p className="mb-3 font-calstavier text-2xl">Related Collection</p>
      <ul className="flex flex-col gap-8 md:flex-row lg:gap-14">
        {relatedCollections.map((collection) => (
          <li key={collection.id} className="flex flex-1 flex-col justify-between gap-5">
            <div>
              <Link href={`/collection/${collection.id}`} className="peer transition-opacity ease-out hover:opacity-75">
                <div className="mb-3 flex aspect-[10/6.1] gap-2">
                  <div className="relative flex-1 bg-accent">
                    <Image
                      src={collection.preview_photos[0]?.urls.small}
                      alt="preview-photo"
                      fill
                      sizes="(min-width: 1560px) 211px, (min-width: 1040px) calc(14.8vw - 17px), (min-width: 780px) calc(16.67vw - 28px), calc(50vw - 24px)"
                      className="object-cover"
                    />
                  </div>
                  {collection.preview_photos.length > 2 && (
                    <ul className="flex flex-1 flex-col gap-2">
                      <li className="relative flex-1 bg-accent">
                        <Image
                          src={collection.preview_photos[1]?.urls.small}
                          alt="preview-photo"
                          fill
                          sizes="(min-width: 1560px) 211px, (min-width: 1040px) calc(14.8vw - 17px), (min-width: 780px) calc(16.67vw - 28px), calc(50vw - 24px)"
                          className="object-cover"
                        />
                      </li>
                      <li className="relative flex flex-1 items-center justify-center bg-black">
                        <p className="z-10 font-normal text-background">
                          {collection.total_photos > 3 ? collection.total_photos - 2 + '+' : collection.total_photos}
                        </p>
                        <Image
                          src={collection.preview_photos[2]?.urls.small}
                          alt="preview-photo"
                          fill
                          sizes="(min-width: 1560px) 211px, (min-width: 1040px) calc(14.8vw - 17px), (min-width: 780px) calc(16.67vw - 28px), calc(50vw - 24px)"
                          className="bg-accent object-cover opacity-75"
                        />
                      </li>
                    </ul>
                  )}
                </div>
              </Link>

              <Link href={`/collection/${collection.id}`} className="font-normal transition-opacity ease-out hover:opacity-75 peer-hover:opacity-75">
                {collection.title}
              </Link>
              <p className="w-fit text-sm text-muted-foreground">
                by:{' '}
                <Link href={`/user/${collection.user.username}`} className="underline-offset-2 hover:underline">
                  {collection.user.name}
                </Link>
              </p>
            </div>

            <Tags tags={collection.tags.slice(0, 3)} />
          </li>
        ))}
      </ul>
    </section>
  )
}
