import Tags from '@/components/ui/tags'
import { unsplashImageLoader } from '@/components/unsplash-image'
import { getUser } from '@/lib/unsplash/user'
import { MapPinIcon } from 'lucide-react'
import Image from 'next/image'
import UserNavbar from './_navbar'
import { Suspense } from 'react'

export default async function UserDetailsLayout({ children, params }: { children: React.ReactNode; params: { username: string } }) {
  const user = await getUser(params.username)

  return (
    <>
      <div className='mb-20 mt-10 flex flex-col items-center gap-10 text-center md:flex-row md:items-start md:text-start'>
        <div className='relative size-32'>
          <Image
            src={user.profile_image.large}
            alt='profile'
            fill
            quality={100}
            sizes='128px'
            loader={unsplashImageLoader}
            className='w-full bg-accent object-cover'
          />
        </div>

        <div className='max-w-[700px] flex-1'>
          <p className='font-calstavier text-5xl'>{user.name}</p>
          {user.bio && <p className='text-sm text-muted-foreground'>{user.bio}</p>}

          {user.location && (
            <div className='mt-5 flex items-center justify-center gap-2 md:justify-start'>
              <MapPinIcon strokeWidth={1.3} />
              <p>{user.location}</p>
            </div>
          )}

          <Tags tags={user.tags} className='mt-10' />
        </div>
      </div>

      <UserNavbar username={params.username} totalPhotos={user.totalPhotos} totalCollections={user.totalCollections} totalLikes={user.totalLikes} />

      <Suspense>{children}</Suspense>
    </>
  )
}
