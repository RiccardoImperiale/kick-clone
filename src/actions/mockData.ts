'use server'

import { categories } from '@/database/mock-data/categories'
import { livestreams } from '@/database/mock-data/levestreams'
import { streamers } from '@/database/mock-data/streamers'
import { Category, Livestream, Streamer } from '@/lib/apiTypes'
import { createClient } from '@/utils/supabase/server'

export async function setCategoriesMockData(): Promise<Category[]> {
    const supabase = await createClient()

    await supabase.from('categories').delete().neq('id', '')
    const { data, error } = await supabase.from('categories').insert(categories).select()

    if (error) {
        console.error('Error setting categories mock data:', error)
        return []
    }

    return data || []
}

export async function setStreamersMockData(): Promise<Streamer[]> {
    const supabase = await createClient()

    await setCategoriesMockData()

    await supabase.from('streamers').delete().neq('id', '')
    const { data, error } = await supabase.from('streamers').insert(streamers).select()

    if (error) {
        console.error('Error setting streamers mock data:', error)
        return []
    }

    return data || []
}

export async function setLivestreamsMockData(): Promise<Livestream[]> {
    const supabase = await createClient()

    await setStreamersMockData()

    await supabase.from('livestreams').delete().neq('id', '')
    const { data, error } = await supabase.from('livestreams').insert(livestreams).select()

    if (error) {
        console.error('Error setting livestreams mock data:', error)
        return []
    }

    return data || []
}
