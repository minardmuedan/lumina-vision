import { TUnsplashCollection } from './collection'
import { TTag, TUrls } from '.'
import { TUser } from './user'

export type TPreviewPhoto = {
  id: string
  slug: string
  blur_hash: string
  asset_type: 'photo'
  urls: TUrls
}

export type TUnsplashPhoto = TPreviewPhoto & {
  width: number
  height: number
  color: string
  description: string
  alt_description: string
  links: TPhotoLinks
  user: TUser
  likes: number
}

export type TSearchPhotos = {
  total: number
  total_pages: number
  results: TUnsplashPhoto[]
}

export type TRelatedPhotos = {
  total: number
  results: TUnsplashPhoto[]
}

export type TFullPhoto = TUnsplashPhoto & {
  location: TPhotoLocation
  tags: TTag[]
  views: number
  downloads: number
  related_collections: {
    total: number
    results: TUnsplashCollection[]
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
