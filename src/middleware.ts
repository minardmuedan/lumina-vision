import { NextRequest, NextResponse } from 'next/server'

export default function middleware(req: NextRequest) {
  const { headers, nextUrl } = req

  if (nextUrl.pathname.startsWith('/api/unsplash')) {
    // change this with your base url
    const allowedOrigin = 'https://luminavision.vercel.app'

    const origin = headers.get('origin') || headers.get('referer')

    if (origin && origin.startsWith(allowedOrigin)) {
      const res = NextResponse.next()
      res.headers.set('Access-Control-Allow-Origin', allowedOrigin)
      res.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
      res.headers.set('Access-Control-Allow-Headers', 'Content-Type')

      // Handle preflight requests
      if (req.method === 'OPTIONS') return new NextResponse(null, { status: 200 })

      return res
    } else return new NextResponse(null, { status: 403 })
  }
}

export const config = {
  matcher: '/api/unsplash/:path*',
}
