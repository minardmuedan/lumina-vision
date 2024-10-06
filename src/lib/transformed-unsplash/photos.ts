import { TFullPhoto, TPhoto, TPreviewPhoto } from './_types'
import { TUnsplashFullPhoto, TUnsplashPhoto, TUnsplashPreviewPhoto } from '../unsplash/types/photo'
import { formatUser } from './users'
import { formatCollections } from './collections'
import { formatTags } from './tags'

export const formatPreviewPhoto = (previewPhoto: TUnsplashPreviewPhoto): TPreviewPhoto => ({
  id: previewPhoto.id,
  slug: previewPhoto.slug,
  blurHash: previewPhoto.blur_hash,
  src: previewPhoto.urls?.raw,
})

export const formatPhoto = (photo: TUnsplashPhoto): TPhoto => ({
  id: photo.id,
  slug: photo.slug,
  src: photo.urls?.raw,
  alt: photo.alt_description || photo.slug?.split('-').join(' '),
  height: photo.height,
  width: photo.width,
  color: photo.color,
  blurHash: photo.blur_hash,
  downloadLink: photo.links?.download ? photo.links?.download + '&force=true' : null,
  description: photo.description,
})

export const formatFullPhoto = (photo: TUnsplashFullPhoto): TFullPhoto => ({
  id: photo.id,
  slug: photo.slug,
  src: photo.urls?.raw,
  alt: photo.alt_description || photo.slug?.split('-').join(' '),
  height: photo.height,
  width: photo.width,
  color: photo.color,
  blurHash: photo.blur_hash,
  downloadLink: photo.links?.download ? photo.links?.download + '&force=true' : null,
  description: photo.description,
  downloads: photo.downloads,
  likes: photo.likes,
  location: photo.location,
  relatedCollections: { ...photo.related_collections, results: formatCollections(photo.related_collections.results) },
  tags: formatTags(photo.tags),
  user: formatUser(photo.user),
  views: photo.views,
})

export const formatPhotos = (photos: TUnsplashPhoto[]): TPhoto[] => photos.map(photo => formatPhoto(photo))
