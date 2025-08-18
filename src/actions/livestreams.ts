'use server'

import { Tables } from '@/database/database.types'
import { createClient } from '@/utils/supabase/server'

type Livestream = Tables<'livestreams'>

export async function getLivestreams(): Promise<Livestream[]> {
    const supabase = await createClient()

    const { data, error } = await supabase.from('livestreams').select('*')

    if (error) {
        console.error('Error fetching livestreams:', error)
        return []
    }

    return data
}

export async function getRecommended(): Promise<Livestream[]> {
    const supabase = await createClient()

    const { data, error } = await supabase.from('livestreams').select('*').limit(10)

    if (error) {
        console.error('Error fetching livestreams:', error)
        return []
    }

    return data
}
