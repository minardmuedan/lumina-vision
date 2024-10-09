import UnsplashImage from '@/components/unsplash-image'
import { User } from '@/components/users/components'
import { getTopic } from '@/lib/unsplash/topics'

export default async function TopicDetailsPage({ params }: { params: { slug: string } }) {
  const topic = await getTopic(params.slug)

  return (
    <div className='mt-3 flex flex-col-reverse items-center justify-center md:flex-row'>
      <div className='flex-1'>
        <p className='mt-2 font-calstavier text-5xl'>{topic.title}</p>
        {topic.description && <p className='text-sm text-muted-foreground'>{topic.description}</p>}

        <div className='mt-10'>
          <p className='mb-3 text-muted-foreground'>Top Contributors :</p>
          <div className='flex flex-wrap gap-5'>
            {topic.topContributors.map(topContributor => (
              <User key={topContributor.id} user={topContributor} />
            ))}
          </div>
        </div>
      </div>

      <UnsplashImage
        {...topic.coverPhoto}
        sizes='(min-width: 1040px) calc(50vw - 80px), (min-width: 780px) calc(50vw - 40px), calc(100vw - 16px)'
        className='max-h-[50dvh] min-h-96 w-full flex-1 rounded-md after:absolute after:inset-0 after:bg-gradient-to-t after:from-background after:to-white/0 after:md:bg-gradient-to-r'
      />
    </div>
  )
}
