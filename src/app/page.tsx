import { getLivestreams } from '@/actions/livestreams'
import { HomeFeed } from '@/components/home-feed/HomeFeed'

export default async function Home() {
    const livestreams = await getLivestreams()

    return <HomeFeed livestreams={livestreams} />
}
