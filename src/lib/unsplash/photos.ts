import { unsplashFetch } from '.'
import { formatPhoto } from '../utils'

import { TFullPhoto, TUnsplashPhoto, TRelatedPhotos } from './schema/photo'

const formatPhotos = (photos: TUnsplashPhoto[]) => photos.map(photo => formatPhoto(photo))

export const getUnsplashPhotos = async (page: number) => formatPhotos(await unsplashFetch<TUnsplashPhoto[]>(`/photos?page=${page}`))

export const getPhoto = async (slug: string) => formatPhoto(await unsplashFetch<TFullPhoto>(`/photos/${slug}`))

export async function getRelatedPhotos(slug: string) {
  const { total, results } = await unsplashFetch<TRelatedPhotos>(`/photos/${slug}/related`)
  return { total, results: formatPhotos(results) }
}
