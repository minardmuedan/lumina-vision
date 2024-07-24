import BackButton from '@/components/back-btn'
import SearchInput from '@/components/search'
import Image from 'next/image'

const user = {
  name: 'Maxim Berg',
  bio: 'As a digital designer, I try to surround myself and others with beauty in the digital world. In my spare time, I try to capture the beauty of the real world.',
  forHire: true,
  location: 'Amsterdam, Netherlands',
  tags: ['Landscape Images & Pictures', 'Hq Background Images', 'HD Wallpapers', 'Travel Images', '3d Art'],
}

export default function UserDetailsPage({ params }: { params: { id: string } }) {
  return (
    <>
      <div className="mb-20 space-y-2 border">
        <BackButton variant="ghost" />
        <SearchInput className="w-full" placeholder="Search for a different user ..." />
      </div>

      <div className="user-details mb-20 space-y-12 border">
        <div className="flex flex-col items-center justify-center gap-10 md:flex-row md:items-start">
          <div className="size-32 bg-sky-500"></div>
          <UserTextDetails name={user.name} bio={user.bio} forHire={user.forHire} location={user.location} />

          <UserSocialMedia />
        </div>

        <UserTags tags={user.tags} />
      </div>
    </>
  )
}

//
export function UserTextDetails({ name, forHire, bio, location }: { name: string; forHire: boolean; bio: string; location: string | null }) {
  return (
    <div className="max-w-[700px] flex-1 space-y-7 text-center md:text-start">
      <div className="space-y-2">
        <div className="flex justify-center gap-2 md:justify-start">
          <h1 className="text-3xl font-medium">{name}</h1>
          <p>{forHire ? 'for hire' : 'not for hire'}</p>
        </div>

        <p className="text-muted-foreground">{bio}</p>
      </div>
      {location && (
        <div className="flex items-center justify-center gap-3 md:justify-start">
          <Image src="/icons/location.svg" alt="location" width={19} height={19} />
          <p>{location}</p>
        </div>
      )}
    </div>
  )
}

export function UserSocialMedia() {
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

export function UserTags({ tags }: { tags: string[] }) {
  return (
    <ul className="flex flex-wrap justify-center gap-3">
      {tags.map((tag, i) => (
        <li key={i} className="bg-accent px-4 py-3 text-sm">
          {tag}
        </li>
      ))}
    </ul>
  )
}
