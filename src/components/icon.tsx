import Image from 'next/image'

type TIcons =
  | 'loader'
  | 'return'
  | 'download'
  | 'close'
  | 'photos'
  | 'likes'
  | 'collections'
  | 'users'
  | 'double-camera'
  | 'socmed/facebook'
  | 'socmed/instagram'
  | 'socmed/twitter'
  | 'socmed/pinterest'
  | '404'

type TIconProps = { icon: TIcons; size?: number; className?: string; white?: boolean }
export default function Icon({ icon, size = 16, className, white }: TIconProps) {
  return (
    <Image src={`/${icon}.svg`} alt={icon} height={0} width={0} style={{ width: size, height: 'auto' }} className={`${white ? 'invert' : ''} ${className}`} />
  )
}
