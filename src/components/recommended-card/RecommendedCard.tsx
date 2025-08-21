import Image from 'next/image'
import { Tables } from '@/database/database.types'
import styles from './RecommendedCard.module.scss'

interface RecommendedCardProps {
    isOpen: boolean
    streamer: Tables<'streamers'>
}

export const RecommendedCard = (props: RecommendedCardProps) => {
    return (
        <div className={`${styles.channel} ${!props.isOpen && styles.channelComp}`}>
            <div className={styles.avatar}>
                {!props.isOpen && <div className={styles.ring} />}
                {/* {!isOpen && <div className={`${styles.ring} ${livestream.is_live && styles.active}`} />} */}
                {!props.isOpen && <div className={styles.ring} />}
                <Image
                    src={props.streamer.profile_image_url || ''}
                    alt={`${props.streamer.username}'s profile image`}
                    width={40}
                    height={40}
                    unoptimized
                />
            </div>
            {props.isOpen && (
                <>
                    <div className={styles.midBox}>
                        <div className={styles.name}>{props.streamer.username}</div>
                        <div className={styles.info}>{props.streamer.tags?.map(category => category).join(', ')}</div>{' '}
                    </div>
                    {/* <div className={`${styles.liveActivity} ${livestream.is_live && styles.active}`} /> */}
                    <div className={`${styles.liveActivity}`} />
                </>
            )}
        </div>
    )
}
