import styles from './Pill.module.scss'

interface IPillProps {
    text: string
    color?: string
    rounded?: boolean
    endIcon?: React.ReactNode
}

export const Pill = (props: IPillProps) => {
    return (
        <div className={`${styles.pill} ${props.color ? styles[props.color] : styles.default} ${props.rounded && styles.rounded}`}>
            <div className={styles.text}>{props.text}</div>
            {props.endIcon && <div className={`${styles.icon} ${props.color ? styles[props.color] : styles.default}`}>{props.endIcon}</div>}
        </div>
    )
}
