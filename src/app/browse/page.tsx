// import { getCategories, getCategory } from '@/actions/categories'
// import BrowseCtrl from './BrowseCtrl'
// import styles from './page.module.scss'
// import { getLivestreams } from '@/actions/livestreams'
// import { getStreamer } from '@/actions/streamers'

// export default async function Browse() {
//     const categories = await getCategories({ limit: 5 })
//     let livestreams = await getLivestreams({ limit: 10 })
//     livestreams = await Promise.all(
//         livestreams.map(async stream => ({
//             ...stream,
//             streamer: stream.streamer_id ? await getStreamer(stream.streamer_id) : null,
//         }))
//     )

//     return (
//         <div className={styles.pageLayout}>
//             <h1>Browse</h1>
//             <BrowseCtrl categories={categories} livestreams={livestreams} />
//         </div>
//     )
// }

import { getCategories } from '@/actions/categories'
import { getLivestreams } from '@/actions/livestreams'
import { getStreamer } from '@/actions/streamers'

import styles from './page.module.scss'
import { Tables } from '@/database/database.types'
import BrowseCtrl from './BrowseCtrl'

export type LivestreamWithStreamer = Tables<'livestreams'> & { streamer: Tables<'streamers'> | null }

export default async function Browse() {
    const categories = await getCategories({ limit: 5 })

    // Fetch livestreams
    let livestreams = await getLivestreams({ limit: 10 })

    // Enrich livestreams with streamer info
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
