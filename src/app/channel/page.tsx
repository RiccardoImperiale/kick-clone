import styles from './page.module.scss'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { AppRoutes } from '@/settings/AppRoutes'
import { StreamerPreview } from '@/components/stream-preview/SreamPreview'
import { getUser } from '@/actions/users'
import Image from 'next/image'
import { ChatIcon } from '@/assets/icons/ChatIcon'

export default async function Channel() {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.getUser()
    if (!data.user || error) {
        redirect(AppRoutes.home)
    }
    const dataUser = await getUser(data.user.id)

    return (
        <div className={styles.pageLayout}>
            <section className={styles.streamingSection}>
                <div className={styles.banner}>
                    <Image src="/kick-banner.jpg" alt="streamer" width={900} height={154} />
                </div>
                <StreamerPreview userData={dataUser} />
            </section>
            <section className={styles.chatSection}>
                <div className={styles.header}>
                    <div className={styles.iconBox}>
                        <ChatIcon width={16} height={16} />
                    </div>
                    <span>Chat</span>
                </div>
            </section>
        </div>
    )
}
