import styles from './Loader.module.scss'

export const Loader = () => {
    return (
        <div className={styles.loaderLayout}>
            <span className={styles.loader} />
        </div>
    )
}
