import { TUnsplashFullTopic, TUnsplashTopic } from '../unsplash/types/topic'
import { TFullTopic, TTopic } from './_types'
import { formatPhoto, formatPreviewPhotos } from './photos'
import { formatUsers } from './users'

export const formatTopic = (topic: TUnsplashTopic): TTopic => ({
  id: topic.id,
  slug: topic.slug,
  title: topic.title,
  description: topic.description,
  totalPhotos: topic.total_photos,
  coverPhoto: formatPhoto(topic.cover_photo),
  previewPhotos: formatPreviewPhotos(topic.preview_photos),
})

export const formatTopics = (topics: TUnsplashTopic[]): TTopic[] => topics.map(topic => formatTopic(topic))

export const formatFullTopic = (topic: TUnsplashFullTopic): TFullTopic => ({
  ...formatTopic(topic),
  owners: formatUsers(topic.owners),
  topContributors: formatUsers(topic.top_contributors),
})
