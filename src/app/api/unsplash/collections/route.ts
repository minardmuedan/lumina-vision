import { getCollections } from '@/lib/unsplash/collections'
import { apiHandler } from '../_handler'

export const GET = apiHandler(async req => {
  const { searchParams } = req.nextUrl
  const page = searchParams.get('page') ? Number(searchParams.get('page')) : 2

  return await getCollections(page)
})
