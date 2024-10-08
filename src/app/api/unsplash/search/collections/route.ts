import { getSearchCollections } from '@/lib/unsplash/search'
import { apiHandler } from '../../_handler'

export const GET = apiHandler(async req => {
  const { searchParams } = req.nextUrl
  const query = searchParams.get('query') || ''
  const page = searchParams.get('page') ? Number(searchParams.get('page')) : 2

  const { collections } = await getSearchCollections(query, page)

  return collections
})
