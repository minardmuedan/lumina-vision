import { TUnsplashPhoto, TUnsplashPreviewPhoto } from './photo'
import { TUnsplashUser } from './user'

export type TUnsplashTopic = {
  id: string
  slug: string
  title: string
  description: string
  visibility: 'featured'
  featured: true
  total_photos: number
  current_user_contributions: []
  total_current_user_submissions: null
  links: {
    self: string
    html: string
    photos: string
  }
  owners: TUnsplashUser[]
  cover_photo: TUnsplashPhoto
  preview_photos: TUnsplashPreviewPhoto[]
}

export type TUnsplashFullTopic = TUnsplashTopic & {
  top_contributors: TUnsplashUser[]
}
