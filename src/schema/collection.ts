import { TPhoto, TPreviewPhoto } from './photo'
import { TTag } from './unsplash'
import { TUser } from './user'

export type TCollections = TCollection[]

export type TCollection = {
  id: string
  title: string
  description: string
  published_at: Date
  featured: boolean
  total_photos: number
  tags: TTag[]
  links: TCollectionLinks
  user: TUser
  cover_photo: TPhoto
  preview_photos: TPreviewPhoto[]
}

export type TSearchCollections = {
  total: number
  total_pages: number
  results: TCollections
}

export type TCollectionLinks = {
  self: string
  html: string
  photos: string
  related: string
}
