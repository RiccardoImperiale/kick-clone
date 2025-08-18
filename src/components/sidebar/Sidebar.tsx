'use client'
import Link from 'next/link'
import styles from './Sidebar.module.scss'
import { HomeIcon } from '@/assets/icons/HomeIcon'
import { BrowseIcon } from '@/assets/icons/BrowseIcon'
import { FollowingIcon } from '@/assets/icons/FollowingIcon'
import { AppRoutes } from '@/settings/AppRoutes'
import { useSidebarStore } from '@/state/sidebarStore'
import { usePathname } from 'next/navigation'
import { LiveIcon } from '@/assets/icons/LiveIcon'
import { Tables } from '@/database/database.types'
import { RecommendedCard } from '@/components/recommended-card/RecommendedCard'
import { useEffect, useRef } from 'react'

interface SidebarProps {
    livestreams?: Tables<'livestreams'>[]
}

const resizeAt = 1280

export const Sidebar = (props: SidebarProps) => {
    const isOpen = useSidebarStore(state => state.isOpen)
    const setIsOpen = useSidebarStore(state => state.setIsOpen)
    const pathname = usePathname()
    const lastWidth = useRef<number>(0)
    const isActive = (path: string) => pathname === path

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth

            if (lastWidth.current >= resizeAt && width < resizeAt) {
                setIsOpen(false)
            } else if (lastWidth.current < resizeAt && width >= resizeAt) {
                setIsOpen(true)
            }

            lastWidth.current = width
        }

        lastWidth.current = window.innerWidth
        if (window.innerWidth < resizeAt) {
            setIsOpen(false)
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [setIsOpen])

    return (
        <aside className={`${styles.sidebar} ${!isOpen && styles.compressed}`}>
            <nav className={styles.navbar}>
                <Link href={AppRoutes.home} className={isActive(AppRoutes.home) ? styles.active : ''}>
                    <div className={styles.iconBox}>
                        <HomeIcon width={16} height={16} />
                    </div>
                    {isOpen && <span>Home</span>}
                </Link>
                <Link href={AppRoutes.browse} className={isActive(AppRoutes.browse) ? styles.active : ''}>
                    <div className={styles.iconBox}>
                        <BrowseIcon width={16} height={16} />
                    </div>
                    {isOpen && <span>Browse</span>}
                </Link>
                <Link href={AppRoutes.following} className={isActive(AppRoutes.following) ? styles.active : ''}>
                    <div className={styles.iconBox}>
                        <FollowingIcon width={16} height={16} />
                    </div>
                    {isOpen && <span>Following</span>}
                </Link>
            </nav>
            {isOpen ? (
                <div className={styles.titleBox}>Recommended</div>
            ) : (
                <div className={styles.titleBoxComp}>
                    <LiveIcon width={16} height={16} />
                </div>
            )}
            <div className={styles.channelsList}>
                {props.livestreams?.map(livestream => (
                    <RecommendedCard key={livestream.id} isOpen={isOpen} livestream={livestream} />
                ))}
            </div>
        </aside>
    )
}
