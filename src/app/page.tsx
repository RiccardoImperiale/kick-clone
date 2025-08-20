import { getCategories } from '@/actions/categories'
import { getLivestreams } from '@/actions/livestreams'
import { getCategory } from '@/actions/categories'
import { getStreamer } from '@/actions/streamers'
import { HomeFeed } from '@/components/home-feed/HomeFeed'

export default async function Home() {
    const categories = await getCategories({ limit: 5 })

    const data = await Promise.all(
        categories.map(async category => {
            const livestreams = await getLivestreams({ categoryId: category.id, limit: 8 })

            const streamsWithDetails = await Promise.all(
                livestreams.map(async stream => ({
                    ...stream,
                    category: stream.category_id ? await getCategory(stream.category_id) : null,
                    streamer: stream.streamer_id ? await getStreamer(stream.streamer_id) : null,
                }))
            )

            return { category, livestreams: streamsWithDetails }
        })
    )

    return <HomeFeed data={data} />
}
