'use client'
import styles from './AuthModal.module.scss'
import Image from 'next/image'
import { CloseIcon } from '@/assets/icons/CloseIcon'
import { Input } from '@/components/input/Input'
import { Button } from '@/components/button/Button'
import { useState, useEffect } from 'react'
import { Checkbox } from '@/components/checkbox/Checkbox'

interface IAuthModalProps {
    onClose: () => void
}

type Tab = 'Log In' | 'Sign Up'

export const AuthModal = ({ onClose }: IAuthModalProps) => {
    const [activeTab, setActiveTab] = useState<Tab>('Log In')
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        setIsVisible(true)
    }, [])

    const handleClose = () => {
        setIsVisible(false)
        setTimeout(onClose, 300)
    }

    const loginForm = (
        <form action="">
            <Input errorMsg="" label="Email or Username" id="email" autocomplete="email" />
            <div className={styles.forgotPasswordWrapper}>
                <Input label="Password" type="password" id="password" />
                <span>Forgot password?</span>
            </div>
            <Button text="Log In" color="primary" />
        </form>
    )

    const signUpForm = (
        <form action="">
            <Input errorMsg="" label="Email" id="email" autocomplete="email" type="email" placeholder="you@example.com" />
            <Input errorMsg="" label="Username" id="username" autocomplete="username" />
            <Input label="Password" type="password" id="password" />
            <Checkbox value="newsletter" label="Subscribe to our newsletter and promotions" />
            <Button text="Sign Up" color="primary" />
        </form>
    )

    return (
        <div className={`${styles.popupLayout} ${isVisible ? styles.show : styles.hide}`}>
            <div className={styles.darkFilter} onClick={handleClose} />
            <div className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="auth-modal-title">
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
                <div className={styles.contentWrapper}>{activeTab === 'Log In' ? loginForm : signUpForm}</div>
            </div>
        </div>
    )
}
