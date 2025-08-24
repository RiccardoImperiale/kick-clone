import styles from './page.module.scss'
import { getCategories } from '@/actions/categories'
import { getLivestreams } from '@/actions/livestreams'
import { getCategory } from '@/actions/categories'
import { getStreamer } from '@/actions/streamers'
import { CategoriesSection } from '@/components/section/categories-section/CategoriesSection'
import { StreamingSection } from '@/components/section/streaming-section/StreamingSection'
import { OnboardingSection } from '@/components/section/onboarding-section/OnboardingSection'
import { createClient } from '@/utils/supabase/server'
import { getUser } from '@/actions/users'

export default async function Home() {
    const categories = await getCategories({ limit: 5 })
    const supabase = await createClient()
    let isUserStreamer = false

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (user) {
        const res = await getUser(user.id)
        if (res?.streamer_id) {
            console.log(res?.streamer_id)
            isUserStreamer = res?.streamer_id?.length > 0
        }
    }

    const streams = await Promise.all(
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

    return (
        <div className={styles.pageLayout}>
            {user && <OnboardingSection userId={user.id} isUserStreamer={isUserStreamer} />}
            <CategoriesSection />
            {streams.map(({ category, livestreams }) => (
                <StreamingSection key={category.id} sectionTitle={category.name} livestreams={livestreams} />
            ))}
        </div>
    )
}
