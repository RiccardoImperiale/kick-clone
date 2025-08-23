'use server'

import { User } from '@/lib/apiTypes'
import { createClient } from '@/utils/supabase/server'

export async function getUser(id: string): Promise<User | null> {
    const supabase = await createClient()

    const { data, error } = await supabase.from('users').select('*').eq('id', id).single()

    if (error) {
        console.error('Error fetching user:', error)
        return null
    }

    return data
}
