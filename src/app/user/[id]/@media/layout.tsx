import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

export default function UserMediaLayout({ params, children }: { params: { id: string }; children: React.ReactNode }) {
  const navlinks = [
    { src: '/icons/double-picture.svg', label: 'Photos', href: '/' },
    { src: '/icons/collection.svg', label: 'Collections', href: '/collections' },
    { src: '/icons/heart-picture.svg', label: 'Liked Photos', href: '/liked-photos' },
  ]

  return (
    <div>
      <nav className="mb-5 flex items-center gap-3">
        {navlinks.map((v, i) => (
          <Button key={i} variant={i > 0 ? 'outline' : 'default'} asChild>
            <Link href={`/user/${params.id}${v.href}`} scroll={false}>
              <Image src={v.src} alt="icon" width={19} height={19} className={`${i > 0 ? '' : 'invert'}`} />
              <p>{v.label}</p>
            </Link>
          </Button>
        ))}
      </nav>

      {children}

      <div className="h-dvh bg-accent"></div>
    </div>
  )
}
