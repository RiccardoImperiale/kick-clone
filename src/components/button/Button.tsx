import styles from './Button.module.scss'

interface IButtonPrimaryProps {
    text: string
    type?: 'submit' | 'reset' | 'button'
    color?: 'primary' | 'secondary' | 'neutral' | 'disabled'
    isDisabled?: boolean
    onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void
}

export const Button = (props: IButtonPrimaryProps) => {
    let btnColor = ''

    switch (props.color) {
        case 'primary':
            btnColor = styles.primary
            break
        case 'secondary':
            btnColor = styles.secondary
            break
        case 'neutral':
            btnColor = styles.neutral
            break
        case 'disabled':
            btnColor = styles.disabled
            break
        default:
            btnColor = styles.disabled
            break
    }

    return (
        <button onClick={props.onClick} type={props.type ?? 'submit'} className={`${styles.btn} ${btnColor}`} disabled={props.isDisabled}>
            {props.text && props.text}
        </button>
    )
}
