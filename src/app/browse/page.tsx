import styles from './page.module.scss'
import BrowseCtrl from './BrowseCtrl'
import { getCategories } from '@/actions/categories'
import { getLivestreams } from '@/actions/livestreams'
import { getStreamer } from '@/actions/streamers'
import { Tables } from '@/database/database.types'

export type LivestreamWithStreamer = Tables<'livestreams'> & { streamer: Tables<'streamers'> | null }

export default async function Browse() {
    const categories = await getCategories({ limit: 12 })
    const livestreams = await getLivestreams({ limit: 10 })

    const streamsWithStreamer: LivestreamWithStreamer[] = await Promise.all(
        livestreams.map(async stream => ({
            ...stream,
            streamer: stream.streamer_id ? await getStreamer(stream.streamer_id) : null,
        }))
    )

    return (
        <div className={styles.pageLayout}>
            <h1>Browse</h1>
            <BrowseCtrl categories={categories} livestreams={streamsWithStreamer} />
        </div>
    )
}
