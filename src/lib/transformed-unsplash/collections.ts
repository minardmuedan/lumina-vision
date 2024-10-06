import { TUnsplashCollection } from '../unsplash/types/collection'
import { formatPhoto, formatPreviewPhoto } from './photos'
import { TCollection } from './_types'
import { formatUser } from './users'
import { formatTags } from './tags'

export const formatCollection = (collection: TUnsplashCollection): TCollection => ({
  id: collection.id,
  title: collection.title,
  description: collection.description,
  blurHash: collection.blur_hash,
  coverPhoto: formatPhoto(collection.cover_photo),
  previewPhotos: collection.preview_photos.map(previewPhoto => formatPreviewPhoto(previewPhoto)),
  publishedAt: collection.published_at,
  tags: formatTags(collection.tags),
  totalPhotos: collection.total_photos,
  user: formatUser(collection.user),
})

export const formatCollections = (collections: TUnsplashCollection[]): TCollection[] => collections.map(collection => formatCollection(collection))
