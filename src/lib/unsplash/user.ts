import { unsplashFetch } from '.'
import { formatCollections } from '../transformed-unsplash/collections'
import { formatPhotos } from '../transformed-unsplash/photos'
import { formatFullUser } from '../transformed-unsplash/users'
import { TUnsplashCollection } from './types/collection'
import { TUnsplashPhoto } from './types/photo'
import { TUnsplashFullUser } from './types/user'

export const getUser = async (username: string) => formatFullUser(await unsplashFetch<TUnsplashFullUser>(`/users/${username}`))
export const getUserPhotos = async (username: string, page: number) =>
  formatPhotos(await unsplashFetch<TUnsplashPhoto[]>(`/users/${username}/photos?page=${page}`))

export const getUserLikes = async (username: string, page: number) =>
  formatPhotos(await unsplashFetch<TUnsplashPhoto[]>(`/users/${username}/likes?page=${page}`))

export const getUserCollections = async (username: string, page: number) =>
  formatCollections(await unsplashFetch<TUnsplashCollection[]>(`/users/${username}/collections?page=${page}`))
