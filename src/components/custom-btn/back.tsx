'use client'

import { useRouter } from 'next/navigation'
import { Button } from '../ui/button'
import Image from 'next/image'
import { cn } from '@/lib/utils'

export default function BackButton({ variant = 'default', className }: { variant?: 'ghost' | 'default'; className?: string }) {
  const router = useRouter()
  return (
    <Button variant={variant} className={cn('gap-2 underline underline-offset-2', className)} onClick={() => router.back()}>
      <Image src="/icons/return.svg" alt="return-arrow" width={19} height={19} className={`${variant === 'ghost' ? '' : 'invert'}`} />
      <p>Back</p>
    </Button>
  )
}
