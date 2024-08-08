import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function OrderByFilterBtn({ currentSearchParams, disabled }: { currentSearchParams: string; disabled?: boolean }) {
  if (disabled == true)
    return (
      <Button variant="outline" disabled>
        <p>{currentSearchParams}</p>
        <ChevronDown size={16} strokeWidth={1.5} />
      </Button>
    )

  const orderByNavLinks = [
    { label: 'Latest', href: '/gallery' },
    { label: 'Popularity', href: '/gallery?order_by=popular' },
    { label: 'Oldest', href: '/gallery?order_by=oldest' },
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="group">
          <p className="first-letter:uppercase">{currentSearchParams}</p>
          <ChevronDown size={16} strokeWidth={1.5} className="transition-transform ease-in-out group-aria-expanded:rotate-180" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {orderByNavLinks.map((navlink, i) => (
          <DropdownMenuItem key={i} asChild>
            <Link href={navlink.href} className="text-sm">
              {navlink.label}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
