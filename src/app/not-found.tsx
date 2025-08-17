import Link from 'next/link'
import styles from '@/app/error/NotFound.module.scss'

export default function NotFound() {
    return (
        <div className={styles.notFound}>
            <div>
                <h1>404 - Page Not Found</h1>
                <p>Sorry, the page you are looking for does not exist.</p>
                <Link href="/">Go back home</Link>
            </div>
        </div>
    )
}
