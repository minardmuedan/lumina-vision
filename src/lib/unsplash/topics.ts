import { unsplashFetch } from '.'
import { formatPhotos } from '../transformed-unsplash/photos'
import { formatFullTopic, formatTopics } from '../transformed-unsplash/topics'
import { TUnsplashPhoto } from './types/photo'
import { TUnsplashFullTopic, TUnsplashTopic } from './types/topic'

export const getTopics = async (page: number) => formatTopics(await unsplashFetch<TUnsplashTopic[]>(`/topics?page=${page}&per_page=12`))

export const getTopic = async (slug: string) => formatFullTopic(await unsplashFetch<TUnsplashFullTopic>(`/topics/${slug}`))

export const getTopicPhotos = async (id: string, page: number) => formatPhotos(await unsplashFetch<TUnsplashPhoto[]>(`/topics/${id}/photos?page=${page}`))
