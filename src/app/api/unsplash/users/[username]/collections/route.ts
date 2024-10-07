import { getUserCollections } from '@/lib/unsplash/user'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest, { params }: { params: { username: string } }) {
  const { searchParams } = req.nextUrl
  const page = searchParams.get('page') ? Number(searchParams.get('page')) : 2

  const collections = await getUserCollections(params.username, page).catch((err: Error) => err.message)

  return Response.json(collections)
}
