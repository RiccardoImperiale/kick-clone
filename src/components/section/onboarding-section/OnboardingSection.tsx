'use client'

import styles from './OnboardingSection.module.scss'
import { useEffect, useState } from 'react'
import { Button } from '@/components/button/Button'
import { OnBoardingModal } from '@/components/popups/new-streamer-modal/OnBoardingModal'
import { getUser } from '@/actions/users'
import { Category } from '@/lib/types'
import { getCategories } from '@/actions/categories'

export const OnboardingSection = ({ userId }: { userId: string }) => {
    const [username, setUsername] = useState('')
    const [categories, setCategories] = useState<Category[]>([])
    const [showModal, setShowModal] = useState(false)

    const fetchUser = async () => {
        const res = await getUser(userId)
        if (res) setUsername(res?.username)
    }

    const fetchCategories = async () => {
        const res = await getCategories()
        if (res) setCategories(res)
    }

    useEffect(() => {
        fetchUser()
        fetchCategories()
    }, [userId])

    return (
        <section className={styles.sectionLayout}>
            <Button text="Become a streamer" color="primary" onClick={() => setShowModal(true)} />
            {showModal && <OnBoardingModal userId={userId} username={username} categories={categories} onClose={() => setShowModal(false)} />}
        </section>
    )
}
