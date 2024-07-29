import BackButton from '@/components/back-btn'
import SearchInput from '@/components/search'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Tags from '@/components/tags'
import { getUser } from '@/lib/unsplash'

export default async function UserDetailsPage({ params }: { params: { username: string } }) {
  const user = await getUser(params.username)

  const navlinks = [
    { src: '/icons/double-picture.svg', label: 'Photos', href: '/' },
    { src: '/icons/collection.svg', label: 'Collections', href: '/collections' },
    { src: '/icons/heart-picture.svg', label: 'Liked Photos', href: '/liked-photos' },
  ]

  return (
    <>
      <BackButton variant="ghost" />
      <SearchInput placeholder="Search for a different user ..." className="mt-2 w-full" />

      {user ? (
        <>
          <div className="user-details my-20 space-y-12">
            <div className="flex flex-col items-center justify-center gap-10 md:flex-row md:items-start">
              <Image src={user.profile_image.medium} alt="profile-image" height={128} width={128} />
              <UserTextDetails name={user.name} bio={user.bio} forHire={user.for_hire} location={user.location} />
              <UserSocialMedia />
            </div>

            <Tags tags={user.tags.custom} />
          </div>

          <div className="user-media space-y-5">
            <nav className="flex w-full items-center gap-3 overflow-x-auto">
              {navlinks.map((v, i) => (
                <Button key={i} variant={i > 0 ? 'outline' : 'default'} asChild>
                  <Link href={`/user/${params.username}${v.href}`} scroll={false}>
                    <Image src={v.src} alt="icon" width={19} height={19} className={`${i > 0 ? '' : 'invert'}`} />
                    <p>{v.label}</p>
                  </Link>
                </Button>
              ))}
            </nav>
            <div className="h-dvh bg-accent"></div>
          </div>
        </>
      ) : (
        <div className="flex justify-center py-10">
          <p className="text-center text-muted-foreground">no user</p>
        </div>
      )}
    </>
  )
}

//
function UserTextDetails({ name, forHire, bio, location }: { name: string; forHire: boolean; bio: string; location: string | null }) {
  return (
    <div className="flex w-full max-w-[700px] flex-1 flex-col items-center md:items-start">
      <div className="mb-2 flex w-fit gap-2">
        <h1 className="text-3xl font-medium">{name}</h1>
        <p className="text-sm">{forHire ? 'for hire' : 'not for hire'}</p>
      </div>

      <p className="mb-7 text-center text-muted-foreground md:text-start">{bio}</p>

      {location && (
        <div className="flex items-center justify-center gap-3 md:justify-start">
          <Image src="/icons/location.svg" alt="location" width={19} height={19} />
          <p>{location}</p>
        </div>
      )}
    </div>
  )
}

function UserSocialMedia() {
  return (
    <ul className="socmed flex gap-6 sm:flex-col">
      <li className="flex items-center gap-2">
        <Image src="/icons/twitter.svg" alt="instagram" width={17} height={17} />
        <p className="text-sm">elian_murray</p>
      </li>
      <li className="flex items-center gap-2">
        <Image src="/icons/instagram.svg" alt="instagram" width={17} height={17} />
        <p className="text-sm">elian_murray</p>
      </li>
    </ul>
  )
}
