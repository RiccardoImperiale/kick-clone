'use client'

import Link from 'next/link'
import styles from './StreamingSection.module.scss'
import { AppRoutes } from '@/settings/AppRoutes'
import { PreviewCard } from '@/components/card/preview-card/PreviewCard'
import { Tables } from '@/database/database.types'

export interface StreamingSectionProps {
    sectionTitle: string
    livestreams: (Tables<'livestreams'> & {
        category: Tables<'categories'> | null
        streamer: Tables<'streamers'> | null
    })[]
}

export const StreamingSection = (props: StreamingSectionProps) => {
    return (
        <section className={styles.sectionLayout}>
            <div className={styles.sectionHeader}>
                <h2>{props.sectionTitle}</h2>
                <Link href={AppRoutes.categories}>
                    <span>View all</span>
                </Link>
            </div>
            <div className={styles.streamPreviews}>
                {props.livestreams.map(stream => (
                    <PreviewCard
                        key={stream.id}
                        image={stream.image_url}
                        title={stream.title}
                        tags={stream.tags}
                        category={stream.category}
                        streamer={stream.streamer}
                    />
                ))}
            </div>
        </section>
    )
}
