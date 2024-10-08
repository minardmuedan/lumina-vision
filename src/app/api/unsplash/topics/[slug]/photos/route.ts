import { getTopicPhotos } from '@/lib/unsplash/topics'
import { apiHandler } from '../../../_handler'

export const GET = apiHandler(async (req, params) => {
  const { searchParams } = req.nextUrl
  const page = searchParams.get('page') ? Number(searchParams.get('page')) : 2

  return await getTopicPhotos(params.slug, page).catch((err: Error) => err.message)
})
