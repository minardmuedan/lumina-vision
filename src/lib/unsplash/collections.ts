import { unsplashFetch } from '.'
import { formatCollections, formatFullCollection } from '../transformed-unsplash/collections'
import { formatPhotos } from '../transformed-unsplash/photos'
import { TUnsplashCollection } from './types/collection'
import { TUnsplashPhoto } from './types/photo'

export const getCollections = async (page: number) => formatCollections(await unsplashFetch<TUnsplashCollection[]>(`/collections?page=${page}&per_page=12`))

export const getCollection = async (id: string) => formatFullCollection(await unsplashFetch<TUnsplashCollection>(`/collections/${id}`))

export const getCollectionPhotos = async (id: string, page: number) =>
  formatPhotos(await unsplashFetch<TUnsplashPhoto[]>(`/collections/${id}/photos?page=${page}`))
