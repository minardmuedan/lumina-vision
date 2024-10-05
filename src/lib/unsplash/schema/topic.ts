import { TUnsplashPhoto, TPreviewPhoto } from './photo'
import { TUser } from './user'

export type TTopics = TTopic[]

export type TTopic = {
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
  owners: TUser[]
  cover_photo: TUnsplashPhoto
  preview_photos: TPreviewPhoto[]
}

export type TFullTopic = TTopic & {
  top_contributors: TUser[]
}
