import { getLivestreams } from '@/actions/lifestreams'

export default async function Home() {
    const livestreams = await getLivestreams()
    console.log(livestreams)

    return <h1>Home</h1>
}
