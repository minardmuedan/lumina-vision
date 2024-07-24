import Image from 'next/image'
import { Input } from './ui/input'
import { cn } from '@/lib/utils'

type Props = {
  placeholder: string
  className?: string
  disabled?: boolean
}

export default function SearchInput({ placeholder, className, disabled = false }: Props) {
  return (
    <div className={cn('relative', className)}>
      <Input type="search" placeholder={placeholder} disabled={disabled} className="serac peer pl-8" />
      <Image
        src="/icons/search.svg"
        alt="search-icon"
        width={19}
        height={19}
        className="absolute left-0 top-1/2 -translate-y-1/2 opacity-50 transition-opacity ease-in peer-focus:opacity-100"
      />
    </div>
  )
}
