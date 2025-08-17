import Link from 'next/link'
import styles from './Sidebar.module.scss'
import { HomeIcon } from '@/assets/icons/HomeIcon'
import { BrowseIcon } from '@/assets/icons/BrowseIcon'
import { FollowingIcon } from '@/assets/icons/FollowingIcon'
import { AppRoutes } from '@/settings/AppRoutes'

export const Sidebar = () => {
    return (
        <aside className={styles.sidebar}>
            <nav className={styles.navbar}>
                <Link href={AppRoutes.home} className={styles.active}>
                    <HomeIcon width={16} height={16} /> Home
                </Link>
                <Link href={AppRoutes.browse}>
                    <BrowseIcon width={16} height={16} /> Browse
                </Link>
                <Link href={AppRoutes.following}>
                    <FollowingIcon width={16} height={16} />
                    Following
                </Link>
            </nav>
            <div className={styles.channelsList}>
                <div className={styles.title}>Channels</div>
                <div className={styles.channel}>
                    <div className={styles.avatar}>x</div>
                    <div className={styles.midBox}>
                        <div className={styles.name}>Name</div>
                        <div className={styles.info}>Game playing..</div>
                    </div>
                    <div className={`${styles.liveActivity} ${styles.active}`} />
                </div>
            </div>
        </aside>
    )
}
