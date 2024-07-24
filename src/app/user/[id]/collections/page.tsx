import UserDetailsPage from '../page'

export default function UserCollectionPage({ params }: { params: { id: string } }) {
  return <UserDetailsPage params={params} />
}
