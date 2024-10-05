import { TUnsplashPhoto, TPreviewPhoto } from './photo'
import { TTag } from '.'
import { TUser } from './user'

export type TUnsplashCollection = {
  id: string
  title: string
  blur_hash: string
  description: string
  published_at: Date
  featured: boolean
  total_photos: number
  tags: TTag[]
  links: TCollectionLinks
  user: TUser
  cover_photo: TUnsplashPhoto
  preview_photos: TPreviewPhoto[]
}

export type TSearchCollections = {
  total: number
  total_pages: number
  results: TUnsplashCollection[]
}

export type TCollectionLinks = {
  self: string
  html: string
  photos: string
  related: string
}
