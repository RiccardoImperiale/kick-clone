'use client'

import styles from './OnboardingSection.module.scss'
import { useEffect, useState } from 'react'
import { Button } from '@/components/button/Button'
import { OnBoardingModal } from '@/components/popups/new-streamer-modal/OnBoardingModal'
import { getUser } from '@/actions/users'
import { Category } from '@/lib/types'
import { getCategories } from '@/actions/categories'
import { useRouter } from 'next/navigation'
import { AppRoutes } from '@/settings/AppRoutes'
import Image from 'next/image'

export const OnboardingSection = ({ userId, isUserStreamer }: { userId: string; isUserStreamer: boolean }) => {
    const router = useRouter()
    const [username, setUsername] = useState('')
    const [categories, setCategories] = useState<Category[]>([])
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        const fetchUser = async () => {
            const res = await getUser(userId)
            if (res) setUsername(res?.username)
        }

        const fetchCategories = async () => {
            const res = await getCategories()
            if (res) setCategories(res)
        }

        fetchUser()
        fetchCategories()
    }, [userId])

    return (
        <>
            {showModal && <OnBoardingModal userId={userId} username={username} categories={categories} onClose={() => setShowModal(false)} />}
            <section className={styles.sectionLayout}>
                {isUserStreamer ? (
                    <Button text="Start streaming" color="secondary" onClick={() => router.push(AppRoutes.channel)} />
                ) : (
                    <Button text="Become a streamer" color="secondary" onClick={() => setShowModal(true)} />
                )}
                <Image src="/kick-banner.jpg" alt="pc banner image" width={900} height={240} />
            </section>
        </>
    )
}
