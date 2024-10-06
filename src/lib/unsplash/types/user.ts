import { TUnsplashPreviewPhoto } from './photo'
import { TTag } from '.'

export type TUnsplashUser = {
  id: string
  username: string
  name: string
  twitter_username: string | null
  portfolio_url: string
  bio: string
  location: string | null
  links: TUserLinks
  profile_image: TProfileImage
  instagram_username: string | null
  total_collections: number
  total_likes: number
  total_photos: number
  total_promoted_photos: number
  total_illustrations: number
  total_promoted_illustrations: number
  for_hire: boolean
  social: TSocial
}

export type TFullUser = TUnsplashUser & {
  photos: TUnsplashPreviewPhoto[]
  tags: {
    custom: TTag[]
    aggregated: TTag[]
  }
  followers_count: number
  following_count: number
  downloads: number
}

export type TSearchUser = {
  total: number
  total_pages: number
  results: TUnsplashUser[]
}

export type TUserLinks = {
  self: string
  html: string
  photos: string
  likes: string
  portfolio: string
  following: string
  followers: string
}

export type TProfileImage = {
  small: string
  medium: string
  large: string
}

export type TSocial = {
  instagram_username: string | null
  portfolio_url: string | null
  twitter_username: string | null
  paypal_email: string | null
}
