import styles from './ErrorMessage.module.scss'

interface ErrorMessageProps {
    message?: string
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
    return <>{message && <div className={`${styles.errorMsg}`}>{message}</div>}</>
}
