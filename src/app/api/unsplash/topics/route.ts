import { apiHandler } from '../_handler'
import { getTopics } from '@/lib/unsplash/topics'

export const GET = apiHandler(async req => {
  const { searchParams } = req.nextUrl
  const page = searchParams.get('page') ? Number(searchParams.get('page')) : 2

  return await getTopics(page)
})
