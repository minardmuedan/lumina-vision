import 'server-only'

export async function unsplashFetch<T>(url: string) {
  try {
    const res = await fetch(`https://api.unsplash.com${url}`, {
      headers: { Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}` },
      next: { revalidate: 60 * 60 * 24 },
    })

    if (!res.ok) {
      const err: { errors: string[] } = await res.json()
      throw err?.errors?.[0]
    }

    return (await res.json()) as T
  } catch (err) {
    if (typeof err === 'string') throw new Error(err)
    if (err instanceof Error) throw err
    throw new Error('Something went wrong')
  }
}

/*
{
  "errors": ["Username is missing", "Password cannot be blank"]
}

200 - OK	Everything worked as expected
400 - Bad Request	The request was unacceptable, often due to missing a required parameter
401 - Unauthorized	Invalid Access Token
403 - Forbidden	Missing permissions to perform request
404 - Not Found	The requested resource doesn’t exist
500, 503	Something went wrong on our end

*/
