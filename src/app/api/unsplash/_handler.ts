import { NextRequest } from 'next/server'

export const apiHandler = <T>(fn: (req: NextRequest, params: Record<string, string>) => Promise<T>) => {
  return async (req: NextRequest, { params }: { params: Record<string, string> }) => {
    try {
      const data = await fn(req, params)
      return Response.json(data, { status: 200 })
    } catch (err) {
      if (err instanceof Error) return Response.json(err.message, { status: 500 })
      if (typeof err === 'string') return Response.json(err, { status: 500 })
      return Response.json('Something went wrong with our api.')
    }
  }
}
