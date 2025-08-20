import styles from './HomeFeed.module.scss'
import { CategoriesSection } from '@/components/section/categories-section/CategoriesSection'
import { StreamingSection } from '@/components/section/streaming-section/StreamingSection'
import { Tables } from '@/database/database.types'

export interface HomeFeedProps {
    data: {
        category: Tables<'categories'>
        livestreams: (Tables<'livestreams'> & {
            category: Tables<'categories'> | null
            streamer: Tables<'streamers'> | null
        })[]
    }[]
}

export const HomeFeed = (props: HomeFeedProps) => {
    return (
        <div className={styles.pageLayout}>
            <CategoriesSection />
            {props.data.map(({ category, livestreams }) => (
                <StreamingSection key={category.id} sectionTitle={category.name} livestreams={livestreams} />
            ))}
        </div>
    )
}
