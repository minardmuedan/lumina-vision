'use client'

import Image from 'next/image'
import { unsplashImageLoader } from '../unsplash-image'
import { TUser } from '@/lib/transformed-unsplash/_types'
import Link from 'next/link'

export function User({ user }: { user: TUser }) {
  return (
    <Link href={`/user/${user.id}`} className='flex w-fit items-center gap-3'>
      <Image src={user.profile_image.medium} height={32} width={32} alt='profile' loader={unsplashImageLoader} />
      <p>{user.username}</p>
    </Link>
  )
}
