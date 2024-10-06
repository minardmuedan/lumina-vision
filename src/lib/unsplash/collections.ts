import { unsplashFetch } from '.'
import { formatCollection, formatCollections } from '../transformed-unsplash/collections'
import { TUnsplashCollection } from './types/collection'

export const getCollections = async (page: number) => formatCollections(await unsplashFetch<TUnsplashCollection[]>(`/collections?page=${page}&per_page=12`))

export const getCollection = async (id: string) => formatCollection(await unsplashFetch<TUnsplashCollection>(`/collections/${id}`))
