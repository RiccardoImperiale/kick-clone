'use client'

import styles from './OnBoardingModal.module.scss'
import Image from 'next/image'
import { CloseIcon } from '@/assets/icons/CloseIcon'
import { useState, useEffect } from 'react'
import { LoadingBar } from '@/components/loading-bar/LoadingBar'
import { NewStreamerForm } from '@/components/forms/new-streamer-form/NewStreamerForm'
import { Category } from '@/lib/types'

interface IAuthModalProps {
    userId: string
    username: string
    categories: Category[]
    onClose: () => void
}

export const OnBoardingModal = (props: IAuthModalProps) => {
    const [isVisible, setIsVisible] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsVisible(true)
    }, [])

    const handleClose = () => {
        setIsVisible(false)
        setTimeout(props.onClose, 300)
    }

    return (
        <div className={`${styles.popupLayout} ${isVisible ? styles.show : styles.hide}`}>
            <div className={styles.darkFilter} onClick={handleClose} />
            <div className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="auth-modal-title">
                <LoadingBar isLoading={isLoading} />
                <div className={styles.header}>
                    <Image src="/kick-logo.svg" alt="Logo" width={97} height={26} priority />
                    <div className={styles.iconBox}>
                        <CloseIcon width={16} height={16} onClick={handleClose} />
                    </div>
                </div>
                <div className={styles.contentWrapper}>
                    <NewStreamerForm
                        userId={props.userId}
                        username={props.username}
                        categories={props.categories}
                        onLoadingChange={setIsLoading}
                        onClose={props.onClose}
                    />
                </div>
            </div>
        </div>
    )
}
