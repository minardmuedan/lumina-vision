import { TCollection } from './collection'
import { TTag, TUrls } from './unsplash'
import { TUser } from './user'

export type TPreviewPhoto = {
  id: string
  slug: string
  blur_hash: string
  asset_type: 'photo'
  urls: TUrls
}

export type TPhoto = TPreviewPhoto & {
  width: number
  height: number
  color: string
  description: string
  alt_description: string
  links: TPhotoLinks
  user: TUser
  likes: number
}

export type TRelatedPhotos = {
  total: number
  results: TPhoto[]
}

export type TPhotos = TPhoto[]

export type TFullPhoto = TPhoto & {
  location: TPhotoLocation
  tags: TTag[]
  views: number
  downloads: number
  related_collections: {
    total: number
    results: TCollection[]
  }
}

export type TPhotoLinks = {
  self: string
  html: string
  download: string
  download_location: string
}

export type TPhotoLocation = {
  name: string
  city: string
  country: string
}
