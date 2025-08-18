'use client'

import { setLivestreamsMockData } from '@/actions/mockData'
import { useEffect, useState } from 'react'

export default function Account() {
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

    const handleSeed = async () => {
        setLoading(true)
        setMessage('')
        try {
            const result = await setLivestreamsMockData()
            setMessage(result.length ? `Successfully seeded ${result.length} livestreams.` : 'Seeding completed. Check server logs for details.')
        } catch (error) {
            setMessage(`An error occurred: ${error instanceof Error ? error.message : 'Unknown error'}`)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        handleSeed()
    }, [])

    return <div style={{ textAlign: 'center', color: 'green' }}>{loading ? <h1>Loading...</h1> : <h1>{message}</h1>}</div>
}
