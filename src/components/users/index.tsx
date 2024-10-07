'use client'

import Image from 'next/image'
import { unsplashImageLoader } from '../unsplash-image'
import { TUser } from '@/lib/transformed-unsplash/_types'
import Link from 'next/link'
import { Skeleton } from '../ui/skeleton'

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
