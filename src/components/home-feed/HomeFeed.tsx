import { Tables } from '@/database/database.types'
import styles from './HomeFeed.module.scss'
import { CategoriesSection } from '@/components/section/categories-section/CategoriesSection'
import { StreamingSection } from '../section/streaming-section/StreamingSection'

interface HomeFeedProps {
    categories?: Tables<'categories'>[]
}

export const HomeFeed = (props: HomeFeedProps) => {
    return (
        <div className={styles.pageLayout}>
            <CategoriesSection />
            {props.categories?.map(category => (
                <StreamingSection key={category.id} sectionTitle={category.name} />
            ))}

            {/* <section>
                <h2>Live</h2>
                <div className={styles.streamPreviews}>
                    <PreviewCard />
                </div>
            </section> */}
        </div>
    )
}
