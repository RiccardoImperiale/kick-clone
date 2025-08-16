'use client'

import Image from 'next/image'
import styles from './Navbar.module.scss'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { BurgerIcon } from '@/assets/icons/BurgerIcon'
import { Button } from '@/components/button/Button'
import { Search } from '@/components/search/Search'
import { AuthModal, Tab } from '@/components/auth-modal/AuthModal'
import { User } from '@supabase/supabase-js'
import { LoadingBar } from '@/components/loading-bar/LoadingBar'
import { useLoadingStore } from '@/state/loadingStore'
import { UserDropdown } from '../user-dropdown/UserDropdown'

interface HeaderProps {
    user: User | null
}

export const Navbar = (props: HeaderProps) => {
    const router = useRouter()
    const isLoading = useLoadingStore(state => state.isLoading)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [initialTab, setInitialTab] = useState<Tab | null>(null)

    const handleModalOpen = (activeTab: Tab) => {
        setIsModalOpen(true)
        setInitialTab(activeTab)
    }

    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const code = params.get('code')
        const error = params.get('error')
        if (code) {
            setInitialTab('Log In')
            setIsModalOpen(true)
        } else if (error) {
            router.push('/error')
        }
        window.history.replaceState({}, document.title, window.location.pathname)
    }, [])

    return (
        <>
            {isModalOpen && <AuthModal onClose={() => setIsModalOpen(false)} initialTab={initialTab} />}
            <LoadingBar isLoading={isLoading} />
            <nav>
                <div className={styles.left}>
                    <div className={styles.iconBox}>
                        <BurgerIcon width={16} height={16} />
                    </div>
                    <Image onClick={() => router.push('/')} src="/kick-logo.svg" alt="Logo" width={97} height={26} priority />
                </div>
                <div className={styles.middle}>
                    <Search placeholder="Search" />
                </div>
                <div className={styles.right}>
                    {props.user ? (
                        <UserDropdown user={props.user} />
                    ) : (
                        <>
                            <Button text="Log In" color="neutral" onClick={() => handleModalOpen('Log In')} />
                            <Button text="Sign Up" color="primary" onClick={() => handleModalOpen('Sign Up')} />
                        </>
                    )}
                </div>
            </nav>
        </>
    )
}
