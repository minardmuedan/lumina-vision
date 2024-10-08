import { unsplashFetch } from '.'
import { formatCollections } from '../transformed-unsplash/collections'
import { formatPhotos } from '../transformed-unsplash/photos'
import { formatUsers } from '../transformed-unsplash/users'
import { TSearchCollections } from './types/collection'

import { TSearchPhotos } from './types/photo'
import { TSearchUser } from './types/user'

export const getSearchPhotos = async (query: string, page: number) => {
  const { results, total } = await unsplashFetch<TSearchPhotos>(`/search/photos?query=${query}&page=${page}`)
  return { total, photos: formatPhotos(results) }
}

export const getSearchCollections = async (query: string, page: number) => {
  const { results, total } = await unsplashFetch<TSearchCollections>(`/search/collections?query=${query}&page=${page}&per_page=12`)
  return { total, collections: formatCollections(results) }
}

export const getSearchUsers = async (query: string, page: number) => {
  const { results, total } = await unsplashFetch<TSearchUser>(`/search/users?query=${query}&page=${page}`)
  return { total, users: formatUsers(results) }
}
