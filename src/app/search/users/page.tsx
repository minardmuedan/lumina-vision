import { SearchPageWrapper } from '../_components'

export default async function SearchUsersPage({ searchParams: { query } }: { searchParams: { query: string | undefined } }) {
  await new Promise(res => setTimeout(res, 5000))

  return (
    <SearchPageWrapper query={query} activePath='users'>
      hello
    </SearchPageWrapper>
  )
}
