/** /api- */
export async function fetcher<T>(url: string) {
  const res = await fetch(`/api${url}`)
  if (!res.ok) {
    throw new Error('Something went wrong on our api handler')
  }
  const data = (await res.json()) as T
  return data
}
