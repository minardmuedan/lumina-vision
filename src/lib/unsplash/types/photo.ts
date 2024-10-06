import { TUnsplashCollection } from './collection'
import { TTag } from '.'
import { TUnsplashUser } from './user'

export type TUnsplashPreviewPhoto = {
  id: string
  slug: string
  blur_hash: string
  asset_type: 'photo'
  urls: { raw: string }
}

export type TUnsplashPhoto = TUnsplashPreviewPhoto & {
  width: number
  height: number
  color: string
  description: string
  alt_description: string
  links: TPhotoLinks
  user: TUnsplashUser
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

export type TUnsplashFullPhoto = TUnsplashPhoto & {
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
