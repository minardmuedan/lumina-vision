import { TPrettify } from '@/lib/utils'
import { TUnsplashCollection } from './collection'

export type TPhoto = {
  id: string
  slug: string
  src: string
  alt: string
  height: number
  width: number
  color: string
  blurHash: string
  downloadLink: string | null
}

export type TCollection = TPrettify<Omit<TUnsplashCollection, 'cover_photo'> & { cover_photo: TPhoto }>
