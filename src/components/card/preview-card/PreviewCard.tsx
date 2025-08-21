'use client'

import Image from 'next/image'
import { Pill } from '@/components/pill/Pill'
import styles from './PreviewCard.module.scss'
import { Tables } from '@/database/database.types'
import { CardCorner } from '@/assets/CardCorner'
import { useState } from 'react'
import { ErrorImg } from '@/assets/ErrorImg'

export interface PreviewCardProps {
    image: string | null
    title: string
    tags: string[] | null
    category: Tables<'categories'> | null
    streamer: Tables<'streamers'> | null
}

export const PreviewCard = (props: PreviewCardProps) => {
    const [imageError, setImageError] = useState(false)

    return (
        <div className={styles.cardLayout}>
            <div className={styles.liveBadge}>LIVE</div>
            <div className={styles.imageBox}>
                {props.image && !imageError ? (
                    <Image src={props.image} alt="streaming preview image" fill sizes="100" priority onError={() => setImageError(true)} />
                ) : (
                    <div className={styles.defaultImage}>
                        <ErrorImg width={40} height={40} />
                    </div>
                )}
            </div>
            <div className={styles.footer}>
                <div className={styles.avatar}>
                    {props.streamer?.profile_image_url && (
                        <Image
                            src={props.streamer.profile_image_url}
                            alt={props.streamer.username || 'streamer'}
                            width={40}
                            height={40}
                            unoptimized
                            onError={e => ((e.target as HTMLImageElement).style.display = 'none')}
                        />
                    )}
                </div>
                <div className={styles.infoBox}>
                    <div className={styles.title}>{props.title}</div>
                    <div className={styles.category}>{props.category?.name}</div>
                    <div className={styles.name}>{props.streamer?.username}</div>
                    <div className={styles.tags}>
                        {props.tags?.map((tag, index) => (
                            <Pill key={index} text={tag} rounded />
                        ))}
                    </div>
                </div>
            </div>
            <CardCorner className={styles.rightCorner} />
            <CardCorner className={styles.leftCorner} />
        </div>
    )
}
