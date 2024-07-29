'use client'

import { useRouter } from 'next/navigation'
import { Button } from './ui/button'
import Image from 'next/image'
import { cn } from '@/lib/utils'

type Props = { variant?: 'ghost' | 'default'; className?: string; disabled?: boolean }

export default function BackButton({ variant = 'default', className, disabled = false }: Props) {
  const router = useRouter()
  return (
    <Button disabled={disabled} variant={variant} onClick={() => router.back()} className={cn('gap-2 underline underline-offset-2', className)}>
      <Image src="/icons/return.svg" alt="return-arrow" width={19} height={19} className={`${variant === 'ghost' ? '' : 'invert'}`} />
      <p>Back</p>
    </Button>
  )
}
