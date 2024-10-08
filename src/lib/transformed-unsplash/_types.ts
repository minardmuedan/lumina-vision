import { TTag } from '../unsplash/types'
import { TPhotoLocation } from '../unsplash/types/photo'
import { TProfileImage, TSocial } from '../unsplash/types/user'

export type TPreviewPhoto = {
  id: string
  slug: string
  blurHash: string
  src: string
}

export type TPhoto = TPreviewPhoto & {
  alt: string
  height: number
  width: number
  color: string
  downloadLink: string | null
  description: string
}

export type TFullPhoto = TPhoto & {
  user: TUser
  likes: number
  location: TPhotoLocation
  tags: TTag[]
  views: number
  downloads: number
  relatedCollections: {
    total: number
    results: TCollection[]
  }
}

export type TCollection = {
  id: string
  title: string
  blurHash: string
  description: string
  publishedAt: Date
  totalPhotos: number
  tags: TTag[]
  coverPhoto: TPhoto
}

export type TFullCollection = TCollection & {
  user: TUser
}

export type TUser = {
  id: string
  username: string
  name: string
  twitterUsername: string | null
  portfolioUrl: string
  bio: string
  location: string | null
  profile_image: TProfileImage
  instagramUsername: string | null
  totalCollections: number
  totalLikes: number
  totalPhotos: number
  totalPromotedPhotos: number
  totalIllustrations: number
  totalPromotedIllustrations: number
  forHire: boolean
  social: TSocial
}

export type TFullUser = TUser & {
  tags: TTag[]
}

export type TTopic = {
  id: string
  slug: string
  title: string
  description: string
  totalPhotos: number
  coverPhoto: TPhoto
  previewPhotos: TPreviewPhoto[]
}

export type TFullTopic = TTopic & {
  owners: TUser[]
  topContributors: TUser[]
}
