'use client'

import { signOut } from '@/actions/auth'
import { Button } from '@/components/button/Button'
import { useLoadingStore } from '@/state/loadingStore'
import { useRouter } from 'next/navigation'

export const LogoutForm = () => {
    const setIsLoading = useLoadingStore(state => state.setIsLoading)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        setIsLoading(true)
        const res = await signOut()
        if (res.success) {
            setIsLoading(false)
            router.push('/')
        } else {
            router.push('/error')
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <Button text="Logout" type="submit" color="primary" />
        </form>
    )
}
