'use client'

import styles from './UserDropdown.module.scss'
import Image from 'next/image'
import { useState } from 'react'
import { User } from '@supabase/supabase-js'
import { LogoutIcon } from '@/assets/icons/LogoutIcon'
import { ChannelIcon } from '@/assets/icons/ChannelIcon'
import { SubsIcon } from '@/assets/icons/SubsIcon'
import { SettingsIcon } from '@/assets/icons/SettingsIcon'
import { useLoadingStore } from '@/state/loadingStore'
import { signOut } from '@/actions/auth'
import { useRouter } from 'next/navigation'
import { AppRoutes } from '@/settings/AppRoutes'

interface UserDropdownProps {
    user: User | null
}

export const UserDropdown = (props: UserDropdownProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const router = useRouter()
    const setIsLoading = useLoadingStore(state => state.setIsLoading)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        setIsLoading(true)
        const res = await signOut()
        if (res.success) {
            setIsLoading(false)
            router.push(AppRoutes.home)
        } else {
            router.push('/error')
        }
    }

    return (
        <div className={styles.userBox}>
            <div className={styles.avatar} onClick={() => setIsOpen(!isOpen)}>
                <Image src="/avatar.jpeg" alt="User avatar" width={40} height={40} />
            </div>
            <div className={`${styles.dropdown} ${isOpen && styles.open}`}>
                <div className={styles.header}>
                    <Image src="/avatar.jpeg" alt="User avatar" width={32} height={32} />
                    {props.user?.user_metadata.username}
                </div>
                <div className={styles.list}>
                    <div className={styles.tab}>
                        <ChannelIcon width={16} height={16} />
                        Channel
                    </div>
                    <div className={styles.tab}>
                        <SubsIcon width={16} height={16} />
                        Subscriptions
                    </div>
                    <div className={styles.tab}>
                        <SettingsIcon width={16} height={16} />
                        Settings
                    </div>
                </div>
                <div className={styles.footer}>
                    <form onSubmit={handleSubmit}>
                        <button type="submit" className={styles.tab}>
                            <LogoutIcon width={16} height={16} />
                            <span>Log out</span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
