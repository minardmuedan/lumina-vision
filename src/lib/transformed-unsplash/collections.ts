import { TUnsplashCollection } from '../unsplash/types/collection'
import { TCollection, TFullCollection } from './_types'
import { formatPhoto } from './photos'
import { formatTags } from './tags'
import { formatUser } from './users'

export const formatCollection = (collection: TUnsplashCollection): TCollection => ({
  id: collection.id,
  title: collection.title,
  description: collection.description,
  blurHash: collection.blur_hash,
  coverPhoto: formatPhoto(collection.cover_photo),
  publishedAt: collection.published_at,
  tags: formatTags(collection.tags),
  totalPhotos: collection.total_photos,
})

export const formatCollections = (collections: TUnsplashCollection[]): TCollection[] => collections.map(collection => formatCollection(collection))

export const formatFullCollection = (collection: TUnsplashCollection): TFullCollection => ({
  ...formatCollection(collection),
  user: formatUser(collection.user),
})
