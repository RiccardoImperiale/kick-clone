'use client'

import styles from './AuthModal.module.scss'
import Image from 'next/image'
import { CloseIcon } from '@/assets/icons/CloseIcon'
import { useState, useEffect } from 'react'
import { LoadingBar } from '@/components/loading-bar/LoadingBar'
import { LoginForm } from '@/components/forms/login-form/LoginForm'
import { RegisterForm } from '@/components/forms/register-form/RegisterForm'
import { ForgotPwdForm } from '@/components/forms/forgot-pwd-form/ForgotPwdForm'
import { ResetPwdForm } from '@/components/forms/reset-pwd-form/ResetPwdForm'

interface IAuthModalProps {
    onClose: () => void
    initialTab: Tab | null
    isResetPwd: boolean
    token: string
}

export type Tab = 'Log In' | 'Sign Up'

export const AuthModal = (props: IAuthModalProps) => {
    const [activeTab, setActiveTab] = useState<Tab | null>(props.initialTab)
    const [isVisible, setIsVisible] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isForgotPwd, setIsForgotPwd] = useState(false)

    useEffect(() => {
        setIsVisible(true)
    }, [])

    const handleClose = () => {
        setIsVisible(false)
        setTimeout(props.onClose, 300)
    }

    const tabsNavigation = (
        <div className={styles.tabsNavigation}>
            <div className={`${styles.tab} ${activeTab === 'Log In' && styles.active}`} onClick={() => setActiveTab('Log In')}>
                Log In
            </div>
            <div className={`${styles.tab} ${activeTab === 'Sign Up' && styles.active}`} onClick={() => setActiveTab('Sign Up')}>
                Sign Up
            </div>
        </div>
    )

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
                {!isForgotPwd && !props.isResetPwd && tabsNavigation}
                <div className={styles.contentWrapper}>
                    {isForgotPwd ? (
                        <ForgotPwdForm onLoadingChange={setIsLoading} onGoBack={() => setIsForgotPwd(false)} />
                    ) : props.isResetPwd ? (
                        <ResetPwdForm onLoadingChange={setIsLoading} onClose={props.onClose} code={props.token} />
                    ) : activeTab === 'Log In' ? (
                        <LoginForm onLoadingChange={setIsLoading} onClose={props.onClose} onForgotPwdClick={() => setIsForgotPwd(true)} />
                    ) : (
                        <RegisterForm onLoadingChange={setIsLoading} onClose={props.onClose} />
                    )}
                </div>
            </div>
        </div>
    )
}
