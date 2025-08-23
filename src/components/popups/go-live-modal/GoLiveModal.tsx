'use client'

import styles from './GoLiveModal.module.scss'
import Image from 'next/image'
import { CloseIcon } from '@/assets/icons/CloseIcon'
import { useState, useEffect } from 'react'
import { LoadingBar } from '@/components/loading-bar/LoadingBar'
import { NewLivestreamForm } from '@/components/forms/new-livestream-form/NewLivestreamForm'

interface IAuthModalProps {
    onGoLive: () => void
    onCancel: () => void
    onClose: () => void
}

export const GoLiveModal = (props: IAuthModalProps) => {
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
                    <NewLivestreamForm
                        username="fwef"
                        onGoLive={props.onGoLive}
                        onCancel={props.onCancel}
                        onLoadingChange={setIsLoading}
                        onClose={handleClose}
                    />
                </div>
            </div>
        </div>
    )
}
