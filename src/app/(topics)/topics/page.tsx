import PageWrapper from '@/components/pages'
import InfiniteScrollTopics from '@/components/topics/infinite-scroll'
import { getTopics } from '@/lib/unsplash/topics'

export default async function TopicsPage() {
  const topics = await getTopics(1)
  return (
    <PageWrapper>
      <InfiniteScrollTopics initialTopics={topics} />
    </PageWrapper>
  )
}
