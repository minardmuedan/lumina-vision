import { cn } from '@/lib/utils'
import Image from 'next/image'

export default function Loader({ className, size = 19 }: { className?: string; size?: number }) {
  return (
    <div className="animate-pop-up">
      <Image src="/icons/loader.svg" alt="loader-icon" width={size} height={size} className={cn('animate-spin ease-in-out', className)} />
    </div>
  )
}
