'use client'

import { useEffect, useState } from 'react'
import { useLoadingStore } from '@/state/loadingStore'
import { Tables } from '@/database/database.types'
import { getLivestreams } from '@/actions/livestreams'
import styles from './StreamersSection.module.scss'
import Link from 'next/link'
import { AppRoutes } from '@/settings/AppRoutes'
import { Loader } from '@/components/loader/Loader'
import { PreviewCard } from '@/components/card/preview-card/PreviewCard'

export const StreamersSection = () => {
    const [livestreams, setLivestreams] = useState<Tables<'livestreams'>[]>([])
    const { setIsLoading, isLoading } = useLoadingStore()

    useEffect(() => {
        const fetchCategories = async () => {
            setIsLoading(true)
            try {
                const data = await getLivestreams('a1b2c3d4-e5f6-7890-1234-567890abcdef')
                setLivestreams(data)
            } catch (error) {
                console.error(error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchCategories()
    }, [setIsLoading])

    const streamersView = (
        <div className={styles.streamPreviews}>
            {livestreams.map(stream => (
                <PreviewCard key={stream.id} />
            ))}
        </div>
    )

    return (
        <section className={styles.sectionLayout}>
            <div className={styles.sectionHeader}>
                <h2>Live Categories</h2>
                <Link href={AppRoutes.categories}>
                    <span>View all</span>
                </Link>
            </div>
            {isLoading ? <Loader /> : streamersView}
        </section>
    )
}
