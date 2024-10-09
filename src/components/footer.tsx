import Icon from '@/components/icon'
import Link from 'next/link'
import FooterWrapper from './footer-wrapper'

export default function Footer() {
  const links = [
    { icon: 'photos', title: 'Gallery', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit' },
    { icon: 'collections', title: 'Collections', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit' },
    { icon: 'users', title: 'User / Photographer', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit' },
  ] as const

  const socmedLinks = [
    { label: 'facebook', href: 'https://www.facebook.com/minard.parilla' },
    { label: 'instagram', href: 'https://www.instagram.com/parilla_minard/' },
    { label: 'twitter', href: '#' },
    { label: 'pinterest', href: '#' },
  ] as const

  return (
    <FooterWrapper>
      <footer className='flex w-full flex-col items-center gap-14 bg-accent px-3 py-10 md:px-10'>
        <Icon icon='double-camera' size={56} />
        <div className='flex w-full max-w-2xl flex-col items-center justify-between gap-14 md:flex-row'>
          <div className='flex items-center gap-3 font-calstavier'>
            <h3 className='flex flex-col items-center text-5xl md:text-7xl'>
              {['LU', 'MI', 'NA'].map((v, i) => (
                <span key={i}>{v}</span>
              ))}
            </h3>
            <p className='flex flex-col items-center md:text-3xl'>
              {'vision'.split('').map((v, i) => (
                <span key={i}>{v}</span>
              ))}
            </p>
          </div>

          <ul className='flex flex-col gap-10'>
            {links.map((link, i) => (
              <li key={i} className='flex items-center gap-5'>
                <Icon icon={link.icon} size={i == 0 ? 40 : 36} />
                <div>
                  <p>{link.title}</p>
                  <p className='text-sm text-muted-foreground'>{link.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className='flex w-full flex-col items-center justify-between gap-5 border-t pt-14 md:flex-row'>
          <p className='text-sm text-muted-foreground'>© 2024 · Minard Parilla | All rights reserved</p>
          <nav className='flex items-center gap-10'>
            {socmedLinks.map((socmed, i) => (
              <Link key={i} href={socmed.href}>
                <Icon icon={`socmed/${socmed.label}`} size={20} />
                <span className='sr-only'> social media {socmed.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </footer>
    </FooterWrapper>
  )
}
