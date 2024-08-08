import BackButton from '@/components/back-btn'
import NoResult from '@/components/no-results'
import Header from '@/components/page-header'
import Tags from '@/components/tags'
import { getCollectionDetails } from '@/lib/unsplash'
import { TUser } from '@/schema/user'
import Image from 'next/image'
import Link from 'next/link'

export default async function CollectionDetailsPage({ params }: { params: { id: string } }) {
  const collection = await getCollectionDetails(params.id)

  if (!collection)
    return (
      <section>
        <BackButton variant="ghost" className="mb-2" />
        <NoResult msg="Failed to get collection" />
      </section>
    )

  return (
    <>
      <section className="mb-14">
        <BackButton variant="ghost" className="mb-2" />
        <div className="flex flex-col-reverse gap-1 p-1 lg:flex-row">
          <div className="flex w-full max-w-[700px] flex-col items-center justify-center md:items-start">
            <User user={collection.user} />
            <Header title={collection.title} description={collection.description} className="mb-10 text-center md:text-start" />
            <Tags tags={collection.tags} />
          </div>

          {collection.cover_photo.urls && (
            <div className="w-full">
              <div className="relative aspect-[10/6.1] w-full overflow-hidden after:absolute after:left-0 after:top-0 after:z-10 after:h-full after:w-full after:bg-gradient-to-t after:from-background after:to-background/0 after:lg:bg-gradient-to-r">
                <Image
                  src={collection.cover_photo.urls.regular}
                  alt={`${collection.cover_photo.alt_description}`}
                  fill
                  style={{ backgroundColor: collection.cover_photo.color }}
                  className="object-cover"
                />
              </div>
            </div>
          )}
        </div>
      </section>

      <p className="mb-5 text-center text-sm text-muted-foreground">{collection.total_photos} photos</p>
    </>
  )
}

function User({ user }: { user: TUser }) {
  return (
    <Link href={`/user/${user.username}`} className="underline-offset-2 hover:underline">
      <div className="mb-4 flex items-center gap-2">
        <Image src={user.profile_image.medium} alt="profile-pic" width={28} height={28} />
        <p className="text-sm text-muted-foreground">{user.username}</p>
      </div>
    </Link>
  )
}
