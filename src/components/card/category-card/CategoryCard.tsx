import Image from 'next/image'
import { CardCorner } from '@/assets/CardCorner'
import styles from './CategoryCard.module.scss'
import { Pill } from '@/components/pill/Pill'

interface CategoryCardProps {
    number: number
    title: string
    image: string
    tags: string[] | null
}

export const CategoryCard = (props: CategoryCardProps) => {
    return (
        <div className={styles.cardLayout}>
            <div className={styles.number}>{props.number}</div>
            <div className={styles.imageBox}>
                <Image src={props.image} alt="category image" fill sizes="100" priority />
            </div>
            <div className={styles.footer}>
                <div className={styles.title}>{props.title}</div>
                {/* <div className={styles.category}>category</div>
                <div className={styles.name}>name</div> */}
                <div className={styles.tags}>
                    {props.tags?.map((tag, index) => (
                        <Pill key={index} text={tag} rounded />
                    ))}
                </div>
            </div>
            <CardCorner className={styles.rightCorner} />
            <CardCorner className={styles.leftCorner} />
        </div>
    )
}
