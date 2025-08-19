'use client'

import Link from 'next/link'
import styles from './StreamingSection.module.scss'
import { useEffect, useState } from 'react'
import { useLoadingStore } from '@/state/loadingStore'
import { Tables } from '@/database/database.types'
import { getLivestreams } from '@/actions/livestreams'
import { AppRoutes } from '@/settings/AppRoutes'
import { Loader } from '@/components/loader/Loader'
import { PreviewCard } from '@/components/card/preview-card/PreviewCard'

interface StreamersSectionCtrlProps {
    sectionTitle: string
}

export const StreamingSection = (props: StreamersSectionCtrlProps) => {
    const [livestreams, setLivestreams] = useState<Tables<'livestreams'>[]>([])
    const { setIsLoading, isLoading } = useLoadingStore()

    useEffect(() => {
        const fetchCategories = async () => {
            setIsLoading(true)
            try {
                const data = await getLivestreams({ categoryId: 'a1b2c3d4-e5f6-7890-1234-567890abcdef', limit: 4 })
                setLivestreams(data)
            } catch (error) {
                console.error(error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchCategories()
    }, [setIsLoading])

    const streamingView = (
        <div className={styles.streamPreviews}>
            {livestreams.map(stream => (
                <PreviewCard key={stream.id} />
            ))}
        </div>
    )

    return (
        <section className={styles.sectionLayout}>
            <div className={styles.sectionHeader}>
                <h2>{props.sectionTitle}</h2>
                <Link href={AppRoutes.categories}>
                    <span>View all</span>
                </Link>
            </div>
            {isLoading ? <Loader /> : streamingView}
        </section>
    )
}
