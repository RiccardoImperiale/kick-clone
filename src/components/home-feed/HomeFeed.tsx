import { Tables } from '@/database/database.types'
import styles from './HomeFeed.module.scss'
import { CategoriesSection } from '@/components/section/categories-section/CategoriesSection'
import { StreamersSection } from '../section/streamers-section/StreamersSection'

interface HomeFeedProps {
    livestreams?: Tables<'livestreams'>[]
}

export const HomeFeed = (props: HomeFeedProps) => {
    return (
        <div className={styles.pageLayout}>
            <CategoriesSection />
            <StreamersSection />

            {/* <section>
                <h2>Live</h2>
                <div className={styles.streamPreviews}>
                    <PreviewCard />
                </div>
            </section> */}
        </div>
    )
}
