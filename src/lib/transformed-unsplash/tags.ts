import { TTag } from '../unsplash/types'

export const formatTag = (tag: TTag): TTag => ({
  title: tag.title,
  type: tag.type,
})

export const formatTags = (tags: TTag[]): TTag[] => tags?.map(tag => formatTag(tag))
