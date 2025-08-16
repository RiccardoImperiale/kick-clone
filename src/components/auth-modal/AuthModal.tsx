'use client'
import styles from './AuthModal.module.scss'
import Image from 'next/image'
import { CloseIcon } from '@/assets/icons/CloseIcon'
import { useState, useEffect } from 'react'
import { LoadingBar } from '@/components/loading-bar/LoadingBar'
import { LoginForm } from '@/components/forms/login-form/LoginForm'
import { RegisterForm } from '@/components/forms/register-form/RegisterForm'

interface IAuthModalProps {
    onClose: () => void
    initialTab: Tab | null
}

export type Tab = 'Log In' | 'Sign Up'

export const AuthModal = ({ onClose, initialTab }: IAuthModalProps) => {
    const [activeTab, setActiveTab] = useState<Tab | null>(initialTab)
    const [isVisible, setIsVisible] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsVisible(true)
    }, [])

    const handleClose = () => {
        setIsVisible(false)
        setTimeout(onClose, 300)
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
                <div className={styles.tabsNavigation}>
                    <div className={`${styles.tab} ${activeTab === 'Log In' && styles.active}`} onClick={() => setActiveTab('Log In')}>
                        Log In
                    </div>
                    <div className={`${styles.tab} ${activeTab === 'Sign Up' && styles.active}`} onClick={() => setActiveTab('Sign Up')}>
                        Sign Up
                    </div>
                </div>
                <div className={styles.contentWrapper}>
                    {activeTab === 'Log In' ? (
                        <LoginForm onLoadingChange={setIsLoading} onClose={onClose} />
                    ) : (
                        <RegisterForm onLoadingChange={setIsLoading} onClose={onClose} />
                    )}
                </div>
            </div>
        </div>
    )
}
