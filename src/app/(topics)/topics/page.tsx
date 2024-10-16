import PageWrapper from '@/components/pages'
import InfiniteScrollTopics from '@/components/topics/infinite-scroll'
import { getTopics } from '@/lib/unsplash/topics'

export const metadata = {
  title: 'Image Topics - Discover by Category',
  description: 'Explore image topics and find photos categorized by specific themes or subjects.',
}

export default async function TopicsPage() {
  const topics = await getTopics(1)
  return (
    <PageWrapper>
      <InfiniteScrollTopics initialTopics={topics} />
    </PageWrapper>
  )
}
