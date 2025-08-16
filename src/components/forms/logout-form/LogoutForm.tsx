'use client'

import { useState } from 'react'
import { signOut } from '@/actions/auth'
import { Button } from '@/components/button/Button'

export const LogoutForm = () => {
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        setIsLoading(true)
        await signOut()
        setIsLoading(false)
    }

    return (
        <form onSubmit={handleSubmit}>
            <Button text="Logout" type="submit" color="primary" />
        </form>
    )
}
