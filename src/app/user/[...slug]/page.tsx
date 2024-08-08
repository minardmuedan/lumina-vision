import BackButton from '@/components/back-btn'
import NoResult from '@/components/no-results'
import SearchInput from '@/components/search-input'
import Tags from '@/components/tags'
import { Button } from '@/components/ui/button'
import { getUser } from '@/lib/unsplash'
import { TSocial } from '@/schema/user'
import { MapPin } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default async function UserDetailsPage({ params }: { params: { slug: string[] } }) {
  const user = await getUser(params.slug[0])
  const navlinks = [
    {
      label: 'Photos',
      src: '/icons/double-picture.svg',
      href: `/user/${params.slug[0]}`,
      total: user?.total_photos ?? 0,
      isActive: params.slug[1] == 'collections' || params.slug[1] == 'likes' ? false : true,
    },
    {
      label: 'Collections',
      src: '/icons/collection.svg',
      href: `/user/${params.slug[0]}/collections`,
      total: user?.total_collections ?? 0,
      isActive: params.slug[1] == 'collections',
    },
    {
      label: 'Likes',
      src: '/icons/heart-picture.svg',
      href: `/user/${params.slug[0]}/likes`,
      total: user?.total_likes ?? 0,
      isActive: params.slug[1] == 'likes',
    },
  ]

  return (
    <div>
      <BackButton variant="ghost" className="mb-2" />
      <SearchInput placeholder="Search for different user" searchFor="users" />

      {user ? (
        <>
          <div className="mt-20 flex flex-col items-center justify-center gap-10 md:flex-row md:items-start">
            <Image src={user.profile_image.large} alt="profile" width={128} height={128} />

            <div className="w-full flex-1 text-center sm:max-w-[700px] md:text-start">
              <h1 className="mb-1 text-3xl">{user.name}</h1>
              <p className="text-muted-foreground">{user.bio ?? 'no bio'}</p>

              {user.location && (
                <address className="mt-5 flex items-center gap-2">
                  <MapPin size={19} />
                  <p>{user.location}</p>
                </address>
              )}
            </div>

            <UserSocial social={user.social} />
          </div>

          {user.tags?.custom.length > 0 && (
            <div className="mt-10">
              <p className="mb-2 text-center text-sm text-foreground/50">Interest</p>
              <Tags tags={user.tags.custom} />
            </div>
          )}

          <nav className="mt-20 flex items-center gap-3 overflow-x-auto">
            {navlinks.map((navlink, i) => (
              <Button key={i} variant={navlink.isActive ? 'default' : 'ghost'} asChild>
                <Link href={navlink.href} scroll={false}>
                  <Image src={navlink.src} alt="icon" width={19} height={19} className={`${navlink.isActive ? 'invert' : 'opacity-75'}`} />
                  <p className={`${navlink.isActive ? '' : 'text-muted-foreground'}`}>
                    {navlink.label} {navlink.total}
                  </p>
                </Link>
              </Button>
            ))}
          </nav>
        </>
      ) : (
        <div className="mt-5">
          <NoResult msg="No user found" />
        </div>
      )}
    </div>
  )
}

function UserSocial({ social }: { social: TSocial }) {
  if (!social) return null

  return (
    <ul className="flex flex-col gap-2">
      {social.instagram_username && <Social src="/icons/instagram.svg" username={social.instagram_username} />}
      {social.twitter_username && <Social src="/icons/twitter.svg" username={social.twitter_username} />}
    </ul>
  )
}

function Social({ src, username }: { src: string; username: string }) {
  return (
    <li className="flex items-center gap-2">
      <Image src={src} alt="" width={17} height={17} />
      <p className="text-sm">{username}</p>
    </li>
  )
}
