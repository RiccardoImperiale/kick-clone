'use server'

import { Tables } from '@/database/database.types'
import { createClient } from '@/utils/supabase/server'

type Streamer = Tables<'streamers'>

export async function getStreamer(id: string): Promise<Streamer | null> {
    const supabase = await createClient()

    const { data, error } = await supabase.from('streamers').select('*').eq('id', id).single()

    if (error) {
        console.error('Error fetching streamer:', error)
        return null
    }

    return data
}

export async function getRecommended(): Promise<Streamer[]> {
    const supabase = await createClient()

    const { data, error } = await supabase.from('streamers').select('*').limit(10)

    if (error) {
        console.error('Error fetching livestreams:', error)
        return []
    }

    return data
}
