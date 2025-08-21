'use client'
import styles from '@/app/error/NotFound.module.scss'
import { NotFoundImg } from '@/assets/NotFoundImg'
import { Button } from '@/components/button/Button'

export default function NotFound() {
    return (
        <div className={styles.notFound}>
            <NotFoundImg />
            <div className={styles.text}>
                <h1>Oops, something went wrong</h1>
                <p>We can't find the page you're looking for.</p>
            </div>
            <Button text="Go back" color="primary" onClick={() => window.history.back()} />
        </div>
    )
}
