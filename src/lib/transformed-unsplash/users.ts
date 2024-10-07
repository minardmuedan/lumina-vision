import { TUnsplashFullUser, TUnsplashUser } from '../unsplash/types/user'
import { TFullUser, TUser } from './_types'
import { formatTags } from './tags'

export const formatUser = (user: TUnsplashUser): TUser => ({
  id: user.id,
  name: user.name,
  username: user.username,
  location: user.location,
  bio: user.bio,
  social: user.social,
  profile_image: user.profile_image,
  instagramUsername: user.instagram_username,
  twitterUsername: user.twitter_username,
  portfolioUrl: user.portfolio_url,
  forHire: user.for_hire,
  totalLikes: user.total_likes,
  totalPhotos: user.total_photos,
  totalPromotedPhotos: user.total_promoted_photos,
  totalCollections: user.total_collections,
  totalIllustrations: user.total_likes,
  totalPromotedIllustrations: user.total_promoted_illustrations,
})

export const formatFullUser = (user: TUnsplashFullUser): TFullUser => {
  const formattedUser = formatUser(user)
  return { ...formattedUser, tags: formatTags(user.tags.custom) }
}
