'use client'

import Image from 'next/image'
import { unsplashImageLoader } from '../unsplash-image'
import { TUser } from '@/lib/transformed-unsplash/_types'
import Link from 'next/link'
import { Skeleton } from '../ui/skeleton'
import { cn } from '@/lib/utils'
import { buttonVariants } from '../ui/button'

export function User({ user }: { user: TUser }) {
  return (
    <Link href={`/user/${user.username}`} className='flex w-fit items-center gap-3 overflow-hidden'>
      <Image src={user.profile_image.medium} height={32} width={32} alt='profile' loader={unsplashImageLoader} className='bg-accent' />
      <p className='max-w-[700px] overflow-hidden text-ellipsis whitespace-nowrap'>{user.username}</p>
    </Link>
  )
}

export function UserLoadingFallback() {
  return (
    <div className='flex items-center gap-3'>
      <Skeleton className='size-8' />
      <Skeleton className='h-5 w-44' />
    </div>
  )
}

export function IndividualUser({ user }: { user: TUser }) {
  return (
    <Link href={`/user/${user.username}`} className={cn(buttonVariants({ variant: 'outline' }), 'h-20 w-full items-start p-0')}>
      <div className='relative aspect-square h-full'>
        <Image src={user.profile_image.large} alt='user profile' fill sizes='80px' loader={unsplashImageLoader} className='object-cover' />
      </div>

      <div className='flex h-full flex-1 flex-col justify-center overflow-hidden py-1 *:overflow-hidden *:text-ellipsis *:whitespace-nowrap'>
        <p className='text-base'>{user.name}</p>
        {user.bio && <p className='text-sm text-muted-foreground'>{user.bio}</p>}
      </div>

      <p className='mr-1 mt-1 text-xs text-muted-foreground'>{user.totalPhotos} photo/s</p>
    </Link>
  )
}

export function UsersLoadingFallback() {
  return (
    <ul className='flex flex-col gap-2'>
      {Array.from({ length: 10 }).map((_, i) => (
        <li key={i} className='flex h-20 w-full gap-2 rounded-md border'>
          <Skeleton className='aspect-square h-full rounded-none' />

          <div className='flex h-full flex-1 flex-col justify-center gap-1 py-1'>
            <Skeleton className='h-5 w-60' />
            <Skeleton className='h-4 w-96' />
          </div>

          <Skeleton className='mr-1 mt-1 h-4 w-20' />
        </li>
      ))}
    </ul>
  )
}
