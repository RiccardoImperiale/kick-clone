import styles from './PreviewCard.module.scss'

interface PreviewCardProps {
    // title: string
    // image: string | null
    // tags: string[]
}

export const PreviewCard = (props: PreviewCardProps) => {
    return (
        <div className={styles.cardLayout}>
            <div className={styles.imageBox}></div>
            <div className={styles.footer}>
                <div className={styles.avatar}>X</div>
                <div className={styles.infoBox}>
                    <div className={styles.title}>stream title</div>
                    <div className={styles.category}>category</div>
                    <div className={styles.name}>name</div>
                    {/* <div className={styles.tags}>
                            tags
                        </div> */}
                </div>
            </div>
        </div>
    )
}
