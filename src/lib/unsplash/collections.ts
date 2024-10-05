import { unsplashFetch } from '.'
import { formatPhoto } from '../utils'
import { TUnsplashCollection } from './schema/collection'

export async function getCollections(page: number) {
  const collections = await unsplashFetch<TUnsplashCollection[]>(`/collections?page=${page}&per_page=12`)
  return collections.map(collection => ({ ...collection, cover_photo: formatPhoto(collection.cover_photo) }))
}
