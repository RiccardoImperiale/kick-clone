import { Tables } from '@/database/database.types'
import styles from './HomeFeed.module.scss'
import { CategoriesSection } from '@/components/section/categories-section/CategoriesSection'

interface HomeFeedProps {
    livestreams?: Tables<'livestreams'>[]
}

export const HomeFeed = (props: HomeFeedProps) => {
    return (
        <div className={styles.pageLayout}>
            <CategoriesSection />
            {/* <section>
                <h2>Live</h2>
                <div className={styles.streamPreviews}>
                    <PreviewCard />
                </div>
            </section> */}
        </div>
    )
}
