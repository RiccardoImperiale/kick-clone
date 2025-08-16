'use client'
import styles from './AuthModal.module.scss'
import Image from 'next/image'
import { CloseIcon } from '@/assets/icons/CloseIcon'
import { Input } from '@/components/input/Input'
import { Button } from '@/components/button/Button'
import { useState, useEffect } from 'react'
import { login } from '../../actions/auth-actions'
import { SignUpForm } from '@/components/forms/signup-form/SignUpForm'
import { LoadingBar } from '../loading-bar/LoadingBar'
import { useRouter } from 'next/navigation'

interface IAuthModalProps {
    onClose: () => void
    initialTab: Tab | null
}

export type Tab = 'Log In' | 'Sign Up'

export const AuthModal = ({ onClose, initialTab }: IAuthModalProps) => {
    const router = useRouter()
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

    const loginForm = (
        <form action={login}>
            <Input errorMsg="" label="Email or Username" id="email" name="email" autocomplete="email" />
            <div className={styles.forgotPasswordWrapper}>
                <Input label="Password" type="password" id="password" name="password" />
                <span>Forgot password?</span>
            </div>
            <Button text="Log In" color="primary" type="submit" />
        </form>
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
                <div className={styles.tabsNavigation}>
                    <div className={`${styles.tab} ${activeTab === 'Log In' && styles.active}`} onClick={() => setActiveTab('Log In')}>
                        Log In
                    </div>
                    <div className={`${styles.tab} ${activeTab === 'Sign Up' && styles.active}`} onClick={() => setActiveTab('Sign Up')}>
                        Sign Up
                    </div>
                </div>
                <div className={styles.contentWrapper}>
                    {activeTab === 'Log In' ? loginForm : <SignUpForm onLoadingChange={setIsLoading} onClose={onClose} />}
                </div>
            </div>
        </div>
    )
}
