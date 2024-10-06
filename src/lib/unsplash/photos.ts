import { unsplashFetch } from '.'
import { formatFullPhoto, formatPhotos } from '../transformed-unsplash/photos'

import { TUnsplashFullPhoto, TUnsplashPhoto, TRelatedPhotos } from './types/photo'

export const getPhotos = async (page: number) => formatPhotos(await unsplashFetch<TUnsplashPhoto[]>(`/photos?page=${page}`))

export const getPhoto = async (slug: string) => formatFullPhoto(await unsplashFetch<TUnsplashFullPhoto>(`/photos/${slug}`))

export const getRelatedPhotos = async (slug: string) => {
  const { total, results } = await unsplashFetch<TRelatedPhotos>(`/photos/${slug}/related`)
  return { total, results: formatPhotos(results) }
}
