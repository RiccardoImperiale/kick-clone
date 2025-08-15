'use client'
import styles from './Header.module.scss'
import Image from 'next/image'
import { BurgerIcon } from '@/assets/icons/BurgerIcon'
import { Button } from '@/components/button/Button'
import { Search } from '@/components/search/Search'
import { AuthModal } from '@/components/auth-modal/AuthModal'
import { useState } from 'react'

export const Header = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <>
            {isModalOpen && <AuthModal onClose={() => setIsModalOpen(false)} />}
            <header className={styles.header}>
                <nav>
                    <div className={styles.left}>
                        <div className={styles.iconBox}>
                            <BurgerIcon width={16} height={16} />
                        </div>
                        <Image src="/kick-logo.svg" alt="Logo" width={97} height={26} priority />
                    </div>
                    <div className={styles.middle}>
                        <Search placeholder="Search" />
                    </div>
                    <div className={styles.right}>
                        <Button text="Log In" color="neutral" onClick={() => setIsModalOpen(true)} />
                        <Button text="Sign Up" color="primary" onClick={() => setIsModalOpen(true)} />
                    </div>
                </nav>
            </header>
        </>
    )
}
