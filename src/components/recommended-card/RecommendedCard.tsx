import Image from 'next/image'
import { Tables } from '@/database/database.types'
import styles from './RecommendedCard.module.scss'

interface RecommendedCardProps {
    isOpen: boolean
    livestream: Tables<'livestreams'>
}

export const RecommendedCard = ({ isOpen, livestream }: RecommendedCardProps) => {
    return (
        <div className={`${styles.channel} ${!isOpen && styles.channelComp}`}>
            <div className={styles.avatar}>
                {!isOpen && <div className={`${styles.ring} ${livestream.is_live && styles.active}`} />}
                <Image src={livestream.profile_image_url || ''} alt={`${livestream.name}'s profile image`} width={40} height={40} />
            </div>
            {isOpen && (
                <>
                    <div className={styles.midBox}>
                        <div className={styles.name}>{livestream.name}</div>
                        <div className={styles.info}>{livestream.categories.map(category => category).join(', ')}</div>{' '}
                    </div>
                    <div className={`${styles.liveActivity} ${livestream.is_live && styles.active}`} />
                </>
            )}
        </div>
    )
}
